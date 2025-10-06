import { LanguageProvider } from "@/hooks/use-language"
import { DynamicContentProvider } from "@/hooks/use-dynamic-content"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { JennyIntroSection } from "@/components/jenny-intro-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CoachesSection } from "@/components/coaches-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export default function HomePage() {
  return (
    <LanguageProvider>
      <DynamicContentProvider>
        <div className="min-h-screen">
          <Header />
          <main>
            <HeroSection />
            <JennyIntroSection />
            <TestimonialsSection />
            <CoachesSection />
            <PricingSection />
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </DynamicContentProvider>
    </LanguageProvider>
  )
}
