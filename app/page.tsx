import { LanguageProvider } from "@/hooks/use-language"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CoachesSection } from "@/components/coaches-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <TestimonialsSection />
          <CoachesSection />
          <PricingSection />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </LanguageProvider>
  )
}
