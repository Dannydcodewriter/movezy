// // "use client";

// // import { motion } from "framer-motion";
// // import { useRef, useState } from "react";
// // import Link from "next/link";
// // import {
// // 	ArrowRight,
// // 	Star,
// // 	Shield,
// // 	Truck,
// // 	Clock,
// // 	ChevronDown,
// // } from "lucide-react";

// // const trustBadges = [
// // 	{ icon: Star, text: "Google 4.9★", sub: "2,400+ reviews" },
// // 	{ icon: Shield, text: "WSIB Insured", sub: "All movers verified" },
// // 	{ icon: Clock, text: "< 2 Hr Response", sub: "Match guaranteed" },
// // 	{ icon: Truck, text: "13K+ Moves", sub: "And counting" },
// // ];

// // const cities = [
// // 	"Toronto",
// // 	"Vancouver",
// // 	"Montreal",
// // 	"Calgary",
// // 	"Ottawa",
// // 	"Edmonton",
// // 	"Winnipeg",
// // 	"Halifax",
// // ];

// // // Stagger variants — defined once outside the component so they are never
// // // re-created on re-render.
// // const containerVariants = {
// // 	hidden: {},
// // 	show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
// // };

// // const itemVariants = {
// // 	hidden: { opacity: 0, y: 24 },
// // 	show: {
// // 		opacity: 1,
// // 		y: 0,
// // 		transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
// // 	},
// // };

// // export default function HeroSection() {
// // 	const [fromCity, setFromCity] = useState("");
// // 	const [toCity, setToCity] = useState("");
// // 	const [homeSize, setHomeSize] = useState("");

// // 	return (
// // 		<section className="relative min-h-screen flex flex-col overflow-hidden">
// // 			{/* ── BACKGROUND ───────────────────────────────────────────────────────
// //           Static mesh + grid — zero animation cost. The two previous animated
// //           blur orbs (600 px + 500 px with blur-[120px]) were the #1 cause of
// //           jank. Replaced with static radial-gradient pseudo-orbs that look
// //           identical but cost nothing to render.
// //       ──────────────────────────────────────────────────────────────────────── */}
// // 			<div className="absolute inset-0 mesh-bg" />
// // 			<div className="absolute inset-0 grid-pattern opacity-60" />

// // 			{/* Static decorative orbs — CSS only, no JS animation */}
// // 			<div
// // 				className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
// // 				style={{
// // 					background:
// // 						"radial-gradient(circle, rgba(46,134,193,0.18) 0%, transparent 70%)",
// // 					// transform promotes to its own compositor layer — no layout cost
// // 					transform: "translateZ(0)",
// // 				}}
// // 			/>
// // 			<div
// // 				className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
// // 				style={{
// // 					background:
// // 						"radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%)",
// // 					transform: "translateZ(0)",
// // 				}}
// // 			/>

// // 			{/* Noise overlay — static SVG, no cost */}
// // 			<div
// // 				className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
// // 				style={{
// // 					backgroundImage:
// // 						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
// // 					transform: "translateZ(0)",
// // 				}}
// // 			/>

// // 			{/* ── MAIN CONTENT ─────────────────────────────────────────────────────
// //           Previously this entire block was wrapped in a <motion.div
// //           style={{ y, opacity }}> that recalculated on every scroll event
// //           using useScroll + useTransform. Removed — the gain was purely
// //           cosmetic but the cost was a scroll-jank tax on every frame.
// //       ──────────────────────────────────────────────────────────────────────── */}
// // 			<motion.div
// // 				className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-40 pb-24"
// // 				variants={containerVariants}
// // 				initial="hidden"
// // 				animate="show"
// // 			>
// // 				{/* Badge */}
// // 				<motion.div
// // 					variants={itemVariants}
// // 					className="flex items-center gap-2 mb-8"
// // 				>
// // 					<div className="flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5">
// // 						{/* pulse-amber is a pure CSS animation — no Framer cost */}
// // 						<span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse-amber" />
// // 						<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
// // 							🇨🇦 Canada's #1 Moving Platform
// // 						</span>
// // 					</div>
// // 				</motion.div>

// // 				{/* Headline */}
// // 				<motion.h1
// // 					variants={itemVariants}
// // 					className="font-display font-black text-center text-white leading-[1.05] tracking-tight max-w-4xl mb-6"
// // 					style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
// // 				>
// // 					Move Anywhere <span className="italic text-gradient">in Canada</span>
// // 					<br />
// // 					<span className="text-white/90">With Total</span>{" "}
// // 					<span className="relative inline-block">
// // 						<span className="text-gradient">Confidence.</span>
// // 						{/* Underline animates once on load — not on every scroll */}
// // 						<motion.span
// // 							className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-brand to-amber-400 rounded-full"
// // 							initial={{ scaleX: 0 }}
// // 							animate={{ scaleX: 1 }}
// // 							transition={{
// // 								duration: 0.6,
// // 								delay: 0.7,
// // 								ease: [0.23, 1, 0.32, 1],
// // 							}}
// // 							style={{ transformOrigin: "left" }}
// // 						/>
// // 					</span>
// // 				</motion.h1>

// // 				{/* Subheadline */}
// // 				<motion.p
// // 					variants={itemVariants}
// // 					className="font-body text-white/60 text-center text-lg font-light leading-relaxed max-w-xl mb-10"
// // 				>
// // 					Compare quotes from vetted, insured Canadian movers in minutes. Real
// // 					prices. Verified reviews. Zero hidden fees.
// // 				</motion.p>

// // 				{/* ── QUICK QUOTE CARD ───────────────────────────────────────────────
// //             Removed backdrop-blur-sm — blur filters force the browser to
// //             create a new stacking context and compositing layer for every
// //             element that uses them. With 4+ blurred elements visible at once
// //             this was a significant frame-rate hit.
// //         ────────────────────────────────────────────────────────────────────── */}
// // 				<motion.div
// // 					variants={itemVariants}
// // 					className="w-full max-w-2xl glass rounded-3xl p-6 shadow-card-xl mb-10"
// // 				>
// // 					<p className="font-body font-semibold text-white/70 text-sm mb-4 text-center tracking-wide">
// // 						⚡ Get Your Free Quotes in 3 Minutes
// // 					</p>
// // 					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4          ">
// // 						<select
// // 							value={fromCity}
// // 							onChange={(e) => setFromCity(e.target.value)}
// // 							className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm font-body appearance-none cursor-pointer focus:outline-none focus:border-amber-brand/60 transition-colors"
// // 						>
// // 							<option value="" disabled>
// // 								📍 Moving From...
// // 							</option>
// // 							{cities.map((c) => (
// // 								<option key={c} value={c} className="text-navy-800">
// // 									{c}
// // 								</option>
// // 							))}
// // 						</select>

// // 						<select
// // 							value={toCity}
// // 							onChange={(e) => setToCity(e.target.value)}
// // 							className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm font-body appearance-none cursor-pointer focus:outline-none focus:border-amber-brand/60 transition-colors"
// // 						>
// // 							<option value="" disabled>
// // 								🏠 Moving To...
// // 							</option>
// // 							{cities.map((c) => (
// // 								<option key={c} value={c} className="text-navy-800">
// // 									{c}
// // 								</option>
// // 							))}
// // 						</select>

// // 						<select
// // 							value={homeSize}
// // 							onChange={(e) => setHomeSize(e.target.value)}
// // 							className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-sm font-body appearance-none cursor-pointer focus:outline-none focus:border-amber-brand/60 transition-colors"
// // 						>
// // 							<option value="" disabled>
// // 								🏡 Home Size...
// // 							</option>
// // 							<option className="text-navy-800">Studio</option>
// // 							<option className="text-navy-800">1 Bedroom</option>
// // 							<option className="text-navy-800">2 Bedrooms</option>
// // 							<option className="text-navy-800">3 Bedrooms</option>
// // 							<option className="text-navy-800">4+ Bedrooms</option>
// // 							<option className="text-navy-800">Office</option>
// // 						</select>
// // 					</div>

// // 					<Link href="/get-a-quote">
// // 						<motion.button
// // 							whileHover={{ scale: 1.02 }}
// // 							whileTap={{ scale: 0.97 }}
// // 							className="w-full bg-amber-brand text-navy-800 font-body font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow-amber hover:bg-amber-400 transition-colors"
// // 						>
// // 							Get My Free Quotes <ArrowRight size={18} />
// // 						</motion.button>
// // 					</Link>

// // 					<p className="text-white/30 text-[0.72rem] text-center mt-3 font-mono">
// // 						No commitment · 100% free · PIPEDA compliant
// // 					</p>
// // 				</motion.div>

// // 				{/* Trust badges — removed backdrop-blur-sm from each badge */}
// // 				<motion.div
// // 					variants={itemVariants}
// // 					className="flex flex-wrap items-center justify-center gap-4"
// // 				>
// // 					{trustBadges.map(({ icon: Icon, text, sub }) => (
// // 						<div
// // 							key={text}
// // 							className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5"
// // 						>
// // 							<Icon size={14} className="text-amber-brand flex-shrink-0" />
// // 							<div>
// // 								<p className="font-body font-semibold text-white text-[0.78rem] leading-none">
// // 									{text}
// // 								</p>
// // 								<p className="font-body text-white/40 text-[0.65rem] mt-0.5">
// // 									{sub}
// // 								</p>
// // 							</div>
// // 						</div>
// // 					))}
// // 				</motion.div>
// // 			</motion.div>

// // 			{/* ── ANIMATED TRUCK ───────────────────────────────────────────────────
// //           Previously used calc(100vw + 160px) as a keyframe value which
// //           forces the browser to resolve vw units on every animation frame
// //           (a layout recalculation). Fixed by using a large fixed px value
// //           instead, which is compositor-only and never triggers layout.
// //       ──────────────────────────────────────────────────────────────────────── */}
// // 			<div className="absolute bottom-16 left-0 right-0 overflow-hidden pointer-events-none h-12">
// // 				<motion.div
// // 					className="absolute text-4xl"
// // 					style={{ willChange: "transform" }}
// // 					animate={{ x: [-160, 2200] }}
// // 					transition={{
// // 						duration: 18,
// // 						repeat: Infinity,
// // 						ease: "linear",
// // 						delay: 2,
// // 					}}
// // 				>
// // 					🚛
// // 				</motion.div>
// // 				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
// // 			</div>

// // 			{/* Scroll indicator — lightweight CSS-driven bob */}
// // 			<motion.div
// // 				className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
// // 				animate={{ y: [0, 6, 0] }}
// // 				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
// // 				style={{ willChange: "transform" }}
// // 			>
// // 				<span className="font-mono text-[0.6rem] text-white/30 tracking-widest uppercase">
// // 					Scroll
// // 				</span>
// // 				<ChevronDown size={16} className="text-white/30" />
// // 			</motion.div>
// // 		</section>
// // 	);
// // }

// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import Link from "next/link";
// import {
// 	ArrowRight,
// 	Star,
// 	Shield,
// 	Truck,
// 	Clock,
// 	ChevronDown,
// } from "lucide-react";

// function CustomSelect({
// 	value,
// 	onChange,
// 	placeholder,
// 	options,
// }: {
// 	value: string;
// 	onChange: (v: string) => void;
// 	placeholder: string;
// 	options: string[];
// }) {
// 	const [open, setOpen] = useState(false);
// 	const ref = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const close = (e: MouseEvent) => {
// 			if (ref.current && !ref.current.contains(e.target as Node))
// 				setOpen(false);
// 		};
// 		document.addEventListener("mousedown", close);
// 		return () => document.removeEventListener("mousedown", close);
// 	}, []);

// 	return (
// 		<div ref={ref} className="relative w-full">
// 			<button
// 				type="button"
// 				onClick={() => setOpen((o) => !o)}
// 				className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-body flex items-center justify-between gap-2 cursor-pointer focus:outline-none focus:border-amber-brand/60 transition-all hover:bg-white/15 hover:border-white/30"
// 			>
// 				<span
// 					style={{
// 						color: "#ffffff",
// 						fontWeight: value ? 500 : 400,
// 						opacity: value ? 1 : 0.85,
// 					}}
// 				>
// 					{value || placeholder}
// 				</span>
// 				<ChevronDown
// 					size={14}
// 					className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
// 					style={{ color: "rgba(255,255,255,0.7)" }}
// 				/>
// 			</button>

// 			<AnimatePresence>
// 				{open && (
// 					<motion.ul
// 						initial={{ opacity: 0, y: -4, scale: 0.98 }}
// 						animate={{ opacity: 1, y: 0, scale: 1 }}
// 						exit={{ opacity: 0, y: -4, scale: 0.98 }}
// 						transition={{ duration: 0.12 }}
// 						className="absolute z-50 top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden shadow-2xl"
// 						style={{
// 							background: "#0D2347",
// 							border: "1px solid rgba(255,255,255,0.15)",
// 						}}
// 					>
// 						{options.map((opt) => (
// 							<li key={opt}>
// 								<button
// 									type="button"
// 									onClick={() => {
// 										onChange(opt);
// 										setOpen(false);
// 									}}
// 									className="w-full text-left px-4 py-2.5 text-sm font-body transition-colors"
// 									style={{
// 										color: value === opt ? "#E8A020" : "rgba(255,255,255,0.9)",
// 										fontWeight: value === opt ? 600 : 400,
// 										backgroundColor:
// 											value === opt ? "rgba(232,160,32,0.12)" : "transparent",
// 									}}
// 									onMouseEnter={(e) => {
// 										if (value !== opt)
// 											(
// 												e.currentTarget as HTMLButtonElement
// 											).style.backgroundColor = "rgba(255,255,255,0.08)";
// 									}}
// 									onMouseLeave={(e) => {
// 										if (value !== opt)
// 											(
// 												e.currentTarget as HTMLButtonElement
// 											).style.backgroundColor = "transparent";
// 									}}
// 								>
// 									{opt}
// 								</button>
// 							</li>
// 						))}
// 					</motion.ul>
// 				)}
// 			</AnimatePresence>
// 		</div>
// 	);
// }

// const trustBadges = [
// 	{ icon: Star, text: "Google 4.9★", sub: "2,400+ reviews" },
// 	{ icon: Shield, text: "WSIB Insured", sub: "All movers verified" },
// 	{ icon: Clock, text: "< 2 Hr Response", sub: "Match guaranteed" },
// 	{ icon: Truck, text: "13K+ Moves", sub: "And counting" },
// ];

// const cities = [
// 	"Toronto",
// 	"Vancouver",
// 	"Montreal",
// 	"Calgary",
// 	"Ottawa",
// 	"Edmonton",
// 	"Winnipeg",
// 	"Halifax",
// ];

// const homeSizes = [
// 	"Studio",
// 	"1 Bedroom",
// 	"2 Bedrooms",
// 	"3 Bedrooms",
// 	"4+ Bedrooms",
// 	"Office",
// ];

// const containerVariants = {
// 	hidden: {},
// 	show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
// };

// const itemVariants = {
// 	hidden: { opacity: 0, y: 24 },
// 	show: {
// 		opacity: 1,
// 		y: 0,
// 		transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
// 	},
// };

// export default function HeroSection() {
// 	const [fromCity, setFromCity] = useState("");
// 	const [toCity, setToCity] = useState("");
// 	const [homeSize, setHomeSize] = useState("");

// 	return (
// 		<section className="relative min-h-screen flex flex-col overflow-hidden">
// 			<div className="absolute inset-0 mesh-bg" />
// 			<div className="absolute inset-0 grid-pattern opacity-60" />

// 			<div
// 				className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
// 				style={{
// 					background:
// 						"radial-gradient(circle, rgba(46,134,193,0.18) 0%, transparent 70%)",
// 					transform: "translateZ(0)",
// 				}}
// 			/>
// 			<div
// 				className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
// 				style={{
// 					background:
// 						"radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%)",
// 					transform: "translateZ(0)",
// 				}}
// 			/>

// 			<div
// 				className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
// 				style={{
// 					backgroundImage:
// 						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
// 					transform: "translateZ(0)",
// 				}}
// 			/>

// 			<motion.div
// 				className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-40 pb-24"
// 				variants={containerVariants}
// 				initial="hidden"
// 				animate="show"
// 			>
// 				<motion.div
// 					variants={itemVariants}
// 					className="flex items-center gap-2 mb-8"
// 				>
// 					<div className="flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5">
// 						<span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse-amber" />
// 						<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
// 							🇨🇦 Canada's #1 Moving Platform
// 						</span>
// 					</div>
// 				</motion.div>

// 				<motion.h1
// 					variants={itemVariants}
// 					className="font-display font-black text-center text-white leading-[1.05] tracking-tight max-w-4xl mb-6"
// 					style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
// 				>
// 					Move Anywhere <br />{" "}
// 					<span className="italic text-gradient">in Canada</span>
// 					<br />
// 					<span className="text-white/90">With Total</span>{" "}
// 					<span className="relative inline-block">
// 						<span className="text-gradient">Confidence.</span>
// 						<motion.span
// 							className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-brand to-amber-400 rounded-full"
// 							initial={{ scaleX: 0 }}
// 							animate={{ scaleX: 1 }}
// 							transition={{
// 								duration: 0.6,
// 								delay: 0.7,
// 								ease: [0.23, 1, 0.32, 1],
// 							}}
// 							style={{ transformOrigin: "left" }}
// 						/>
// 					</span>
// 				</motion.h1>

// 				<motion.p
// 					variants={itemVariants}
// 					className="font-body text-white/60 text-center text-lg font-light leading-relaxed max-w-xl mb-10"
// 				>
// 					Get a fast, upfront quote from our vetted and professional movers.
// 					Real prices. Verified reviews. Zero hidden fees.
// 				</motion.p>

// 				<motion.div
// 					variants={itemVariants}
// 					className="w-full max-w-2xl glass rounded-3xl p-6 shadow-card-xl mb-10"
// 				>
// 					<p className="font-body font-semibold text-white/70 text-sm mb-4 text-center tracking-wide">
// 						⚡ Get Your Free Quotes in 3 Minutes
// 					</p>

// 					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
// 						<CustomSelect
// 							value={fromCity}
// 							onChange={setFromCity}
// 							placeholder="📍 Moving From..."
// 							options={cities}
// 						/>
// 						<CustomSelect
// 							value={toCity}
// 							onChange={setToCity}
// 							placeholder="🏠 Moving To..."
// 							options={cities}
// 						/>
// 						<CustomSelect
// 							value={homeSize}
// 							onChange={setHomeSize}
// 							placeholder="🏡 Home Size..."
// 							options={homeSizes}
// 						/>
// 					</div>

// 					<Link href="/get-a-quote">
// 						<motion.button
// 							whileHover={{ scale: 1.02 }}
// 							whileTap={{ scale: 0.97 }}
// 							className="w-full bg-amber-brand text-navy-800 font-body font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow-amber hover:bg-amber-400 transition-colors"
// 						>
// 							Get My Free Quotes <ArrowRight size={18} />
// 						</motion.button>
// 					</Link>

// 					<p className="text-white/30 text-[0.72rem] text-center mt-3 font-mono">
// 						No commitment · 100% free · PIPEDA compliant
// 					</p>
// 				</motion.div>

// 				<motion.div
// 					variants={itemVariants}
// 					className="flex flex-wrap items-center justify-center gap-4"
// 				>
// 					{trustBadges.map(({ icon: Icon, text, sub }) => (
// 						<div
// 							key={text}
// 							className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5"
// 						>
// 							<Icon size={14} className="text-amber-brand flex-shrink-0" />
// 							<div>
// 								<p className="font-body font-semibold text-white text-[0.78rem] leading-none">
// 									{text}
// 								</p>
// 								<p className="font-body text-white/40 text-[0.65rem] mt-0.5">
// 									{sub}
// 								</p>
// 							</div>
// 						</div>
// 					))}
// 				</motion.div>
// 			</motion.div>

// 			<div className="absolute bottom-16 left-0 right-0 overflow-hidden pointer-events-none h-12">
// 				<motion.div
// 					className="absolute text-4xl"
// 					style={{ willChange: "transform" }}
// 					animate={{ x: [-160, 2200] }}
// 					transition={{
// 						duration: 18,
// 						repeat: Infinity,
// 						ease: "linear",
// 						delay: 2,
// 					}}
// 				>
// 					🚛
// 				</motion.div>
// 				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
// 			</div>

// 			<motion.div
// 				className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
// 				animate={{ y: [0, 6, 0] }}
// 				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
// 				style={{ willChange: "transform" }}
// 			>
// 				<span className="font-mono text-[0.6rem] text-white/30 tracking-widest uppercase">
// 					Scroll
// 				</span>
// 				<ChevronDown size={16} className="text-white/30" />
// 			</motion.div>
// 		</section>
// 	);
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowRight,
	Star,
	Shield,
	Truck,
	Clock,
	ChevronDown,
} from "lucide-react";
import AddressAutocomplete from "@/components/ui/AddressAutocomplete";

// ── Paste your Google Maps API key here ──────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// Custom dropdown — still used for Home Size (not an address field)
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
		const close = (e: MouseEvent) => {
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
					style={{
						color: "#ffffff",
						fontWeight: value ? 500 : 400,
						opacity: value ? 1 : 0.85,
					}}
				>
					{value || placeholder}
				</span>
				<ChevronDown
					size={14}
					className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					style={{ color: "rgba(255,255,255,0.7)" }}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.ul
						initial={{ opacity: 0, y: -4, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.12 }}
						className="absolute z-50 top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden shadow-2xl"
						style={{
							background: "#0D2347",
							border: "1px solid rgba(255,255,255,0.15)",
						}}
					>
						{options.map((opt) => (
							<li key={opt}>
								<button
									type="button"
									onClick={() => {
										onChange(opt);
										setOpen(false);
									}}
									className="w-full text-left px-4 py-2.5 text-sm font-body transition-colors"
									style={{
										color: value === opt ? "#E8A020" : "rgba(255,255,255,0.9)",
										fontWeight: value === opt ? 600 : 400,
										backgroundColor:
											value === opt ? "rgba(232,160,32,0.12)" : "transparent",
									}}
									onMouseEnter={(e) => {
										if (value !== opt)
											(
												e.currentTarget as HTMLButtonElement
											).style.backgroundColor = "rgba(255,255,255,0.08)";
									}}
									onMouseLeave={(e) => {
										if (value !== opt)
											(
												e.currentTarget as HTMLButtonElement
											).style.backgroundColor = "transparent";
									}}
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

const trustBadges = [
	{ icon: Star, text: "Google 4.9★", sub: "100+ reviews" },
	// { icon: Shield, text: "WSIB Insured", sub: "All movers verified" },
	{
		icon: Clock,
		text: "Less than 30 Min",
		sub: "In Response times",
	},
	{ icon: Truck, text: "13K+ Moves", sub: "And counting" },
];

const homeSizes = [
	"Studio",
	"1 Bedroom",
	"2 Bedrooms",
	"3 Bedrooms",
	"4+ Bedrooms",
	"Office",
];

const containerVariants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
	},
};

export default function HeroSection() {
	const [fromAddress, setFromAddress] = useState("");
	const [toAddress, setToAddress] = useState("");
	const [homeSize, setHomeSize] = useState("");

	return (
		<section className="relative min-h-screen flex flex-col overflow-hidden">
			<div className="absolute inset-0 mesh-bg" />
			<div className="absolute inset-0 grid-pattern opacity-60" />

			<div
				className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, rgba(46,134,193,0.18) 0%, transparent 70%)",
					transform: "translateZ(0)",
				}}
			/>
			<div
				className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%)",
					transform: "translateZ(0)",
				}}
			/>

			<div
				className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
					transform: "translateZ(0)",
				}}
			/>

			<motion.div
				className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-40 pb-24"
				variants={containerVariants}
				initial="hidden"
				animate="show"
			>
				{/* Badge */}
				<motion.div
					variants={itemVariants}
					className="flex items-center gap-2 mb-8"
				>
					<div className="flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5">
						<span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse-amber" />
						<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
							🇨🇦 Canada's Moving Company
						</span>
					</div>
				</motion.div>

				{/* Headline */}
				<motion.h1
					variants={itemVariants}
					className="font-display font-black text-center text-white leading-[1.05] tracking-tight max-w-4xl mb-6"
					style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
				>
					Move Anywhere <br />{" "}
					<span className="italic text-gradient">in Canada</span>
					<br />
					<span className="text-white/90">With Total</span>{" "}
					<span className="relative inline-block">
						<span className="text-gradient">Confidence.</span>
						<motion.span
							className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-brand to-amber-400 rounded-full"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{
								duration: 0.6,
								delay: 0.7,
								ease: [0.23, 1, 0.32, 1],
							}}
							style={{ transformOrigin: "left" }}
						/>
					</span>
				</motion.h1>

				{/* Subheadline */}
				<motion.p
					variants={itemVariants}
					className="font-body text-white/60 text-center text-lg font-light leading-relaxed max-w-xl mb-10"
				>
					Get a fast, upfront quote from our vetted and professional movers.
					Real prices. Verified reviews. Zero hidden fees.
				</motion.p>

				{/* Quick quote card */}
				<motion.div
					variants={itemVariants}
					className="w-full max-w-2xl glass rounded-3xl p-6 shadow-card-xl mb-10"
				>
					<p className="font-body font-semibold text-white/70 text-sm mb-4 text-center tracking-wide">
						⚡ Get Your Free Quotes in 30 Minutes
					</p>

					{/* Row 1: two address fields */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
						<AddressAutocomplete
							value={fromAddress}
							onChange={setFromAddress}
							placeholder="📍 Moving from address..."
							theme="dark"
						/>
						<AddressAutocomplete
							value={toAddress}
							onChange={setToAddress}
							placeholder="🏠 Moving to address..."
							theme="dark"
						/>
					</div>

					{/* Row 2: home size + CTA */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
						<CustomSelect
							value={homeSize}
							onChange={setHomeSize}
							placeholder="🏡 Home Size..."
							options={homeSizes}
						/>
						<Link href="/get-a-quote" className="sm:col-span-1">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.97 }}
								className="w-full bg-amber-brand text-navy-800 font-body font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-glow-amber hover:bg-amber-400 transition-colors"
							>
								Get My Free Quotes <ArrowRight size={16} />
							</motion.button>
						</Link>
					</div>

					<p className="text-white/30 text-[0.72rem] text-center font-mono">
						No commitment · 100% free · PIPEDA compliant
					</p>
				</motion.div>

				{/* Trust badges */}
				<motion.div
					variants={itemVariants}
					className="flex flex-wrap items-center justify-center gap-4"
				>
					{trustBadges.map(({ icon: Icon, text, sub }) => (
						<div
							key={text}
							className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5"
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
						</div>
					))}
				</motion.div>
			</motion.div>

			{/* Animated truck */}
			<div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none h-12">
				<motion.div
					className="absolute text-3xl"
					style={{ willChange: "transform" }}
					animate={{ x: [-160, 2200] }}
					transition={{
						duration: 18,
						repeat: Infinity,
						ease: "linear",
						delay: 2,
					}}
				>
					🚛
				</motion.div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-12 w-full flex items-center justify-center flex flex-col items-center gap-1"
				animate={{ y: [0, 6, 0] }}
				transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				style={{ willChange: "transform" }}
			>
				<span className="font-mono text-[0.6rem] text-white/30 tracking-widest uppercase">
					Scroll
				</span>
				<ChevronDown size={16} className="text-white/30" />
			</motion.div>
		</section>
	);
}
