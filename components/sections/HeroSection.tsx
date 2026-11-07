"use client";

import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import {
	ArrowRight,
	Star,
	Truck,
	Clock,
	ChevronDown,
	Sparkles,
} from "lucide-react";
import AddressAutocomplete from "@/components/ui/AddressAutocomplete";
import { Magnetic, MaskReveal } from "@/components/ui/motion";

// ── Custom dropdown (dark theme) ─────────────────────────────────────────────
function CustomSelect({
	value,
	onChange,
	placeholder,
	options,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
	options: string[];
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const close = (e: globalThis.MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node))
				setOpen(false);
		};
		document.addEventListener("mousedown", close);
		return () => document.removeEventListener("mousedown", close);
	}, []);

	return (
		<div ref={ref} className="relative w-full">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-body flex items-center justify-between gap-2 cursor-pointer focus:outline-none focus:border-amber-brand/60 transition-all hover:bg-white/15 hover:border-white/30"
			>
				<span
					className="text-white"
					style={{ fontWeight: value ? 500 : 400, opacity: value ? 1 : 0.85 }}
				>
					{value || placeholder}
				</span>
				<ChevronDown
					size={14}
					className={`flex-shrink-0 text-white/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.ul
						initial={{ opacity: 0, y: -4, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.12 }}
						className="absolute z-50 top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden shadow-2xl bg-navy-800 border border-white/15"
					>
						{options.map((opt) => (
							<li key={opt}>
								<button
									type="button"
									onClick={() => {
										onChange(opt);
										setOpen(false);
									}}
									className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors ${
										value === opt
											? "text-amber-brand font-semibold bg-amber-brand/10"
											: "text-white/90 hover:bg-white/10"
									}`}
								>
									{opt}
								</button>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
}

// ── Data ─────────────────────────────────────────────────────────────────────
type ServiceMode = "moving" | "cleaning" | "both";

const modes: { id: ServiceMode; label: string; emoji: string }[] = [
	{ id: "moving", label: "Moving", emoji: "🚛" },
	{ id: "cleaning", label: "Cleaning", emoji: "✨" },
	{ id: "both", label: "Move + Clean", emoji: "🏡" },
];

const trustBadges = [
	{ icon: Star, text: "Google 4.9★", sub: "100+ reviews" },
	{ icon: Clock, text: "< 30 Min", sub: "Quote response" },
	{ icon: Truck, text: "300+ Moves", sub: "And counting" },
	{ icon: Sparkles, text: "Move + Clean", sub: "One team, one booking" },
];

const homeSizes = [
	"Studio",
	"1 Bedroom",
	"2 Bedrooms",
	"3 Bedrooms",
	"4+ Bedrooms",
	"Office",
];

// Fixed positions so server and client render identically
const sparkles = [
	{ top: "18%", left: "12%", size: 14, delay: 0 },
	{ top: "28%", left: "84%", size: 18, delay: 1.2 },
	{ top: "62%", left: "8%", size: 10, delay: 2.1 },
	{ top: "72%", left: "90%", size: 12, delay: 0.6 },
	{ top: "40%", left: "4%", size: 8, delay: 1.8 },
	{ top: "14%", left: "66%", size: 10, delay: 2.6 },
	{ top: "82%", left: "24%", size: 9, delay: 3.1 },
	{ top: "50%", left: "95%", size: 8, delay: 0.9 },
];

const EASE = [0.23, 1, 0.32, 1] as const;

export default function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [mode, setMode] = useState<ServiceMode>("moving");
	const [fromAddress, setFromAddress] = useState("");
	const [toAddress, setToAddress] = useState("");
	const [homeSize, setHomeSize] = useState("");

	// Cursor-reactive background glows
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const smx = useSpring(mx, { stiffness: 40, damping: 20 });
	const smy = useSpring(my, { stiffness: 40, damping: 20 });
	const orb1x = useTransform(smx, (v) => v * 40);
	const orb1y = useTransform(smy, (v) => v * 40);
	const orb2x = useTransform(smx, (v) => v * -60);
	const orb2y = useTransform(smy, (v) => v * -60);
	const orb3x = useTransform(smx, (v) => v * 25);
	const orb3y = useTransform(smy, (v) => v * -35);

	const onMouseMove = (e: MouseEvent<HTMLElement>) => {
		const r = e.currentTarget.getBoundingClientRect();
		mx.set((e.clientX - r.left) / r.width - 0.5);
		my.set((e.clientY - r.top) / r.height - 0.5);
	};

	const quoteHref = (() => {
		const params = new URLSearchParams({ service: mode });
		if (fromAddress) params.set("from", fromAddress);
		if (toAddress && mode !== "cleaning") params.set("to", toAddress);
		if (homeSize) params.set("size", homeSize);
		return `/get-a-quote?${params.toString()}`;
	})();

	return (
		<section
			ref={sectionRef}
			onMouseMove={onMouseMove}
			className="relative min-h-screen flex flex-col overflow-hidden"
		>
			<div className="absolute inset-0 mesh-bg" />
			<div className="absolute inset-0 grid-pattern opacity-60" />

			{/* Glows that drift with the cursor */}
			<motion.div
				aria-hidden
				className="absolute top-[15%] left-[15%] w-[600px] h-[600px] rounded-full pointer-events-none"
				style={{
					x: orb1x,
					y: orb1y,
					background:
						"radial-gradient(circle, rgba(46,134,193,0.22) 0%, transparent 70%)",
				}}
			/>
			<motion.div
				aria-hidden
				className="absolute bottom-[10%] right-[15%] w-[520px] h-[520px] rounded-full pointer-events-none"
				style={{
					x: orb2x,
					y: orb2y,
					background:
						"radial-gradient(circle, rgba(232,160,32,0.16) 0%, transparent 70%)",
				}}
			/>
			<motion.div
				aria-hidden
				className="absolute top-[35%] right-[30%] w-[420px] h-[420px] rounded-full pointer-events-none"
				animate={{ opacity: mode === "moving" ? 0.35 : 1 }}
				transition={{ duration: 0.8 }}
				style={{
					x: orb3x,
					y: orb3y,
					background:
						"radial-gradient(circle, rgba(25,195,166,0.16) 0%, transparent 70%)",
				}}
			/>

			{/* Twinkling sparkles */}
			{sparkles.map((s, i) => (
				<motion.span
					key={i}
					aria-hidden
					className="absolute pointer-events-none text-mint-brand/70 select-none"
					style={{ top: s.top, left: s.left, fontSize: s.size }}
					animate={{
						opacity: [0, 1, 0],
						scale: [0.4, 1, 0.4],
						rotate: [0, 90, 180],
					}}
					transition={{
						duration: 3.2,
						repeat: Infinity,
						delay: s.delay,
						ease: "easeInOut",
					}}
				>
					✦
				</motion.span>
			))}

			<div
				aria-hidden
				className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
				}}
			/>

			{/* Hero content stays fully visible while scrolling — the quote card lives here */}
			<div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-40 pb-28">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: EASE }}
					className="flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 mb-8"
				>
					<span className="flex items-center gap-1 bg-amber-brand text-navy-800 rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider">
						New
					</span>
					<span className="font-mono text-[0.68rem] font-medium text-white/80 uppercase tracking-[2px]">
						🇨🇦 Moving <span className="text-amber-brand">&</span> Cleaning
						<span className="hidden sm:inline"> Across Canada</span>
					</span>
				</motion.div>

				{/* Headline — each line rises out of a mask */}
				<h1
					className="font-display font-black text-center text-white leading-[1.02] tracking-tight max-w-5xl mb-7"
					style={{ fontSize: "clamp(2.8rem, 7.5vw, 6rem)" }}
				>
					<MaskReveal delay={0.1}>We Move It.</MaskReveal>
					<MaskReveal delay={0.25}>
						<span className="text-gradient-mint">We Clean It.</span>
					</MaskReveal>
					<MaskReveal delay={0.4}>
						<span className="relative inline-block">
							<span className="italic text-gradient">You Just Relax.</span>
							<motion.span
								className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-brand via-amber-400 to-mint-brand rounded-full"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
								style={{ transformOrigin: "left" }}
							/>
						</span>
					</MaskReveal>
				</h1>

				{/* Subheadline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
					className="font-body text-white/60 text-center text-lg font-light leading-relaxed max-w-2xl mb-10"
				>
					Canada&apos;s in-house team of trained, insured movers{" "}
					<span className="text-white/90">and</span> professional cleaners.
					Book your move, your clean, or both, with one upfront quote and zero
					hidden fees.
				</motion.p>

				{/* Quick quote card */}
				<motion.div
					initial={{ opacity: 0, y: 30, scale: 0.97 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
					className="relative z-20 w-full max-w-2xl glass rounded-3xl p-5 sm:p-6 shadow-card-xl mb-10"
				>
					{/* Service switcher — the pill slides between options */}
					<div
						role="tablist"
						aria-label="Choose a service"
						className="relative grid grid-cols-3 gap-1 bg-white/5 border border-white/10 rounded-2xl p-1 mb-4"
					>
						{modes.map((m) => {
							const active = mode === m.id;
							return (
								<button
									key={m.id}
									type="button"
									role="tab"
									aria-selected={active}
									onClick={() => setMode(m.id)}
									className={`relative z-10 py-2.5 rounded-xl font-body font-semibold text-xs sm:text-sm transition-colors ${
										active ? "text-navy-800" : "text-white/70 hover:text-white"
									}`}
								>
									{active && (
										<motion.span
											layoutId="hero-mode-pill"
											className={`absolute inset-0 rounded-xl -z-10 ${
												m.id === "cleaning"
													? "bg-mint-brand"
													: m.id === "both"
														? "bg-gradient-to-r from-amber-brand to-mint-brand"
														: "bg-amber-brand"
											}`}
											transition={{ type: "spring", stiffness: 400, damping: 32 }}
										/>
									)}
									<span className="mr-1.5">{m.emoji}</span>
									{m.label}
								</button>
							);
						})}
					</div>

					{/* Fields change with the selected service */}
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={mode === "cleaning" ? "clean" : "move"}
							className="relative z-20"
							initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
							transition={{ duration: 0.25 }}
						>
							{mode === "cleaning" ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
									<AddressAutocomplete
										value={fromAddress}
										onChange={setFromAddress}
										placeholder="Address to be cleaned..."
										theme="dark"
									/>
									<CustomSelect
										value={homeSize}
										onChange={setHomeSize}
										placeholder="🏡 Home Size..."
										options={homeSizes}
									/>
								</div>
							) : (
								<>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
										<AddressAutocomplete
											value={fromAddress}
											onChange={setFromAddress}
											placeholder="Moving from..."
											theme="dark"
										/>
										<AddressAutocomplete
											value={toAddress}
											onChange={setToAddress}
											placeholder="Moving to..."
											theme="dark"
										/>
									</div>
									<div className="mb-3">
										<CustomSelect
											value={homeSize}
											onChange={setHomeSize}
											placeholder="🏡 Home Size..."
											options={homeSizes}
										/>
									</div>
								</>
							)}
						</motion.div>
					</AnimatePresence>

					<Link href={quoteHref} className="block mb-3">
						<motion.span
							whileHover={{ scale: 1.015 }}
							whileTap={{ scale: 0.98 }}
							className={`relative overflow-hidden w-full font-body font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors ${
								mode === "cleaning"
									? "bg-mint-brand text-navy-900 shadow-glow-mint"
									: "bg-amber-brand text-navy-800 shadow-glow-amber"
							}`}
						>
							{/* Shine sweep */}
							<motion.span
								aria-hidden
								className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
								initial={{ x: "-150%" }}
								animate={{ x: "350%" }}
								transition={{
									duration: 1.6,
									repeat: Infinity,
									repeatDelay: 2.4,
									ease: "easeInOut",
								}}
							/>
							<span className="relative">
								{mode === "moving"
									? "Get My Free Moving Quote"
									: mode === "cleaning"
										? "Get My Free Cleaning Quote"
										: "Get My Move + Clean Quote"}
							</span>
							<ArrowRight size={16} className="relative" />
						</motion.span>
					</Link>

					<p className="text-white/35 text-[0.72rem] text-center font-mono">
						No commitment · 100% free · PIPEDA compliant
					</p>
				</motion.div>

				{/* Trust badges */}
				<motion.div
					className="flex flex-wrap items-center justify-center gap-3"
					initial="hidden"
					animate="show"
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.08, delayChildren: 1 } },
					}}
				>
					{trustBadges.map(({ icon: Icon, text, sub }) => (
						<motion.div
							key={text}
							variants={{
								hidden: { opacity: 0, y: 12 },
								show: { opacity: 1, y: 0 },
							}}
							whileHover={{ y: -3 }}
							className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5"
						>
							<Icon size={14} className="text-amber-brand flex-shrink-0" />
							<div>
								<p className="font-body font-semibold text-white text-[0.78rem] leading-none">
									{text}
								</p>
								<p className="font-body text-white/40 text-[0.65rem] mt-0.5">
									{sub}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Truck drives by, leaving a trail of sparkles */}
			<div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none h-12">
				<motion.div
					className="absolute bottom-1 flex items-end gap-1"
					style={{ willChange: "transform" }}
					animate={{ x: ["-20vw", "110vw"] }}
					transition={{
						duration: 16,
						repeat: Infinity,
						ease: "linear",
						delay: 2,
					}}
				>
					<span className="flex gap-1 text-mint-brand/80 text-xs mb-2">
						{[0, 1, 2].map((i) => (
							<motion.span
								key={i}
								animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
								transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
							>
								✦
							</motion.span>
						))}
					</span>
					<span className="text-3xl -scale-x-100">🚛</span>
				</motion.div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-14 w-full flex flex-col items-center gap-1"
				animate={{ y: [0, 6, 0] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
			>
				<span className="font-mono text-[0.6rem] text-white/30 tracking-widest uppercase">
					Scroll
				</span>
				<ChevronDown size={16} className="text-white/30" />
			</motion.div>

			{/* Magnetic floating call button on large screens */}
			<div className="hidden xl:block absolute right-10 bottom-24 z-10">
				<Magnetic>
					<motion.a
						href="tel:+16476977140"
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
						className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-white/80 hover:text-navy-800 hover:bg-amber-brand transition-colors"
					>
						<span className="text-lg">📞</span>
						<span className="font-mono text-[0.55rem] uppercase tracking-widest mt-1">
							Call us
						</span>
					</motion.a>
				</Magnetic>
			</div>
		</section>
	);
}
