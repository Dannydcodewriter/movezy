// // 'use client'

// // import { motion, AnimatePresence } from 'framer-motion'
// // import { useState } from 'react'
// // import Link from 'next/link'
// // import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'

// // const cities = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Halifax', 'Victoria', 'Other']
// // const extraServices = [
// //   '📦 Full Packing Service',
// //   '🛏 Furniture Disassembly',
// //   '🎹 Specialty Items',
// //   '🏭 Storage Required',
// //   '🖼 Fine Art / Antiques',
// //   '🚗 Vehicle Transport',
// // ]

// // type Step = 1 | 2 | 3

// // export default function QuotePageContent() {
// //   const [step, setStep] = useState<Step>(1)
// //   const [submitting, setSubmitting] = useState(false)
// //   const [done, setDone] = useState(false)
// //   const [extras, setExtras] = useState<string[]>([])
// //   const [form, setForm] = useState({
// //     fromCity: '', toCity: '', moveDate: '', homeSize: '', moveType: '',
// //     weight: '', flexible: '', notes: '',
// //     firstName: '', lastName: '', email: '', phone: '', contact: '',
// //   })

// //   const toggleExtra = (s: string) => {
// //     setExtras((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
// //   }

// //   const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

// //   const submit = async () => {
// //     setSubmitting(true)
// //     await new Promise((r) => setTimeout(r, 1800))
// //     setDone(true)
// //   }

// //   const stepLabels = ['Your Move', 'Details', 'Contact']

// //   const benefits = [
// //     '🛡️ All movers WSIB insured & background checked',
// //     '⚡ 3–5 quotes within 2 hours',
// //     '💲 Binding, transparent pricing — no surprises',
// //     '🔒 Stripe escrow — pay only after successful move',
// //     '🇨🇦 100% Canadian movers, coast to coast',
// //     '📞 Live support 7 days a week',
// //   ]

// //   return (
// //     <>
// //       <section className="relative mesh-bg min-h-screen overflow-hidden">
// //         <div className="absolute inset-0 grid-pattern opacity-60" />
// //         <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
// //             {/* Left — value prop */}
// //             <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
// //               <div className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6">
// //                 <span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">🚛 Free Moving Quote</span>
// //               </div>
// //               <h1 className="font-display font-black text-white leading-tight mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}>
// //                 Get Your
// //                 <br /><span className="text-gradient italic">Free Quotes</span>
// //                 <br />in 3 Minutes.
// //               </h1>
// //               <p className="font-body text-white/60 text-base font-light leading-relaxed mb-8 max-w-md">
// //                 Tell us about your move and we'll match you with 3–5 vetted, insured Canadian movers — with real prices, verified reviews, and zero hidden fees.
// //               </p>
// //               <div className="flex flex-col gap-3">
// //                 {benefits.map((b) => (
// //                   <div key={b} className="flex items-center gap-3 font-body text-sm text-white/70">
// //                     <span>{b}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //               {/* Social proof */}
// //               <div className="mt-10 grid grid-cols-3 gap-4">
// //                 {[['13K+', 'Moves Done'], ['300+', 'Vetted Movers'], ['4.9★', 'Google Rating']].map(([n, l]) => (
// //                   <div key={l} className="bg-white/6 border border-white/8 rounded-2xl p-4 text-center">
// //                     <p className="font-display font-black text-amber-brand text-2xl leading-none mb-1">{n}</p>
// //                     <p className="font-body text-white/45 text-xs">{l}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </motion.div>

// //             {/* Right — form card */}
// //             <motion.div
// //               initial={{ opacity: 0, x: 30, scale: 0.97 }}
// //               animate={{ opacity: 1, x: 0, scale: 1 }}
// //               transition={{ duration: 0.6, delay: 0.1 }}
// //               className="bg-white rounded-4xl overflow-hidden shadow-card-xl"
// //             >
// //               {/* Card header */}
// //               <div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-7">
// //                 <h2 className="font-display font-black text-white text-xl mb-1">📋 Tell Us About Your Move</h2>
// //                 <p className="font-body text-white/55 text-sm">No commitment · Free · Under 3 minutes</p>
// //                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
// //                   {['Response in 2 hrs', '100% Canadian', 'Zero hidden fees', 'Stripe secured'].map((f) => (
// //                     <div key={f} className="flex items-center gap-1 font-body text-[0.65rem] font-semibold text-white/65">
// //                       <Check size={10} className="text-amber-brand flex-shrink-0" /> {f}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Step progress */}
// //               {!done && (
// //                 <div className="flex items-center px-8 py-5 border-b border-slate-100">
// //                   {stepLabels.map((label, i) => {
// //                     const n = i + 1
// //                     const isActive = step === n
// //                     const isDone = step > n
// //                     return (
// //                       <div key={label} className="flex items-center">
// //                         <div className="flex items-center gap-2">
// //                           <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
// //                             isDone ? 'bg-green-500 text-white' : isActive ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-400'
// //                           }`}>
// //                             {isDone ? <Check size={12} /> : n}
// //                           </div>
// //                           <span className={`font-body font-semibold text-xs uppercase tracking-wide ${
// //                             isActive ? 'text-navy-800' : isDone ? 'text-green-600' : 'text-slate-400'
// //                           }`}>
// //                             {label}
// //                           </span>
// //                         </div>
// //                         {i < 2 && (
// //                           <div className={`mx-3 h-0.5 w-8 rounded-full transition-all duration-500 ${step > n ? 'bg-green-500' : 'bg-slate-200'}`} />
// //                         )}
// //                       </div>
// //                     )
// //                   })}
// //                 </div>
// //               )}

// //               {/* Form */}
// //               <div className="px-8 py-8">
// //                 <AnimatePresence mode="wait">
// //                   {done ? (
// //                     <motion.div
// //                       key="success"
// //                       initial={{ opacity: 0, scale: 0.95 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       className="text-center py-8"
// //                     >
// //                       <motion.div
// //                         initial={{ scale: 0, rotate: -10 }}
// //                         animate={{ scale: 1, rotate: 0 }}
// //                         transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
// //                         className="w-20 h-20 bg-green-50 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-5 text-3xl"
// //                       >
// //                         ✓
// //                       </motion.div>
// //                       <h3 className="font-display font-black text-navy-800 text-2xl mb-3">You're All Set! 🎉</h3>
// //                       <p className="font-body text-slate-500 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
// //                         We've received your request. You'll be matched with 3–5 vetted movers within 2 hours — with real prices and verified reviews.
// //                       </p>
// //                       <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto mb-7">
// //                         {['Quotes within 2 hrs', 'No commitment needed', 'Verified movers only', 'Full price transparency'].map((f) => (
// //                           <div key={f} className="flex items-start gap-2 font-body text-xs text-navy-700">
// //                             <Check size={11} className="text-green-500 flex-shrink-0 mt-0.5" /> {f}
// //                           </div>
// //                         ))}
// //                       </div>
// //                       <p className="font-body text-sm text-slate-400 mb-5">Check your email for confirmation. Questions? Call <strong className="text-navy-800">1-888-MOVEZY</strong></p>
// //                       <Link href="/">
// //                         <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
// //                           className="bg-amber-brand text-navy-800 font-body font-bold px-7 py-3 rounded-xl inline-flex items-center gap-2">
// //                           Back to Homepage <ArrowRight size={15} />
// //                         </motion.button>
// //                       </Link>
// //                     </motion.div>
// //                   ) : step === 1 ? (
// //                     <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
// //                       <h3 className="font-display font-bold text-navy-800 text-lg mb-5">🏠 Move Locations</h3>
// //                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Moving From *</label>
// //                           <select value={form.fromCity} onChange={(e) => update('fromCity', e.target.value)} className="form-input">
// //                             <option value="" disabled>Select city...</option>
// //                             {cities.map((c) => <option key={c}>{c}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Moving To *</label>
// //                           <select value={form.toCity} onChange={(e) => update('toCity', e.target.value)} className="form-input">
// //                             <option value="" disabled>Select city...</option>
// //                             {cities.map((c) => <option key={c}>{c}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Move Date *</label>
// //                           <input type="date" value={form.moveDate} onChange={(e) => update('moveDate', e.target.value)} className="form-input" />
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Home Size *</label>
// //                           <select value={form.homeSize} onChange={(e) => update('homeSize', e.target.value)} className="form-input">
// //                             <option value="" disabled>Select size...</option>
// //                             {['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms', 'Office / Commercial'].map((s) => <option key={s}>{s}</option>)}
// //                           </select>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Type of Move *</label>
// //                         <select value={form.moveType} onChange={(e) => update('moveType', e.target.value)} className="form-input">
// //                           <option value="" disabled>Select type...</option>
// //                           {['Local Move (same city)', 'Long-Distance / Interprovincial', 'Office / Commercial', 'Storage Only'].map((t) => <option key={t}>{t}</option>)}
// //                         </select>
// //                       </div>
// //                       <div className="flex justify-end mt-8">
// //                         <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
// //                           onClick={() => setStep(2)}
// //                           className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors">
// //                           Next: Move Details <ArrowRight size={15} />
// //                         </motion.button>
// //                       </div>
// //                     </motion.div>
// //                   ) : step === 2 ? (
// //                     <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
// //                       <h3 className="font-display font-bold text-navy-800 text-lg mb-5">📦 Move Details</h3>
// //                       <p className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-3">Additional Services Needed</p>
// //                       <div className="grid grid-cols-2 gap-2 mb-5">
// //                         {extraServices.map((s) => (
// //                           <button key={s} onClick={() => toggleExtra(s)}
// //                             className={`text-left px-4 py-3 rounded-xl border-2 font-body text-sm transition-all duration-200 ${
// //                               extras.includes(s) ? 'border-navy-600 bg-navy-50 text-navy-800' : 'border-slate-200 hover:border-sky-brand/40 text-slate-600'
// //                             }`}>
// //                             {s}
// //                           </button>
// //                         ))}
// //                       </div>
// //                       <div className="grid grid-cols-2 gap-4 mb-4">
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Est. Weight</label>
// //                           <select value={form.weight} onChange={(e) => update('weight', e.target.value)} className="form-input">
// //                             <option value="" disabled>Optional estimate</option>
// //                             {['Under 1,000 lbs', '1,000–3,000 lbs', '3,000–6,000 lbs', '6,000–10,000 lbs', 'Over 10,000 lbs'].map((w) => <option key={w}>{w}</option>)}
// //                           </select>
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Date Flexibility</label>
// //                           <select value={form.flexible} onChange={(e) => update('flexible', e.target.value)} className="form-input">
// //                             <option value="" disabled>Select flexibility</option>
// //                             {['Exact date required', 'Flexible ± 1 day', 'Flexible ± 3 days', 'Flexible ± 1 week'].map((f) => <option key={f}>{f}</option>)}
// //                           </select>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Special Instructions</label>
// //                         <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="e.g. 3rd floor no elevator, narrow driveway, fragile piano..." className="form-input resize-none" />
// //                       </div>
// //                       <div className="flex justify-between mt-8">
// //                         <button onClick={() => setStep(1)} className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors">
// //                           <ArrowLeft size={15} /> Back
// //                         </button>
// //                         <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
// //                           onClick={() => setStep(3)}
// //                           className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors">
// //                           Next: Your Info <ArrowRight size={15} />
// //                         </motion.button>
// //                       </div>
// //                     </motion.div>
// //                   ) : (
// //                     <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
// //                       <h3 className="font-display font-bold text-navy-800 text-lg mb-5">👤 Your Contact Info</h3>
// //                       <div className="grid grid-cols-2 gap-4 mb-4">
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">First Name *</label>
// //                           <input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First name" className="form-input" />
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Last Name *</label>
// //                           <input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last name" className="form-input" />
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Email *</label>
// //                           <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="your@email.com" className="form-input" />
// //                         </div>
// //                         <div>
// //                           <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Phone *</label>
// //                           <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 000-0000" className="form-input" />
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">Preferred Contact</label>
// //                         <select value={form.contact} onChange={(e) => update('contact', e.target.value)} className="form-input">
// //                           <option>Email & Phone</option>
// //                           <option>Email Only</option>
// //                           <option>Phone Only</option>
// //                         </select>
// //                       </div>
// //                       <p className="font-body text-xs text-slate-400 mt-3 leading-relaxed">
// //                         By submitting, you agree to our{' '}
// //                         <Link href="#" className="text-sky-brand hover:underline">Privacy Policy</Link> and{' '}
// //                         <Link href="#" className="text-sky-brand hover:underline">Terms of Service</Link>.
// //                         Your info is PIPEDA-protected and never sold.
// //                       </p>
// //                       <div className="flex justify-between mt-8">
// //                         <button onClick={() => setStep(2)} className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors">
// //                           <ArrowLeft size={15} /> Back
// //                         </button>
// //                         <motion.button
// //                           whileHover={{ scale: 1.02 }}
// //                           whileTap={{ scale: 0.97 }}
// //                           onClick={submit}
// //                           disabled={submitting}
// //                           className="bg-amber-brand text-navy-800 font-body font-bold px-8 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-amber-400 transition-colors disabled:opacity-80 shadow-glow-amber"
// //                         >
// //                           {submitting ? (
// //                             <><Loader2 size={16} className="animate-spin" /> Submitting...</>
// //                           ) : (
// //                             <>🚛 Get My Free Quotes <ArrowRight size={15} /></>
// //                           )}
// //                         </motion.button>
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>

// //               {/* Trust strip */}
// //               {!done && (
// //                 <div className="border-t border-slate-100 bg-slate-50 px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
// //                   {[['🛡️', 'WSIB Verified'], ['🔒', 'PIPEDA Safe'], ['💳', 'Stripe Secured'], ['🇨🇦', 'Canadian Co.']].map(([ico, lbl]) => (
// //                     <div key={lbl} className="flex items-center gap-2 font-body text-xs font-semibold text-slate-500">
// //                       <span>{ico}</span> {lbl}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   )
// // }

// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import Link from "next/link";
// import {
// 	Check,
// 	ArrowRight,
// 	ArrowLeft,
// 	Loader2,
// 	AlertCircle,
// } from "lucide-react";

// const cities = [
// 	"Toronto",
// 	"Vancouver",
// 	"Montreal",
// 	"Calgary",
// 	"Ottawa",
// 	"Edmonton",
// 	"Winnipeg",
// 	"Halifax",
// 	"Victoria",
// 	"Other",
// ];

// const extraServices = [
// 	"📦 Full Packing Service",
// 	"🛏 Furniture Disassembly",
// 	"🎹 Specialty Items",
// 	"🏭 Storage Required",
// 	"🖼 Fine Art / Antiques",
// 	"🚗 Vehicle Transport",
// ];

// type Step = 1 | 2 | 3;

// interface FormState {
// 	fromCity: string;
// 	toCity: string;
// 	moveDate: string;
// 	homeSize: string;
// 	moveType: string;
// 	weight: string;
// 	flexible: string;
// 	notes: string;
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	phone: string;
// 	contact: string;
// }

// const emptyForm: FormState = {
// 	fromCity: "",
// 	toCity: "",
// 	moveDate: "",
// 	homeSize: "",
// 	moveType: "",
// 	weight: "",
// 	flexible: "",
// 	notes: "",
// 	firstName: "",
// 	lastName: "",
// 	email: "",
// 	phone: "",
// 	contact: "Email & Phone",
// };

// const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

// export default function QuotePageContent() {
// 	const [step, setStep] = useState<Step>(1);
// 	const [submitting, setSubmitting] = useState(false);
// 	const [done, setDone] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [extras, setExtras] = useState<string[]>([]);
// 	const [form, setForm] = useState<FormState>(emptyForm);
// 	const [fieldErrors, setFieldErrors] = useState<
// 		Partial<Record<keyof FormState, string>>
// 	>({});

// 	const toggleExtra = (s: string) =>
// 		setExtras((prev) =>
// 			prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
// 		);

// 	const update = (k: keyof FormState, v: string) => {
// 		setForm((f) => ({ ...f, [k]: v }));
// 		if (fieldErrors[k]) setFieldErrors((e) => ({ ...e, [k]: undefined }));
// 	};

// 	const validateStep1 = () => {
// 		if (!form.fromCity) {
// 			alert("Please select where you are moving from.");
// 			return false;
// 		}
// 		if (!form.toCity) {
// 			alert("Please select where you are moving to.");
// 			return false;
// 		}
// 		if (!form.moveDate) {
// 			alert("Please select your move date.");
// 			return false;
// 		}
// 		if (!form.homeSize) {
// 			alert("Please select your home size.");
// 			return false;
// 		}
// 		if (!form.moveType) {
// 			alert("Please select the type of move.");
// 			return false;
// 		}
// 		return true;
// 	};

// 	const validateStep3 = () => {
// 		const errors: Partial<Record<keyof FormState, string>> = {};
// 		if (!form.firstName.trim()) errors.firstName = "Required";
// 		if (!form.lastName.trim()) errors.lastName = "Required";
// 		if (!form.email.trim()) errors.email = "Required";
// 		else if (!isValidEmail(form.email)) errors.email = "Invalid email address";
// 		if (!form.phone.trim()) errors.phone = "Required";
// 		else if (!isValidPhone(form.phone))
// 			errors.phone = "Enter a valid phone number";
// 		setFieldErrors(errors);
// 		return Object.keys(errors).length === 0;
// 	};

// 	// Calls our server-side API route which uses Resend to send the email
// 	const handleSubmit = async () => {
// 		if (!validateStep3()) return;
// 		setSubmitting(true);
// 		setError(null);

// 		try {
// 			const res = await fetch("/api/send-quote", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({
// 					customerName: `${form.firstName} ${form.lastName}`,
// 					customerEmail: form.email,
// 					customerPhone: form.phone,
// 					preferredContact: form.contact,
// 					fromCity: form.fromCity,
// 					toCity: form.toCity,
// 					moveDate: form.moveDate,
// 					homeSize: form.homeSize,
// 					moveType: form.moveType,
// 					extraServices:
// 						extras.length > 0 ? extras.join(", ") : "None selected",
// 					estWeight: form.weight || "Not specified",
// 					dateFlexibility: form.flexible || "Not specified",
// 					specialNotes: form.notes.trim() || "None",
// 					submittedAt: new Date().toLocaleString("en-CA", {
// 						timeZone: "America/Toronto",
// 						dateStyle: "full",
// 						timeStyle: "short",
// 					}),
// 				}),
// 			});

// 			const json = await res.json();
// 			if (!res.ok || !json.success)
// 				throw new Error(json.error || "Unknown error");
// 			setDone(true);
// 		} catch (err: any) {
// 			console.error("Submit error:", err);
// 			setError(
// 				"Something went wrong. Please call us at 1-888-MOVEZY or email movezyhelpdesk@gmail.com directly.",
// 			);
// 		} finally {
// 			setSubmitting(false);
// 		}
// 	};

// 	const stepLabels = ["Your Move", "Details", "Contact"];

// 	const benefits = [
// 		"🛡️ All movers WSIB insured & background checked",
// 		"⚡ 3–5 quotes within 2 hours",
// 		"💲 Binding, transparent pricing — no surprises",
// 		"🔒 Stripe escrow — pay only after successful move",
// 		"🇨🇦 100% Canadian movers, coast to coast",
// 		"📞 Live support 7 days a week",
// 	];

// 	return (
// 		<section className="relative mesh-bg min-h-screen overflow-hidden">
// 			<div className="absolute inset-0 grid-pattern opacity-60" />
// 			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24">
// 				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
// 					{/* ── LEFT ── */}
// 					<motion.div
// 						initial={{ opacity: 0, x: -30 }}
// 						animate={{ opacity: 1, x: 0 }}
// 						transition={{ duration: 0.6 }}
// 					>
// 						<div className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6">
// 							<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
// 								🚛 Free Moving Quote
// 							</span>
// 						</div>
// 						<h1
// 							className="font-display font-black text-white leading-tight mb-5"
// 							style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
// 						>
// 							Get Your
// 							<br />
// 							<span className="text-gradient italic">Free Quotes</span>
// 							<br />
// 							in 3 Minutes.
// 						</h1>
// 						<p className="font-body text-white/60 text-base font-light leading-relaxed mb-8 max-w-md">
// 							Tell us about your move and we'll match you with 3–5 vetted,
// 							insured Canadian movers — with real prices, verified reviews, and
// 							zero hidden fees.
// 						</p>
// 						<div className="flex flex-col gap-3 mb-10">
// 							{benefits.map((b) => (
// 								<div
// 									key={b}
// 									className="flex items-center gap-3 font-body text-sm text-white/70"
// 								>
// 									{b}
// 								</div>
// 							))}
// 						</div>
// 						<div className="grid grid-cols-3 gap-4">
// 							{[
// 								["13K+", "Moves Done"],
// 								["300+", "Vetted Movers"],
// 								["4.9★", "Google Rating"],
// 							].map(([n, l]) => (
// 								<div
// 									key={l}
// 									className="bg-white/6 border border-white/8 rounded-2xl p-4 text-center"
// 								>
// 									<p className="font-display font-black text-amber-brand text-2xl leading-none mb-1">
// 										{n}
// 									</p>
// 									<p className="font-body text-white/45 text-xs">{l}</p>
// 								</div>
// 							))}
// 						</div>
// 					</motion.div>

// 					{/* ── RIGHT — form card ── */}
// 					<motion.div
// 						initial={{ opacity: 0, x: 30, scale: 0.97 }}
// 						animate={{ opacity: 1, x: 0, scale: 1 }}
// 						transition={{ duration: 0.6, delay: 0.1 }}
// 						className="bg-white rounded-4xl overflow-hidden shadow-card-xl"
// 					>
// 						{/* Card header */}
// 						<div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-7">
// 							<h2 className="font-display font-black text-white text-xl mb-1">
// 								📋 Tell Us About Your Move
// 							</h2>
// 							<p className="font-body text-white/55 text-sm">
// 								No commitment · Free · Under 3 minutes
// 							</p>
// 							<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
// 								{[
// 									"Response in 2 hrs",
// 									"100% Canadian",
// 									"Zero hidden fees",
// 									"Stripe secured",
// 								].map((f) => (
// 									<div
// 										key={f}
// 										className="flex items-center gap-1 font-body text-[0.65rem] font-semibold text-white/65"
// 									>
// 										<Check
// 											size={10}
// 											className="text-amber-brand flex-shrink-0"
// 										/>{" "}
// 										{f}
// 									</div>
// 								))}
// 							</div>
// 						</div>

// 						{/* Step progress */}
// 						{!done && (
// 							<div className="flex items-center px-8 py-5 border-b border-slate-100">
// 								{stepLabels.map((label, i) => {
// 									const n = i + 1;
// 									const isActive = step === n;
// 									const isDone = step > n;
// 									return (
// 										<div key={label} className="flex items-center">
// 											<div className="flex items-center gap-2">
// 												<div
// 													className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
// 														isDone
// 															? "bg-green-500 text-white"
// 															: isActive
// 																? "bg-navy-800 text-white"
// 																: "bg-slate-100 text-slate-400"
// 													}`}
// 												>
// 													{isDone ? <Check size={12} /> : n}
// 												</div>
// 												<span
// 													className={`font-body font-semibold text-xs uppercase tracking-wide ${
// 														isActive
// 															? "text-navy-800"
// 															: isDone
// 																? "text-green-600"
// 																: "text-slate-400"
// 													}`}
// 												>
// 													{label}
// 												</span>
// 											</div>
// 											{i < 2 && (
// 												<div
// 													className={`mx-3 h-0.5 w-8 rounded-full transition-all duration-500 ${step > n ? "bg-green-500" : "bg-slate-200"}`}
// 												/>
// 											)}
// 										</div>
// 									);
// 								})}
// 							</div>
// 						)}

// 						{/* Form body */}
// 						<div className="px-8 py-8">
// 							<AnimatePresence mode="wait">
// 								{/* SUCCESS */}
// 								{done ? (
// 									<motion.div
// 										key="success"
// 										initial={{ opacity: 0, scale: 0.95 }}
// 										animate={{ opacity: 1, scale: 1 }}
// 										className="text-center py-8"
// 									>
// 										<motion.div
// 											initial={{ scale: 0, rotate: -10 }}
// 											animate={{ scale: 1, rotate: 0 }}
// 											transition={{
// 												type: "spring",
// 												stiffness: 200,
// 												delay: 0.1,
// 											}}
// 											className="w-20 h-20 bg-green-50 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-5 text-3xl"
// 										>
// 											✓
// 										</motion.div>
// 										<h3 className="font-display font-black text-navy-800 text-2xl mb-3">
// 											You're All Set! 🎉
// 										</h3>
// 										<p className="font-body text-slate-500 text-sm leading-relaxed mb-2 max-w-sm mx-auto">
// 											Your request has landed in our inbox at{" "}
// 											<strong className="text-navy-800">
// 												movezyhelpdesk@gmail.com
// 											</strong>
// 											.
// 										</p>
// 										<p className="font-body text-slate-400 text-sm mb-6 max-w-sm mx-auto">
// 											We'll review your details and get back to you with quotes
// 											within <strong className="text-navy-800">2 hours</strong>.
// 										</p>
// 										<div className="grid grid-cols-2 gap-2 max-w-xs mx-auto mb-7">
// 											{[
// 												"Quotes within 2 hrs",
// 												"No commitment needed",
// 												"Verified movers only",
// 												"Full price transparency",
// 											].map((f) => (
// 												<div
// 													key={f}
// 													className="flex items-start gap-2 font-body text-xs text-navy-700"
// 												>
// 													<Check
// 														size={11}
// 														className="text-green-500 flex-shrink-0 mt-0.5"
// 													/>{" "}
// 													{f}
// 												</div>
// 											))}
// 										</div>
// 										<p className="font-body text-sm text-slate-400 mb-5">
// 											Questions? Call{" "}
// 											<a
// 												href="tel:18886683999"
// 												className="font-bold text-navy-800 hover:text-amber-dark transition-colors"
// 											>
// 												1-888-MOVEZY
// 											</a>
// 										</p>
// 										<Link href="/">
// 											<motion.button
// 												whileHover={{ scale: 1.02 }}
// 												whileTap={{ scale: 0.97 }}
// 												className="bg-amber-brand text-navy-800 font-body font-bold px-7 py-3 rounded-xl inline-flex items-center gap-2"
// 											>
// 												Back to Homepage <ArrowRight size={15} />
// 											</motion.button>
// 										</Link>
// 									</motion.div>
// 								) : step === 1 ? (
// 									/* STEP 1 */
// 									<motion.div
// 										key="s1"
// 										initial={{ opacity: 0, x: 20 }}
// 										animate={{ opacity: 1, x: 0 }}
// 										exit={{ opacity: 0, x: -20 }}
// 									>
// 										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
// 											🏠 Move Locations
// 										</h3>
// 										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Moving From *
// 												</label>
// 												<select
// 													value={form.fromCity}
// 													onChange={(e) => update("fromCity", e.target.value)}
// 													className="form-input"
// 												>
// 													<option value="" disabled>
// 														Select city...
// 													</option>
// 													{cities.map((c) => (
// 														<option key={c}>{c}</option>
// 													))}
// 												</select>
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Moving To *
// 												</label>
// 												<select
// 													value={form.toCity}
// 													onChange={(e) => update("toCity", e.target.value)}
// 													className="form-input"
// 												>
// 													<option value="" disabled>
// 														Select city...
// 													</option>
// 													{cities.map((c) => (
// 														<option key={c}>{c}</option>
// 													))}
// 												</select>
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Move Date *
// 												</label>
// 												<input
// 													type="date"
// 													value={form.moveDate}
// 													onChange={(e) => update("moveDate", e.target.value)}
// 													min={new Date().toISOString().split("T")[0]}
// 													className="form-input"
// 												/>
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Home Size *
// 												</label>
// 												<select
// 													value={form.homeSize}
// 													onChange={(e) => update("homeSize", e.target.value)}
// 													className="form-input"
// 												>
// 													<option value="" disabled>
// 														Select size...
// 													</option>
// 													{[
// 														"Studio",
// 														"1 Bedroom",
// 														"2 Bedrooms",
// 														"3 Bedrooms",
// 														"4+ Bedrooms",
// 														"Office / Commercial",
// 													].map((s) => (
// 														<option key={s}>{s}</option>
// 													))}
// 												</select>
// 											</div>
// 										</div>
// 										<div>
// 											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 												Type of Move *
// 											</label>
// 											<select
// 												value={form.moveType}
// 												onChange={(e) => update("moveType", e.target.value)}
// 												className="form-input"
// 											>
// 												<option value="" disabled>
// 													Select type...
// 												</option>
// 												{[
// 													"Local Move (same city)",
// 													"Long-Distance / Interprovincial",
// 													"Office / Commercial",
// 													"Storage Only",
// 												].map((t) => (
// 													<option key={t}>{t}</option>
// 												))}
// 											</select>
// 										</div>
// 										<div className="flex justify-end mt-8">
// 											<motion.button
// 												whileHover={{ scale: 1.02 }}
// 												whileTap={{ scale: 0.97 }}
// 												onClick={() => {
// 													if (validateStep1()) setStep(2);
// 												}}
// 												className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors"
// 											>
// 												Next: Move Details <ArrowRight size={15} />
// 											</motion.button>
// 										</div>
// 									</motion.div>
// 								) : step === 2 ? (
// 									/* STEP 2 */
// 									<motion.div
// 										key="s2"
// 										initial={{ opacity: 0, x: 20 }}
// 										animate={{ opacity: 1, x: 0 }}
// 										exit={{ opacity: 0, x: -20 }}
// 									>
// 										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
// 											📦 Move Details
// 										</h3>
// 										<p className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-3">
// 											Additional Services Needed
// 										</p>
// 										<div className="grid grid-cols-2 gap-2 mb-5">
// 											{extraServices.map((s) => (
// 												<button
// 													key={s}
// 													onClick={() => toggleExtra(s)}
// 													className={`text-left px-4 py-3 rounded-xl border-2 font-body text-sm transition-all duration-200 ${
// 														extras.includes(s)
// 															? "border-navy-600 bg-navy-50 text-navy-800"
// 															: "border-slate-200 hover:border-sky-brand/40 text-slate-600"
// 													}`}
// 												>
// 													{s}
// 												</button>
// 											))}
// 										</div>
// 										<div className="grid grid-cols-2 gap-4 mb-4">
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Est. Weight
// 												</label>
// 												<select
// 													value={form.weight}
// 													onChange={(e) => update("weight", e.target.value)}
// 													className="form-input"
// 												>
// 													<option value="" disabled>
// 														Optional estimate
// 													</option>
// 													{[
// 														"Under 1,000 lbs",
// 														"1,000–3,000 lbs",
// 														"3,000–6,000 lbs",
// 														"6,000–10,000 lbs",
// 														"Over 10,000 lbs",
// 													].map((w) => (
// 														<option key={w}>{w}</option>
// 													))}
// 												</select>
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Date Flexibility
// 												</label>
// 												<select
// 													value={form.flexible}
// 													onChange={(e) => update("flexible", e.target.value)}
// 													className="form-input"
// 												>
// 													<option value="" disabled>
// 														Select flexibility
// 													</option>
// 													{[
// 														"Exact date required",
// 														"Flexible ± 1 day",
// 														"Flexible ± 3 days",
// 														"Flexible ± 1 week",
// 													].map((f) => (
// 														<option key={f}>{f}</option>
// 													))}
// 												</select>
// 											</div>
// 										</div>
// 										<div>
// 											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 												Special Instructions
// 											</label>
// 											<textarea
// 												rows={3}
// 												value={form.notes}
// 												onChange={(e) => update("notes", e.target.value)}
// 												placeholder="e.g. 3rd floor no elevator, narrow driveway, fragile piano..."
// 												className="form-input resize-none"
// 											/>
// 										</div>
// 										<div className="flex justify-between mt-8">
// 											<button
// 												onClick={() => setStep(1)}
// 												className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors"
// 											>
// 												<ArrowLeft size={15} /> Back
// 											</button>
// 											<motion.button
// 												whileHover={{ scale: 1.02 }}
// 												whileTap={{ scale: 0.97 }}
// 												onClick={() => setStep(3)}
// 												className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors"
// 											>
// 												Next: Your Info <ArrowRight size={15} />
// 											</motion.button>
// 										</div>
// 									</motion.div>
// 								) : (
// 									/* STEP 3 */
// 									<motion.div
// 										key="s3"
// 										initial={{ opacity: 0, x: 20 }}
// 										animate={{ opacity: 1, x: 0 }}
// 										exit={{ opacity: 0, x: -20 }}
// 									>
// 										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
// 											👤 Your Contact Info
// 										</h3>
// 										<div className="grid grid-cols-2 gap-4 mb-4">
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													First Name *
// 												</label>
// 												<input
// 													type="text"
// 													value={form.firstName}
// 													onChange={(e) => update("firstName", e.target.value)}
// 													placeholder="First name"
// 													className={`form-input ${fieldErrors.firstName ? "border-red-400" : ""}`}
// 												/>
// 												{fieldErrors.firstName && (
// 													<p className="text-red-500 text-xs mt-1">
// 														{fieldErrors.firstName}
// 													</p>
// 												)}
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Last Name *
// 												</label>
// 												<input
// 													type="text"
// 													value={form.lastName}
// 													onChange={(e) => update("lastName", e.target.value)}
// 													placeholder="Last name"
// 													className={`form-input ${fieldErrors.lastName ? "border-red-400" : ""}`}
// 												/>
// 												{fieldErrors.lastName && (
// 													<p className="text-red-500 text-xs mt-1">
// 														{fieldErrors.lastName}
// 													</p>
// 												)}
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Email *
// 												</label>
// 												<input
// 													type="email"
// 													value={form.email}
// 													onChange={(e) => update("email", e.target.value)}
// 													placeholder="your@email.com"
// 													className={`form-input ${fieldErrors.email ? "border-red-400" : ""}`}
// 												/>
// 												{fieldErrors.email && (
// 													<p className="text-red-500 text-xs mt-1">
// 														{fieldErrors.email}
// 													</p>
// 												)}
// 											</div>
// 											<div>
// 												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 													Phone *
// 												</label>
// 												<input
// 													type="tel"
// 													value={form.phone}
// 													onChange={(e) => update("phone", e.target.value)}
// 													placeholder="(555) 000-0000"
// 													className={`form-input ${fieldErrors.phone ? "border-red-400" : ""}`}
// 												/>
// 												{fieldErrors.phone && (
// 													<p className="text-red-500 text-xs mt-1">
// 														{fieldErrors.phone}
// 													</p>
// 												)}
// 											</div>
// 										</div>
// 										<div className="mb-4">
// 											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
// 												Preferred Contact
// 											</label>
// 											<select
// 												value={form.contact}
// 												onChange={(e) => update("contact", e.target.value)}
// 												className="form-input"
// 											>
// 												<option>Email & Phone</option>
// 												<option>Email Only</option>
// 												<option>Phone Only</option>
// 											</select>
// 										</div>

// 										{error && (
// 											<motion.div
// 												initial={{ opacity: 0, y: -8 }}
// 												animate={{ opacity: 1, y: 0 }}
// 												className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-4"
// 											>
// 												<AlertCircle
// 													size={16}
// 													className="text-red-500 flex-shrink-0 mt-0.5"
// 												/>
// 												<p className="font-body text-sm text-red-700 leading-relaxed">
// 													{error}
// 												</p>
// 											</motion.div>
// 										)}

// 										<p className="font-body text-xs text-slate-400 mt-3 leading-relaxed">
// 											By submitting, you agree to our{" "}
// 											<Link href="#" className="text-sky-brand hover:underline">
// 												Privacy Policy
// 											</Link>{" "}
// 											and{" "}
// 											<Link href="#" className="text-sky-brand hover:underline">
// 												Terms of Service
// 											</Link>
// 											. Your info is PIPEDA-protected and never sold.
// 										</p>
// 										<div className="flex justify-between mt-8">
// 											<button
// 												onClick={() => setStep(2)}
// 												disabled={submitting}
// 												className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors disabled:opacity-50"
// 											>
// 												<ArrowLeft size={15} /> Back
// 											</button>
// 											<motion.button
// 												whileHover={{ scale: 1.02 }}
// 												whileTap={{ scale: 0.97 }}
// 												onClick={handleSubmit}
// 												disabled={submitting}
// 												className="bg-amber-brand text-navy-800 font-body font-bold px-8 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-amber-400 transition-colors disabled:opacity-70 shadow-glow-amber"
// 											>
// 												{submitting ? (
// 													<>
// 														<Loader2 size={16} className="animate-spin" />{" "}
// 														Sending Request...
// 													</>
// 												) : (
// 													<>
// 														🚛 Get My Free Quotes <ArrowRight size={15} />
// 													</>
// 												)}
// 											</motion.button>
// 										</div>
// 									</motion.div>
// 								)}
// 							</AnimatePresence>
// 						</div>

// 						{/* Trust strip */}
// 						{!done && (
// 							<div className="border-t border-slate-100 bg-slate-50 px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
// 								{[
// 									["🛡️", "WSIB Verified"],
// 									["🔒", "PIPEDA Safe"],
// 									["💳", "Stripe Secured"],
// 									["🇨🇦", "Canadian Co."],
// 								].map(([ico, lbl]) => (
// 									<div
// 										key={lbl}
// 										className="flex items-center gap-2 font-body text-xs font-semibold text-slate-500"
// 									>
// 										<span>{ico}</span> {lbl}
// 									</div>
// 								))}
// 							</div>
// 						)}
// 					</motion.div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
	Check,
	ArrowRight,
	ArrowLeft,
	Loader2,
	AlertCircle,
} from "lucide-react";
import AddressAutocomplete from "@/components/ui/AddressAutocomplete";

// ── Paste your Google Maps API key here (see setup guide below) ──────────────
// ─────────────────────────────────────────────────────────────────────────────

const extraServices = [
	"📦 Full Packing Service",
	"🛏 Furniture Disassembly",
	"🎹 Specialty Items",
	"🏭 Storage Required",
	"🖼 Fine Art / Antiques",
	"🚗 Vehicle Transport",
];

type Step = 1 | 2 | 3;

interface FormState {
	fromAddress: string;
	toAddress: string;
	moveDate: string;
	homeSize: string;
	moveType: string;
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

export default function QuotePageContent() {
	const [step, setStep] = useState<Step>(1);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [extras, setExtras] = useState<string[]>([]);
	const [form, setForm] = useState<FormState>(emptyForm);
	const [fieldErrors, setFieldErrors] = useState<
		Partial<Record<keyof FormState, string>>
	>({});

	const toggleExtra = (s: string) =>
		setExtras((prev) =>
			prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
		);

	const update = (k: keyof FormState, v: string) => {
		setForm((f) => ({ ...f, [k]: v }));
		if (fieldErrors[k]) setFieldErrors((e) => ({ ...e, [k]: undefined }));
	};

	const validateStep1 = () => {
		if (!form.fromAddress.trim()) {
			alert("Please enter your pick-up address.");
			return false;
		}
		if (!form.toAddress.trim()) {
			alert("Please enter your destination address.");
			return false;
		}
		if (!form.moveDate) {
			alert("Please select your move date.");
			return false;
		}
		if (!form.homeSize) {
			alert("Please select your home size.");
			return false;
		}
		if (!form.moveType) {
			alert("Please select the type of move.");
			return false;
		}
		return true;
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
					customerName: `${form.firstName} ${form.lastName}`,
					customerEmail: form.email,
					customerPhone: form.phone,
					preferredContact: form.contact,
					fromCity: form.fromAddress,
					toCity: form.toAddress,
					moveDate: form.moveDate,
					homeSize: form.homeSize,
					moveType: form.moveType,
					extraServices:
						extras.length > 0 ? extras.join(", ") : "None selected",
					estWeight: form.weight || "Not specified",
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
		} catch (err: any) {
			console.error("Submit error:", err);
			setError(
				"Something went wrong. Please call us at 1-888-MOVEZY or email movezyhelpdesk@gmail.com directly.",
			);
		} finally {
			setSubmitting(false);
		}
	};

	const stepLabels = ["Your Move", "Details", "Contact"];

	const benefits = [
		"🛡️ All movers WSIB insured & background checked",
		"⚡ 3–5 quotes within 2 hours",
		"💲 Binding, transparent pricing — no surprises",
		"🔒 Stripe escrow — pay only after successful move",
		"🇨🇦 100% Canadian movers, coast to coast",
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
								🚛 Free Moving Quote
							</span>
						</div>
						<h1
							className="font-display font-black text-white leading-tight mb-5"
							style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
						>
							Get Your
							<br />
							<span className="text-gradient italic">Free Quotes</span>
							<br />
							in 3 Minutes.
						</h1>
						<p className="font-body text-white/60 text-base font-light leading-relaxed mb-8 max-w-md">
							Tell us about your move and we'll match you with 3–5 vetted,
							insured Canadian movers — with real prices, verified reviews, and
							zero hidden fees.
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
								["13K+", "Moves Done"],
								["300+", "Vetted Movers"],
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
						className="bg-white rounded-4xl overflow-hidden shadow-card-xl"
					>
						{/* Card header */}
						<div className="bg-gradient-to-r from-navy-800 to-navy-600 px-8 py-7">
							<h2 className="font-display font-black text-white text-xl mb-1">
								📋 Tell Us About Your Move
							</h2>
							<p className="font-body text-white/55 text-sm">
								No commitment · Free · Under 3 minutes
							</p>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
								{[
									"Response in 2 hrs",
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
							<div className="flex items-center px-8 py-5 border-b border-slate-100">
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
													className={`font-body font-semibold text-xs uppercase tracking-wide ${
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
													className={`mx-3 h-0.5 w-8 rounded-full transition-all duration-500 ${step > n ? "bg-green-500" : "bg-slate-200"}`}
												/>
											)}
										</div>
									);
								})}
							</div>
						)}

						{/* Form body */}
						<div className="px-8 py-8">
							<AnimatePresence mode="wait">
								{/* SUCCESS */}
								{done ? (
									<motion.div
										key="success"
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										className="text-center py-8"
									>
										<motion.div
											initial={{ scale: 0, rotate: -10 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{
												type: "spring",
												stiffness: 200,
												delay: 0.1,
											}}
											className="w-20 h-20 bg-green-50 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-5 text-3xl"
										>
											✓
										</motion.div>
										<h3 className="font-display font-black text-navy-800 text-2xl mb-3">
											You're All Set! 🎉
										</h3>
										<p className="font-body text-slate-500 text-sm leading-relaxed mb-2 max-w-sm mx-auto">
											Your request has landed in our inbox at{" "}
											<strong className="text-navy-800">
												movezyhelpdesk@gmail.com
											</strong>
											.
										</p>
										<p className="font-body text-slate-400 text-sm mb-6 max-w-sm mx-auto">
											We'll review your details and get back to you with a quote
											within{" "}
											<strong className="text-navy-800">10 - 20 minutes</strong>
											.
										</p>
										<div className="grid grid-cols-2 gap-2 max-w-xs mx-auto mb-7">
											{[
												"Quotes within 2 hrs",
												"No commitment needed",
												"Verified movers only",
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
												href="tel:18886683999"
												className="font-bold text-navy-800 hover:text-amber-dark transition-colors"
											>
												1-888-MOVEZY
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
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
											📍 Move Addresses
										</h3>

										{/* Pick-up address — full width */}
										<div className="mb-4">
											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
												Pick-Up Address *
											</label>
											<AddressAutocomplete
												value={form.fromAddress}
												onChange={(v) => update("fromAddress", v)}
												placeholder="   e.g. 2360 Leslie St, Newmarket, ON"
												theme="light"
											/>
											<p className="text-slate-400 text-[11px] mt-1">
												Enter your full street address including unit number
											</p>
										</div>

										{/* Destination address — full width */}
										<div className="mb-4">
											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
												Destination Address *
											</label>
											<AddressAutocomplete
												value={form.toAddress}
												onChange={(v) => update("toAddress", v)}
												placeholder="   e.g. 100 Queen St W, Toronto, ON"
												theme="light"
											/>
											<p className="text-slate-400 text-[11px] mt-1">
												Enter the full address you're moving to
											</p>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Move Date *
												</label>
												<input
													type="date"
													value={form.moveDate}
													onChange={(e) => update("moveDate", e.target.value)}
													min={new Date().toISOString().split("T")[0]}
													className="form-input"
												/>
											</div>
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Home Size *
												</label>
												<select
													value={form.homeSize}
													onChange={(e) => update("homeSize", e.target.value)}
													className="form-input"
												>
													<option value="" disabled>
														Select size...
													</option>
													{[
														"Studio",
														"1 Bedroom",
														"2 Bedrooms",
														"3 Bedrooms",
														"4+ Bedrooms",
														"Office / Commercial",
													].map((s) => (
														<option key={s}>{s}</option>
													))}
												</select>
											</div>
										</div>
										<div>
											<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
												Type of Move *
											</label>
											<select
												value={form.moveType}
												onChange={(e) => update("moveType", e.target.value)}
												className="form-input"
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
										</div>
										<div className="flex justify-end mt-8">
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												onClick={() => {
													if (validateStep1()) setStep(2);
												}}
												className="bg-navy-800 text-white font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-navy-700 transition-colors"
											>
												Next: Move Details <ArrowRight size={15} />
											</motion.button>
										</div>
									</motion.div>
								) : step === 2 ? (
									/* STEP 2 */
									<motion.div
										key="s2"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
											📦 Move Details
										</h3>
										<p className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-3">
											Additional Services Needed
										</p>
										<div className="grid grid-cols-2 gap-2 mb-5">
											{extraServices.map((s) => (
												<button
													key={s}
													onClick={() => toggleExtra(s)}
													className={`text-left px-4 py-3 rounded-xl border-2 font-body text-sm transition-all duration-200 ${
														extras.includes(s)
															? "border-navy-600 bg-navy-50 text-navy-800"
															: "border-slate-200 hover:border-sky-brand/40 text-slate-600"
													}`}
												>
													{s}
												</button>
											))}
										</div>
										<div className="grid grid-cols-2 gap-4 mb-4">
											<div>
												<label className="font-body font-bold text-xs text-navy-800 uppercase tracking-wider mb-1.5 block">
													Est. Weight
												</label>
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
												placeholder="e.g. 3rd floor no elevator, narrow driveway, fragile piano..."
												className="form-input resize-none"
											/>
										</div>
										<div className="flex justify-between mt-8">
											<button
												onClick={() => setStep(1)}
												className="flex items-center gap-2 font-body font-semibold text-slate-500 hover:text-navy-800 transition-colors"
											>
												<ArrowLeft size={15} /> Back
											</button>
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												onClick={() => setStep(3)}
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
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
									>
										<h3 className="font-display font-bold text-navy-800 text-lg mb-5">
											👤 Your Contact Info
										</h3>
										<div className="grid grid-cols-2 gap-4 mb-4">
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
												onClick={() => setStep(2)}
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
														🚛 Get My Free Quotes <ArrowRight size={15} />
													</>
												)}
											</motion.button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Trust strip */}
						{!done && (
							<div className="border-t border-slate-100 bg-slate-50 px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
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
