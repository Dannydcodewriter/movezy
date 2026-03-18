// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'framer-motion'
// import { useRef } from 'react'
// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'

// const services = [
//   {
//     emoji: '🏠',
//     title: 'Residential Moving',
//     desc: 'Studio to mansion — full-service residential moves with furniture disassembly, protection wrapping, and careful handling.',
//     from: 'from-sky-brand',
//     to: 'to-navy-600',
//     price: 'From $249',
//     badge: 'Most Popular',
//   },
//   {
//     emoji: '🏢',
//     title: 'Commercial Moving',
//     desc: 'Weekend office relocations, server room moves, retail store transfers — done with zero business downtime.',
//     from: 'from-navy-600',
//     to: 'to-navy-800',
//     price: 'Custom Quote',
//   },
//   {
//     emoji: '🛣️',
//     title: 'Long-Distance',
//     desc: 'Cross-province moves from Victoria to Halifax. GPS tracking, binding quotes, and full insurance.',
//     from: 'from-amber-dark',
//     to: 'to-amber-brand',
//     price: 'From $899',
//     badge: '🇨🇦 Canada-Wide',
//   },
//   {
//     emoji: '📦',
//     title: 'Packing & Unpacking',
//     desc: 'Professional packing crews using premium materials. Every box labelled. Every item protected. You just point.',
//     from: 'from-green-700',
//     to: 'to-green-600',
//     price: 'From $149',
//   },
//   {
//     emoji: '🏭',
//     title: 'Storage Solutions',
//     desc: 'Secure, climate-controlled storage across Canada. Short-term or long-term, with full inventory management.',
//     from: 'from-purple-700',
//     to: 'to-purple-600',
//     price: 'From $89/mo',
//   },
//   {
//     emoji: '🎹',
//     title: 'Specialty Items',
//     desc: 'Piano, fine art, antiques, wine collections. Specialty crews with the expertise and equipment to move the irreplaceable.',
//     from: 'from-rose-700',
//     to: 'to-rose-600',
//     price: 'Custom Quote',
//     badge: 'White Glove',
//   },
// ]

// export default function ServicesSection() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: '-80px' })

//   return (
//     <section ref={ref} className="bg-white py-28">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             className="flex items-center justify-center gap-3 mb-4"
//           >
//             <div className="w-8 h-0.5 bg-amber-brand rounded-full" />
//             <span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">
//               Our Services
//             </span>
//             <div className="w-8 h-0.5 bg-amber-brand rounded-full" />
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="font-display font-black text-navy-800 leading-tight mb-5"
//             style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
//           >
//             Every Move,{' '}
//             <span className="italic" style={{ color: 'var(--amber)' }}>Covered.</span>
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.15 }}
//             className="text-slate-500 font-body text-base font-light max-w-xl mx-auto leading-relaxed"
//           >
//             From a studio apartment to a national corporate relocation — our vetted mover network handles it all with precision.
//           </motion.p>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
//           {services.map(({ emoji, title, desc, from, to, price, badge }, i) => (
//             <motion.div
//               key={title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
//               whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
//               className="group relative overflow-hidden rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer"
//             >
//               <Link href="/services" className="block">
//                 {/* Gradient header */}
//                 <div className={`relative bg-gradient-to-br ${from} ${to} p-8 flex items-end justify-between min-h-[140px]`}>
//                   <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
//                   <div className="text-right">
//                     <span className="font-mono text-white/70 text-sm font-medium">{price}</span>
//                   </div>
//                   {badge && (
//                     <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white font-mono text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/20">
//                       {badge}
//                     </div>
//                   )}
//                 </div>
//                 {/* Body */}
//                 <div className="bg-white p-6 border border-slate-100 rounded-b-3xl">
//                   <h3 className="font-display font-bold text-navy-800 text-xl mb-2 group-hover:text-amber-dark transition-colors">{title}</h3>
//                   <p className="font-body text-slate-500 text-sm leading-relaxed font-light mb-4">{desc}</p>
//                   <span className="inline-flex items-center gap-1.5 font-body font-semibold text-sky-brand text-sm group-hover:gap-3 transition-all duration-200">
//                     Learn More <ArrowRight size={14} />
//                   </span>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.6 }}
//           className="text-center"
//         >
//           <Link href="/services">
//             <motion.button
//               whileHover={{ scale: 1.03, y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className="bg-navy-600 text-white font-body font-bold text-sm px-8 py-4 rounded-2xl shadow-card hover:bg-navy-500 transition-colors inline-flex items-center gap-2"
//             >
//               View All Services <ArrowRight size={16} />
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR IMAGES:
//
// 1. Put your images inside the /public/images/services/ folder of your project
//    e.g.  /public/images/services/residential.jpg
//          /public/images/services/commercial.jpg   ... etc.
//
// 2. Update the `image` field for each service below with the correct filename.
//
// Recommended image size: 600 × 300px (2:1 ratio), JPG or WebP.
// ─────────────────────────────────────────────────────────────────────────────

const services = [
	{
		image: "/images/services/residential.jpg",
		title: "Residential Moving",
		desc: "Studio to mansion, full-service residential moves with furniture disassembly, protection wrapping, and careful handling.",
		price: "From $249",
		badge: "Most Popular",
	},
	{
		image: "/images/services/commercial.jpg",
		title: "Commercial Moving",
		desc: "Weekend office relocations, server room moves, retail store transfers, done with zero business downtime.",
		price: "Custom Quote",
	},
	{
		image: "/images/services/long-distance.jpg",
		title: "Long-Distance",
		desc: "We specialize in long-distance moves from Ontario to Alberta, ensuring a seamless transition managed with expert care.",
		price: "From $899",
		badge: "🇨🇦 Canada-Wide",
	},
	{
		image: "/images/services/packing.jpg",
		title: "Packing & Unpacking",
		desc: "Professional packing crews using premium materials. Every box labelled. Every item protected. You just point.",
		price: "From $149",
	},
	{
		image: "/images/services/storage.jpg",
		title: "Storage Solutions",
		desc: "Secure, climate-controlled storage across Canada. Short-term or long-term, with full inventory management.",
		price: "From $89/mo",
	},
	{
		image: "/images/services/specialty.jpg",
		title: "Specialty Items",
		desc: "Piano, fine art, antiques, wine collections. Specialty crews with the expertise and equipment to move the irreplaceable.",
		price: "Custom Quote",
		badge: "White Glove",
	},
];

export default function ServicesSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<section ref={ref} className="bg-white py-28">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						className="flex items-center justify-center gap-3 mb-4"
					>
						<div className="w-8 h-0.5 bg-amber-brand rounded-full" />
						<span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">
							Our Services
						</span>
						<div className="w-8 h-0.5 bg-amber-brand rounded-full" />
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.1 }}
						className="font-display font-black text-navy-800 leading-tight mb-5"
						style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
					>
						Every Move,{" "}
						<span className="italic" style={{ color: "var(--amber)" }}>
							Covered.
						</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.15 }}
						className="text-slate-500 font-body text-base font-light max-w-xl mx-auto leading-relaxed"
					>
						From studio apartments to nationwide corporate relocations, our
						trained movers handle every move with precision and care.
					</motion.p>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
					{services.map(({ image, title, desc, price, badge }, i) => (
						<motion.div
							key={title}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
							whileHover={{
								y: -6,
								transition: { type: "spring", stiffness: 300, damping: 20 },
							}}
							className="group relative overflow-hidden rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer"
						>
							<Link href="/services" className="block">
								{/* ── IMAGE HEADER ─────────────────────────────────────── */}
								<div
									className="relative overflow-hidden"
									style={{ height: "180px" }}
								>
									{/* The photo */}
									<img
										src={image}
										alt={title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>

									{/* Dark gradient overlay so price text is always readable */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

									{/* Price — bottom right */}
									<div className="absolute bottom-3 right-4">
										<span className="font-mono text-white text-sm font-semibold drop-shadow">
											{price}
										</span>
									</div>

									{/* Badge — top left (only shown when defined) */}
									{badge && (
										<div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white font-mono text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/20">
											{badge}
										</div>
									)}
								</div>
								{/* ──────────────────────────────────────────────────────── */}

								{/* Body */}
								<div className="bg-white p-6 border border-slate-100 rounded-b-3xl">
									<h3 className="font-display font-bold text-navy-800 text-xl mb-2 group-hover:text-amber-dark transition-colors">
										{title}
									</h3>
									<p className="font-body text-slate-500 text-sm leading-relaxed font-light mb-4">
										{desc}
									</p>
									<span className="inline-flex items-center gap-1.5 font-body font-semibold text-sky-brand text-sm group-hover:gap-3 transition-all duration-200">
										Learn More <ArrowRight size={14} />
									</span>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ delay: 0.6 }}
					className="text-center"
				>
					<Link href="/services">
						<motion.button
							whileHover={{ scale: 1.03, y: -2 }}
							whileTap={{ scale: 0.97 }}
							className="bg-navy-600 text-white font-body font-bold text-sm px-8 py-4 rounded-2xl shadow-card hover:bg-navy-500 transition-colors inline-flex items-center gap-2"
						>
							View All Services <ArrowRight size={16} />
						</motion.button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
