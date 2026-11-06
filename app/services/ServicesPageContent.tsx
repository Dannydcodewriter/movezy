"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowDown } from "lucide-react";
import CtaSection from "@/components/sections/CtaSection";
import { ServiceMedia } from "@/components/sections/ServicesSection";
import {
	movingServices,
	cleaningServices,
	type ServiceItem,
} from "@/lib/services";
import { Eyebrow, MaskReveal, TiltCard } from "@/components/ui/motion";

// Service photos live in /public/images/services/ and are set via the
// `image` field in lib/services.ts.

function ServiceRow({ s, i }: { s: ServiceItem; i: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	// Media drifts slower than the page for a subtle parallax
	const mediaY = useTransform(scrollYProgress, [0, 1], [22, -22]);
	const flip = i % 2 === 1;
	const isCleaning = s.category === "cleaning";

	return (
		<div
			id={s.id}
			ref={ref}
			className="scroll-mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
		>
			<motion.div
				initial={{ opacity: 0, x: flip ? 60 : -60 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
				className={flip ? "lg:order-2" : ""}
			>
				<TiltCard
					max={5}
					className="group rounded-3xl overflow-hidden shadow-card-xl"
				>
					<motion.div style={{ y: mediaY }} className="scale-[1.15]">
						<ServiceMedia service={s} height={360} iconSize={80} />
					</motion.div>
					<div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white font-body font-bold px-4 py-2 rounded-xl border border-white/15">
						{s.price}
					</div>
					{s.badge && (
						<div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white font-mono text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border border-white/20">
							{s.badge}
						</div>
					)}
				</TiltCard>
			</motion.div>

			<div className={flip ? "lg:order-1" : ""}>
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className={`font-mono text-[0.7rem] uppercase tracking-[2px] mb-3 ${
						isCleaning ? "text-mint-dark" : "text-sky-brand"
					}`}
				>
					{isCleaning ? "✨ Cleaning" : "🚛 Moving"} ·{" "}
					{String(i + 1).padStart(2, "0")}
				</motion.p>
				<h3
					className="font-display font-black text-navy-800 mb-4"
					style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
				>
					<MaskReveal>{s.title}</MaskReveal>
				</h3>
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className="font-body text-slate-500 text-base leading-relaxed font-light mb-7"
				>
					{s.desc}
				</motion.p>
				<motion.ul
					className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
					}}
				>
					{s.features.map((f) => (
						<motion.li
							key={f}
							variants={{
								hidden: { opacity: 0, x: -10 },
								show: { opacity: 1, x: 0 },
							}}
							className="flex items-start gap-2.5 font-body text-sm text-navy-700"
						>
							<span
								className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
									isCleaning
										? "bg-mint-light text-mint-dark"
										: "bg-green-50 text-green-600"
								}`}
							>
								<Check size={12} strokeWidth={3} />
							</span>
							{f}
						</motion.li>
					))}
				</motion.ul>
				<Link href={`/get-a-quote?service=${s.category}`}>
					<motion.span
						whileHover={{ scale: 1.02, y: -1 }}
						whileTap={{ scale: 0.97 }}
						className={`font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 transition-colors ${
							isCleaning
								? "bg-mint-brand text-navy-900 hover:bg-mint-dark hover:text-white"
								: "bg-amber-brand text-navy-800 hover:bg-amber-400"
						}`}
					>
						Get a Free Quote <ArrowRight size={16} />
					</motion.span>
				</Link>
			</div>
		</div>
	);
}

function CategoryHeader({
	id,
	eyebrow,
	title,
	accent,
	desc,
	tone,
}: {
	id: string;
	eyebrow: string;
	title: string;
	accent: string;
	desc: string;
	tone: "amber" | "mint";
}) {
	return (
		<div id={id} className="scroll-mt-40 text-center max-w-2xl mx-auto mb-20">
			<Eyebrow tone={tone === "mint" ? "mint" : "sky"}>{eyebrow}</Eyebrow>
			<h2
				className="font-display font-black text-navy-800 leading-tight mb-4"
				style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}
			>
				<MaskReveal>
					{title}{" "}
					<span
						className={`italic ${tone === "mint" ? "text-mint-dark" : "text-amber-brand"}`}
					>
						{accent}
					</span>
				</MaskReveal>
			</h2>
			<p className="font-body text-slate-500 font-light leading-relaxed">{desc}</p>
		</div>
	);
}

export default function ServicesPageContent() {
	const [activeCat, setActiveCat] = useState<"moving" | "cleaning">("moving");
	const cleaningRef = useRef<HTMLDivElement>(null);

	// Highlight the right tab in the sticky switcher as you scroll
	useEffect(() => {
		const el = cleaningRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				setActiveCat(
					entry.isIntersecting || entry.boundingClientRect.top < 0
						? "cleaning"
						: "moving",
				);
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return (
		<>
			{/* Hero */}
			<section className="relative mesh-bg pt-40 pb-28 overflow-hidden">
				<div className="absolute inset-0 grid-pattern" />
				<div className="absolute -right-32 top-20 w-[480px] h-[480px] rounded-full blur-[130px] bg-mint-brand/15 pointer-events-none" />
				<div className="absolute -left-32 bottom-0 w-[480px] h-[480px] rounded-full blur-[130px] bg-amber-brand/10 pointer-events-none" />

				<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-1.5 mb-6"
					>
						<span className="font-mono text-[0.68rem] font-medium text-white/80 uppercase tracking-[2px]">
							🚛 Moving <span className="text-amber-brand">·</span> ✨ Cleaning
						</span>
					</motion.div>
					<h1
						className="font-display font-black text-white leading-tight mb-5"
						style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)" }}
					>
						<MaskReveal delay={0.1}>Every Move. Every Clean.</MaskReveal>
						<MaskReveal delay={0.25}>
							<span className="text-gradient italic">Covered.</span>
						</MaskReveal>
					</h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="font-body text-white/60 text-lg font-light max-w-xl mx-auto mb-12"
					>
						Twelve services, one in-house team of trained movers and
						professional cleaners, built for Canada.
					</motion.p>

					{/* Two category cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto text-left">
						{[
							{
								href: "#moving",
								emoji: "🚛",
								title: "Moving Services",
								sub: "Residential, commercial, long-distance, packing, storage & specialty items.",
								ring: "hover:border-amber-brand/60",
								chip: "bg-amber-brand/15 text-amber-brand",
							},
							{
								href: "#cleaning",
								emoji: "✨",
								title: "Cleaning Services",
								sub: "Move-in/out, deep cleaning, regular home, office, post-renovation & carpets.",
								ring: "hover:border-mint-brand/60",
								chip: "bg-mint-brand/15 text-mint-brand",
							},
						].map((c, i) => (
							<motion.a
								key={c.href}
								href={c.href}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 + i * 0.1 }}
								whileHover={{ y: -6 }}
								className={`group glass rounded-3xl p-6 border border-white/10 transition-colors ${c.ring}`}
							>
								<span
									className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center text-2xl mb-4 ${c.chip}`}
								>
									{c.emoji}
								</span>
								<h2 className="font-display font-bold text-white text-xl mb-2">
									{c.title}
								</h2>
								<p className="font-body text-white/55 text-sm font-light leading-relaxed mb-4">
									{c.sub}
								</p>
								<span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-white/80 group-hover:text-white">
									Explore{" "}
									<motion.span
										animate={{ y: [0, 3, 0] }}
										transition={{ duration: 1.4, repeat: Infinity }}
									>
										<ArrowDown size={14} />
									</motion.span>
								</span>
							</motion.a>
						))}
					</div>
				</div>
			</section>

			{/* Sticky category switcher */}
			<div className="sticky top-[84px] z-30 flex justify-center pointer-events-none -mt-7">
				<div className="pointer-events-auto inline-flex bg-white/90 backdrop-blur-xl rounded-2xl p-1.5 shadow-card-hover border border-slate-100">
					{(["moving", "cleaning"] as const).map((c) => (
						<a
							key={c}
							href={`#${c}`}
							className={`relative px-6 sm:px-8 py-2.5 rounded-xl font-body font-bold text-sm transition-colors ${
								activeCat === c ? "text-white" : "text-slate-500 hover:text-navy-800"
							}`}
						>
							{activeCat === c && (
								<motion.span
									layoutId="services-page-cat"
									className={`absolute inset-0 rounded-xl ${
										c === "moving"
											? "bg-navy-800"
											: "bg-gradient-to-r from-mint-dark to-mint-brand"
									}`}
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
							<span className="relative">
								{c === "moving" ? "🚛 Moving" : "✨ Cleaning"}
							</span>
						</a>
					))}
				</div>
			</div>

			{/* Moving */}
			<section className="bg-white pt-24 pb-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<CategoryHeader
						id="moving"
						eyebrow="Moving Services"
						title="Every Move,"
						accent="Handled."
						desc="From a studio across town to an office across provinces, our trained, insured movers take care of every box and every detail."
						tone="amber"
					/>
					<div className="flex flex-col gap-28">
						{movingServices.map((s, i) => (
							<ServiceRow key={s.id} s={s} i={i} />
						))}
					</div>
				</div>
			</section>

			{/* Cleaning */}
			<section
				ref={cleaningRef}
				className="relative bg-gradient-to-b from-mint-light via-white to-white pt-24 pb-28 overflow-hidden"
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[140px] bg-mint-brand/15 pointer-events-none" />
				<div className="relative max-w-7xl mx-auto px-6 lg:px-8">
					<CategoryHeader
						id="cleaning"
						eyebrow="Cleaning Services"
						title="Every Corner,"
						accent="Spotless."
						desc="Professional cleaners who show up on time and leave your home or workplace fresh, whether you're moving or staying put."
						tone="mint"
					/>
					<div className="flex flex-col gap-28">
						{cleaningServices.map((s, i) => (
							<ServiceRow key={s.id} s={s} i={i} />
						))}
					</div>
				</div>
			</section>

			<CtaSection />
		</>
	);
}
