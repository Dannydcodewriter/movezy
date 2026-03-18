"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Star, CheckCircle } from "lucide-react";
import CtaSection from "@/components/sections/CtaSection";

const allReviews = [
	{
		name: "Sarah L.",
		loc: "Toronto → Vancouver",
		initials: "SL",
		rating: 5,
		service: "Long-Distance",
		gradient: "from-sky-brand to-navy-600",
		text: "MOVEZY made our cross-country move completely stress-free. Their team arrived right on time, handled everything with incredible care, and delivered our belongings exactly as promised. No surprises, just true professionals.",
		date: "February 2026",
	},
	{
		name: "Daniel T.",
		loc: "Montreal, QC",
		initials: "DT",
		rating: 5,
		service: "Commercial",
		gradient: "from-amber-brand to-amber-dark",
		text: "We relocated our entire Montreal office over a weekend and the MOVEZY crew handled it flawlessly. Every piece of equipment was packed, transported, and set up with precision. By Monday morning we were back to work like nothing happened.",
		date: "January 2026",
	},
	{
		name: "Amina M.",
		loc: "Calgary, AB",
		initials: "AM",
		rating: 5,
		service: "Residential",
		gradient: "from-green-700 to-navy-600",
		text: "I’ve moved several times and this was by far the easiest experience. The MOVEZY team arrived prepared, worked quickly, and finished my two-bedroom move in under four hours. Professional, friendly, and incredibly efficient.",
		date: "January 2026",
	},
	{
		name: "Marcus P.",
		loc: "Ottawa, ON",
		initials: "MP",
		rating: 5,
		service: "Specialty",
		gradient: "from-purple-700 to-navy-600",
		text: "Moving a baby grand piano is nerve-racking, but the MOVEZY specialty team handled it with unbelievable care. You could tell they knew exactly what they were doing. Not a single scratch.",
		date: "December 2025",
	},
	{
		name: "Jennifer K.",
		loc: "Vancouver, BC",
		initials: "JK",
		rating: 5,
		service: "Residential",
		gradient: "from-sky-brand to-navy-800",
		text: "I’ve used MOVEZY twice this year and both moves were seamless. Their movers are punctual, respectful, and extremely careful with belongings. It’s rare to find a moving company this reliable.",
		date: "December 2025",
	},
	{
		name: "Rachel N.",
		loc: "Toronto, ON",
		initials: "RN",
		rating: 5,
		service: "Residential",
		gradient: "from-amber-dark to-navy-600",
		text: "As a property manager, I now recommend MOVEZY to all my tenants. Their team is professional, dependable, and the pricing is always transparent. It’s exactly the kind of service the industry needed.",
		date: "November 2025",
	},
	{
		name: "Kim W.",
		loc: "Winnipeg, MB",
		initials: "KW",
		rating: 5,
		service: "Packing",
		gradient: "from-green-700 to-sky-brand",
		text: "The packing service was exceptional. Every fragile item was wrapped carefully, boxes were clearly labeled, and everything arrived perfectly intact. It made settling into our new home so much easier.",
		date: "November 2025",
	},
	{
		name: "Thomas M.",
		loc: "Edmonton → Halifax",
		initials: "TM",
		rating: 5,
		service: "Long-Distance",
		gradient: "from-navy-600 to-navy-800",
		text: "Moving across the country with a family of four felt overwhelming, but MOVEZY made it smooth from start to finish. Their long-distance team kept us informed the whole way and delivered everything safely.",
		date: "October 2025",
	},
	{
		name: "Lena B.",
		loc: "Ottawa, ON",
		initials: "LB",
		rating: 5,
		service: "Commercial",
		gradient: "from-sky-brand to-amber-dark",
		text: "Our law firm relocated offices in one weekend and MOVEZY handled the entire operation. Over 40 desks, equipment, and files moved efficiently with zero disruption. We were fully operational Monday morning.",
		date: "October 2025",
	},
];

const ratingBars = [
	{ stars: 5, pct: 82 },
	{ stars: 4, pct: 11 },
	{ stars: 3, pct: 4 },
	{ stars: 2, pct: 2 },
	{ stars: 1, pct: 1 },
];

const filters = [
	"All Reviews",
	"Residential",
	"Long-Distance",
	"Commercial",
	"Packing",
	"Specialty",
];

export default function ReviewsPageContent() {
	const [activeFilter, setActiveFilter] = useState("All Reviews");

	const filtered =
		activeFilter === "All Reviews"
			? allReviews
			: allReviews.filter((r) => r.service === activeFilter);

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
							⭐ Customer Reviews
						</span>
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="font-display font-black text-white leading-tight mb-5"
						style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
					>
						What Canadians{" "}
						<span className="text-gradient italic">Are Saying.</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="font-body text-white/60 text-lg font-light max-w-xl mx-auto"
					>
						Every review is verified from a completed booking. Real customers,
						real experiences, real accountability.
					</motion.p>
					<nav className="font-body text-sm text-white/40 mt-6">
						<Link href="/" className="hover:text-amber-brand transition-colors">
							Home
						</Link>
						<span className="mx-2">/</span>
						<span className="text-amber-brand">Reviews</span>
					</nav>
				</div>
			</section>

			{/* Rating overview */}
			<section className="bg-slate-50 py-16">
				<div className="max-w-4xl mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
						<div className="text-center">
							<p className="font-display font-black text-navy-800 text-8xl leading-none mb-2">
								4.9
							</p>
							<div className="flex justify-center gap-1 mb-3">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={22}
										className="text-amber-brand fill-amber-brand"
									/>
								))}
							</div>
							<p className="font-body text-slate-500 text-sm">
								Based on 100+ verified reviews
							</p>
							<div className="flex gap-3 justify-center mt-5 flex-wrap">
								{[["⭐ Google", "4.9"]].map(([p, r]) => (
									<div
										key={p}
										className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2"
									>
										<span className="font-body font-bold text-sm text-navy-800">
											{p}
										</span>
										<span className="font-display font-black text-amber-brand">
											{r}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-3">
							{ratingBars.map(({ stars, pct }) => (
								<div key={stars} className="flex items-center gap-3">
									<span className="font-body font-bold text-sm text-navy-800 w-8 text-right flex-shrink-0">
										{stars} ★
									</span>
									<div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
										<motion.div
											className="h-full bg-gradient-to-r from-amber-brand to-amber-400 rounded-full"
											initial={{ width: 0 }}
											whileInView={{ width: `${pct}%` }}
											viewport={{ once: true }}
											transition={{ duration: 1, delay: (5 - stars) * 0.1 }}
										/>
									</div>
									<span className="font-mono text-xs text-slate-400 w-8 flex-shrink-0">
										{pct}%
									</span>
								</div>
							))}
							<p className="font-body text-xs text-slate-400 mt-2 leading-relaxed">
								Every review is from a verified completed booking. Unverified or
								incentivized reviews are never accepted.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Reviews grid */}
			<section className="bg-white py-20">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					{/* Filters */}
					<div className="flex flex-wrap gap-2 mb-10">
						{filters.map((f) => (
							<motion.button
								key={f}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								onClick={() => setActiveFilter(f)}
								className={`font-body font-semibold text-sm px-5 py-2.5 rounded-xl border-2 transition-all duration-200 ${
									activeFilter === f
										? "bg-navy-800 border-navy-800 text-white"
										: "bg-white border-slate-200 text-slate-600 hover:border-sky-brand/40"
								}`}
							>
								{f}
							</motion.button>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{filtered.map((r, i) => (
							<motion.div
								key={r.name + r.date}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.07 }}
								whileHover={{
									y: -5,
									transition: { type: "spring", stiffness: 300, damping: 20 },
								}}
								className="group bg-white border border-slate-100 rounded-3xl p-7 shadow-card hover:shadow-card-hover transition-shadow relative overflow-hidden"
							>
								<div className="absolute top-0 left-0 w-0 h-0.5 bg-amber-brand group-hover:w-full transition-all duration-500" />
								<div className="flex gap-0.5 mb-4">
									{[...Array(r.rating)].map((_, i) => (
										<Star
											key={i}
											size={13}
											className="text-amber-brand fill-amber-brand"
										/>
									))}
								</div>
								<span className="absolute top-4 right-5 font-display text-7xl text-amber-brand/6 leading-none">
									"
								</span>
								<p className="font-body text-slate-600 text-sm leading-relaxed italic font-light mb-6">
									"{r.text}"
								</p>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div
											className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.gradient} flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0`}
										>
											{r.initials}
										</div>
										<div>
											<p className="font-body font-semibold text-navy-800 text-sm">
												{r.name}
											</p>
											<p className="font-body text-slate-400 text-xs">
												{r.loc}
											</p>
										</div>
									</div>
									<div className="flex flex-col items-end gap-1">
										<span className="font-mono text-[0.6rem] font-medium text-sky-brand bg-sky-light px-2 py-1 rounded-lg uppercase tracking-wide">
											{r.service}
										</span>
										<CheckCircle size={12} className="text-green-500" />
									</div>
								</div>
								<p className="font-mono text-[0.62rem] text-slate-300 mt-3">
									{r.date}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<CtaSection />
		</>
	);
}
