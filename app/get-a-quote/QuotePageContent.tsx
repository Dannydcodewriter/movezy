"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	Check,
	ArrowRight,
	ArrowLeft,
	Loader2,
	AlertCircle,
} from "lucide-react";
import AddressAutocomplete from "@/components/ui/AddressAutocomplete";

type ServiceType = "moving" | "cleaning" | "both";

const serviceOptions: {
	id: ServiceType;
	emoji: string;
	label: string;
	sub: string;
}[] = [
	{ id: "moving", emoji: "🚛", label: "Moving", sub: "Movers only" },
	{ id: "cleaning", emoji: "✨", label: "Cleaning", sub: "Cleaners only" },
	{ id: "both", emoji: "🏡", label: "Move + Clean", sub: "One team, both jobs" },
];

const movingExtras = [
	"📦 Full Packing Service",
	"🛏 Furniture Disassembly",
	"🎹 Specialty Items",
	"🏭 Storage Required",
	"🖼 Fine Art / Antiques",
	"🚗 Vehicle Transport",
];

const cleaningExtras = [
	"🧊 Inside Fridge",
	"🔥 Inside Oven",
	"🪟 Interior Windows",
	"🧺 Laundry & Linens",
	"🐾 Pet Hair Treatment",
	"🌿 Eco-Friendly Products",
];

const cleaningTypes = [
	"Move-Out Cleaning",
	"Move-In Cleaning",
	"Deep Cleaning",
	"Regular Home Cleaning",
	"Office / Commercial Cleaning",
	"Post-Renovation Cleaning",
	"Carpet & Upholstery",
];

const homeSizes = [
	"Studio",
	"1 Bedroom",
	"2 Bedrooms",
	"3 Bedrooms",
	"4+ Bedrooms",
	"Office / Commercial",
];

type Step = 1 | 2 | 3;

interface FormState {
	fromAddress: string;
	toAddress: string;
	moveDate: string;
	homeSize: string;
	moveType: string;
	cleaningType: string;
	cleaningLocation: string;
	weight: string;
	flexible: string;
	notes: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	contact: string;
}

const emptyForm: FormState = {
	fromAddress: "",
	toAddress: "",
	moveDate: "",
	homeSize: "",
	moveType: "",
	cleaningType: "",
	cleaningLocation: "",
	weight: "",
	flexible: "",
	notes: "",
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	contact: "Email & Phone",
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

const parseService = (v: string | null): ServiceType =>
	v === "cleaning" || v === "both" ? v : "moving";

const labelClass =
	"font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block";

export default function QuotePageContent() {
	const params = useSearchParams();
	const [service, setService] = useState<ServiceType>(() =>
		parseService(params.get("service")),
	);
	const [step, setStep] = useState<Step>(1);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [step1Error, setStep1Error] = useState<string | null>(null);
	const [extras, setExtras] = useState<string[]>([]);
	const [form, setForm] = useState<FormState>(() => {
		const size = params.get("size") ?? "";
		return {
			...emptyForm,
			fromAddress: params.get("from") ?? "",
			toAddress: params.get("to") ?? "",
			homeSize:
				size === "Office"
					? "Office / Commercial"
					: homeSizes.includes(size)
						? size
						: "",
		};
	});
	const [honeypot, setHoneypot] = useState("");
	const [fieldErrors, setFieldErrors] = useState<
		Partial<Record<keyof FormState, string>>
	>({});

	const isMoving = service !== "cleaning";
	const isCleaning = service !== "moving";

	// The form card. Every step change scrolls back to its top: otherwise a
	// customer who pressed "Next" at the bottom of a long step lands below the
	// new step and only sees the footer.
	const formRef = useRef<HTMLDivElement>(null);
	const scrollToForm = () =>
		requestAnimationFrame(() =>
			formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
		);
	const goToStep = (n: Step) => {
		setStep(n);
		scrollToForm();
	};

	/** Red "Required" note under a step-1 field */
	const fieldError = (k: keyof FormState) =>
		fieldErrors[k] ? (
			<p className="text-red-500 text-xs mt-1">{fieldErrors[k]}</p>
		) : null;
	const invalidClass = (k: keyof FormState) =>
		fieldErrors[k] ? "!border-red-400" : "";

	const toggleExtra = (s: string) =>
		setExtras((prev) =>
			prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
		);

	const update = (k: keyof FormState, v: string) => {
		setForm((f) => ({ ...f, [k]: v }));
		setStep1Error(null);
		if (fieldErrors[k]) setFieldErrors((e) => ({ ...e, [k]: undefined }));
	};

	const chooseService = (s: ServiceType) => {
		setService(s);
		setStep1Error(null);
		// Drop extras that don't apply to the new service
		setExtras((prev) =>
			prev.filter(
				(x) =>
					(s !== "cleaning" && movingExtras.includes(x)) ||
					(s !== "moving" && cleaningExtras.includes(x)),
			),
		);
	};

	const validateStep1 = () => {
		const errors: Partial<Record<keyof FormState, string>> = {};
		if (!form.fromAddress.trim()) errors.fromAddress = "Required";
		if (isMoving && !form.toAddress.trim()) errors.toAddress = "Required";
		if (!form.moveDate) errors.moveDate = "Required";
		if (!form.homeSize) errors.homeSize = "Required";
		if (isMoving && !form.moveType) errors.moveType = "Required";
		if (isCleaning && !form.cleaningType) errors.cleaningType = "Required";
		if (service === "both" && !form.cleaningLocation)
			errors.cleaningLocation = "Please choose one";

		setFieldErrors(errors);
		const missing = Object.keys(errors).length;
		if (missing === 0) {
			setStep1Error(null);
			return true;
		}
		setStep1Error(
			missing === 1
				? "Please fill in the highlighted field."
				: `Please fill in the ${missing} highlighted fields.`,
		);
		// Bring the first missing field into view
		requestAnimationFrame(() =>
			document
				.querySelector("[data-invalid='true']")
				?.scrollIntoView({ behavior: "smooth", block: "center" }),
		);
		return false;
	};

	const validateStep3 = () => {
		const errors: Partial<Record<keyof FormState, string>> = {};
		if (!form.firstName.trim()) errors.firstName = "Required";
		if (!form.lastName.trim()) errors.lastName = "Required";
		if (!form.email.trim()) errors.email = "Required";
		else if (!isValidEmail(form.email)) errors.email = "Invalid email address";
		if (!form.phone.trim()) errors.phone = "Required";
		else if (!isValidPhone(form.phone))
			errors.phone = "Enter a valid phone number";
		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateStep3()) return;
		setSubmitting(true);
		setError(null);

		try {
			const res = await fetch("/api/send-quote", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					website: honeypot,
					serviceType: service,
					customerName: `${form.firstName} ${form.lastName}`,
					customerEmail: form.email,
					customerPhone: form.phone,
					preferredContact: form.contact,
					fromCity: form.fromAddress,
					toCity: isMoving ? form.toAddress : "",
					moveDate: form.moveDate,
					homeSize: form.homeSize,
					moveType: isMoving ? form.moveType : "",
					cleaningType: isCleaning ? form.cleaningType : "",
					cleaningLocation:
						service === "both"
							? form.cleaningLocation
							: service === "cleaning"
								? "Service address"
								: "",
					extraServices:
						extras.length > 0 ? extras.join(", ") : "None selected",
					estWeight: isMoving ? form.weight || "Not specified" : "",
					dateFlexibility: form.flexible || "Not specified",
					specialNotes: form.notes.trim() || "None",
					submittedAt: new Date().toLocaleString("en-CA", {
						timeZone: "America/Toronto",
						dateStyle: "full",
						timeStyle: "short",
					}),
				}),
			});
			const json = await res.json();
			if (!res.ok || !json.success)
				throw new Error(json.error || "Unknown error");
			setDone(true);
			scrollToForm();
		} catch (err) {
			console.error("Submit error:", err);
			setError(
				"Something went wrong. Please call us at +1 647-697-7140 or email hello@movezy.ca directly.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	const stepLabels = ["Your Service", "Details", "Contact"];

	const benefits = [
		"🛡️ Insured, background-checked movers & cleaners",
		"⚡ Your quote within 30 minutes",
		"💲 Binding, transparent pricing — no surprises",
		"🔒 Small Stripe deposit — balance due after the job",
		"🏡 Book moving and cleaning together",
		"📞 Live support 7 days a week",
	];

	return (
		<section className="relative mesh-bg min-h-screen overflow-hidden">
			<div className="absolute inset-0 grid-pattern opacity-60" />
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					{/* LEFT */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6">
							<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
								🚛 ✨ Free Quote
							</span>
						</div>
						<h1
							className="font-display font-black text-white leading-tight mb-5"
							style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
						>
							Get Your
							<br />
							<span className="text-gradient italic">Free Quote</span>
							<br />
							in 3 Minutes.
						</h1>
						<p className="font-body text-white/60 text-base font-light leading-relaxed mb-8 max-w-md">
							Moving, cleaning, or both? Tell us what you need and our team of trained, insured movers and cleaners will send you an upfront quote — real prices, verified reviews, and zero hidden fees.
						</p>
						<div className="flex flex-col gap-3 mb-10">
							{benefits.map((b) => (
								<div
									key={b}
									className="flex items-center gap-3 font-body text-sm text-white/70"
								>
									{b}
								</div>
							))}
						</div>
						<div className="grid grid-cols-3 gap-4">
							{[
								["300+", "Moves Done"],
								["30+", "Vetted Movers"],
								["4.9★", "Google Rating"],
							].map(([n, l]) => (
								<div
									key={l}
									className="bg-white/6 border border-white/8 rounded-2xl p-4 text-center"
								>
									<p className="font-display font-black text-amber-brand text-2xl leading-none mb-1">
										{n}
									</p>
									<p className="font-body text-white/45 text-xs">{l}</p>
								</div>
							))}
						</div>
					</motion.div>

					{/* RIGHT — form card */}
					<motion.div
						initial={{ opacity: 0, x: 30, scale: 0.97 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						ref={formRef}
						className="bg-white rounded-4xl shadow-card-xl scroll-mt-32"
					>
						{/* Card header */}
						<div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-7 rounded-t-4xl">
							<h2 className="font-display font-black text-white text-xl mb-1">
								📋 Tell Us What You Need
							</h2>
							<p className="font-body text-white/55 text-sm">
								No commitment · Free · Under 3 minutes
							</p>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
								{[
									"Response in 30 min",
									"100% Canadian",
									"Zero hidden fees",
									"Stripe secured",
								].map((f) => (
									<div
										key={f}
										className="flex items-center gap-1 font-body text-[0.65rem] font-semibold text-white/65"
									>
										<Check
											size={10}
											className="text-amber-brand flex-shrink-0"
										/>{" "}
										{f}
									</div>
								))}
							</div>
						</div>

						{/* Step progress */}
						{!done && (
							<div className="flex items-center px-5 sm:px-8 py-5 border-b border-slate-100">
								{stepLabels.map((label, i) => {
									const n = i + 1;
									const isActive = step === n;
									const isDone = step > n;
									return (
										<div key={label} className="flex items-center">
											<div className="flex items-center gap-2">
												<div
													className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
														isDone
															? "bg-green-500 text-white"
															: isActive
																? "bg-navy-800 text-white"
																: "bg-slate-100 text-slate-400"
													}`}
												>
													{isDone ? <Check size={12} /> : n}
												</div>
												<span
													className={`font-body font-semibold text-xs uppercase tracking-wide whitespace-nowrap ${isActive ? "inline" : "hidden sm:inline"} ${
														isActive
															? "text-navy-800"
															: isDone
																? "text-green-600"
																: "text-slate-400"
													}`}
												>
													{label}
												</span>
											</div>
											{i < 2 && (
												<div
													className={`mx-2 sm:mx-3 h-0.5 w-5 sm:w-8 rounded-full transition-all duration-500 ${step > n ? "bg-green-500" : "bg-slate-200"}`}
												/>
											)}
										</div>
									);
								})}
							</div>
						)}

						{/* Form body */}
						<div className="px-8 py-8">
							<>
								{/* SUCCESS */}
								{done ? (
									<motion.div
										key="success"
										className="text-center py-8 animate-fade-up"
									>
										<div className="w-20 h-20 bg-green-50 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-5 text-3xl animate-fade-up">
											✓
										</div>
										<h3 className="font-display font-black text-navy-800 text-2xl mb-3">
											You&apos;re All Set! 🎉
										</h3>
										<p className="font-body text-slate-500 text-sm leading-relaxed mb-2 max-w-sm mx-auto">
											Your request has landed in our inbox at{" "}
											<strong className="text-navy-800">
												hello@movezy.ca
											</strong>
											.
										</p>
										<p className="font-body text-slate-400 text-sm mb-6 max-w-sm mx-auto">
											We&apos;ll review your details and get back to you with a quote within{" "}
											<strong className="text-navy-800">30 minutes</strong>.
										</p>
										<div className="grid grid-cols-2 gap-2 max-w-xs mx-auto mb-7">
											{[
												"Quote within 30 min",
												"No commitment needed",
												"Insured, vetted crews",
												"Full price transparency",
											].map((f) => (
												<div
													key={f}
													className="flex items-start gap-2 font-body text-xs text-navy-700"
												>
													<Check
														size={11}
														className="text-green-500 flex-shrink-0 mt-0.5"
													/>{" "}
													{f}
												</div>
											))}
										</div>
										<p className="font-body text-sm text-slate-400 mb-5">
											Questions? Call{" "}
											<a
												href="tel:+16476977140"
												className="font-bold text-navy-800 hover:text-amber-dark transition-colors"
											>
												+1 647-697-7140
											</a>
										</p>
										<Link href="/">
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												className="bg-amber-brand text-navy-800 font-body font-bold px-7 py-3 rounded-xl inline-flex items-center gap-2"
											>
												Back to Homepage <ArrowRight size={15} />
											</motion.button>
										</Link>
									</motion.div>
								) : step === 1 ? (
									/* STEP 1 */
									<motion.div
										key="s1"
										className="animate-fade-up"
									>
										<h3 className="font-display font-bold text-navy-800 text-lg mb-4">
											🧭 What do you need?
										</h3>

										{/* Service picker — highlight slides between options */}
										<div
											role="radiogroup"
											aria-label="Service type"
											className="grid grid-cols-3 gap-2 mb-6"
										>
											{serviceOptions.map((o) => {
												const active = service === o.id;
												return (
													<motion.button
														key={o.id}
														type="button"
														role="radio"
														aria-checked={active}
														onClick={() => chooseService(o.id)}
														whileHover={{ y: -2 }}
														whileTap={{ scale: 0.97 }}
														className={`relative text-left rounded-2xl border-2 px-3 py-3 transition-colors ${
															active
																? "border-transparent"
																: "border-slate-200 hover:border-slate-300"
														}`}
													>
														{active && (
															<motion.span
																layoutId="quote-service"
																className={`absolute inset-0 rounded-2xl border-2 ${
																	o.id === "cleaning"
																		? "border-mint-brand bg-mint-light"
																		: o.id === "both"
																			? "border-amber-brand bg-gradient-to-br from-amber-light to-mint-light"
																			: "border-amber-brand bg-amber-light"
																}`}
																transition={{
																	type: "spring",
																	stiffness: 400,
																	damping: 32,
																}}
															/>
														)}
														<span className="relative block text-xl mb-1">
															{o.emoji}
														</span>
														<span className="relative block font-body font-bold text-sm text-navy-800 leading-tight">
															{o.label}
														</span>
														<span className="relative block font-body text-[0.68rem] text-slate-500">
															{o.sub}
														</span>
													</motion.button>
												);
											})}
										</div>

										{/* Addresses */}
										<div className="mb-4" data-invalid={!!fieldErrors.fromAddress}>
											<label className={labelClass}>
												{isMoving ? "Pick-Up Address *" : "Address to Clean *"}
											</label>
											<AddressAutocomplete
												value={form.fromAddress}
												onChange={(v) => update("fromAddress", v)}
												placeholder="e.g. 2360 Leslie St, Newmarket, ON"
												theme="light"
												invalid={!!fieldErrors.fromAddress}
											/>
											{fieldError("fromAddress") ?? (
												<p className="text-slate-400 text-[11px] mt-1">
													Enter your full street address including unit number
												</p>
											)}
										</div>

										<AnimatePresence initial={false}>
											{isMoving && (
												<motion.div
													key="dest"
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.3 }}
												>
													<div className="mb-4" data-invalid={!!fieldErrors.toAddress}>
														<label className={labelClass}>
															Destination Address *
														</label>
														<AddressAutocomplete
															value={form.toAddress}
															onChange={(v) => update("toAddress", v)}
															placeholder="e.g. 100 Queen St W, Toronto, ON"
															theme="light"
															invalid={!!fieldErrors.toAddress}
														/>
														{fieldError("toAddress") ?? (
															<p className="text-slate-400 text-[11px] mt-1">
																Enter the full address you&apos;re moving to
															</p>
														)}
													</div>
												</motion.div>
											)}
										</AnimatePresence>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div data-invalid={!!fieldErrors.moveDate}>
												<label className={labelClass}>
													{isMoving ? "Move Date *" : "Cleaning Date *"}
												</label>
												<input
													type="date"
													value={form.moveDate}
													onChange={(e) => update("moveDate", e.target.value)}
													min={new Date().toISOString().split("T")[0]}
													className={`form-input ${invalidClass("moveDate")}`}
												/>
												{fieldError("moveDate")}
											</div>
											<div data-invalid={!!fieldErrors.homeSize}>
												<label className={labelClass}>Home Size *</label>
												<select
													value={form.homeSize}
													onChange={(e) => update("homeSize", e.target.value)}
													className={`form-input ${invalidClass("homeSize")}`}
												>
													<option value="" disabled>
														Select size...
													</option>
													{homeSizes.map((s) => (
														<option key={s}>{s}</option>
													))}
												</select>
												{fieldError("homeSize")}
											</div>
										</div>

										<div
											className={`grid grid-cols-1 gap-4 ${
												service === "both" ? "sm:grid-cols-2" : ""
											}`}
										>
											{isMoving && (
												<div data-invalid={!!fieldErrors.moveType}>
													<label className={labelClass}>Type of Move *</label>
													<select
														value={form.moveType}
														onChange={(e) => update("moveType", e.target.value)}
														className={`form-input ${invalidClass("moveType")}`}
													>
														<option value="" disabled>
															Select type...
														</option>
														{[
															"Local Move (same city)",
															"Long-Distance / Interprovincial",
															"Office / Commercial",
															"Storage Only",
														].map((t) => (
															<option key={t}>{t}</option>
														))}
													</select>
													{fieldError("moveType")}
												</div>
											)}
											{isCleaning && (
												<div data-invalid={!!fieldErrors.cleaningType}>
													<label className={labelClass}>Type of Cleaning *</label>
													<select
														value={form.cleaningType}
														onChange={(e) =>
															update("cleaningType", e.target.value)
														}
														className={`form-input ${invalidClass("cleaningType")}`}
													>
														<option value="" disabled>
															Select cleaning...
														</option>
														{cleaningTypes.map((t) => (
															<option key={t}>{t}</option>
														))}
													</select>
													{fieldError("cleaningType")}
												</div>
											)}
										</div>

										{service === "both" && (
											<div className="mt-4" data-invalid={!!fieldErrors.cleaningLocation}>
												<label className={labelClass}>
													Which home needs cleaning? *
												</label>
												<div className="grid grid-cols-3 gap-2">
													{["Old place", "New place", "Both"].map((o) => (
														<button
															key={o}
															type="button"
															onClick={() => update("cleaningLocation", o)}
															className={`py-2.5 rounded-xl border-2 font-body text-sm font-semibold transition-colors ${
																form.cleaningLocation === o
																	? "border-mint-brand bg-mint-light text-navy-800"
																: fieldErrors.cleaningLocation
																	? "border-red-400 text-slate-500"
																	: "border-slate-200 text-slate-500 hover:border-slate-300"
														}`}
													>
														{o}
													</button>
												))}
											</div>
											{fieldError("cleaningLocation")}
										</div>
										)}

										<AnimatePresence>
											{step1Error && (
												<motion.p
													initial={{ opacity: 0, y: -6 }}
													animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
													exit={{ opacity: 0 }}
													transition={{ duration: 0.4 }}
													className="flex items-center gap-2 mt-5 text-sm text-red-600 font-body"
												>
													<AlertCircle size={14} /> {step1Error}
												</motion.p>
											)}
										</AnimatePresence>

										<div className="flex justify-end mt-8">
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												onClick={() => {
													if (validateStep1()) goToStep(2);
												}}
												className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors"
											>
												Next: Details <ArrowRight size={15} />
											</motion.button>
										</div>
									</motion.div>
								) : step === 2 ? (
									/* STEP 2 */
									<motion.div
										key="s2"
										className="animate-fade-up"
									>
										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
											{service === "cleaning"
												? "🧽 Cleaning Details"
												: service === "both"
													? "📦 Move + Clean Details"
													: "📦 Move Details"}
										</h3>
										{[
											...(isMoving
												? [{ title: "Moving Add-Ons", items: movingExtras, mint: false }]
												: []),
											...(isCleaning
												? [{ title: "Cleaning Add-Ons", items: cleaningExtras, mint: true }]
												: []),
										].map((group) => (
											<div key={group.title} className="mb-5">
												<p className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-3">
													{group.title}
												</p>
												<div className="grid grid-cols-2 gap-2">
													{group.items.map((s) => {
														const on = extras.includes(s);
														return (
															<motion.button
																key={s}
																type="button"
																onClick={() => toggleExtra(s)}
																whileTap={{ scale: 0.96 }}
																className={`relative text-left px-4 py-3 rounded-xl border-2 font-body text-sm transition-colors duration-200 ${
																	on
																		? group.mint
																			? "border-mint-brand bg-mint-light text-navy-800"
																			: "border-navy-600 bg-sky-light text-navy-800"
																		: "border-slate-200 hover:border-sky-brand/40 text-slate-600"
																}`}
															>
																{s}
																<AnimatePresence>
																	{on && (
																		<motion.span
																			initial={{ scale: 0 }}
																			animate={{ scale: 1 }}
																			exit={{ scale: 0 }}
																			className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white ${
																				group.mint ? "bg-mint-brand" : "bg-navy-600"
																			}`}
																		>
																			<Check size={10} strokeWidth={3} />
																		</motion.span>
																	)}
																</AnimatePresence>
															</motion.button>
														);
													})}
												</div>
											</div>
										))}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											{isMoving && (
											<div>
												<label className={labelClass}>Est. Weight</label>
												<select
													value={form.weight}
													onChange={(e) => update("weight", e.target.value)}
													className="form-input"
												>
													<option value="" disabled>
														Optional estimate
													</option>
													{[
														"Under 1,000 lbs",
														"1,000–3,000 lbs",
														"3,000–6,000 lbs",
														"6,000–10,000 lbs",
														"Over 10,000 lbs",
													].map((w) => (
														<option key={w}>{w}</option>
													))}
												</select>
											</div>
											)}
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Date Flexibility
												</label>
												<select
													value={form.flexible}
													onChange={(e) => update("flexible", e.target.value)}
													className="form-input"
												>
													<option value="" disabled>
														Select flexibility
													</option>
													{[
														"Exact date required",
														"Flexible ± 1 day",
														"Flexible ± 3 days",
														"Flexible ± 1 week",
													].map((f) => (
														<option key={f}>{f}</option>
													))}
												</select>
											</div>
										</div>
										<div>
											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
												Special Instructions
											</label>
											<textarea
												rows={3}
												value={form.notes}
												onChange={(e) => update("notes", e.target.value)}
												placeholder={
													service === "cleaning"
														? "e.g. pets at home, areas to focus on, parking or access notes..."
														: "e.g. 3rd floor no elevator, narrow driveway, fragile piano..."
												}
												className="form-input resize-none"
											/>
										</div>
										<div className="flex justify-between mt-8">
											<button
												onClick={() => goToStep(1)}
												className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors"
											>
												<ArrowLeft size={15} /> Back
											</button>
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												onClick={() => goToStep(3)}
												className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors"
											>
												Next: Your Info <ArrowRight size={15} />
											</motion.button>
										</div>
									</motion.div>
								) : (
									/* STEP 3 */
									<motion.div
										key="s3"
										className="animate-fade-up"
									>
										<h3 className="font-display font-bold text-navy-800 text-lg mb-1">
											👤 Your Contact Info
										</h3>
										<p className="font-body text-sm text-slate-500 mb-5">
											Last step: where should we send your quote?
										</p>
										{/* Honeypot: hidden from people, bots tend to fill it in */}
										<input
											type="text"
											name="website"
											value={honeypot}
											onChange={(e) => setHoneypot(e.target.value)}
											tabIndex={-1}
											autoComplete="off"
											aria-hidden="true"
											className="absolute -left-[9999px] w-px h-px opacity-0"
										/>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													First Name *
												</label>
												<input
													type="text"
													value={form.firstName}
													onChange={(e) => update("firstName", e.target.value)}
													placeholder="First name"
													className={`form-input ${fieldErrors.firstName ? "border-red-400" : ""}`}
												/>
												{fieldErrors.firstName && (
													<p className="text-red-500 text-xs mt-1">
														{fieldErrors.firstName}
													</p>
												)}
											</div>
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Last Name *
												</label>
												<input
													type="text"
													value={form.lastName}
													onChange={(e) => update("lastName", e.target.value)}
													placeholder="Last name"
													className={`form-input ${fieldErrors.lastName ? "border-red-400" : ""}`}
												/>
												{fieldErrors.lastName && (
													<p className="text-red-500 text-xs mt-1">
														{fieldErrors.lastName}
													</p>
												)}
											</div>
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Email *
												</label>
												<input
													type="email"
													value={form.email}
													onChange={(e) => update("email", e.target.value)}
													placeholder="your@email.com"
													className={`form-input ${fieldErrors.email ? "border-red-400" : ""}`}
												/>
												{fieldErrors.email && (
													<p className="text-red-500 text-xs mt-1">
														{fieldErrors.email}
													</p>
												)}
											</div>
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Phone *
												</label>
												<input
													type="tel"
													value={form.phone}
													onChange={(e) => update("phone", e.target.value)}
													placeholder="(555) 000-0000"
													className={`form-input ${fieldErrors.phone ? "border-red-400" : ""}`}
												/>
												{fieldErrors.phone && (
													<p className="text-red-500 text-xs mt-1">
														{fieldErrors.phone}
													</p>
												)}
											</div>
										</div>
										{/* <div className="mb-4">
                      <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Preferred Contact</label>
                      <select value={form.contact} onChange={(e) => update('contact', e.target.value)} className="form-input">
                        <option>Email & Phone</option>
                        <option>Email Only</option>
                        <option>Phone Only</option>
                      </select>
                    </div> */}

										{error && (
											<motion.div
												initial={{ opacity: 0, y: -8 }}
												animate={{ opacity: 1, y: 0 }}
												className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-4"
											>
												<AlertCircle
													size={16}
													className="text-red-500 flex-shrink-0 mt-0.5"
												/>
												<p className="font-body text-sm text-red-700 leading-relaxed">
													{error}
												</p>
											</motion.div>
										)}

										<p className="font-body text-xs text-slate-400 mt-3 leading-relaxed">
											By submitting, you agree to our{" "}
											<Link href="#" className="text-sky-brand hover:underline">
												Privacy Policy
											</Link>{" "}
											and{" "}
											<Link href="#" className="text-sky-brand hover:underline">
												Terms of Service
											</Link>
											. Your info is PIPEDA-protected and never sold.
										</p>
										<div className="flex justify-between mt-8">
											<button
												onClick={() => goToStep(2)}
												disabled={submitting}
												className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors disabled:opacity-50"
											>
												<ArrowLeft size={15} /> Back
											</button>
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												onClick={handleSubmit}
												disabled={submitting}
												className="bg-amber-brand text-navy-800 font-body font-bold px-8 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-amber-400 transition-colors disabled:opacity-70 shadow-glow-amber"
											>
												{submitting ? (
													<>
														<Loader2 size={16} className="animate-spin" />{" "}
														Sending Request...
													</>
												) : (
													<>
														{service === "cleaning" ? "✨" : "🚛"} Get My Free Quote{" "}
														<ArrowRight size={15} />
													</>
												)}
											</motion.button>
										</div>
									</motion.div>
								)}
							</>
						</div>

						{/* Trust strip */}
						{!done && (
							<div className="border-t border-slate-100 bg-slate-50 px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-b-4xl">
								{[
									["🛡️", "WSIB Verified"],
									["🔒", "PIPEDA Safe"],
									["💳", "Stripe Secured"],
									["🇨🇦", "Canadian Co."],
								].map(([ico, lbl]) => (
									<div
										key={lbl}
										className="flex items-center gap-2 font-body text-xs font-semibold text-slate-500"
									>
										<span>{ico}</span> {lbl}
									</div>
								))}
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
