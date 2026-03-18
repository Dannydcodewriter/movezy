"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
	{
		target: 300,
		suffix: "+",
		label: "Moves Completed",
		sub: "Across Canada",
		icon: "🏠",
	},
	{
		target: 30,
		suffix: "+",
		label: "Vetted Movers",
		sub: "Professional & Reliable",
		icon: "🛡️",
	},
	{
		target: 10,
		suffix: "",
		label: "Canadian Cities",
		sub: "And growing",
		icon: "🗺️",
	},
	{
		target: 98,
		suffix: "%",
		label: "Satisfaction Rate",
		sub: "100+ reviews",
		icon: "⭐",
	},
];

export default function StatsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<section
			ref={ref}
			className="relative overflow-hidden py-24"
			style={{
				background:
					"linear-gradient(135deg, #0a1929 0%, #1B3A6B 50%, #0a1929 100%)",
			}}
		>
			<div className="absolute inset-0 grid-pattern opacity-40" />
			<div className="absolute inset-0 diagonal-pattern" />

			{/* Glowing line top */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-brand/40 to-transparent" />

			<div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6 rounded-3xl overflow-hidden border border-white/8 shadow-card-xl">
					{stats.map(({ target, suffix, label, sub, icon }, i) => (
						<motion.div
							key={label}
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="bg-navy-900/60 backdrop-blur-sm py-12 px-8 text-center group hover:bg-white/4 transition-colors duration-300"
						>
							<div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
								{icon}
							</div>
							<div
								className="font-display font-black text-amber-brand leading-none mb-3 group-hover:scale-105 transition-transform duration-300"
								style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
							>
								{isInView && (
									<AnimatedCounter
										target={target}
										suffix={target >= 1000 ? "K+" : suffix}
										duration={2200}
									/>
								)}
							</div>
							<p className="font-body font-semibold text-white text-sm mb-1">
								{label}
							</p>
							<p className="font-body text-white/35 text-xs font-light">
								{sub}
							</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* Glowing line bottom */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-brand/40 to-transparent" />
		</section>
	);
}
