import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// ── Where quote requests go ──────────────────────────────────────────────────
// Sent from your verified Resend domain (movezy.ca) to the team inbox.
// Override per environment with QUOTE_TO_EMAIL / QUOTE_FROM_EMAIL if needed.
// NOTE: sending from @movezy.ca only works once movezy.ca is verified in Resend.
const TO_ADDRESS = process.env.QUOTE_TO_EMAIL || "hello@movezy.ca";
const FROM_ADDRESS =
	process.env.QUOTE_FROM_EMAIL || "MOVEZY Quotes <quotes@movezy.ca>";

// ── Input limits ─────────────────────────────────────────────────────────────
const FIELD_LIMITS = {
	serviceType: 20,
	customerName: 120,
	customerEmail: 254,
	customerPhone: 40,
	preferredContact: 40,
	fromCity: 300,
	toCity: 300,
	moveDate: 40,
	homeSize: 80,
	moveType: 80,
	cleaningType: 80,
	cleaningLocation: 40,
	extraServices: 500,
	estWeight: 80,
	dateFlexibility: 80,
	specialNotes: 2000,
	submittedAt: 100,
} as const;

type Field = keyof typeof FIELD_LIMITS;
type QuoteData = Record<Field, string>;

const REQUIRED: Field[] = [
	"customerName",
	"customerEmail",
	"customerPhone",
	"fromCity",
	"moveDate",
	"homeSize",
];

type ServiceType = "moving" | "cleaning" | "both";
const SERVICE_LABEL: Record<ServiceType, string> = {
	moving: "Moving",
	cleaning: "Cleaning",
	both: "Move + Clean",
};
const SERVICE_EMOJI: Record<ServiceType, string> = {
	moving: "🚛",
	cleaning: "✨",
	both: "🏡",
};

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// ── Basic per-IP rate limiting ───────────────────────────────────────────────
// In-memory, so it resets on redeploy and is per server instance. That's
// enough to stop a single bot hammering the form; for stronger protection
// put this behind a shared store (e.g. Upstash/Vercel KV).
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5; // submissions per IP per window
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
	recent.push(now);
	hits.set(ip, recent);
	if (hits.size > 5000) {
		hits.forEach((times, key) => {
			if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
		});
	}
	return recent.length > RATE_MAX;
}

function clientIp(req: NextRequest): string {
	return (
		req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
		req.headers.get("x-real-ip") ||
		"unknown"
	);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/** Strips line breaks so values can't break out of header-like fields. */
function singleLine(value: string): string {
	return value.replace(/[\r\n]+/g, " ").trim();
}

function parseBody(
	body: unknown,
): { ok: true; data: QuoteData } | { ok: false; error: string } {
	if (!body || typeof body !== "object") {
		return { ok: false, error: "Invalid request body" };
	}
	const raw = body as Record<string, unknown>;
	const data = {} as QuoteData;

	for (const field of Object.keys(FIELD_LIMITS) as Field[]) {
		const value = raw[field];
		if (value !== undefined && value !== null && typeof value !== "string") {
			return { ok: false, error: `Invalid value for ${field}` };
		}
		const str = (value ?? "").trim();
		if (str.length > FIELD_LIMITS[field]) {
			return { ok: false, error: `${field} is too long` };
		}
		data[field] = field === "specialNotes" ? str : singleLine(str);
	}

	if (!data.serviceType) data.serviceType = "moving";
	if (!Object.hasOwn(SERVICE_LABEL, data.serviceType)) {
		return { ok: false, error: "Invalid serviceType" };
	}
	const service = data.serviceType as ServiceType;
	const required: Field[] = [...REQUIRED];
	if (service !== "cleaning") required.push("toCity", "moveType");
	if (service !== "moving") required.push("cleaningType");
	if (service === "both") required.push("cleaningLocation");

	for (const field of required) {
		if (!data[field]) return { ok: false, error: `${field} is required` };
	}
	if (!EMAIL_RE.test(data.customerEmail)) {
		return { ok: false, error: "Invalid email address" };
	}
	if (data.customerPhone.replace(/\D/g, "").length < 10) {
		return { ok: false, error: "Invalid phone number" };
	}
	return { ok: true, data };
}

// ── Route ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
	try {
		if (isRateLimited(clientIp(req))) {
			return NextResponse.json(
				{ success: false, error: "Too many requests. Please try again later." },
				{ status: 429 },
			);
		}

		let body: unknown;
		try {
			body = await req.json();
		} catch {
			return NextResponse.json(
				{ success: false, error: "Invalid JSON" },
				{ status: 400 },
			);
		}

		// Honeypot: real users never see this field. Pretend success so bots move on.
		const honeypot = (body as Record<string, unknown> | null)?.website;
		if (typeof honeypot === "string" && honeypot.trim() !== "") {
			return NextResponse.json({ success: true });
		}

		const parsed = parseBody(body);
		if (!parsed.ok) {
			return NextResponse.json(
				{ success: false, error: parsed.error },
				{ status: 400 },
			);
		}
		const q = parsed.data;
		const submittedAt =
			q.submittedAt ||
			new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" });
		const extraServices = q.extraServices || "None selected";
		const estWeight = q.estWeight || "Not specified";
		const dateFlexibility = q.dateFlexibility || "Not specified";
		const specialNotes = q.specialNotes || "None";
		const preferredContact = q.preferredContact || "Not specified";
		const service = q.serviceType as ServiceType;
		const isMoving = service !== "cleaning";
		const isCleaning = service !== "moving";
		const route = isMoving ? `${q.fromCity} → ${q.toCity}` : q.fromCity;

		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) {
			console.error("RESEND_API_KEY is not set");
			return NextResponse.json(
				{ success: false, error: "Email service is not configured" },
				{ status: 500 },
			);
		}
		const resend = new Resend(apiKey);

		// HTML-escaped copies for the HTML body
		const h = {
			name: escapeHtml(q.customerName),
			email: escapeHtml(q.customerEmail),
			phone: escapeHtml(q.customerPhone),
			preferredContact: escapeHtml(preferredContact),
			service: escapeHtml(SERVICE_LABEL[service]),
			cleaningType: escapeHtml(q.cleaningType),
			cleaningLocation: escapeHtml(q.cleaningLocation),
			fromCity: escapeHtml(q.fromCity),
			toCity: escapeHtml(q.toCity),
			moveDate: escapeHtml(q.moveDate),
			homeSize: escapeHtml(q.homeSize),
			moveType: escapeHtml(q.moveType),
			extraServices: escapeHtml(extraServices),
			estWeight: escapeHtml(estWeight),
			dateFlexibility: escapeHtml(dateFlexibility),
			specialNotes: escapeHtml(specialNotes).replace(/\n/g, "<br />"),
			submittedAt: escapeHtml(submittedAt),
		};
		const mailtoHref = escapeHtml(
			`mailto:${encodeURIComponent(q.customerEmail)}?subject=${encodeURIComponent(
				`Your MOVEZY ${SERVICE_LABEL[service]} Quote — ${route}`,
			)}`,
		);
		const telHref = escapeHtml(`tel:${q.customerPhone.replace(/[^\d+]/g, "")}`);

		const { data, error } = await resend.emails.send({
			from: FROM_ADDRESS,
			to: [TO_ADDRESS],
			replyTo: q.customerEmail,
			subject: `${SERVICE_EMOJI[service]} New ${SERVICE_LABEL[service]} Quote — ${q.customerName} | ${route}`.slice(
				0,
				200,
			),

			// Plain text fallback
			text: `
New ${SERVICE_LABEL[service]} Quote Request from ${q.customerName}

CUSTOMER
Name:              ${q.customerName}
Email:             ${q.customerEmail}
Phone:             ${q.customerPhone}
Preferred Contact: ${preferredContact}

JOB
Service:   ${SERVICE_LABEL[service]}
${isMoving ? "From:     " : "Address:  "} ${q.fromCity}
${isMoving ? `To:        ${q.toCity}
` : ""}Date:      ${q.moveDate}
Home Size: ${q.homeSize}
${isMoving ? `Move Type: ${q.moveType}
` : ""}${isCleaning ? `Cleaning:  ${q.cleaningType}${service === "both" ? ` (${q.cleaningLocation})` : ""}
` : ""}

EXTRAS
Additional Services: ${extraServices}
Est. Weight:         ${isMoving ? estWeight : "N/A"}
Date Flexibility:    ${dateFlexibility}
Special Notes:       ${specialNotes}

Submitted: ${submittedAt}
      `.trim(),

			// Rich HTML email — every interpolated value is escaped above
			html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0D2347,#1B3A6B);padding:32px 40px;">
            <p style="margin:0;font-size:28px;font-weight:900;color:#fff;letter-spacing:-0.5px;">
              MOVE<span style="color:#E8A020;">ZY</span>
            </p>
            <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:1.5px;">
              New ${h.service} Quote Request
            </p>
          </td>
        </tr>

        <!-- Alert bar -->
        <tr>
          <td style="background:#E8A020;padding:13px 40px;">
            <p style="margin:0;font-size:12px;font-weight:700;color:#0D2347;text-transform:uppercase;letter-spacing:1px;">
              New request from the website — please reply within 30 minutes
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px;">

          <!-- Customer -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Customer</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            ${row("Name", h.name)}
            ${row("Email", `<a href="${mailtoHref}" style="color:#2E86C1;">${h.email}</a>`)}
            ${row("Phone", `<a href="${telHref}" style="color:#2E86C1;">${h.phone}</a>`)}
            ${row("Preferred Contact", h.preferredContact, true)}
          </table>

          <!-- Move -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">${isMoving ? "Move Details" : "Cleaning Details"}</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            ${row("Service", h.service)}
            ${row(isMoving ? "From" : "Address", h.fromCity)}
            ${isMoving ? row("To", h.toCity) : ""}
            ${row("Date", h.moveDate)}
            ${row("Home Size", h.homeSize)}
            ${isMoving ? row("Move Type", h.moveType, !isCleaning) : ""}
            ${isCleaning ? row("Cleaning", h.cleaningType, service !== "both") : ""}
            ${service === "both" ? row("Clean Which Home", h.cleaningLocation, true) : ""}
          </table>

          <!-- Extras -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Additional Info</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:32px;">
            ${row("Extra Services", h.extraServices)}
            ${isMoving ? row("Est. Weight", h.estWeight) : ""}
            ${row("Date Flexibility", h.dateFlexibility)}
            ${row("Special Notes", h.specialNotes, true)}
          </table>

          <!-- Reply CTA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="${mailtoHref}"
                style="display:inline-block;background:#E8A020;color:#0D2347;font-size:14px;font-weight:700;
                       padding:14px 32px;border-radius:10px;text-decoration:none;">
                Reply to ${h.name} →
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:18px 40px;">
            <p style="margin:0;font-size:11px;color:#94A3B8;text-align:center;">
              Submitted ${h.submittedAt} &nbsp;·&nbsp; MOVEZY &nbsp;·&nbsp; ${TO_ADDRESS}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
		});

		if (error) {
			console.error("Resend error:", error);
			if (/domain|verif/i.test(error.message ?? "")) {
				console.error(
					`Resend rejected the sender "${FROM_ADDRESS}". Check that its domain is verified at https://resend.com/domains.`,
				);
			}
			return NextResponse.json(
				{ success: false, error: "Could not send email" },
				{ status: 502 },
			);
		}

		return NextResponse.json({ success: true, id: data?.id });
	} catch (err) {
		console.error("API route error:", err);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}

// Builds a labelled two-column table row for the HTML email.
// `value` must already be HTML-escaped.
function row(label: string, value: string, isLast = false): string {
	const border = isLast ? "" : "border-bottom:1px solid #F1F5F9;";
	return `
    <tr>
      <td style="padding:11px 16px;font-size:11px;font-weight:700;color:#64748B;
                 text-transform:uppercase;letter-spacing:0.8px;width:36%;${border}">
        ${label}
      </td>
      <td style="padding:11px 16px;font-size:14px;color:#1E293B;font-weight:500;${border}">
        ${value}
      </td>
    </tr>`;
}
