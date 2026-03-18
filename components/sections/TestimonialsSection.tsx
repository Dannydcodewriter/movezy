"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
	{
		name: "Sarah L.",
		location: "Toronto → Vancouver",
		initials: "SL",
		gradient: "from-sky-brand to-navy-600",
		rating: 5,
		service: "Long-Distance",
		text: "MOVEZY made our cross-country move completely stress-free. Their team arrived right on time, handled everything with incredible care, and delivered our belongings exactly as promised. No surprises, just true professionals.",
		date: "February 2026",
	},
	{
		name: "Daniel T.",
		location: "Montreal, QC",
		initials: "DT",
		gradient: "from-amber-brand to-amber-dark",
		rating: 5,
		service: "Commercial",
		text: "We relocated our entire Montreal office over a weekend and the MOVEZY crew handled it flawlessly. Every piece of equipment was packed, transported, and set up with precision. By Monday morning we were back to work like nothing happened",
		date: "January 2026",
	},
	{
		name: "Amina M.",
		location: "Calgary, AB",
		initials: "AM",
		gradient: "from-green-700 to-navy-600",
		rating: 5,
		service: "Residential",
		text: "’ve moved several times and this was by far the easiest experience. The MOVEZY team arrived prepared, worked quickly, and finished my two-bedroom move in under four hours. Professional, friendly, and incredibly efficient.",
		date: "January 2026",
	},
	{
		name: "Marcus P.",
		location: "Ottawa, ON",
		initials: "MP",
		gradient: "from-purple-700 to-navy-600",
		rating: 5,
		service: "Specialty",
		text: "Moving a baby grand piano is nerve-racking, but the MOVEZY specialty team handled it with unbelievable care. You could tell they knew exactly what they were doing. Not a single scratch.",
		date: "December 2025",
	},
	{
		name: "Jennifer K.",
		location: "Vancouver, BC",
		initials: "JK",
		gradient: "from-sky-brand to-navy-800",
		rating: 5,
		service: "Residential",
		text: "I’ve used MOVEZY twice this year and both moves were seamless. Their movers are punctual, respectful, and extremely careful with belongings. It’s rare to find a moving company this reliable.",
		date: "December 2025",
	},
	{
		name: "Rachel N.",
		location: "Toronto, ON",
		initials: "RN",
		gradient: "from-amber-dark to-navy-600",
		rating: 5,
		service: "Residential",
		text: "As a property manager, I now recommend MOVEZY to all my tenants. Their team is professional, dependable, and the pricing is always transparent. It’s exactly the kind of service the industry needed.",
		date: "November 2025",
	},
];

export default function TestimonialsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });
	const [active, setActive] = useState(0);

	const prev = () =>
		setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
	const next = () => setActive((a) => (a + 1) % testimonials.length);

	return (
		<section ref={ref} className="bg-white py-28 overflow-hidden">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
					<div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							className="flex items-center gap-3 mb-4"
						>
							<div className="w-8 h-0.5 bg-amber-brand" />
							<span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">
								Real Reviews
							</span>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 }}
							className="font-display font-black text-navy-800 leading-tight"
							style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
						>
							300+ Canadians
							<br />
							<span className="italic" style={{ color: "var(--amber)" }}>
								Can't Be Wrong.
							</span>
						</motion.h2>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ delay: 0.2 }}
						className="flex items-center gap-3"
					>
						<div className="flex -space-x-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={18}
									className="text-amber-brand fill-amber-brand"
								/>
							))}
						</div>
						<div>
							<p className="font-display font-bold text-navy-800 text-2xl">
								4.9
							</p>
							<p className="font-body text-slate-400 text-xs">100+ verified</p>
						</div>
					</motion.div>
				</div>

				{/* Cards grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{testimonials.map((t, i) => (
						<motion.div
							key={t.name}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
							whileHover={{
								y: -5,
								transition: { type: "spring", stiffness: 300, damping: 20 },
							}}
							className="group bg-white border border-slate-100 rounded-3xl p-7 shadow-card hover:shadow-card-hover transition-shadow relative overflow-hidden"
						>
							{/* Top border slide */}
							<div className="absolute top-0 left-0 right-100 h-0.5 bg-amber-brand group-hover:right-0 transition-all duration-400 rounded-full" />

							{/* Rating */}
							<div className="flex gap-0.5 mb-4">
								{[...Array(t.rating)].map((_, i) => (
									<Star
										key={i}
										size={14}
										className="text-amber-brand fill-amber-brand"
									/>
								))}
							</div>

							{/* Quote mark */}
							<span className="absolute top-4 right-6 font-display text-7xl text-amber-brand/8 leading-none select-none">
								"
							</span>

							{/* Text */}
							<p className="font-body text-slate-600 text-sm leading-[1.8] italic font-light mb-6 relative z-10">
								"{t.text}"
							</p>

							{/* Author */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div
										className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0`}
									>
										{t.initials}
									</div>
									<div>
										<p className="font-body font-semibold text-navy-800 text-sm">
											{t.name}
										</p>
										<p className="font-body text-slate-400 text-xs mt-0.5">
											{t.location}
										</p>
									</div>
								</div>
								<div className="flex flex-col items-end gap-1">
									<span className="inline-flex items-center gap-1 font-mono text-[0.6rem] font-medium text-sky-brand bg-sky-brand/8 px-2 py-1 rounded-lg uppercase tracking-wide">
										{t.service}
									</span>
									<CheckCircle size={12} className="text-green-500" />
								</div>
							</div>
							<p className="font-mono text-[0.65rem] text-slate-300 mt-3">
								{t.date}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
