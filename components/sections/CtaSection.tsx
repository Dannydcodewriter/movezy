"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CtaSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<section
			ref={ref}
			className="relative overflow-hidden py-28 bg-amber-brand"
		>
			{/* Diagonal pattern */}
			<div className="absolute inset-0 diagonal-pattern opacity-30" />
			{/* Noise */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
				}}
			/>
			{/* Glowing circles */}
			<div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[80px] bg-white/15 pointer-events-none" />
			<div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[80px] bg-amber-dark/30 pointer-events-none" />

			<div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6 }}
						className="text-center lg:text-left"
					>
						<p className="font-mono text-[0.7rem] font-medium text-navy-800/60 uppercase tracking-[2px] mb-4">
							🚛 Get started today
						</p>
						<h2
							className="font-display font-black text-navy-800 leading-tight mb-4"
							style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
						>
							Your Perfect Move
							<br />
							Starts With a Quote.
						</h2>
						<p className="font-body text-navy-700/70 font-light text-base max-w-md">
							Join 300+ Canadians who trusted MOVEZY. Free quotes in 30 minutes,
							our movers get to you quickly.
						</p>
						<div className="flex flex-wrap gap-5 mt-6 justify-center lg:justify-start">
							{[
								"No commitment required",
								"100% Canadian movers",
								"Zero hidden fees",
							].map((t) => (
								<span
									key={t}
									className="flex items-center gap-2 font-body font-semibold text-sm text-navy-700"
								>
									<span className="text-navy-600 font-bold">✓</span> {t}
								</span>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="flex flex-col items-center gap-4"
					>
						<Link href="/get-a-quote">
							<motion.button
								whileHover={{ scale: 1.04, y: -3 }}
								whileTap={{ scale: 0.97 }}
								className="bg-navy-800 text-white font-body font-bold text-lg px-10 py-5 rounded-2xl shadow-card-xl flex items-center gap-3 hover:bg-navy-700 transition-colors"
							>
								Get My Free Quote <ArrowRight size={20} />
							</motion.button>
						</Link>
						<a
							href="tel:16473133725"
							className="flex items-center gap-2 font-body font-semibold text-navy-700 hover:text-navy-900 transition-colors"
						>
							<Phone size={15} />
							Or call +1 647-3133-725
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
