"use client";

/**
 * AddressAutocomplete — powered by Nominatim (OpenStreetMap)
 * -----------------------------------------------------------
 * 100% free. No API key. No credit card. No account needed.
 * Suggestions are restricted to Canada only.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface Suggestion {
	place_id: string;
	display_name: string;
}

interface Props {
	value: string;
	onChange: (address: string) => void;
	placeholder: string;
	theme?: "light" | "dark";
	className?: string;
}

export default function AddressAutocomplete({
	value,
	onChange,
	placeholder,
	theme = "light",
	className = "",
}: Props) {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(false);
	const [activeIdx, setActiveIdx] = useState(-1);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(e.target as Node)
			) {
				setOpen(false);
				setActiveIdx(-1);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	// Fetch suggestions from Nominatim with debounce
	const fetchSuggestions = useCallback((query: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		if (query.trim().length < 3) {
			setSuggestions([]);
			setOpen(false);
			return;
		}

		debounceRef.current = setTimeout(async () => {
			setLoading(true);
			try {
				const url = new URL("https://nominatim.openstreetmap.org/search");
				url.searchParams.set("q", query);
				url.searchParams.set("format", "json");
				url.searchParams.set("countrycodes", "ca"); // Canada only
				url.searchParams.set("addressdetails", "1");
				url.searchParams.set("limit", "6");
				url.searchParams.set("featuretype", "settlement");

				const res = await fetch(url.toString(), {
					headers: {
						// Nominatim requires a User-Agent identifying your app
						"Accept-Language": "en-CA,en",
					},
				});

				const data: Suggestion[] = await res.json();

				// Clean up display_name — Nominatim returns long strings like
				// "2360 Leslie Street, Newmarket, York Region, Ontario, L3Y 4W8, Canada"
				// We trim ", Canada" from the end for cleaner display
				const cleaned = data.map((d) => ({
					...d,
					display_name: d.display_name.replace(/, Canada$/, ""),
				}));

				setSuggestions(cleaned);
				setOpen(cleaned.length > 0);
				setActiveIdx(-1);
			} catch {
				setSuggestions([]);
				setOpen(false);
			} finally {
				setLoading(false);
			}
		}, 350); // 350ms debounce — respectful to Nominatim's free service
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		onChange(v);
		fetchSuggestions(v);
	};

	const selectSuggestion = (s: Suggestion) => {
		onChange(s.display_name);
		setSuggestions([]);
		setOpen(false);
		setActiveIdx(-1);
	};

	// Keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!open || suggestions.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIdx((i) => Math.max(i - 1, -1));
		} else if (e.key === "Enter" && activeIdx >= 0) {
			e.preventDefault();
			selectSuggestion(suggestions[activeIdx]);
		} else if (e.key === "Escape") {
			setOpen(false);
			setActiveIdx(-1);
		}
	};

	// ── Styles ────────────────────────────────────────────────────────────────
	const inputClass =
		theme === "dark"
			? [
					"w-full bg-white/10 border rounded-xl pl-10 pr-10 py-3 text-sm font-body",
					"focus:outline-none transition-all text-white placeholder:text-white/75",
					focused
						? "border-amber-brand/70 bg-white/15"
						: "border-white/20 hover:border-white/35 hover:bg-white/15",
				].join(" ")
			: [
					"form-input pl-10 pr-10",
					focused ? "border-sky-brand ring-1 ring-sky-brand/20" : "",
				].join(" ");

	const pinColor = theme === "dark" ? "text-white/60" : "text-slate-400";
	const loaderColor = theme === "dark" ? "text-white/40" : "text-slate-300";
	const dropdownBg = theme === "dark" ? "#0D2347" : "#ffffff";
	const dropdownBorder =
		theme === "dark" ? "rgba(255,255,255,0.15)" : "#E2E8F0";
	const itemColor = theme === "dark" ? "rgba(255,255,255,0.88)" : "#1e293b";
	const itemHoverBg = theme === "dark" ? "rgba(255,255,255,0.08)" : "#f8fafc";
	const itemActiveBg = theme === "dark" ? "rgba(232,160,32,0.15)" : "#eff6ff";
	const itemActiveColor = theme === "dark" ? "#E8A020" : "#1B3A6B";

	return (
		<div ref={wrapperRef} className={`relative ${className}`}>
			{/* Pin icon */}
			<MapPin
				size={15}
				className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 ${pinColor}`}
			/>

			<input
				type="text"
				value={value}
				onChange={handleChange}
				onFocus={() => {
					setFocused(true);
					if (suggestions.length > 0) setOpen(true);
				}}
				onBlur={() => setFocused(false)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				className={inputClass}
				autoComplete="off"
				spellCheck={false}
			/>

			{/* Loading spinner */}
			{loading && (
				<Loader2
					size={13}
					className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin pointer-events-none ${loaderColor}`}
				/>
			)}

			{/* Suggestions dropdown */}
			{open && suggestions.length > 0 && (
				<ul
					className="absolute z-50 top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden shadow-2xl"
					style={{
						background: dropdownBg,
						border: `1px solid ${dropdownBorder}`,
					}}
				>
					{suggestions.map((s, idx) => (
						<li key={s.place_id}>
							<button
								type="button"
								onMouseDown={(e) => {
									e.preventDefault();
									selectSuggestion(s);
								}}
								className="w-full text-left px-4 py-2.5 text-sm font-body flex items-start gap-2.5 transition-colors"
								style={{
									color: idx === activeIdx ? itemActiveColor : itemColor,
									backgroundColor:
										idx === activeIdx ? itemActiveBg : "transparent",
								}}
								onMouseEnter={(e) => {
									setActiveIdx(idx);
									(e.currentTarget as HTMLButtonElement).style.backgroundColor =
										itemHoverBg;
								}}
								onMouseLeave={(e) => {
									(e.currentTarget as HTMLButtonElement).style.backgroundColor =
										idx === activeIdx ? itemActiveBg : "transparent";
								}}
							>
								<MapPin size={12} className="flex-shrink-0 mt-0.5 opacity-50" />
								<span className="leading-snug">{s.display_name}</span>
							</button>
						</li>
					))}
					{/* Attribution — required by Nominatim's usage policy */}
					<li
						className="px-4 py-1.5 text-[10px] border-t"
						style={{
							color: theme === "dark" ? "rgba(255,255,255,0.3)" : "#94a3b8",
							borderColor:
								theme === "dark" ? "rgba(255,255,255,0.08)" : "#f1f5f9",
						}}
					>
						© OpenStreetMap contributors
					</li>
				</ul>
			)}
		</div>
	);
}
