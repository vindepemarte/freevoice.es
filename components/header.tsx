"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { BookingForm } from "./booking-form"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Image src="/free-voice-logo.png" alt="Free Voice Academy" width={40} height={40} className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground hidden sm:block">Free Voice</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              {t.nav.features}
            </a>
            <a href="#coaches" className="text-foreground hover:text-primary transition-colors">
              {t.nav.coaches}
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
              {t.nav.testimonials}
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              {t.nav.pricing}
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              {t.nav.faq}
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <BookingForm>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{t.hero.bookSpot}</Button>
            </BookingForm>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.features}
              </a>
              <a
                href="#coaches"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.coaches}
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.testimonials}
              </a>
              <a
                href="#pricing"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.pricing}
              </a>
              <a
                href="#faq"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.faq}
              </a>
              <div className="flex flex-col space-y-2">
                <LanguageSwitcher />
                <BookingForm>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                    {t.hero.bookSpot}
                  </Button>
                </BookingForm>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
