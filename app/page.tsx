import HeroSection from '@/components/sections/HeroSection'
import ServiceMarquee from '@/components/sections/ServiceMarquee'
import WhyUsSection from '@/components/sections/WhyUsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import MoveCleanSection from '@/components/sections/MoveCleanSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import StatsSection from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceMarquee />
      <ServicesSection />
      <MoveCleanSection />
      <WhyUsSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
