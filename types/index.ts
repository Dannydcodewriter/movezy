export interface Service {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
  startingPrice: string
  badge?: string
  gradient: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  service: string
  date: string
  verified: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  linkedin?: string
  twitter?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: string
  emoji: string
  gradient: string
}

export interface Stat {
  value: string
  suffix: string
  label: string
  sublabel: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface QuoteFormData {
  fromCity: string
  toCity: string
  moveDate: string
  homeSize: string
  moveType: string
  services: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}
