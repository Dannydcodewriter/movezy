"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Shield, Lock, Award, Flag } from "lucide-react";

const footerLinks = {
	pages: [
		{ label: "Home", href: "/" },
		{ label: "Services", href: "/services" },
		{ label: "How It Works", href: "/#how-it-works" },
		{ label: "About Us", href: "/about" },
		{ label: "Reviews", href: "/reviews" },
		// { label: "Blog", href: "/blog" },
		{ label: "Get a Quote", href: "/get-a-quote" },
	],
	moving: [
		{ label: "Residential Moving", href: "/services#residential" },
		{ label: "Commercial Moving", href: "/services#commercial" },
		{ label: "Long-Distance", href: "/services#long-distance" },
		{ label: "Packing & Unpacking", href: "/services#packing" },
		{ label: "Storage Solutions", href: "/services#storage" },
		{ label: "Specialty Items", href: "/services#specialty" },
	],
	cleaning: [
		{ label: "Move-In / Move-Out", href: "/services#move-in-out" },
		{ label: "Deep Cleaning", href: "/services#deep-cleaning" },
		{ label: "Regular Home Cleaning", href: "/services#home-cleaning" },
		{ label: "Office Cleaning", href: "/services#office-cleaning" },
		{ label: "Post-Renovation", href: "/services#post-construction" },
		{ label: "Carpet & Upholstery", href: "/services#carpet-upholstery" },
	],
	cities: [
		"Toronto",
		"Vancouver",
		"Montreal",
		"Calgary",
		"Ottawa",
		"Edmonton",
		"Winnipeg",
		"Halifax",
		"Victoria",
		"+ More",
	],
};

const trustBadges = [
	{ icon: Shield, label: "STRIPE Protected", sub: "Safe Payment" },
	{ icon: Lock, label: "PIPEDA Compliant", sub: "Data protected" },
	{ icon: Flag, label: "Canadian Company", sub: "Proudly Canadian" },
];

export default function Footer() {
	return (
		<footer className="bg-navy-950 text-white/60">
			{/* CTA Band */}
			{/* <div className="bg-gradient-to-r from-amber-brand via-amber-400 to-amber-brand relative overflow-hidden">
				<div className="absolute inset-0 diagonal-pattern opacity-20" />
				<div className="relative max-w-6xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
					<div>
						<h3 className="font-display font-black text-3xl md:text-4xl text-navy-800 leading-tight mb-3">
							Ready to Move Smarter?
						</h3>
						<p className="text-navy-700/80 font-body font-medium">
							300+ Canadians trust MOVEZY. Get your free quote in 3 minutes.
						</p>
						<div className="flex flex-wrap gap-4 mt-4">
							{["No commitment", "2-hr response", "All movers vetted"].map(
								(t) => (
									<span
										key={t}
										className="flex items-center gap-2 text-navy-700 font-body font-semibold text-sm"
									>
										<span className="text-navy-600">✓</span> {t}
									</span>
								),
							)}
						</div>
					</div>
					<Link href="/get-a-quote">
						<motion.button
							whileHover={{ scale: 1.04, y: -2 }}
							whileTap={{ scale: 0.97 }}
							className="bg-navy-800 text-white font-body font-bold text-base px-8 py-4 rounded-2xl whitespace-nowrap shadow-card-xl hover:bg-navy-700 transition-colors"
						>
							Get Free Quote →
						</motion.button>
					</Link>
				</div>
			</div> */}

			{/* Main footer */}
			<div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-white/6">
					{/* Brand col */}
					<div className="col-span-2 md:col-span-3 lg:col-span-1">
						<Link href="/" className="inline-block mb-5">
							<img
								src="/images/logo-light.png"
								alt="MOVEZY"
								className="h-16 w-auto object-contain"
							/>
						</Link>
						<p className="text-sm leading-relaxed mb-6 font-light max-w-[260px]">
							Canada’s trusted moving and cleaning company. Professional movers and cleaners, one reliable team, coast to coast.
						</p>
						<div className="flex flex-col gap-3 mb-6">
							<a
								href="tel:+16476977140"
								className="flex items-center gap-2 text-sm hover:text-amber-brand transition-colors"
							>
								<Phone size={13} className="text-amber-brand flex-shrink-0" />
								+1 647-697-7140
							</a>
							<a
								href="mailto:hello@movezy.ca"
								className="flex items-center gap-2 text-sm hover:text-amber-brand transition-colors"
							>
								<Mail size={13} className="text-amber-brand flex-shrink-0" />
								hello@movezy.ca
							</a>
							<span className="flex items-center gap-2 text-sm">
								<MapPin size={13} className="text-amber-brand flex-shrink-0" />
								Canada-wide service
							</span>
						</div>
						<div className="flex gap-2">
							{["f", "𝕏", "in", "▶"].map((s) => (
								<motion.a
									key={s}
									href="#"
									whileHover={{
										y: -2,
										backgroundColor: "rgba(232,160,32,1)",
										color: "#0D2347",
									}}
									className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center text-xs text-white/60 transition-colors border border-white/5"
								>
									{s}
								</motion.a>
							))}
						</div>
					</div>

					{/* Pages */}
					<div>
						<h4 className="font-body font-bold text-[0.72rem] text-white uppercase tracking-widest mb-5">
							Pages
						</h4>
						<ul className="flex flex-col gap-2.5">
							{footerLinks.pages.map((l) => (
								<li key={l.href}>
									<Link
										href={l.href}
										className="text-sm font-light hover:text-amber-brand transition-colors"
									>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Moving */}
					<div>
						<h4 className="font-body font-bold text-[0.72rem] text-white uppercase tracking-widest mb-5">
							Moving
						</h4>
						<ul className="flex flex-col gap-2.5">
							{footerLinks.moving.map((l) => (
								<li key={l.label}>
									<Link
										href={l.href}
										className="text-sm font-light hover:text-amber-brand transition-colors"
									>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Cleaning */}
					<div>
						<h4 className="font-body font-bold text-[0.72rem] text-white uppercase tracking-widest mb-5">
							Cleaning
						</h4>
						<ul className="flex flex-col gap-2.5">
							{footerLinks.cleaning.map((l) => (
								<li key={l.label}>
									<Link
										href={l.href}
										className="text-sm font-light hover:text-mint-brand transition-colors"
									>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Trust */}
					<div>
						<h4 className="font-body font-bold text-[0.72rem] text-white uppercase tracking-widest mb-5">
							Trust & Safety
						</h4>
						<div className="flex flex-col gap-3">
							{trustBadges.map(({ icon: Icon, label, sub }) => (
								<div
									key={label}
									className="flex items-center gap-3 bg-white/4 border border-white/6 rounded-xl p-3"
								>
									<Icon size={16} className="text-amber-brand flex-shrink-0" />
									<div>
										<p className="text-[0.72rem] font-bold text-white font-body">
											{label}
										</p>
										<p className="text-[0.68rem] text-white/40">{sub}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Cities */}
				<div className="py-6 border-b border-white/6 flex flex-wrap items-center gap-x-5 gap-y-2">
					<span className="font-body font-bold text-[0.72rem] text-white uppercase tracking-widest mr-2">
						Serving
					</span>
					{footerLinks.cities.map((c) => (
						<span
							key={c}
							className="text-sm font-light text-white/40 hover:text-amber-brand transition-colors cursor-default"
						>
							{c}
						</span>
					))}
				</div>

				{/* Bottom bar */}
				<div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
					<span>
						© {new Date().getFullYear()} MOVEZY Inc. All rights reserved.
					</span>
					<div className="flex gap-5">
						{[
							"Privacy Policy",
							"Terms of Service",
							"PIPEDA Compliance",
							"Sitemap",
						].map((l) => (
							<Link
								key={l}
								href="#"
								className="hover:text-amber-brand transition-colors"
							>
								{l}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
