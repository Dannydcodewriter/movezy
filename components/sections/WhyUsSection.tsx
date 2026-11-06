"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { SpotlightCard, WordReveal } from "@/components/ui/motion";
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
		desc: "Every mover and cleaner on our team is background-checked, trained and insured, so you know exactly who is in your home.",
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
		desc: "Real reviews from real customers. We only display genuine feedback from people who have used MOVEZY’s moving and cleaning services.",
		color: "from-green-500/20 to-green-500/5",
		iconBg: "bg-green-500/15 text-green-500",
		num: "03",
	},
	{
		icon: Clock,
		title: "< 30 Min Response",
		desc: "Send us your move or cleaning details and get a clear, upfront quote from our team in less than 30 minutes.",
		color: "from-mint-brand/20 to-mint-brand/5",
		iconBg: "bg-mint-brand/15 text-mint-brand",
		num: "04",
	},
	{
		icon: MapPin,
		title: "Local Know-How",
		desc: "From condo elevator bookings and parking to landlord move-out checklists, our team knows city moves and cleans inside out.",
		color: "from-rose-500/20 to-rose-500/5",
		iconBg: "bg-rose-500/15 text-rose-400",
		num: "05",
	},
	{
		icon: Headphones,
		title: "7-Day Live Support",
		desc: "Our team is available every day to support you before, during and after your move or clean.",
		color: "from-sky-brand/20 to-amber-brand/10",
		iconBg: "bg-navy-600/15 text-navy-400",
		num: "06",
	},
];

export default function WhyUsSection() {
	const ref = useRef(null);

	return (
		<section ref={ref} className="bg-navy-900 py-28 relative overflow-hidden">
			{/* BG pattern */}
			<div className="absolute inset-0 grid-pattern" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] bg-sky-brand/10 pointer-events-none" />

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
					<div>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="flex items-center gap-3 mb-4"
						>
							<div className="w-8 h-0.5 bg-amber-brand rounded-full" />
							<span className="font-mono text-[0.7rem] font-medium text-amber-brand uppercase tracking-[2px]">
								Why MOVEZY
							</span>
						</motion.div>
						<h2
							className="font-display font-black text-white leading-tight"
							style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
						>
							<WordReveal text="The Moving & Cleaning Company" />
							<br />
							<WordReveal
								text="Canada Trusts."
								delay={0.3}
								wordClassName="text-gradient italic"
							/>
						</h2>
					</div>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white/50 font-body text-base leading-relaxed max-w-md font-light"
					>
						We didn&apos;t reinvent moving and cleaning, we fixed everything
						wrong with them. Transparency, accountability, and real customer
						protection built into every step.
					</motion.p>
				</div>

				{/* Feature grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{features.map(({ icon: Icon, title, desc, color, iconBg, num }, i) => (
						<SpotlightCard
							key={title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
							whileHover={{ y: -4 }}
							className={`bg-gradient-to-br ${color} border border-white/10 rounded-3xl p-7 cursor-default`}
						>
							{/* Faded number */}
							<span className="absolute top-4 right-5 font-display font-black text-6xl text-white/[0.05] leading-none select-none">
								{num}
							</span>
							{/* Icon */}
							<motion.div
								className={`relative w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5`}
								whileHover={{ rotate: [0, -12, 10, 0], scale: 1.1 }}
								transition={{ duration: 0.5 }}
							>
								<Icon size={22} strokeWidth={1.8} />
							</motion.div>
							<h3 className="relative font-display font-bold text-white text-lg mb-3 leading-tight">
								{title}
							</h3>
							<p className="relative font-body text-white/55 text-sm leading-relaxed font-light">
								{desc}
							</p>
						</SpotlightCard>
					))}
				</div>
			</div>
		</section>
	);
}
