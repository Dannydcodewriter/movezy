import type { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Moving Services',
  description: 'Residential, commercial, long-distance, packing, storage and specialty moving services across Canada.',
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
