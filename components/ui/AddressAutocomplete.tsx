"use client";

/**
 * AddressAutocomplete — powered by Photon (komoot), built on OpenStreetMap
 * -------------------------------------------------------------------------
 * Free, no API key. Unlike plain Nominatim search, Photon is designed for
 * search-as-you-type, so partial input like "2360 Les" already returns
 * matching addresses. Results are limited to Canada and biased towards
 * the Greater Toronto Area.
 *
 * The public photon.komoot.io server is a fair-use service. If traffic grows
 * a lot, switch PHOTON_URL to a self-hosted Photon or a paid geocoder.
 */

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { MapPin, Loader2, SearchX } from "lucide-react";

const PHOTON_URL = "https://photon.komoot.io/api/";
// Rough bounding box around Canada (minLon, minLat, maxLon, maxLat)
const CANADA_BBOX = "-141.0,41.6,-52.6,83.2";
// Bias results towards Toronto, where most bookings come from
const BIAS = { lat: 43.65, lon: -79.38 };

const PROVINCE_ABBR: Record<string, string> = {
	Alberta: "AB",
	"British Columbia": "BC",
	Manitoba: "MB",
	"New Brunswick": "NB",
	"Newfoundland and Labrador": "NL",
	"Northwest Territories": "NT",
	"Nova Scotia": "NS",
	Nunavut: "NU",
	Ontario: "ON",
	"Prince Edward Island": "PE",
	Quebec: "QC",
	Québec: "QC",
	Saskatchewan: "SK",
	Yukon: "YT",
};

interface PhotonProps {
	osm_id?: number;
	osm_type?: string;
	countrycode?: string;
	type?: string;
	name?: string;
	housenumber?: string;
	street?: string;
	city?: string;
	district?: string;
	locality?: string;
	county?: string;
	state?: string;
	postcode?: string;
}

interface Suggestion {
	id: string;
	/** Main line, e.g. "100 Queen St W" or "Toronto" */
	primary: string;
	/** Second line, e.g. "Toronto, ON M5H 2N2" */
	secondary: string;
	/** What goes into the input when chosen */
	full: string;
}

function toSuggestion(p: PhotonProps): Suggestion | null {
	if (p.countrycode !== "CA") return null;

	const prov = p.state ? (PROVINCE_ABBR[p.state] ?? p.state) : "";
	const city = p.city || p.locality || p.district || p.county || "";
	const street = p.street ? [p.housenumber, p.street].filter(Boolean).join(" ") : "";

	// Addresses: "123 Main St"; places without a street: their name
	const primary = street || p.name || city;
	if (!primary) return null;

	const provPostal = [prov, p.postcode].filter(Boolean).join(" ");
	const cityLine = [city !== primary ? city : "", provPostal].filter(Boolean).join(", ");
	// Show a business/building name as context when it isn't the main line
	const secondary =
		street && p.name && p.name !== street ? [p.name, cityLine].filter(Boolean).join(" · ") : cityLine;

	return {
		id: `${p.osm_type ?? ""}${p.osm_id ?? Math.random()}`,
		primary,
		secondary,
		full: [primary, cityLine].filter(Boolean).join(", "),
	};
}

interface Props {
	value: string;
	onChange: (address: string) => void;
	placeholder: string;
	theme?: "light" | "dark";
	className?: string;
	/** Show a red border (e.g. a required field left empty) */
	invalid?: boolean;
}

export default function AddressAutocomplete({
	value,
	onChange,
	placeholder,
	theme = "light",
	className = "",
	invalid = false,
}: Props) {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [searched, setSearched] = useState(false);
	const [focused, setFocused] = useState(false);
	const [activeIdx, setActiveIdx] = useState(-1);

	const listId = useId();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const abortRef = useRef<AbortController | null>(null);

	// Close dropdown when clicking outside; clean up timers/requests on unmount
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				setOpen(false);
				setActiveIdx(-1);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			if (debounceRef.current) clearTimeout(debounceRef.current);
			abortRef.current?.abort();
		};
	}, []);

	const fetchSuggestions = useCallback((query: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		if (query.trim().length < 3) {
			abortRef.current?.abort();
			setSuggestions([]);
			setOpen(false);
			setSearched(false);
			setLoading(false);
			return;
		}

		debounceRef.current = setTimeout(async () => {
			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;
			setLoading(true);
			try {
				const url = new URL(PHOTON_URL);
				url.searchParams.set("q", query.trim());
				url.searchParams.set("limit", "10");
				url.searchParams.set("lang", "en");
				url.searchParams.set("bbox", CANADA_BBOX);
				url.searchParams.set("lat", String(BIAS.lat));
				url.searchParams.set("lon", String(BIAS.lon));

				const res = await fetch(url.toString(), { signal: controller.signal });
				if (!res.ok) throw new Error(`Photon ${res.status}`);
				const data: { features?: { properties: PhotonProps }[] } = await res.json();

				// Map, keep Canadian results only, drop duplicates
				const seen = new Set<string>();
				const list: Suggestion[] = [];
				for (const f of data.features ?? []) {
					const s = toSuggestion(f.properties);
					if (!s || seen.has(s.full)) continue;
					seen.add(s.full);
					list.push(s);
					if (list.length === 6) break;
				}

				setSuggestions(list);
				setSearched(true);
				setOpen(true);
				setActiveIdx(-1);
			} catch (err) {
				if ((err as Error).name === "AbortError") return;
				setSuggestions([]);
				setOpen(false);
			} finally {
				if (abortRef.current === controller) setLoading(false);
			}
		}, 250);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		onChange(v);
		fetchSuggestions(v);
	};

	const selectSuggestion = (s: Suggestion) => {
		onChange(s.full);
		setSuggestions([]);
		setOpen(false);
		setSearched(false);
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
	const dark = theme === "dark";
	const inputClass = dark
		? [
				"w-full bg-white/10 border rounded-xl pl-10 pr-10 py-3 text-sm font-body",
				"focus:outline-none transition-all text-white placeholder:text-white/75",
				focused
					? "border-amber-brand/70 bg-white/15"
					: "border-white/20 hover:border-white/35 hover:bg-white/15",
			].join(" ")
		: [
				"form-input pl-10 pr-10",
				invalid ? "!border-red-400" : focused ? "border-sky-brand ring-1 ring-sky-brand/20" : "",
			].join(" ");

	const showList = open && (suggestions.length > 0 || (searched && !loading));

	return (
		<div ref={wrapperRef} className={`relative ${className}`}>
			<MapPin
				size={15}
				className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 ${
					dark ? "text-white/60" : "text-slate-400"
				}`}
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
				role="combobox"
				aria-autocomplete="list"
				aria-expanded={showList}
				aria-controls={listId}
				aria-activedescendant={activeIdx >= 0 ? `${listId}-${activeIdx}` : undefined}
			/>

			{loading && (
				<Loader2
					size={14}
					className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin pointer-events-none ${
						dark ? "text-white/50" : "text-slate-400"
					}`}
				/>
			)}

			{showList && (
				<ul
					id={listId}
					role="listbox"
					className={`absolute z-50 top-full left-0 right-0 mt-1.5 rounded-xl max-h-[min(20rem,55vh)] overflow-y-auto shadow-2xl border text-left ${
						dark ? "bg-navy-800 border-white/15" : "bg-white border-slate-200"
					}`}
				>
					{suggestions.length === 0 ? (
						<li
							className={`flex items-center gap-2.5 px-4 py-3 text-sm font-body ${
								dark ? "text-white/60" : "text-slate-500"
							}`}
						>
							<SearchX size={14} className="flex-shrink-0" />
							No matches yet. Keep typing, or enter the address manually.
						</li>
					) : (
						suggestions.map((s, idx) => {
							const active = idx === activeIdx;
							return (
								<li key={s.id} id={`${listId}-${idx}`} role="option" aria-selected={active}>
									<button
										type="button"
										onMouseDown={(e) => {
											e.preventDefault();
											selectSuggestion(s);
										}}
										onMouseEnter={() => setActiveIdx(idx)}
										className={`w-full text-left px-4 py-2.5 font-body flex items-start gap-2.5 transition-colors ${
											active
												? dark
													? "bg-amber-brand/15"
													: "bg-sky-light"
												: dark
													? "hover:bg-white/5"
													: "hover:bg-slate-50"
										}`}
									>
										<MapPin
											size={14}
											className={`flex-shrink-0 mt-0.5 ${
												active ? (dark ? "text-amber-brand" : "text-sky-brand") : "opacity-40"
											} ${dark ? "text-white" : "text-navy-800"}`}
										/>
										<span className="min-w-0">
											<span
												className={`block text-sm font-semibold truncate ${
													dark ? (active ? "text-amber-brand" : "text-white") : "text-navy-800"
												}`}
											>
												{s.primary}
											</span>
											{s.secondary && (
												<span
													className={`block text-xs truncate ${
														dark ? "text-white/50" : "text-slate-500"
													}`}
												>
													{s.secondary}
												</span>
											)}
										</span>
									</button>
								</li>
							);
						})
					)}
					{/* Attribution — required by OpenStreetMap's licence */}
					<li
						className={`px-4 py-1.5 text-[10px] border-t ${
							dark ? "text-white/30 border-white/10" : "text-slate-400 border-slate-100"
						}`}
					>
						© OpenStreetMap contributors · Photon
					</li>
				</ul>
			)}
		</div>
	);
}
