"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
	movingServices,
	cleaningServices,
	type ServiceCategory,
	type ServiceItem,
} from "@/lib/services";
import { Eyebrow, TiltCard, WordReveal } from "@/components/ui/motion";

const tabs: { id: ServiceCategory; label: string; emoji: string }[] = [
	{ id: "moving", label: "Moving", emoji: "🚛" },
	{ id: "cleaning", label: "Cleaning", emoji: "✨" },
];

/** Image, or an illustrated panel when no photo has been added yet. */
export function ServiceMedia({
	service,
	height = 190,
	iconSize = 54,
}: {
	service: ServiceItem;
	height?: number | string;
	iconSize?: number;
}) {
	const Icon = service.icon;
	const isCleaning = service.category === "cleaning";

	if (service.image) {
		return (
			<div className="relative overflow-hidden" style={{ height }}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={service.image}
					alt={service.title}
					className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
			</div>
		);
	}

	return (
		<div
			className={`relative overflow-hidden ${
				isCleaning
					? "bg-gradient-to-br from-mint-dark via-mint-brand to-sky-brand"
					: "bg-gradient-to-br from-navy-800 via-navy-600 to-sky-brand"
			}`}
			style={{ height }}
		>
			<div className="absolute inset-0 grid-pattern opacity-40" />
			{/* Floating bubbles */}
			{[
				{ l: "12%", s: 26, d: 0 },
				{ l: "70%", s: 18, d: 1.1 },
				{ l: "40%", s: 12, d: 2 },
				{ l: "85%", s: 30, d: 0.6 },
			].map((b, i) => (
				<motion.span
					key={i}
					aria-hidden
					className="absolute bottom-[-20%] rounded-full border border-white/40 bg-white/10"
					style={{ left: b.l, width: b.s, height: b.s }}
					animate={{ y: [0, -220], opacity: [0, 0.9, 0] }}
					transition={{
						duration: 5,
						repeat: Infinity,
						delay: b.d,
						ease: "easeOut",
					}}
				/>
			))}
			<div className="absolute inset-0 flex items-center justify-center">
				<motion.div
					className="w-24 h-24 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-2xl"
					whileHover={{ rotate: -6, scale: 1.08 }}
					transition={{ type: "spring", stiffness: 300, damping: 15 }}
				>
					<Icon size={iconSize * 0.75} strokeWidth={1.5} />
				</motion.div>
			</div>
			<div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
		</div>
	);
}

export default function ServicesSection() {
	const [tab, setTab] = useState<ServiceCategory>("moving");
	const list = tab === "moving" ? movingServices : cleaningServices;

	return (
		<section id="services" className="bg-white py-28 relative overflow-hidden">
			{/* Soft colour wash that changes with the tab */}
			<motion.div
				aria-hidden
				className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none"
				animate={{
					backgroundColor:
						tab === "moving"
							? "rgba(232,160,32,0.10)"
							: "rgba(25,195,166,0.14)",
				}}
				transition={{ duration: 0.8 }}
			/>

			<div className="relative max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<Eyebrow>Our Services</Eyebrow>
					<h2
						className="font-display font-black text-navy-800 leading-tight mb-5"
						style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
					>
						<WordReveal text="Two Services." />{" "}
						<WordReveal
							text="One Trusted Team."
							delay={0.2}
							wordClassName="italic text-amber-brand"
						/>
					</h2>
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="text-slate-500 font-body text-base font-light max-w-xl mx-auto leading-relaxed"
					>
						From studio apartments to corporate relocations, and from move-out
						scrubs to weekly home cleans, our trained crews handle it all.
					</motion.p>
				</div>

				{/* Tabs */}
				<div className="flex justify-center mb-12">
					<div
						role="tablist"
						aria-label="Service category"
						className="relative inline-flex bg-slate-100 rounded-2xl p-1.5"
					>
						{tabs.map((t) => {
							const active = tab === t.id;
							return (
								<button
									key={t.id}
									role="tab"
									aria-selected={active}
									onClick={() => setTab(t.id)}
									className={`relative px-6 sm:px-10 py-3 rounded-xl font-body font-bold text-sm transition-colors ${
										active ? "text-white" : "text-slate-500 hover:text-navy-800"
									}`}
								>
									{active && (
										<motion.span
											layoutId="services-tab"
											className={`absolute inset-0 rounded-xl shadow-card ${
												t.id === "moving"
													? "bg-navy-800"
													: "bg-gradient-to-r from-mint-dark to-mint-brand"
											}`}
											transition={{ type: "spring", stiffness: 380, damping: 30 }}
										/>
									)}
									<span className="relative">
										{t.emoji} {t.label}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* Grid */}
				<motion.div
					layout
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 [perspective:1200px]"
				>
					<AnimatePresence mode="popLayout">
						{list.map((s, i) => (
							<motion.div
								key={s.id}
								layout
								initial={{ opacity: 0, y: 40, scale: 0.95 }}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									transition: { duration: 0.5, delay: i * 0.06 },
								}}
								exit={{
									opacity: 0,
									scale: 0.92,
									transition: { duration: 0.2 },
								}}
							>
								<TiltCard className="group h-full rounded-3xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden border border-slate-100">
									<Link href={`/services#${s.id}`} className="flex flex-col h-full">
										<div className="relative">
											<ServiceMedia service={s} />
											<div className="absolute bottom-3 right-4">
												<span className="font-mono text-white text-sm font-semibold drop-shadow">
													{s.price}
												</span>
											</div>
											{s.badge && (
												<div className="absolute top-3 left-3 bg-black/35 backdrop-blur-sm text-white font-mono text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/20">
													{s.badge}
												</div>
											)}
											<motion.div
												className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-navy-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
												whileHover={{ rotate: 45 }}
											>
												<ArrowUpRight size={16} />
											</motion.div>
										</div>

										<div className="p-6 flex flex-col flex-1">
											<h3
												className={`font-display font-bold text-navy-800 text-xl mb-2 transition-colors ${
													s.category === "cleaning"
														? "group-hover:text-mint-dark"
														: "group-hover:text-amber-dark"
												}`}
											>
												{s.title}
											</h3>
											<p className="font-body text-slate-500 text-sm leading-relaxed font-light mb-5 flex-1">
												{s.short}
											</p>
											<span
												className={`inline-flex items-center gap-1.5 font-body font-semibold text-sm group-hover:gap-3 transition-all duration-200 ${
													s.category === "cleaning"
														? "text-mint-dark"
														: "text-sky-brand"
												}`}
											>
												Learn More <ArrowRight size={14} />
											</span>
										</div>
									</Link>
								</TiltCard>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* CTA */}
				<div className="text-center">
					<Link href="/services">
						<motion.span
							whileHover={{ scale: 1.03, y: -2 }}
							whileTap={{ scale: 0.97 }}
							className="bg-navy-800 text-white font-body font-bold text-sm px-8 py-4 rounded-2xl shadow-card hover:bg-navy-700 transition-colors inline-flex items-center gap-2"
						>
							View All Services <ArrowRight size={16} />
						</motion.span>
					</Link>
				</div>
			</div>
		</section>
	);
}
