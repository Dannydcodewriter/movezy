"use client";

import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Magnetic, MaskReveal } from "@/components/ui/motion";

const stages = [
	{
		emoji: "📋",
		title: "One Quote, Both Jobs",
		desc: "Tell us about your move and the cleaning you need. You get a single upfront price covering everything.",
		tone: "amber",
	},
	{
		emoji: "📦",
		title: "Pack & Load",
		desc: "Our movers wrap, box and label your belongings, then load the truck with care.",
		tone: "amber",
	},
	{
		emoji: "🧽",
		title: "Move-Out Clean",
		desc: "Once the truck is loaded, our cleaners make your old place spotless and landlord-ready.",
		tone: "mint",
	},
	{
		emoji: "🚛",
		title: "Deliver & Place",
		desc: "Everything arrives at your freshly cleaned new home and goes exactly where you want it.",
		tone: "amber",
	},
	{
		emoji: "✨",
		title: "Settle Into Fresh",
		desc: "No dust, no leftover mess, no second company to chase. Just a clean start.",
		tone: "mint",
	},
] as const;

function Stage({
	stage,
	index,
	progress,
}: {
	stage: (typeof stages)[number];
	index: number;
	progress: MotionValue<number>;
}) {
	// Each stage "lights up" when the progress line reaches it
	const start = index / stages.length;
	const end = start + 0.12;
	const lit = useTransform(progress, [start, end], [0, 1]);
	const dotScale = useTransform(lit, [0, 1], [0.6, 1]);
	const glow = useTransform(lit, [0, 1], [0, 1]);
	const isMint = stage.tone === "mint";

	return (
		<motion.li
			initial={{ opacity: 0, x: 40 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
			className="relative pl-16 sm:pl-20"
		>
			{/* Node on the line */}
			<motion.span
				className={`absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center text-xl border ${
					isMint
						? "bg-mint-brand/15 border-mint-brand/40"
						: "bg-amber-brand/15 border-amber-brand/40"
				}`}
				style={{ scale: dotScale }}
			>
				<motion.span
					aria-hidden
					className={`absolute inset-0 rounded-2xl ${
						isMint ? "shadow-glow-mint" : "shadow-glow-amber"
					}`}
					style={{ opacity: glow }}
				/>
				<span className="relative">{stage.emoji}</span>
			</motion.span>

			<div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-colors">
				<p
					className={`font-mono text-[0.65rem] uppercase tracking-[2px] mb-2 ${
						isMint ? "text-mint-brand" : "text-amber-brand"
					}`}
				>
					Step {String(index + 1).padStart(2, "0")} ·{" "}
					{isMint ? "Cleaning" : "Moving"}
				</p>
				<h3 className="font-display font-bold text-white text-xl mb-2">
					{stage.title}
				</h3>
				<p className="font-body text-white/55 text-sm leading-relaxed font-light">
					{stage.desc}
				</p>
			</div>
		</motion.li>
	);
}

export default function MoveCleanSection() {
	const listRef = useRef<HTMLOListElement>(null);
	const { scrollYProgress } = useScroll({
		target: listRef,
		offset: ["start 75%", "end 55%"],
	});
	const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

	return (
		<section className="relative bg-navy-950 py-28 overflow-hidden">
			<div className="absolute inset-0 grid-pattern opacity-70" />
			<div className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full blur-[140px] bg-amber-brand/10 pointer-events-none" />
			<div className="absolute -right-40 bottom-0 w-[520px] h-[520px] rounded-full blur-[140px] bg-mint-brand/10 pointer-events-none" />

			<div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
				{/* Sticky intro */}
				<div className="lg:sticky lg:top-36 self-start">
					<Eyebrow tone="mint" center={false}>
						The Move + Clean Bundle
					</Eyebrow>
					<h2
						className="font-display font-black text-white leading-[1.05] mb-6"
						style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
					>
						<MaskReveal>One Booking.</MaskReveal>
						<MaskReveal delay={0.12}>
							<span className="text-gradient-mint italic">Two Jobs Done.</span>
						</MaskReveal>
					</h2>
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="font-body text-white/55 text-base leading-relaxed font-light max-w-md mb-8"
					>
						Moving out usually means hiring movers <em>and</em> cleaners, then
						hoping they don&apos;t clash. With MOVEZY, the same team handles
						both, on one schedule, so you can hand over the keys and walk into a
						spotless new home.
					</motion.p>

					<ul className="flex flex-col gap-3 mb-10">
						{[
							"One point of contact from start to finish",
							"Cleaning timed around your move, not the other way round",
							"One quote, one invoice, zero coordination headaches",
						].map((t, i) => (
							<motion.li
								key={t}
								initial={{ opacity: 0, x: -16 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 + i * 0.1 }}
								className="flex items-start gap-3 font-body text-sm text-white/75"
							>
								<span className="mt-0.5 w-5 h-5 rounded-full bg-mint-brand/20 text-mint-brand flex items-center justify-center flex-shrink-0">
									<Check size={12} strokeWidth={3} />
								</span>
								{t}
							</motion.li>
						))}
					</ul>

					<Magnetic strength={0.25}>
						<Link href="/get-a-quote?service=both">
							<motion.span
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-brand to-mint-brand text-navy-900 font-body font-bold px-8 py-4 rounded-2xl shadow-glow-mint"
							>
								Get a Move + Clean Quote <ArrowRight size={16} />
							</motion.span>
						</Link>
					</Magnetic>
				</div>

				{/* Timeline */}
				<div className="relative">
					{/* Track + scroll-driven fill */}
					<div className="absolute left-6 top-2 bottom-2 w-px bg-white/10" />
					<motion.div
						className="absolute left-6 top-2 bottom-2 w-[2px] -ml-[0.5px] origin-top bg-gradient-to-b from-amber-brand via-amber-400 to-mint-brand rounded-full"
						style={{ scaleY: progress }}
					/>
					<ol ref={listRef} className="relative flex flex-col gap-8">
						{stages.map((s, i) => (
							<Stage key={s.title} stage={s} index={i} progress={progress} />
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
