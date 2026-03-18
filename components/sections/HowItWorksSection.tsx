'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const steps = [
	{
		num: "01",
		title: "Tell Us About Your Move",
		desc: "Tell us where you're moving, your home size, and your preferred date. Takes under 3 minutes, no phone calls required.",
		icon: "📋",
		detail:
			"Our simple form guides you through everything our team needs to know. Moving from Toronto to Vancouver? Elevator bookings, parking permits, and special items, just tell us once and our team handles the rest.",
		tags: ["3-min form", "No account needed", "Instant confirmation"],
	},
	{
		num: "02",
		title: "Receive Your Quotes",
		desc: "Our team reviews your move and sends you a transparent, binding price. Usually within 30 minutes.",
		icon: "💬",
		detail:
			"This isn't a ballpark estimate. MOVEZY provides an itemized, binding price for your move. What you see is what you pay. Period.",
		tags: ["Binding quotes", "< 30 mins response", "No hidden add-ons"],
	},
	{
		num: "03",
		title: "Confirm Your Move",
		desc: "Review your quote, ask any questions, and confirm your booking. Read verified reviews from past MOVEZY customers.",
		icon: "⚖️",
		detail:
			"Your MOVEZY profile includes full pricing breakdown, insurance details, and authentic reviews from real past customers. You have everything needed to book with total confidence.",
		tags: ["Verified reviews", "Full pricing breakdown", "Book in seconds"],
	},
	{
		num: "04",
		title: "We Show Up & Get It Done",
		desc: "Secure your booking with a small deposit via Stripe. Our crew arrives on time, handles everything professionally, and your remaining balance is only released when the job is done.",
		icon: "✅",
		detail:
			"Your money is protected from the moment you book. Payment is only released to our team after you confirm a successful, damage-free move. No move completed to your satisfaction, no charge.",
		tags: ["Stripe secured", "Full insurance", "Move guarantee"],
	},
];

export default function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % steps.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
		<section id="how-it-works" ref={ref} className="bg-slate-50 py-28">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						className="flex items-center justify-center gap-3 mb-4"
					>
						<div className="w-8 h-0.5 bg-amber-brand rounded-full" />
						<span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">
							The Process
						</span>
						<div className="w-8 h-0.5 bg-amber-brand rounded-full" />
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
						className="font-display font-black text-navy-800 mb-4"
						style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
					>
						Moving Made{" "}
						<span className="italic" style={{ color: "var(--amber)" }}>
							Effortless.
						</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.15 }}
						className="text-slate-500 font-body font-light text-base max-w-lg mx-auto"
					>
						Four simple steps from quote to completion. Our team handles the
						rest. No surprises. No stress.
					</motion.p>
				</div>

				{/* Two-column layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Steps list */}
					<div className="flex flex-col gap-3">
						{steps.map((step, i) => (
							<motion.button
								key={step.num}
								initial={{ opacity: 0, x: -20 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ delay: i * 0.1 + 0.2 }}
								onClick={() => setActive(i)}
								className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
									active === i
										? "bg-navy-800 border-navy-800 shadow-card-hover"
										: "bg-white border-slate-200 hover:border-sky-brand/40"
								}`}
							>
								<div className="flex items-start gap-4">
									<span
										className={`font-display font-black text-3xl leading-none ${
											active === i ? "text-amber-brand" : "text-slate-200"
										}`}
									>
										{step.num}
									</span>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-3 mb-1">
											<span className="text-xl">{step.icon}</span>
											<h3
												className={`font-display font-bold text-lg ${
													active === i ? "text-white" : "text-navy-800"
												}`}
											>
												{step.title}
											</h3>
										</div>
										<p
											className={`font-body text-sm leading-relaxed font-light ${
												active === i ? "text-white/65" : "text-slate-500"
											}`}
										>
											{step.desc}
										</p>
										{/* Progress bar */}
										{active === i && (
											<motion.div className="mt-3 h-0.5 bg-white/15 rounded-full overflow-hidden">
												<motion.div
													className="h-full bg-amber-brand rounded-full"
													initial={{ width: "0%" }}
													animate={{ width: "100%" }}
													transition={{ duration: 4.5, ease: "linear" }}
												/>
											</motion.div>
										)}
									</div>
								</div>
							</motion.button>
						))}
					</div>

					{/* Detail panel */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ delay: 0.3 }}
						className="sticky top-28"
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={active}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -16 }}
								transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
								className="bg-gradient-to-br from-navy-800 to-navy-600 rounded-3xl p-10 min-h-[400px] relative overflow-hidden"
							>
								{/* BG decoration */}
								<div className="absolute inset-0 grid-pattern opacity-30" />
								<div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] bg-amber-brand/20" />

								<div className="relative z-10">
									<div className="text-6xl mb-6">{steps[active].icon}</div>
									<div className="font-display font-black text-amber-brand text-sm mb-3 tracking-widest uppercase">
										Step {steps[active].num}
									</div>
									<h3 className="font-display font-black text-white text-2xl mb-5 leading-tight">
										{steps[active].title}
									</h3>
									<p className="font-body text-white/65 leading-relaxed text-sm font-light mb-8">
										{steps[active].detail}
									</p>
									<div className="flex flex-wrap gap-2">
										{steps[active].tags.map((tag) => (
											<span
												key={tag}
												className="bg-white/10 border border-white/15 text-white/80 font-mono text-[0.65rem] font-medium px-3 py-1.5 rounded-lg uppercase tracking-wide"
											>
												✓ {tag}
											</span>
										))}
									</div>

									{/* Step dots */}
									<div className="flex gap-2 mt-10">
										{steps.map((_, i) => (
											<button
												key={i}
												onClick={() => setActive(i)}
												className={`rounded-full transition-all duration-300 ${
													i === active
														? "w-6 h-2 bg-amber-brand"
														: "w-2 h-2 bg-white/25 hover:bg-white/40"
												}`}
											/>
										))}
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
