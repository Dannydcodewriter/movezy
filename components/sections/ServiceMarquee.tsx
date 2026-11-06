"use client";

/**
 * Big scrolling band of service names. It drifts on its own, speeds up while
 * the visitor scrolls, and flips direction when they scroll back up.
 */

import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
	useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

const items = [
	{ text: "Residential Moving", mint: false },
	{ text: "Move-Out Cleaning", mint: true },
	{ text: "Long-Distance", mint: false },
	{ text: "Deep Cleaning", mint: true },
	{ text: "Packing & Unpacking", mint: false },
	{ text: "Office Cleaning", mint: true },
	{ text: "Commercial Moves", mint: false },
	{ text: "Carpet & Upholstery", mint: true },
];

function wrap(min: number, max: number, v: number) {
	const range = max - min;
	return ((((v - min) % range) + range) % range) + min;
}

function Row({ baseVelocity }: { baseVelocity: number }) {
	const reduce = useReducedMotion();
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
		clamp: false,
	});
	const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [6, 0, -6]);
	const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
	const direction = useRef(1);

	useAnimationFrame((_, delta) => {
		if (reduce) return;
		let moveBy = direction.current * baseVelocity * (delta / 1000);
		const vf = velocityFactor.get();
		if (vf < 0) direction.current = -1;
		else if (vf > 0) direction.current = 1;
		moveBy += direction.current * moveBy * vf;
		baseX.set(baseX.get() + moveBy);
	});

	const content = items.map((it) => (
		<span key={it.text} className="flex items-center gap-8 pr-8">
			<span
				className={
					it.mint
						? "text-gradient-mint"
						: "text-transparent [-webkit-text-stroke:1.5px_rgba(13,35,71,0.55)]"
				}
			>
				{it.text}
			</span>
			<span className={it.mint ? "text-amber-brand" : "text-mint-brand"}>✦</span>
		</span>
	));

	return (
		<div className="overflow-hidden whitespace-nowrap flex">
			<motion.div
				className="flex font-display font-black italic"
				style={{ x, skewX: skew, fontSize: "clamp(2rem, 5vw, 4rem)" }}
			>
				<div className="flex">{content}</div>
				<div className="flex" aria-hidden>
					{content}
				</div>
			</motion.div>
		</div>
	);
}

export default function ServiceMarquee() {
	return (
		<section
			aria-label="Our services"
			className="relative bg-white py-10 border-y border-slate-100 overflow-hidden"
		>
			<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
			<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
			<Row baseVelocity={-2} />
		</section>
	);
}
