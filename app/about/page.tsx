import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the Canadian moving and cleaning company built to fix everything wrong with moving day.',
}

export default function AboutPage() {
  return <AboutPageContent />
}
