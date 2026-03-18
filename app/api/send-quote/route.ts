import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const {
			customerName,
			customerEmail,
			customerPhone,
			preferredContact,
			fromCity,
			toCity,
			moveDate,
			homeSize,
			moveType,
			extraServices,
			estWeight,
			dateFlexibility,
			specialNotes,
			submittedAt,
		} = body;

		const { data, error } = await resend.emails.send({
			// Until you verify a custom domain in Resend, use their free sandbox address.
			// Once you verify a domain, change this to: 'MOVEZY <noreply@yourdomain.com>'
			from: "MOVEZY Quotes <onboarding@resend.dev>",
			to: ["movezyhelpdesk@gmail.com"],
			replyTo: customerEmail,
			subject: `🚛 New Quote — ${customerName} | ${fromCity} → ${toCity}`,

			// Plain text fallback
			text: `
New Quote Request from ${customerName}

CUSTOMER
Name:              ${customerName}
Email:             ${customerEmail}
Phone:             ${customerPhone}
Preferred Contact: ${preferredContact}

MOVE
From:      ${fromCity}
To:        ${toCity}
Date:      ${moveDate}
Home Size: ${homeSize}
Type:      ${moveType}

EXTRAS
Additional Services: ${extraServices}
Est. Weight:         ${estWeight}
Date Flexibility:    ${dateFlexibility}
Special Notes:       ${specialNotes}

Submitted: ${submittedAt}
      `.trim(),

			// Rich HTML email
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
              New Quote Request
            </p>
          </td>
        </tr>

        <!-- Alert bar -->
        <tr>
          <td style="background:#E8A020;padding:13px 40px;">
            <p style="margin:0;font-size:12px;font-weight:700;color:#0D2347;text-transform:uppercase;letter-spacing:1px;">
              ⚡ Action Required — A customer is ready to move!
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px;">

          <!-- Customer -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Customer</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            ${row("Name", customerName)}
            ${row("Email", `<a href="mailto:${customerEmail}" style="color:#2E86C1;">${customerEmail}</a>`)}
            ${row("Phone", `<a href="tel:${customerPhone}" style="color:#2E86C1;">${customerPhone}</a>`)}
            ${row("Preferred Contact", preferredContact, true)}
          </table>

          <!-- Move -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Move Details</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            ${row("From", fromCity)}
            ${row("To", toCity)}
            ${row("Date", moveDate)}
            ${row("Home Size", homeSize)}
            ${row("Move Type", moveType, true)}
          </table>

          <!-- Extras -->
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;">Additional Info</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:32px;">
            ${row("Extra Services", extraServices)}
            ${row("Est. Weight", estWeight)}
            ${row("Date Flexibility", dateFlexibility)}
            ${row("Special Notes", specialNotes || "None", true)}
          </table>

          <!-- Reply CTA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="mailto:${customerEmail}?subject=Your MOVEZY Quote — ${fromCity} to ${toCity}"
                style="display:inline-block;background:#E8A020;color:#0D2347;font-size:14px;font-weight:700;
                       padding:14px 32px;border-radius:10px;text-decoration:none;">
                Reply to ${customerName} →
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:18px 40px;">
            <p style="margin:0;font-size:11px;color:#94A3B8;text-align:center;">
              Submitted ${submittedAt} &nbsp;·&nbsp; MOVEZY &nbsp;·&nbsp; movezyhelpdesk@gmail.com
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
			return NextResponse.json(
				{ success: false, error: error.message },
				{ status: 500 },
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

// Builds a labelled two-column table row for the HTML email
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
