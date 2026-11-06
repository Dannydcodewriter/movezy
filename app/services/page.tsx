import type { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Moving & Cleaning Services',
  description: 'Residential, commercial and long-distance moving, plus move-in/move-out, deep, home, office and post-renovation cleaning across Canada.',
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
