// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Menu, X, MapPin } from "lucide-react";
// import { cn } from "@/lib/utils";

// const navItems = [
// 	{ label: "Services", href: "/services" },
// 	{ label: "How It Works", href: "/#how-it-works" },
// 	{ label: "About", href: "/about" },
// 	{ label: "Reviews", href: "/reviews" },
// 	{ label: "Blog", href: "/blog" },
// ];

// // Ticker items defined once — rendered twice inside the component to create
// // the seamless infinite loop (copy A scrolls off, copy B takes its place)
// const tickerItems = [
// 	"🇨🇦 Serving All Major Canadian Cities",
// 	"⭐ 4.9/5 Rating from 2,400+ Verified Customers",
// 	"🛡️ Professional Background-Checked Movers ",
// 	"⚡ Fast Booking & On-Time Service Guarantee",
// 	"💳 Secure Payments — Pay After Your Move",
// 	"📞 Dedicated Customer Support — 7 Days a Week",
// ];

// export default function Navbar() {
// 	const [scrolled, setScrolled] = useState(false);
// 	const [scrollUp, setScrollUp] = useState(false);
// 	const [mobileOpen, setMobileOpen] = useState(false);
// 	const [lastY, setLastY] = useState(0);
// 	const pathname = usePathname();

// 	// Track scroll direction so the nav can hide/show smartly
// 	useEffect(() => {
// 		const handleScroll = () => {
// 			const y = window.scrollY;
// 			setScrolled(y > 60);
// 			setScrollUp(y > 120 && y < lastY);
// 			setLastY(y);
// 		};
// 		window.addEventListener("scroll", handleScroll, { passive: true });
// 		return () => window.removeEventListener("scroll", handleScroll);
// 	}, [lastY]);

// 	// Close mobile menu on route change
// 	useEffect(() => {
// 		setMobileOpen(false);
// 	}, [pathname]);

// 	// Lock body scroll while mobile menu is open
// 	useEffect(() => {
// 		document.body.style.overflow = mobileOpen ? "hidden" : "";
// 		return () => {
// 			document.body.style.overflow = "";
// 		};
// 	}, [mobileOpen]);

// 	const isActive = (href: string) => {
// 		if (href === "/") return pathname === "/";
// 		return pathname.startsWith(href);
// 	};

// 	return (
// 		<>
// 			{/* ── TICKER BAR ──────────────────────────────────────────────────────
//           Outer div: fixed, full-width, overflow-hidden — clips the scroll.
//           Inner .ticker-scroll: the element that actually moves via CSS
//           animation "tickerMove" defined in globals.css.

//           The items are rendered TWICE (copy A then copy B).
//           translateX(-50%) shifts exactly one full copy off the left edge,
//           making the transition invisible and the loop seamless.
//       ──────────────────────────────────────────────────────────────────── */}
// 			<div className="fixed top-0 left-0 right-0 z-50 h-10 bg-navy-900 overflow-hidden border-b border-white/5">
// 				<div className="ticker-scroll">
// 					{/* ── Copy A ── */}
// 					{tickerItems.map((item, i) => (
// 						<span
// 							key={`a-${i}`}
// 							className="inline-flex items-center gap-2 px-10 font-body text-[0.7rem] font-semibold text-white/60 uppercase tracking-wider whitespace-nowrap"
// 						>
// 							<span className="w-1 h-1 rounded-full bg-amber-brand flex-shrink-0" />
// 							{item}
// 						</span>
// 					))}

// 					{/* ── Copy B — identical, enables seamless loop ── */}
// 					{tickerItems.map((item, i) => (
// 						<span
// 							key={`b-${i}`}
// 							className="inline-flex items-center gap-2 px-10 font-body text-[0.7rem] font-semibold text-white/60 uppercase tracking-wider whitespace-nowrap"
// 						>
// 							<span className="w-1 h-1 rounded-full bg-amber-brand flex-shrink-0" />
// 							{item}
// 						</span>
// 					))}
// 				</div>
// 			</div>

// 			{/* ── MAIN NAVBAR ─────────────────────────────────────────────────────
//           Sits 40px below the ticker (top: 40) by default.
//           When the user scrolls up (scrollUp = true), it jumps to top: 0
//           so it stays visible without the ticker.
//           Becomes opaque white with a shadow once scrolled past 60px.
//       ──────────────────────────────────────────────────────────────────── */}
// 			<motion.nav
// 				className={cn(
// 					"fixed left-0 right-0 z-40 h-[72px] flex items-center justify-between px-8 transition-all duration-300",
// 					scrolled
// 						? "bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(27,58,107,0.1)] border-b border-navy-600/8"
// 						: "bg-transparent",
// 				)}
// 				initial={{ y: 40, opacity: 0 }}
// 				animate={{ y: 0, opacity: 1 }}
// 				style={{ top: scrollUp ? 0 : 40 }}
// 				transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
// 			>
// 				{/* Logo */}
// 				<Link href="/" className="flex items-center gap-2 group">
// 					<motion.div whileHover={{ scale: 1.02 }} className="relative">
// 						<span
// 							className={cn(
// 								"font-display font-black text-2xl tracking-tight transition-colors",
// 								scrolled ? "text-navy-600" : "text-white",
// 							)}
// 						>
// 							MOVE
// 						</span>
// 						<span className="font-display font-black text-2xl tracking-tight text-amber-brand">
// 							ZY
// 						</span>
// 						<span className="absolute -top-1 -right-2 text-[9px] font-mono font-medium text-amber-brand/80 tracking-widest">
// 							™
// 						</span>
// 					</motion.div>
// 				</Link>

// 				{/* Desktop nav links */}
// 				<ul className="hidden lg:flex items-center gap-1">
// 					{navItems.map((item) => (
// 						<li key={item.href}>
// 							<Link
// 								href={item.href}
// 								className={cn(
// 									"relative px-4 py-2 rounded-lg font-body font-semibold text-[0.82rem] uppercase tracking-wide transition-colors group",
// 									scrolled
// 										? isActive(item.href)
// 											? "text-amber-brand"
// 											: "text-slate-600 hover:text-navy-600"
// 										: isActive(item.href)
// 											? "text-amber-brand"
// 											: "text-white/80 hover:text-white",
// 								)}
// 							>
// 								{item.label}
// 								{/* Animated underline — expands from centre on hover / active */}
// 								<span
// 									className={cn(
// 										"absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-amber-brand transition-all duration-300",
// 										isActive(item.href) ? "w-4/5" : "w-0 group-hover:w-4/5",
// 									)}
// 								/>
// 							</Link>
// 						</li>
// 					))}
// 				</ul>

// 				{/* Right side — phone number + CTA button */}
// 				<div className="hidden lg:flex items-center gap-4">
// 					<a
// 						href="tel:16473133725"
// 						className={cn(
// 							"flex items-center gap-2 font-body font-semibold text-sm transition-colors",
// 							scrolled ? "text-navy-600" : "text-white/80 hover:text-white",
// 						)}
// 					>
// 						<Phone size={14} className="text-amber-brand" />
// 						+1 647-3133-725
// 					</a>
// 					<Link href="/get-a-quote">
// 						<motion.button
// 							whileHover={{ scale: 1.03, y: -1 }}
// 							whileTap={{ scale: 0.97 }}
// 							className="bg-amber-brand text-navy-800 font-body font-bold text-sm px-5 py-2.5 rounded-xl transition-shadow hover:shadow-glow-amber"
// 						>
// 							Free Quote
// 						</motion.button>
// 					</Link>
// 				</div>

// 				{/* Mobile hamburger button */}
// 				<motion.button
// 					className="lg:hidden p-2 rounded-lg"
// 					onClick={() => setMobileOpen(!mobileOpen)}
// 					whileTap={{ scale: 0.9 }}
// 					aria-label={mobileOpen ? "Close menu" : "Open menu"}
// 				>
// 					{mobileOpen ? (
// 						<X
// 							size={22}
// 							className={scrolled ? "text-navy-600" : "text-white"}
// 						/>
// 					) : (
// 						<Menu
// 							size={22}
// 							className={scrolled ? "text-navy-600" : "text-white"}
// 						/>
// 					)}
// 				</motion.button>
// 			</motion.nav>

// 			{/* ── MOBILE FULL-SCREEN MENU ─────────────────────────────────────────
//           Slides in from the right. Each nav link staggers in with a small
//           delay. Body scroll is locked while this is open (see useEffect).
//       ──────────────────────────────────────────────────────────────────── */}
// 			<AnimatePresence>
// 				{mobileOpen && (
// 					<motion.div
// 						className="fixed inset-0 z-30 bg-navy-900/98 backdrop-blur-xl flex flex-col pt-28 px-8 pb-8"
// 						initial={{ opacity: 0, x: "100%" }}
// 						animate={{ opacity: 1, x: 0 }}
// 						exit={{ opacity: 0, x: "100%" }}
// 						transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
// 					>
// 						{/* Nav links */}
// 						<nav className="flex flex-col gap-2">
// 							{navItems.map((item, i) => (
// 								<motion.div
// 									key={item.href}
// 									initial={{ opacity: 0, x: 20 }}
// 									animate={{ opacity: 1, x: 0 }}
// 									transition={{ delay: i * 0.06 + 0.1 }}
// 								>
// 									<Link
// 										href={item.href}
// 										className={cn(
// 											"block py-4 text-2xl font-display font-bold border-b border-white/8 transition-colors",
// 											isActive(item.href)
// 												? "text-amber-brand"
// 												: "text-white/80 hover:text-amber-brand",
// 										)}
// 										onClick={() => setMobileOpen(false)}
// 									>
// 										{item.label}
// 									</Link>
// 								</motion.div>
// 							))}
// 						</nav>

// 						{/* Phone + CTA */}
// 						<motion.div
// 							className="mt-8 flex flex-col gap-4"
// 							initial={{ opacity: 0 }}
// 							animate={{ opacity: 1 }}
// 							transition={{ delay: 0.4 }}
// 						>
// 							<a
// 								href="tel:18886683999"
// 								className="flex items-center gap-3 text-white/70 font-body font-semibold"
// 							>
// 								<Phone size={16} className="text-amber-brand" />
// 								1-888-MOVEZY
// 							</a>
// 							<Link href="/get-a-quote" onClick={() => setMobileOpen(false)}>
// 								<motion.button
// 									whileTap={{ scale: 0.97 }}
// 									className="w-full bg-amber-brand text-navy-800 font-body font-bold text-base py-4 rounded-2xl"
// 								>
// 									Get a Free Quote →
// 								</motion.button>
// 							</Link>
// 						</motion.div>

// 						{/* Footer note */}
// 						<div className="mt-auto pt-8 flex items-center gap-2 text-white/20 text-sm font-body">
// 							<MapPin size={12} />
// 							Serving Canada coast to coast
// 						</div>
// 					</motion.div>
// 				)}
// 			</AnimatePresence>
// 		</>
// 	);
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
	{ label: "Services", href: "/services" },
	{ label: "How It Works", href: "/#how-it-works" },
	{ label: "About", href: "/about" },
	{ label: "Reviews", href: "/reviews" },
	// { label: "Blog", href: "/blog" },
];

// Ticker items defined once — rendered twice inside the component to create
// the seamless infinite loop (copy A scrolls off, copy B takes its place)
const tickerItems = [
	"🇨🇦 Serving All Major Canadian Cities",
	"⭐ 4.9/5 Rating from 2,400+ Verified Customers",
	"🛡️ Professional Background-Checked Movers ",
	"⚡ Fast Booking & On-Time Service Guarantee",
	"💳 Secure Payments — Pay After Your Move",
	"📞 Dedicated Customer Support — 7 Days a Week",
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [scrollUp, setScrollUp] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [lastY, setLastY] = useState(0);
	const pathname = usePathname();

	// Track scroll direction so the nav can hide/show smartly
	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			setScrolled(y > 60);
			setScrollUp(y > 120 && y < lastY);
			setLastY(y);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastY]);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	// Lock body scroll while mobile menu is open
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	return (
		<>
			{/* ── TICKER BAR ──────────────────────────────────────────────────────
          Outer div: fixed, full-width, overflow-hidden — clips the scroll.
          Inner .ticker-scroll: the element that actually moves via CSS
          animation "tickerMove" defined in globals.css.

          The items are rendered TWICE (copy A then copy B).
          translateX(-50%) shifts exactly one full copy off the left edge,
          making the transition invisible and the loop seamless.
      ──────────────────────────────────────────────────────────────────── */}
			<div className="fixed top-0 left-0 right-0 z-50 h-10 bg-navy-900 overflow-hidden border-b border-white/5">
				<div className="ticker-scroll">
					{/* ── Copy A ── */}
					{tickerItems.map((item, i) => (
						<span
							key={`a-${i}`}
							className="inline-flex items-center gap-2 px-10 font-body text-[0.7rem] font-semibold text-white/60 uppercase tracking-wider whitespace-nowrap"
						>
							<span className="w-1 h-1 rounded-full bg-amber-brand flex-shrink-0" />
							{item}
						</span>
					))}

					{/* ── Copy B — identical, enables seamless loop ── */}
					{tickerItems.map((item, i) => (
						<span
							key={`b-${i}`}
							className="inline-flex items-center gap-2 px-10 font-body text-[0.7rem] font-semibold text-white/60 uppercase tracking-wider whitespace-nowrap"
						>
							<span className="w-1 h-1 rounded-full bg-amber-brand flex-shrink-0" />
							{item}
						</span>
					))}
				</div>
			</div>

			{/* ── MAIN NAVBAR ─────────────────────────────────────────────────────
          Sits 40px below the ticker (top: 40) by default.
          When the user scrolls up (scrollUp = true), it jumps to top: 0
          so it stays visible without the ticker.
          Becomes opaque white with a shadow once scrolled past 60px.
      ──────────────────────────────────────────────────────────────────── */}
			<motion.nav
				className={cn(
					"fixed left-0 right-0 z-40 h-[72px] flex items-center justify-between px-8 transition-all duration-300",
					scrolled
						? "bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(27,58,107,0.1)] border-b border-navy-600/8"
						: "bg-transparent",
				)}
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				style={{ top: scrollUp ? 0 : 40 }}
				transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
			>
				{/* Logo */}
				<Link href="/" className="flex items-center group">
					<motion.div whileHover={{ scale: 1.02 }}>
						{/*
              ── HOW TO ADD YOUR LOGO ──────────────────────────────────────
              1. Put your logo files in the /public/images/ folder:
                    /public/images/logo-light.png   ← white version (for dark navbar)
                    /public/images/logo-dark.png    ← dark/colour version (for white navbar)
              2. The navbar automatically switches between them:
                    • logo-light.png shows when navbar is transparent (over the hero)
                    • logo-dark.png  shows when navbar turns white (after scrolling)
              3. Recommended logo height: 36–44px. Width auto-scales.
              4. If you only have one logo file, set both src attributes to the same file.
              ─────────────────────────────────────────────────────────────
            */}
						<img
							src={
								scrolled ? "/images/logo-dark.png" : "/images/logo-light.png"
							}
							alt="MOVEZY"
							className="h-10 w-auto object-contain transition-all duration-300"
						
						/>
					</motion.div>
				</Link>

				{/* Desktop nav links */}
				<ul className="hidden lg:flex items-center gap-1">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className={cn(
									"relative px-4 py-2 rounded-lg font-body font-semibold text-[0.82rem] uppercase tracking-wide transition-colors group",
									scrolled
										? isActive(item.href)
											? "text-amber-brand"
											: "text-slate-600 hover:text-navy-600"
										: isActive(item.href)
											? "text-amber-brand"
											: "text-white/80 hover:text-white",
								)}
							>
								{item.label}
								{/* Animated underline — expands from centre on hover / active */}
								<span
									className={cn(
										"absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-amber-brand transition-all duration-300",
										isActive(item.href) ? "w-4/5" : "w-0 group-hover:w-4/5",
									)}
								/>
							</Link>
						</li>
					))}
				</ul>

				{/* Right side — phone number + CTA button */}
				<div className="hidden lg:flex items-center gap-4">
					<a
						href="tel:16473133725"
						className={cn(
							"flex items-center gap-2 font-body font-semibold text-sm transition-colors",
							scrolled ? "text-navy-600" : "text-white/80 hover:text-white",
						)}
					>
						<Phone size={14} className="text-amber-brand" />
						+1 647-3133-725
					</a>
					<Link href="/get-a-quote">
						<motion.button
							whileHover={{ scale: 1.03, y: -1 }}
							whileTap={{ scale: 0.97 }}
							className="bg-amber-brand text-navy-800 font-body font-bold text-sm px-5 py-2.5 rounded-xl transition-shadow hover:shadow-glow-amber"
						>
							Free Quote
						</motion.button>
					</Link>
				</div>

				{/* Mobile hamburger button */}
				<motion.button
					className="lg:hidden p-2 rounded-lg"
					onClick={() => setMobileOpen(!mobileOpen)}
					whileTap={{ scale: 0.9 }}
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
				>
					{mobileOpen ? (
						<X
							size={22}
							className={scrolled ? "text-navy-600" : "text-white"}
						/>
					) : (
						<Menu
							size={22}
							className={scrolled ? "text-navy-600" : "text-white"}
						/>
					)}
				</motion.button>
			</motion.nav>

			{/* ── MOBILE FULL-SCREEN MENU ─────────────────────────────────────────
          Slides in from the right. Each nav link staggers in with a small
          delay. Body scroll is locked while this is open (see useEffect).
      ──────────────────────────────────────────────────────────────────── */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						className="fixed inset-0 z-30 bg-navy-900/98 backdrop-blur-xl flex flex-col pt-28 px-8 pb-8"
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "100%" }}
						transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
					>
						{/* Nav links */}
						<nav className="flex flex-col gap-2">
							{navItems.map((item, i) => (
								<motion.div
									key={item.href}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.06 + 0.1 }}
								>
									<Link
										href={item.href}
										className={cn(
											"block py-4 text-2xl font-display font-bold border-b border-white/8 transition-colors",
											isActive(item.href)
												? "text-amber-brand"
												: "text-white/80 hover:text-amber-brand",
										)}
										onClick={() => setMobileOpen(false)}
									>
										{item.label}
									</Link>
								</motion.div>
							))}
						</nav>

						{/* Phone + CTA */}
						<motion.div
							className="mt-8 flex flex-col gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<a
								href="tel:18886683999"
								className="flex items-center gap-3 text-white/70 font-body font-semibold"
							>
								<Phone size={16} className="text-amber-brand" />
								1-888-MOVEZY
							</a>
							<Link href="/get-a-quote" onClick={() => setMobileOpen(false)}>
								<motion.button
									whileTap={{ scale: 0.97 }}
									className="w-full bg-amber-brand text-navy-800 font-body font-bold text-base py-4 rounded-2xl"
								>
									Get a Free Quote →
								</motion.button>
							</Link>
						</motion.div>

						{/* Footer note */}
						<div className="mt-auto pt-8 flex items-center gap-2 text-white/20 text-sm font-body">
							<MapPin size={12} />
							Serving Canada coast to coast
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
