"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
	const [dot, setDot] = useState({ x: -100, y: -100 });
	const [ring, setRing] = useState({ x: -100, y: -100 });
	const [visible, setVisible] = useState(false);
	const [hovering, setHovering] = useState(false);

	// A ref holds the *latest* mouse position so the RAF loop always reads
	// the current value without needing to be re-created on every move.
	const targetRef = useRef({ x: -100, y: -100 });

	useEffect(() => {
		// ── Mouse position tracker ──────────────────────────────────────────
		const onMove = (e: MouseEvent) => {
			// Update the ref immediately (no re-render cost)
			targetRef.current = { x: e.clientX, y: e.clientY };
			// Update dot state — dot follows instantly
			setDot({ x: e.clientX, y: e.clientY });
			setVisible(true);
		};

		const onLeave = () => setVisible(false);

		// ── Hover detection ─────────────────────────────────────────────────
		const onEnterInteractive = () => setHovering(true);
		const onLeaveInteractive = () => setHovering(false);

		// Attach to all current interactive elements
		const interactives = document.querySelectorAll("a, button");
		interactives.forEach((el) => {
			el.addEventListener("mouseenter", onEnterInteractive);
			el.addEventListener("mouseleave", onLeaveInteractive);
		});

		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseleave", onLeave);

		// ── RAF ring loop ────────────────────────────────────────────────────
		// Ring position is stored in a plain variable (not state) inside the
		// loop so it persists across frames without triggering re-renders on
		// every single frame.
		let ringX = -100;
		let ringY = -100;
		let rafId: number;

		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

		const animateRing = () => {
			// Read the latest target from the ref — always fresh, no stale closure
			const { x: tx, y: ty } = targetRef.current;

			// Lerp ring toward the dot target. 0.18 gives a smooth but snappy follow.
			ringX = lerp(ringX, tx, 0.18);
			ringY = lerp(ringY, ty, 0.18);

			setRing({ x: ringX, y: ringY });

			rafId = requestAnimationFrame(animateRing);
		};

		rafId = requestAnimationFrame(animateRing);

		// ── Cleanup ──────────────────────────────────────────────────────────
		return () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseleave", onLeave);
			interactives.forEach((el) => {
				el.removeEventListener("mouseenter", onEnterInteractive);
				el.removeEventListener("mouseleave", onLeaveInteractive);
			});
			cancelAnimationFrame(rafId);
		};
		// Empty dep array — this effect runs ONCE on mount and never restarts.
		// The ref keeps the position data fresh without needing re-runs.
	}, []);

	return (
		<>
			{/* Dot — snaps directly to cursor, no lag */}
			<motion.div
				className="cursor-dot pointer-events-none fixed z-[9999]"
				animate={{
					x: dot.x - 4,
					y: dot.y - 4,
					opacity: visible ? 1 : 0,
					scale: hovering ? 1.5 : 1,
				}}
				transition={{ duration: 0.05 }}
			/>

			{/* Ring — smoothly lerps toward the dot via RAF */}
			<motion.div
				className="cursor-ring pointer-events-none fixed z-[9998]"
				animate={{
					x: ring.x - 18,
					y: ring.y - 18,
					opacity: visible ? 1 : 0,
					scale: hovering ? 1.6 : 1,
				}}
				// No position transition — RAF handles the smoothing.
				// Only scale and opacity get eased by framer-motion.
				transition={{
					duration: 0,
					scale: { duration: 0.2 },
					opacity: { duration: 0.15 },
				}}
			/>
		</>
	);
}
