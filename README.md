# MOVEZY — Canada's Premium Moving Platform

A professional, production-ready Next.js 16 website built with TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **Next.js 16 + React 19** — App Router, Server Components
- **Resend** — Emails quote requests to the helpdesk inbox
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Framer Motion** — Premium animations and transitions
- **Lucide React** — Icon system

## ✨ Features

- 🎨 **Premium design system** — Playfair Display + DM Sans typography, custom color palette
- ✨ **Framer Motion animations** — Hero parallax, scroll-triggered reveals, page transitions, hover effects
- 🖱️ **Custom cursor** — Amber dot + ring, hover state changes
- 📱 **Fully responsive** — Mobile-first, every breakpoint tested
- 🌐 **6 pages** — Homepage, Services, About, Reviews, Blog, Get a Quote
- 🎯 **Multi-step quote form** — 3-step animated form that emails each request via Resend
- 📍 **Address autocomplete** — Free OpenStreetMap (Nominatim) suggestions, Canada only
- 📊 **Animated counters** — Stats animate on scroll into view
- 🎠 **Interactive stepper** — Auto-advancing how-it-works with progress bars
- 🔍 **Review filtering** — Filter reviews by service category
- 🌙 **Dark hero sections** — Mesh gradients, noise textures, grid patterns

## 📁 Project Structure

```
movezy/
├── app/
│   ├── layout.tsx           # Root layout with fonts & metadata
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles + Tailwind
│   ├── api/send-quote/      # POST endpoint that emails quote requests
│   ├── about/               # About page
│   ├── services/            # Services page
│   ├── reviews/             # Reviews page
│   ├── blog/                # Blog page
│   └── get-a-quote/         # Quote form page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Fixed nav with ticker bar
│   │   └── Footer.tsx       # Full footer with CTA band
│   ├── sections/
│   │   ├── HeroSection.tsx  # Animated hero with parallax
│   │   ├── WhyUsSection.tsx # 6-feature dark grid
│   │   ├── ServicesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── StatsSection.tsx # Animated counters
│   │   ├── TestimonialsSection.tsx
│   │   └── CtaSection.tsx
│   └── ui/
│       ├── Button.tsx       # Reusable button component
│       ├── AnimatedCounter.tsx
│       ├── AddressAutocomplete.tsx
│       └── CustomCursor.tsx
├── lib/
│   └── utils.ts             # cn() helper
├── types/
│   └── index.ts             # TypeScript type definitions
├── tailwind.config.ts       # Custom design tokens
└── next.config.js
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 20.9+
- npm or yarn
- A [Resend](https://resend.com) API key (for the quote form)

### Install & Run

```bash
# Install dependencies
npm install

# Add your environment variables
cp .env.example .env.local   # then set RESEND_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Tokens

### Colors
- `--navy-*` — Primary navy palette (#0a1929 to #1A5276)
- `--amber-brand` — #E8A020 (brand accent)
- `--sky-brand` — #2E86C1 (secondary blue)

### Typography
- **Display** — Playfair Display (serif, headings)
- **Body** — DM Sans (clean, modern)
- **Mono** — DM Mono (labels, tags)

### Utilities
- `.mesh-bg` — Dark gradient mesh background
- `.grid-pattern` — Subtle grid overlay
- `.glass` — Dark glassmorphism card
- `.glass-light` — Light glassmorphism card
- `.text-gradient` — Amber gradient text
- `.hover-lift` — Hover lift animation

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, Why Us, Services, Stats, How It Works, Testimonials, CTA |
| Services | `/services` | All 6 services with alternating layout |
| About | `/about` | Story, Stats, Values, Team |
| Reviews | `/reviews` | Rating overview, filterable review grid |
| Blog | `/blog` | Featured article, post grid, quick tips |
| Get a Quote | `/get-a-quote` | 3-step animated form |

## 🚀 Deployment

Deploy to Vercel in one click:
1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add `RESEND_API_KEY` under Project → Settings → Environment Variables
4. Deploy

Or use any Node.js hosting provider.

---

Built with ❤️  by Chukwuka Daniel.
