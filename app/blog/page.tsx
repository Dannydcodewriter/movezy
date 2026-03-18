import type { Metadata } from 'next'
import BlogPageContent from './BlogPageContent'

export const metadata: Metadata = {
  title: 'Moving Tips & Blog',
  description: 'Expert moving guides, city tips, and money-saving advice from MOVEZY.',
}

export default function BlogPage() {
  return <BlogPageContent />
}
