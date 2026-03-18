import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'MOVEZY — Canada\'s Premium Moving Platform',
    template: '%s | MOVEZY',
  },
  description: 'Canada\'s most trusted moving marketplace. Get matched with vetted, insured movers in minutes. Transparent pricing, verified reviews, and full protection coast to coast.',
  keywords: ['moving company Canada', 'movers Toronto', 'Vancouver movers', 'Montreal moving', 'moving quotes Canada', 'professional movers'],
  authors: [{ name: 'MOVEZY Inc.' }],
  creator: 'MOVEZY Inc.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://movezy.ca',
    siteName: 'MOVEZY',
    title: 'MOVEZY — Canada\'s Premium Moving Platform',
    description: 'Get matched with vetted, insured Canadian movers in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOVEZY — Canada\'s Premium Moving Platform',
    description: 'Get matched with vetted, insured Canadian movers in minutes.',
  },
  robots: { index: true, follow: true },
  themeColor: '#1B3A6B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-CA" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
  )
}
