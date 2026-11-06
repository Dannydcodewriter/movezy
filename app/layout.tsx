import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { MotionProvider, ScrollProgress } from "@/components/ui/motion";

export const metadata: Metadata = {
	title: {
		default: "MOVEZY — Moving & Cleaning Made Simple",
		template: "%s | MOVEZY",
	},
	description:
		"Canada’s moving and cleaning company. Our in-house team of trained, insured movers and cleaners handles residential and commercial moves, move-in/move-out cleaning, deep cleaning and more, coast to coast.",
	keywords: [
		"moving company Canada",
		"professional movers Canada",
		"Toronto movers",
		"Vancouver moving company",
		"Montreal movers",
		"long distance moving Canada",
		"residential movers",
		"commercial moving services",
		"move out cleaning Canada",
		"move in cleaning",
		"deep cleaning services",
		"house cleaning Toronto",
		"office cleaning services",
		"moving and cleaning company",
	],
	authors: [{ name: "MOVEZY Inc." }],
	creator: "MOVEZY Inc.",
	openGraph: {
		type: "website",
		locale: "en_CA",
		url: "https://movezy.ca",
		siteName: "MOVEZY",
		title: "MOVEZY — Moving & Cleaning Made Simple",
		description:
			"Professional, in-house movers and cleaners across Canada. Book your move, your clean, or both, with transparent pricing and care you can trust.",
	},
	twitter: {
		card: "summary_large_image",
		title: "MOVEZY — Moving & Cleaning Made Simple",
		description:
			"Professional movers and cleaners across Canada. Book your move, your clean, or both, with transparent pricing and care you can trust.",
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: "#1B3A6B",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en-CA" className="scroll-smooth">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="font-body antialiased">
				<MotionProvider>
					<ScrollProgress />
					<CustomCursor />
					<Navbar />
					<main>{children}</main>
					<Footer />
				</MotionProvider>
			</body>
		</html>
	);
}
