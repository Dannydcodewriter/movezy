"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
	Shield,
	Star,
	Clock,
	DollarSign,
	MapPin,
	Headphones,
} from "lucide-react";

const features = [
	{
		icon: Shield,
		title: "Rigorous Vetting",
		desc: "Every mover on our team is thoroughly vetted and carefully screened to ensure professionalism, reliability, and high-quality service.",
		color: "from-sky-brand/20 to-sky-brand/5",
		iconBg: "bg-sky-brand/15 text-sky-brand",
		num: "01",
	},
	{
		icon: DollarSign,
		title: "Zero Hidden Fees",
		desc: "Transparent pricing with no hidden fees. The quote you receive is exactly what you pay. Payment is securely processed after your move is completed.",
		color: "from-amber-brand/20 to-amber-brand/5",
		iconBg: "bg-amber-brand/15 text-amber-brand",
		num: "02",
	},
	{
		icon: Star,
		title: "Verified Reviews",
		desc: "Real reviews from real customers. We only display genuine feedback from people who have experienced MOVEZY’s moving services.",
		color: "from-green-500/20 to-green-500/5",
		iconBg: "bg-green-500/15 text-green-500",
		num: "03",
	},
	{
		icon: Clock,
		title: "< 30 Min Response",
		desc: "Submit your move details and receive a clear, upfront quote from our moving team in less than 30 minutes.",
		color: "from-purple-500/20 to-purple-500/5",
		iconBg: "bg-purple-500/15 text-purple-400",
		num: "04",
	},
	{
		icon: MapPin,
		title: "Local Moving Experience",
		desc: "Our team understands the common challenges of city moves, from condo buildings and elevators to parking and access logistics.",
		color: "from-rose-500/20 to-rose-500/5",
		iconBg: "bg-rose-500/15 text-rose-400",
		num: "05",
	},
	{
		icon: Headphones,
		title: "7-Day Live Support",
		desc: "Our team is available every day to support you throughout your move, providing real help when you need it.",
		color: "from-sky-brand/20 to-amber-brand/10",
		iconBg: "bg-navy-600/15 text-navy-400",
		num: "06",
	},
];

export default function WhyUsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<section ref={ref} className="bg-navy-900 py-28 relative overflow-hidden">
			{/* BG pattern */}
			<div className="absolute inset-0 grid-pattern" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] bg-sky-brand/8 pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
					<div>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.5 }}
							className="flex items-center gap-3 mb-4"
						>
							<div className="w-8 h-0.5 bg-amber-brand rounded-full" />
							<span className="font-mono text-[0.7rem] font-medium text-amber-brand uppercase tracking-[2px]">
								Why MOVEZY
							</span>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="font-display font-black text-white leading-tight"
							style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
						>
							The Moving Platform
							<br />
							<span className="text-gradient italic">Canada Trusts.</span>
						</motion.h2>
					</div>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white/50 font-body text-base leading-relaxed max-w-md font-light"
					>
						We didn't reinvent moving, we fixed everything wrong with it.
						Transparency, accountability, and real customer protection built
						into every step.
					</motion.p>
				</div>

				{/* Feature grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{features.map(
						({ icon: Icon, title, desc, color, iconBg, num }, i) => (
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 30 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
								whileHover={{ y: -4, transition: { duration: 0.25 } }}
								className={`relative group bg-gradient-to-br ${color} border border-white/8 rounded-3xl p-7 overflow-hidden cursor-default`}
							>
								{/* Faded number */}
								<span className="absolute top-4 right-5 font-display font-black text-6xl text-white/4 leading-none select-none">
									{num}
								</span>
								{/* Icon */}
								<div
									className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
								>
									<Icon size={22} strokeWidth={1.8} />
								</div>
								<h3 className="font-display font-bold text-white text-lg mb-3 leading-tight">
									{title}
								</h3>
								<p className="font-body text-white/50 text-sm leading-relaxed font-light">
									{desc}
								</p>

								{/* Hover glow */}
								<div
									className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
									style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.03)" }}
								/>
							</motion.div>
						),
					)}
				</div>
			</div>
		</section>
	);
}
