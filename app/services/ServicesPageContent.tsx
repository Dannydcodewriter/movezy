// 'use client'

// import { motion } from 'framer-motion'
// import Link from 'next/link'
// import { Check, ArrowRight } from 'lucide-react'
// import CtaSection from '@/components/sections/CtaSection'

// const services = [
//   {
//     emoji: '🏠', title: 'Residential Moving', price: 'From $249',
//     badge: 'Most Popular',
//     gradient: 'from-sky-brand to-navy-600',
//     desc: 'From studio apartments to 6-bedroom homes, our residential moving crews handle everything with care. We disassemble furniture, wrap belongings in professional moving blankets, and reassemble everything in your new home.',
//     features: [
//       'Full furniture disassembly & reassembly',
//       'Premium moving blankets & shrink wrap',
//       'Floor & doorway protection',
//       'Elevator & parking coordination',
//       'Condo move-in/out management',
//       'Same-day moves available',
//     ],
//   },
//   {
//     emoji: '🏢', title: 'Commercial Moving', price: 'Custom Quote',
//     gradient: 'from-navy-600 to-navy-800',
//     desc: 'Weekend office relocations, multi-floor corporate moves, retail store transfers. Our commercial teams work nights and weekends so your business opens Monday morning without missing a beat.',
//     features: [
//       'Weekend & after-hours moving',
//       'IT equipment & server room moves',
//       'Full workstation disassembly',
//       'File & document handling',
//       'Retail store transfers',
//       'Zero business downtime',
//     ],
//   },
//   {
//     emoji: '🛣️', title: 'Long-Distance Moving', price: 'From $899',
//     badge: '🇨🇦 Canada-Wide',
//     gradient: 'from-amber-dark to-amber-brand',
//     desc: 'Cross-province moves from Victoria to Halifax, handled with GPS tracking, binding quotes, and full insurance. Our long-distance crews are licensed interprovincial carriers with decades of cross-Canada experience.',
//     features: [
//       'GPS shipment tracking',
//       'Binding price guarantees',
//       'Full liability insurance',
//       'Interprovincial licensing',
//       'Dedicated move coordinator',
//       'Custom delivery windows',
//     ],
//   },
//   {
//     emoji: '📦', title: 'Packing & Unpacking', price: 'From $149',
//     gradient: 'from-green-700 to-green-600',
//     desc: 'Professional packing crews who treat your belongings like their own. Every fragile item individually wrapped. Every box labelled by room and contents. Every wardrobe packed in garment boxes.',
//     features: [
//       'Professional packing materials',
//       'Fragile item specialty wrapping',
//       'Room-by-room labelling system',
//       'Wardrobe boxes for clothing',
//       'Dish packing & cell kits',
//       'Partial packing available',
//     ],
//   },
//   {
//     emoji: '🏭', title: 'Storage Solutions', price: 'From $89/mo',
//     gradient: 'from-purple-700 to-purple-600',
//     desc: 'Secure, climate-controlled storage facilities across Canada. Short-term between moves or long-term for renovations and downsizing. Full inventory management and anytime access.',
//     features: [
//       'Climate-controlled facilities',
//       'Digital inventory management',
//       'Anytime access to belongings',
//       'Short & long-term options',
//       'Full insurance coverage',
//       'Free pickup & delivery',
//     ],
//   },
//   {
//     emoji: '🎹', title: 'Specialty Items', price: 'Custom Quote',
//     badge: 'White Glove',
//     gradient: 'from-rose-700 to-rose-600',
//     desc: 'Pianos, fine art, antiques, wine collections, safes, pool tables. Specialty crews with the certifications, equipment, and experience to move the irreplaceable without a scratch.',
//     features: [
//       'Piano moving (all types)',
//       'Fine art & antique handling',
//       'Crating & custom packaging',
//       'Climate-controlled transport',
//       'White-glove delivery',
//       'Insurance up to $1M',
//     ],
//   },
// ]

// export default function ServicesPageContent() {
//   return (
//     <>
//       {/* Hero */}
//       <section className="relative mesh-bg pt-40 pb-24 overflow-hidden">
//         <div className="absolute inset-0 grid-pattern" />
//         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6"
//           >
//             <span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
//               🚛 Our Services
//             </span>
//           </motion.div>
//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="font-display font-black text-white leading-tight mb-5"
//             style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
//           >
//             Every Move,{' '}
//             <span className="text-gradient italic">Covered.</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="font-body text-white/60 text-lg font-light max-w-xl mx-auto"
//           >
//             Six specialized services, 300+ vetted movers, and one platform built for Canada.
//           </motion.p>
//           <nav className="font-body text-sm text-white/40 mt-6">
//             <Link href="/" className="hover:text-amber-brand transition-colors">Home</Link>
//             <span className="mx-2">/</span>
//             <span className="text-amber-brand">Services</span>
//           </nav>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex flex-col gap-16">
//             {services.map((s, i) => (
//               <motion.div
//                 key={s.title}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.5 }}
//                 className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
//               >
//                 {/* Visual */}
//                 <div className={`relative rounded-3xl overflow-hidden min-h-[300px] flex items-center justify-center bg-gradient-to-br ${s.gradient} ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
//                   <span className="text-8xl">{s.emoji}</span>
//                   {s.badge && (
//                     <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white font-mono text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border border-white/20">
//                       {s.badge}
//                     </div>
//                   )}
//                   <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white font-body font-bold px-4 py-2 rounded-xl">
//                     {s.price}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
//                   <h2 className="font-display font-black text-navy-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
//                     {s.title}
//                   </h2>
//                   <p className="font-body text-slate-500 text-base leading-relaxed font-light mb-7">{s.desc}</p>
//                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
//                     {s.features.map((f) => (
//                       <li key={f} className="flex items-start gap-2.5 font-body text-sm text-navy-700">
//                         <Check size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
//                         {f}
//                       </li>
//                     ))}
//                   </ul>
//                   <Link href="/get-a-quote">
//                     <motion.button
//                       whileHover={{ scale: 1.02, y: -1 }}
//                       whileTap={{ scale: 0.97 }}
//                       className="bg-amber-brand text-navy-800 font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-amber-400 transition-colors"
//                     >
//                       Get a Free Quote <ArrowRight size={16} />
//                     </motion.button>
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <CtaSection />
//     </>
//   )
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import CtaSection from "@/components/sections/CtaSection";

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR IMAGES:
// 1. Create the folder: public/images/services/
// 2. Add photos with these exact filenames:
//    residential.jpg | commercial.jpg | long-distance.jpg
//    packing.jpg     | storage.jpg    | specialty.jpg
// Recommended size: 800 × 600px. Free photos at unsplash.com
// ─────────────────────────────────────────────────────────────────────────────

const services = [
	{
		image: "/images/services/residential.jpg",
		title: "Residential Moving",
		price: "From $249",
		badge: "Most Popular",
		desc: "From studio apartments to 6+ bedroom homes, our residential moving crews handle everything with care. We disassemble furniture, wrap belongings in professional moving blankets, and reassemble everything in your new home.",
		features: [
			"Full furniture disassembly & reassembly",
			"Premium moving blankets & shrink wrap",
			"Floor & doorway protection",
			"Elevator & parking coordination",
			"Condo move-in/out management",
			"Same-day moves available",
		],
	},
	{
		image: "/images/services/commercial.jpg",
		title: "Commercial Moving",
		price: "Custom Quote",
		desc: "Weekend office relocations, multi-floor corporate moves, retail store transfers. Our commercial teams work nights and weekends so your business opens Monday morning without missing a beat.",
		features: [
			"Weekend & after-hours moving",
			"IT equipment & server room moves",
			"Full workstation disassembly",
			"File & document handling",
			"Retail store transfers",
			"Zero business downtime",
		],
	},
	{
		image: "/images/services/long-distance.jpg",
		title: "Long-Distance Moving",
		price: "From $899",
		badge: "🇨🇦 Canada-Wide",
		desc: "We specialize in long-distance moves from Ontario to Alberta, ensuring a seamless transition managed with expert care. Our licensed interprovincial crews have extensive experience with cross-Canada relocations. You can expect:",
		features: [
			"Personalized service from our experienced team",
			"Binding quotes with genuine prices",
			"Flexible delivery windows tailored to your schedule",
			// "Interprovincial licensing",
			// "Dedicated move coordinator",
			// "Custom delivery windows",
		],
	},
	{
		image: "/images/services/packing.jpg",
		title: "Packing & Unpacking",
		price: "From $149",
		desc: "Professional packing crews who treat your belongings like their own. Every fragile item individually wrapped. Every box labelled by room and contents. Every wardrobe packed in garment boxes.",
		features: [
			"Professional packing materials",
			"Fragile item specialty wrapping",
			"Room-by-room labelling system",
			"Wardrobe boxes for clothing",
			"Dish packing & cell kits",
			"Partial packing available",
		],
	},
	{
		image: "/images/services/storage.jpg",
		title: "Storage Solutions",
		price: "From $89/mo",
		desc: "Secure, climate-controlled storage facilities across Canada. Short-term between moves or long-term for renovations and downsizing. Full inventory management and anytime access.",
		features: [
			"Climate-controlled facilities",
			"Digital inventory management",
			"Anytime access to belongings",
			"Short & long-term options",
			"Full insurance coverage",
			"Free pickup & delivery",
		],
	},
	{
		image: "/images/services/specialty.jpg",
		title: "Specialty Items",
		price: "Custom Quote",
		badge: "White Glove",
		desc: "Pianos, fine art, antiques, wine collections, safes, pool tables. Specialty crews with the certifications, equipment, and experience to move the irreplaceable without a scratch.",
		features: [
			"Piano moving (all types)",
			"Fine art & antique handling",
			"Crating & custom packaging",
			"Climate-controlled transport",
			"White-glove delivery",
		],
	},
];

export default function ServicesPageContent() {
	return (
		<>
			{/* Hero */}
			<section className="relative mesh-bg pt-40 pb-24 overflow-hidden">
				<div className="absolute inset-0 grid-pattern" />
				<div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6"
					>
						<span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">
							🚛 Our Services
						</span>
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="font-display font-black text-white leading-tight mb-5"
						style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
					>
						Every Move, <span className="text-gradient italic">Covered.</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="font-body text-white/60 text-lg font-light max-w-xl mx-auto"
					>
						Six specialized services, our own trained movers, and one company
						built for Canada.
					</motion.p>
					<nav className="font-body text-sm text-white/40 mt-6">
						<Link href="/" className="hover:text-amber-brand transition-colors">
							Home
						</Link>
						<span className="mx-2">/</span>
						<span className="text-amber-brand">Services</span>
					</nav>
				</div>
			</section>

			{/* Services */}
			<section className="bg-white py-20">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="flex flex-col gap-16">
						{services.map((s, i) => (
							<motion.div
								key={s.title}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{ duration: 0.5 }}
								className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
							>
								{/* Visual — photo */}
								<div
									className={`relative rounded-3xl overflow-hidden min-h-[340px] ${i % 2 === 1 ? "lg:order-2" : ""}`}
								>
									<img
										src={s.image}
										alt={s.title}
										className="w-full h-full object-cover absolute inset-0"
									/>
									{/* Gradient overlay for text legibility */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
									{/* Price — bottom right */}
									<div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white font-body font-bold px-4 py-2 rounded-xl border border-white/15">
										{s.price}
									</div>
									{/* Badge — top left */}
									{s.badge && (
										<div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white font-mono text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border border-white/20">
											{s.badge}
										</div>
									)}
								</div>

								{/* Content */}
								<div className={i % 2 === 1 ? "lg:order-1" : ""}>
									<h2
										className="font-display font-black text-navy-800 mb-4"
										style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
									>
										{s.title}
									</h2>
									<p className="font-body text-slate-500 text-base leading-relaxed font-light mb-7">
										{s.desc}
									</p>
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
										{s.features.map((f) => (
											<li
												key={f}
												className="flex items-start gap-2.5 font-body text-sm text-navy-700"
											>
												<Check
													size={15}
													className="text-green-500 flex-shrink-0 mt-0.5"
												/>
												{f}
											</li>
										))}
									</ul>
									<Link href="/get-a-quote">
										<motion.button
											whileHover={{ scale: 1.02, y: -1 }}
											whileTap={{ scale: 0.97 }}
											className="bg-amber-brand text-navy-800 font-body font-bold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:bg-amber-400 transition-colors"
										>
											Get a Free Quote <ArrowRight size={16} />
										</motion.button>
									</Link>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<CtaSection />
		</>
	);
}
