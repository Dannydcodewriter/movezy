import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuotePageContent from './QuotePageContent'

export const metadata: Metadata = {
  title: 'Get a Free Moving or Cleaning Quote',
  description: 'Get a free, upfront quote for moving, cleaning, or both from our trained, insured Canadian team. Transparent pricing, no commitment.',
}

export default function GetAQuotePage() {
  return (
    // QuotePageContent reads ?service=&from=&to=&size= from the hero card
    <Suspense fallback={<div className="min-h-screen mesh-bg" />}>
      <QuotePageContent />
    </Suspense>
  )
}
