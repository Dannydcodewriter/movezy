import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
	title: {
		default: "MOVEZY — Moving Made Simple",
		template: "%s | MOVEZY",
	},
	description:
		"Canada’s premium moving company delivering reliable, professional moving services coast to coast. Our in-house team of trained, insured movers ensures a seamless, stress-free experience from start to finish.",
	keywords: [
		"moving company Canada",
		"professional movers Canada",
		"Toronto movers",
		"Vancouver moving company",
		"Montreal movers",
		"long distance moving Canada",
		"residential movers",
		"commercial moving services",
	],
	authors: [{ name: "MOVEZY Inc." }],
	creator: "MOVEZY Inc.",
	openGraph: {
		type: "website",
		locale: "en_CA",
		url: "https://movezy.ca",
		siteName: "MOVEZY",
		title: "MOVEZY — Moving Made Simple",
		description:
			"Professional, in-house movers delivering seamless, stress-free moves across Canada. Reliable service, transparent pricing, and care you can trust.",
	},
	twitter: {
		card: "summary_large_image",
		title: "MOVEZY — Moving Made Simple",
		description:
			"Professional movers delivering seamless, stress-free moves across Canada. Reliable service, transparent pricing, and care you can trust.",
	},
	robots: { index: true, follow: true },
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
				<CustomCursor />
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
