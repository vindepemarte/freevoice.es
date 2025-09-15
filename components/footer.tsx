"use client"

import { Music, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-card-foreground">{t.footer.brand}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.footer.description}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a href="#coaches" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.nav.coaches}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.nav.testimonials}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">{t.footer.programs}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.footer.retreat3Day}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.footer.onlineCoaching}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.footer.groupWorkshops}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.footer.privateSessions}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t.footer.corporateTraining}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@freevoiceacademy.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@freevoiceacademy.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  123 Harmony Lane
                  <br />
                  Music Valley, CA 90210
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">{t.footer.rights}</p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.footer.privacyPolicy}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.footer.termsOfService}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t.footer.cookiePolicy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
