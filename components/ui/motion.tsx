"use client";

/**
 * Reusable Framer Motion building blocks used across the site.
 *
 *  - MotionProvider   respects the visitor's "reduce motion" OS setting
 *  - ScrollProgress   thin gradient bar at the top that fills as you scroll
 *  - WordReveal       headline words slide up one after another
 *  - MaskReveal       a line of content rises out of an invisible mask
 *  - Magnetic         element gently follows the cursor, springs back on leave
 *  - TiltCard         3D tilt + moving glare that tracks the cursor
 *  - SpotlightCard    soft light that follows the cursor across a dark card
 */

import {
	motion,
	MotionConfig,
	useMotionTemplate,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.23, 1, 0.32, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		restDelta: 0.001,
	});
	return (
		<motion.div
			aria-hidden
			className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-amber-brand via-amber-400 to-mint-brand"
			style={{ scaleX }}
		/>
	);
}

export function WordReveal({
	text,
	className,
	wordClassName,
	delay = 0,
	stagger = 0.06,
	once = true,
	animateOnMount = false,
}: {
	text: string;
	className?: string;
	wordClassName?: string;
	delay?: number;
	stagger?: number;
	once?: boolean;
	/** Animate immediately instead of when scrolled into view */
	animateOnMount?: boolean;
}) {
	const words = text.split(" ");
	const trigger = animateOnMount
		? { animate: "show" as const }
		: { whileInView: "show" as const, viewport: { once, margin: "-60px" } };
	return (
		<motion.span
			className={cn("inline", className)}
			initial="hidden"
			{...trigger}
			transition={{ staggerChildren: stagger, delayChildren: delay }}
			aria-label={text}
		>
			{words.map((w, i) => (
				<span
					key={`${w}-${i}`}
					aria-hidden
					className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
				>
					<motion.span
						className={cn("inline-block", wordClassName)}
						variants={{
							hidden: { y: "110%", rotate: 4 },
							show: {
								y: "0%",
								rotate: 0,
								transition: { duration: 0.7, ease: EASE },
							},
						}}
					>
						{w}
						{i < words.length - 1 ? " " : ""}
					</motion.span>
				</span>
			))}
		</motion.span>
	);
}

export function MaskReveal({
	children,
	delay = 0,
	className,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<span className={cn("block overflow-hidden pb-[0.1em] -mb-[0.1em]", className)}>
			<motion.span
				className="block"
				initial={{ y: "105%" }}
				whileInView={{ y: "0%" }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.8, delay, ease: EASE }}
			>
				{children}
			</motion.span>
		</span>
	);
}

export function Magnetic({
	children,
	strength = 0.35,
	className,
}: {
	children: ReactNode;
	strength?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
	const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

	const onMove = (e: MouseEvent<HTMLDivElement>) => {
		const r = ref.current?.getBoundingClientRect();
		if (!r) return;
		x.set((e.clientX - (r.left + r.width / 2)) * strength);
		y.set((e.clientY - (r.top + r.height / 2)) * strength);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={reset}
			style={{ x: sx, y: sy }}
			className={cn("inline-block", className)}
		>
			{children}
		</motion.div>
	);
}

export function TiltCard({
	children,
	className,
	max = 8,
	glare = true,
	...rest
}: {
	children: ReactNode;
	className?: string;
	max?: number;
	glare?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">) {
	const ref = useRef<HTMLDivElement>(null);
	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);
	const spx = useSpring(px, { stiffness: 200, damping: 20 });
	const spy = useSpring(py, { stiffness: 200, damping: 20 });
	const rotateY = useTransform(spx, [0, 1], [-max, max]);
	const rotateX = useTransform(spy, [0, 1], [max, -max]);
	const gx = useTransform(spx, (v) => `${v * 100}%`);
	const gy = useTransform(spy, (v) => `${v * 100}%`);
	const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`;

	const onMove = (e: MouseEvent<HTMLDivElement>) => {
		const r = ref.current?.getBoundingClientRect();
		if (!r) return;
		px.set((e.clientX - r.left) / r.width);
		py.set((e.clientY - r.top) / r.height);
	};
	const reset = () => {
		px.set(0.5);
		py.set(0.5);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={reset}
			style={{ rotateX, rotateY, transformPerspective: 1000 }}
			className={cn("relative", className)}
			{...rest}
		>
			{children}
			{glare && (
				<motion.div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-soft-light"
					style={{ background: glareBg }}
				/>
			)}
		</motion.div>
	);
}

export function SpotlightCard({
	children,
	className,
	color = "rgba(232,160,32,0.14)",
	...rest
}: {
	children: ReactNode;
	className?: string;
	color?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
	const mx = useMotionValue(-400);
	const my = useMotionValue(-400);
	const bg = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;

	return (
		<motion.div
			onMouseMove={(e) => {
				const r = e.currentTarget.getBoundingClientRect();
				mx.set(e.clientX - r.left);
				my.set(e.clientY - r.top);
			}}
			onMouseLeave={() => {
				mx.set(-400);
				my.set(-400);
			}}
			className={cn("group relative overflow-hidden", className)}
			{...rest}
		>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				style={{ background: bg }}
			/>
			{children}
		</motion.div>
	);
}

/** Small section eyebrow label ("— Our Services —") with an animated line. */
export function Eyebrow({
	children,
	tone = "sky",
	center = true,
}: {
	children: ReactNode;
	tone?: "sky" | "amber" | "mint";
	center?: boolean;
}) {
	const text =
		tone === "amber"
			? "text-amber-brand"
			: tone === "mint"
				? "text-mint-brand"
				: "text-sky-brand";
	const line = (
		<motion.span
			className="block w-8 h-0.5 bg-amber-brand rounded-full"
			initial={{ scaleX: 0 }}
			whileInView={{ scaleX: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: EASE }}
		/>
	);
	return (
		<div
			className={cn(
				"flex items-center gap-3 mb-4",
				center ? "justify-center" : "justify-start",
			)}
		>
			{line}
			<span
				className={cn(
					"font-mono text-[0.7rem] font-medium uppercase tracking-[2px]",
					text,
				)}
			>
				{children}
			</span>
			{center && line}
		</div>
	);
}
