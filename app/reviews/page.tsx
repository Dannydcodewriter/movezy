import type { Metadata } from 'next'
import ReviewsPageContent from './ReviewsPageContent'

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description: '2,400+ verified reviews from real MOVEZY customers across Canada.',
}

export default function ReviewsPage() {
  return <ReviewsPageContent />
}
