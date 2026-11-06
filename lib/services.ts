import {
	Truck,
	Building2,
	Route,
	Package,
	Warehouse,
	Piano,
	KeyRound,
	Sparkles,
	House,
	Briefcase,
	HardHat,
	Sofa,
	type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "moving" | "cleaning";

export interface ServiceItem {
	id: string;
	category: ServiceCategory;
	title: string;
	/** One-liner used on the homepage cards */
	short: string;
	/** Longer copy used on the Services page */
	desc: string;
	features: string[];
	price: string;
	badge?: string;
	icon: LucideIcon;
	/**
	 * Optional photo. Drop a file in /public/images/services/ and set the path
	 * here (recommended 800 × 600px). Without one, the card shows an
	 * illustrated panel instead.
	 */
	image?: string;
}

// ── MOVING ───────────────────────────────────────────────────────────────────
export const movingServices: ServiceItem[] = [
	{
		id: "residential",
		category: "moving",
		title: "Residential Moving",
		image: "/images/services/residential.jpg",
		icon: Truck,
		price: "From $249",
		badge: "Most Popular",
		short:
			"Studio to mansion, full-service residential moves with furniture disassembly, protection wrapping, and careful handling.",
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
		id: "commercial",
		category: "moving",
		title: "Commercial Moving",
		image: "/images/services/commercial.jpg",
		icon: Building2,
		price: "Custom Quote",
		short:
			"Weekend office relocations, server room moves, retail store transfers, done with zero business downtime.",
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
		id: "long-distance",
		category: "moving",
		title: "Long-Distance Moving",
		image: "/images/services/long-distance.jpg",
		icon: Route,
		price: "From $899",
		badge: "🇨🇦 Canada-Wide",
		short:
			"Long-distance moves from Ontario to Alberta, managed end-to-end with expert care.",
		desc: "We specialize in long-distance moves from Ontario to Alberta, ensuring a seamless transition managed with expert care. Our licensed interprovincial crews have extensive experience with cross-Canada relocations.",
		features: [
			"Personalized service from our experienced team",
			"Binding quotes with genuine prices",
			"Flexible delivery windows tailored to your schedule",
		],
	},
	{
		id: "packing",
		category: "moving",
		title: "Packing & Unpacking",
		image: "/images/services/packing.jpg",
		icon: Package,
		price: "From $149",
		short:
			"Professional packing crews using premium materials. Every box labelled. Every item protected. You just point.",
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
		id: "storage",
		category: "moving",
		title: "Storage Solutions",
		image: "/images/services/storage.jpg",
		icon: Warehouse,
		price: "From $89/mo",
		short:
			"Secure, climate-controlled storage across Canada. Short-term or long-term, with full inventory management.",
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
		id: "specialty",
		category: "moving",
		title: "Specialty Items",
		image: "/images/services/specialty.jpg",
		icon: Piano,
		price: "Custom Quote",
		badge: "White Glove",
		short:
			"Piano, fine art, antiques, wine collections. Specialty crews with the expertise and equipment to move the irreplaceable.",
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

// ── CLEANING ─────────────────────────────────────────────────────────────────
// Prices are set to "Free Quote" — update them once your rates are final.
// Photos: free stock images from Pexels (pexels.com/license), no attribution required.
export const cleaningServices: ServiceItem[] = [
	{
		id: "move-in-out",
		category: "cleaning",
		image: "/images/services/cleaning-move-in-out.jpg",
		title: "Move-In / Move-Out Cleaning",
		icon: KeyRound,
		price: "Free Quote",
		badge: "Pairs With Your Move",
		short:
			"Leave your old place spotless for the landlord and walk into a fresh, sanitized new home on day one.",
		desc: "Hand back your keys with confidence and move into a home that's truly clean. Our crews scrub every room top to bottom, inside cabinets, appliances and closets, so you get your deposit back and start fresh.",
		features: [
			"Inside cabinets, drawers & closets",
			"Inside fridge, oven & microwave",
			"Baseboards, doors & light switches",
			"Bathrooms descaled & sanitized",
			"Floors vacuumed & mopped",
			"Landlord-ready finish",
		],
	},
	{
		id: "deep-cleaning",
		category: "cleaning",
		image: "/images/services/cleaning-deep-cleaning.jpg",
		title: "Deep Cleaning",
		icon: Sparkles,
		price: "Free Quote",
		badge: "Most Thorough",
		short:
			"A top-to-bottom reset for homes that need more than a tidy-up: grime, buildup and the spots everyone skips.",
		desc: "A detailed, top-to-bottom clean for homes that need a full reset. We tackle built-up grime, hard-water stains and every hard-to-reach corner that regular cleaning misses.",
		features: [
			"Kitchen degreasing",
			"Tile & grout scrubbing",
			"High dusting, vents & fans",
			"Window sills & tracks",
			"Behind & under furniture",
			"Inside appliances on request",
		],
	},
	{
		id: "home-cleaning",
		category: "cleaning",
		image: "/images/services/cleaning-home-cleaning.jpg",
		title: "Regular Home Cleaning",
		icon: House,
		price: "Free Quote",
		short:
			"Weekly, bi-weekly or monthly visits from the same trusted cleaners, so your home stays effortlessly fresh.",
		desc: "Keep your home consistently clean without lifting a finger. Choose weekly, bi-weekly or monthly visits, and we'll send a reliable crew that knows your home and your preferences.",
		features: [
			"Weekly, bi-weekly or monthly",
			"Kitchens & bathrooms cleaned",
			"Dusting & surface wipe-downs",
			"Vacuuming & mopping",
			"Beds made & linens changed",
			"Flexible scheduling",
		],
	},
	{
		id: "office-cleaning",
		category: "cleaning",
		image: "/images/services/cleaning-office-cleaning.jpg",
		title: "Office & Commercial Cleaning",
		icon: Briefcase,
		price: "Custom Quote",
		short:
			"After-hours cleaning for offices, retail and shared spaces, so your team walks into a spotless workplace.",
		desc: "Professional cleaning for offices, retail stores and commercial spaces, scheduled around your business hours so there's no disruption to your team or your customers.",
		features: [
			"After-hours & weekend service",
			"Workstations & meeting rooms",
			"Kitchens & washrooms sanitized",
			"Garbage & recycling removal",
			"Floor care",
			"Recurring contracts available",
		],
	},
	{
		id: "post-construction",
		category: "cleaning",
		image: "/images/services/cleaning-post-construction.jpg",
		title: "Post-Renovation Cleaning",
		icon: HardHat,
		price: "Custom Quote",
		short:
			"Fine dust, debris and paint specks gone, so your newly renovated space is ready to enjoy.",
		desc: "Renovations leave dust in places you didn't know existed. We remove construction debris, fine dust and residue so your newly finished space is ready to live or work in.",
		features: [
			"Fine dust removal on every surface",
			"Debris & packaging cleanup",
			"Paint & adhesive spot removal",
			"Windows & frames detailed",
			"Fixtures & hardware polished",
			"Final walkthrough with you",
		],
	},
	{
		id: "carpet-upholstery",
		category: "cleaning",
		image: "/images/services/cleaning-carpet-upholstery.jpg",
		title: "Carpet & Upholstery",
		icon: Sofa,
		price: "Free Quote",
		short:
			"Lift stains, odours and allergens from carpets, rugs and furniture, a perfect finish before or after a move.",
		desc: "Restore carpets, rugs and upholstered furniture. Ideal before you list a home, after you move out, or once your furniture lands in its new space.",
		features: [
			"Carpet & area rug cleaning",
			"Sofa & chair upholstery",
			"Stain & odour treatment",
			"Pet hair removal",
			"Allergen reduction",
			"Fast-drying methods",
		],
	},
];

export const allServices = [...movingServices, ...cleaningServices];
