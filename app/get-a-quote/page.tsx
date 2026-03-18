import type { Metadata } from 'next'
import QuotePageContent from './QuotePageContent'

export const metadata: Metadata = {
  title: 'Get a Free Moving Quote',
  description: 'Get matched with 3-5 vetted Canadian movers in minutes. Transparent pricing, no commitment.',
}

export default function GetAQuotePage() {
  return <QuotePageContent />
}
