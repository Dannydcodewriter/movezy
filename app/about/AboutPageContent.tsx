"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import CtaSection from "@/components/sections/CtaSection";
import StatsSection from "@/components/sections/StatsSection";

const team = [
	{
		name: "Alex Tremblay",
		role: "CEO & Co-Founder",
		bio: "Former logistics exec who went through a nightmare move in 2019 and decided to fix the industry once and for all.",
		emoji: "👨‍💼",
		gradient: "from-sky-brand to-navy-600",
	},
	{
		name: "Priya Singh",
		role: "Head of Product",
		bio: "Ex-Shopify product lead, obsessed with removing friction from every step of the customer experience.",
		emoji: "👩‍💻",
		gradient: "from-amber-brand to-amber-dark",
	},
	{
		name: "Marcus Osei",
		role: "Head of Operations",
		bio: "20-year veteran of the moving industry who knows exactly what separates great movers from the rest.",
		emoji: "👨‍🔧",
		gradient: "from-green-700 to-navy-600",
	},
	{
		name: "Sophie Lavoie",
		role: "Head of Growth",
		bio: "Quebec native. Led growth at two Canadian startups before joining MOVEZY to bring it to every province.",
		emoji: "👩‍📊",
		gradient: "from-purple-700 to-navy-600",
	},
];

const values = [
	{
		num: "01",
		title: "Trust is Everything",
		desc: "Every mover and cleaner on our crew is trained, insured and background-checked. You should never have to guess who's coming to your door.",
	},
	{
		num: "02",
		title: "Radical Transparency",
		desc: "Quotes are real, complete, and binding. What you see is what you pay. No surprises, ever.",
	},
	{
		num: "03",
		title: "Customer Protection First",
		desc: "Every move is fully insured, and the job isn't done until you're satisfied. You're always in control.",
	},
	{
		num: "04",
		title: "Proudly Canadian",
		desc: "Our movers and cleaners are Canadian, and our team serves customers coast to coast.",
	},
];

export default function AboutPageContent() {
	return (
		<>
			{/* Hero */}
			<section className="relative mesh-bg pt-40 pb-24 overflow-hidden">
				<div className="absolute inset-0 grid-pattern" />
				<div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6"
					>
						<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
							🏢 About MOVEZY
						</span>
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="font-display font-black text-white leading-tight mb-5"
						style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
					>
						Built by Canadians,
						<br />
						<span className="text-gradient italic">For Canadians.</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="font-body text-white/60 text-lg font-light max-w-xl mx-auto"
					>
						We got tired of the broken moving and cleaning industry. So we built the company we wished had existed.
					</motion.p>
					<nav className="font-body text-sm text-white/40 mt-6">
						<Link href="/" className="hover:text-amber-brand transition-colors">
							Home
						</Link>
						<span className="mx-2">/</span>
						<span className="text-amber-brand">About</span>
					</nav>
				</div>
			</section>

			{/* Story */}
			<section className="bg-white py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						{/* ── PHOTO ────────────────────────────────────────────────────
                HOW TO ADD YOUR IMAGE:
                1. Put your photo in: public/images/about-story.jpg
                2. That's it — it will appear here automatically.
                Recommended size: 800 × 700px. Any landscape/portrait works.
            ──────────────────────────────────────────────────────────────── */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="relative"
						>
							<div className="rounded-4xl overflow-hidden min-h-[400px] bg-slate-100">
								<img
									src="/images/about-story.jpg"
									alt="The MOVEZY team"
									className="w-full h-full object-cover"
									style={{ minHeight: "400px" }}
								/>
							</div>

							{/* Floating badge — stays exactly as before */}
							<motion.div
								animate={{ y: [0, -10, 0] }}
								transition={{ duration: 4, repeat: Infinity }}
								className="absolute -bottom-6 -right-6 bg-amber-brand rounded-3xl p-6 shadow-card-xl"
							>
								<p className="font-display font-black text-navy-800 text-4xl leading-none">
									5+
								</p>
								<p className="font-body font-semibold text-navy-700 text-xs mt-1">
									Years serving Canada
								</p>
							</motion.div>
						</motion.div>

						{/* Content */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-8 h-0.5 bg-amber-brand" />
								<span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">
									Our Story
								</span>
							</div>
							<h2
								className="font-display font-black text-navy-800 mb-5"
								style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
							>
								Moving Made&nbsp;
								<span className="italic" style={{ color: "var(--amber)" }}>
									Simple!
								</span>
							</h2>
							<p className="font-body text-slate-500 font-light leading-relaxed mb-4">
								MOVEZY was born from a frustrating moving experience, late
								arrivals, careless handling, and unexpected charges with no
								accountability. Like many Canadians, our founders realized
								moving had become far more stressful than it should be.
							</p>

							<p className="font-body text-slate-500 font-light leading-relaxed mb-4">
								So we built something better.
							</p>

							<p className="font-body text-slate-500 font-light leading-relaxed mb-8">
								MOVEZY delivers moving and cleaning built on trust, transparency, and professionalism. From the moment you book to the final box delivered and the last room cleaned, you know exactly who’s in your home and what you’re paying.
							</p>
							<div className="flex flex-col gap-3 mb-8">
								{[
									"Trusted professional movers & cleaners",
									"Move + clean in one booking",
									"Transparent pricing, no surprises",
									"English & French support, including Quebec",
									"24/7 customer support",
								].map((t) => (
									<div key={t} className="flex items-start gap-3">
										<Check
											size={16}
											className="text-green-500 flex-shrink-0 mt-0.5"
										/>
										<span className="font-body text-sm text-navy-700">{t}</span>
									</div>
								))}
							</div>
							<div className="flex gap-3 flex-wrap">
								{/* <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
									<span>🏆</span>
									<span className="font-body font-semibold text-navy-800 text-sm">
										Best Moving App 2024
									</span>
								</div> */}
								<div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
									<span>⭐</span>
									<span className="font-body font-semibold text-navy-800 text-sm">
										4.9/5 Google Reviews
									</span>
								</div>
								{/* <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
									<span>🇨🇦</span>
									<span className="font-body font-semibold text-navy-800 text-sm">
										CAM Certified
									</span>
								</div> */}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Stats */}
			<StatsSection />

			{/* Values */}
			<section className="bg-navy-900 py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="w-8 h-0.5 bg-amber-brand" />
							<span className="font-mono text-[0.7rem] font-medium text-amber-brand uppercase tracking-[2px]">
								Our Values
							</span>
							<div className="w-8 h-0.5 bg-amber-brand" />
						</div>
						<h2
							className="font-display font-black text-white"
							style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
						>
							What We <span className="text-gradient italic">Stand For.</span>
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{values.map((v, i) => (
							<motion.div
								key={v.num}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="bg-white/5 border border-white/8 rounded-3xl p-8 hover:bg-white/8 transition-colors"
							>
								<div className="font-display font-black text-6xl text-white/5 mb-4 leading-none">
									{v.num}
								</div>
								<h3 className="font-display font-bold text-white text-xl mb-3">
									{v.title}
								</h3>
								<p className="font-body text-white/50 text-sm leading-relaxed font-light">
									{v.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team */}
			{/* <section className="bg-slate-50 py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="w-8 h-0.5 bg-amber-brand" />
							<span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">
								The Team
							</span>
							<div className="w-8 h-0.5 bg-amber-brand" />
						</div>
						<h2
							className="font-display font-black text-navy-800"
							style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
						>
							The People Behind{" "}
							<span className="italic" style={{ color: "var(--amber)" }}>
								MOVEZY.
							</span>
						</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{team.map((m, i) => (
							<motion.div
								key={m.name}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								whileHover={{
									y: -6,
									transition: { type: "spring", stiffness: 300, damping: 20 },
								}}
								className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
							>
								<div
									className={`bg-gradient-to-br ${m.gradient} h-40 flex items-center justify-center text-6xl`}
								>
									{m.emoji}
								</div>
								<div className="p-6">
									<h3 className="font-display font-bold text-navy-800 text-lg mb-1">
										{m.name}
									</h3>
									<p className="font-mono text-[0.68rem] text-sky-brand uppercase tracking-wide font-medium mb-3">
										{m.role}
									</p>
									<p className="font-body text-slate-500 text-sm leading-relaxed font-light mb-4">
										{m.bio}
									</p>
									<div className="flex gap-2">
										<a
											href="#"
											className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-navy-600 hover:text-white transition-colors"
										>
											<Linkedin size={13} />
										</a>
										<a
											href="#"
											className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-navy-600 hover:text-white transition-colors"
										>
											<Twitter size={13} />
										</a>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section> */}

			<CtaSection />
		</>
	);
}
