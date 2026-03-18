import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the Canadians who built MOVEZY to fix the broken moving industry.',
}

export default function AboutPage() {
  return <AboutPageContent />
}
