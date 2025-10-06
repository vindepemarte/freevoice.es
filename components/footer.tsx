"use client"

import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useDynamicContent } from "@/hooks/use-dynamic-content"
import Image from "next/image"

export function Footer() {
  const { t, language } = useLanguage()
  const { getContent } = useDynamicContent()
  
  // Get dynamic content with fallbacks
  const dynamicDescription = getContent('footer', 'description', language as 'it' | 'es')
  const dynamicWhatsApp = getContent('contact', 'whatsapp', language as 'it' | 'es')
  const dynamicEmail = getContent('contact', 'email', language as 'it' | 'es')
  const dynamicAddress = getContent('contact', 'address', language as 'it' | 'es')
  
  const footerDescription = dynamicDescription || t.footer.description
  const contactWhatsApp = dynamicWhatsApp || '+34697798991'
  const contactEmail = dynamicEmail || 'info@freevoice.es'
  const contactAddress = dynamicAddress || 'Tenerife, España'

  return (
    <footer className="bg-transparent border-t border-[#9852A7]/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto md:justify-between">
          {/* Brand */}
          <div className="space-y-4 sm:space-y-6 md:text-left text-center">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Image 
                src="/free-voice-logo.png" 
                alt="Free Voice Academy" 
                width={48} 
                height={48} 
                className="h-10 w-10 sm:h-12 sm:w-12" 
              />
              <span 
                className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider"
                style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}
              >
                FREE VOICE
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md mx-auto md:mx-0">{footerDescription}</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-white/60 hover:text-[#F02A30] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#F02A30] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#F02A30] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact - Essential only */}
          <div className="space-y-4 text-center md:text-right md:ml-auto">
            <h3 className="font-semibold text-white mb-4 sm:mb-6 text-lg">{t.footer.contact}</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center justify-center md:justify-end space-x-4">
                <Mail className="h-5 w-5 text-[#F02A30] flex-shrink-0 md:order-2 md:ml-4" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-white/80 hover:text-[#F02A30] transition-colors text-sm md:order-1"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-end space-x-4">
                <Phone className="h-5 w-5 text-[#F02A30] flex-shrink-0 md:order-2 md:ml-4" />
                <a
                  href={`https://wa.me/${contactWhatsApp.replace(/[^0-9]/g, '')}`}
                  className="text-white/80 hover:text-[#F02A30] transition-colors text-sm md:order-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactWhatsApp}
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-end space-x-4">
                <MapPin className="h-5 w-5 text-[#F02A30] flex-shrink-0 mt-0.5 md:order-2 md:ml-4" />
                <span className="text-white/80 text-sm md:order-1">
                  {contactAddress}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#9852A7]/20 mt-12 pt-8">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <a 
                href="/privacy-policy" 
                className="text-white/80 hover:text-[#F02A30] transition-colors underline"
              >
                {t.footer.privacyPolicy}
              </a>
              <a 
                href="/terms-conditions" 
                className="text-white/80 hover:text-[#F02A30] transition-colors underline"
              >
                {t.footer.termsOfService}
              </a>
              <a 
                href="/privacy-policy#cookies" 
                className="text-white/80 hover:text-[#F02A30] transition-colors underline"
              >
                {t.footer.cookiePolicy}
              </a>
            </div>
            <p className="text-white/80 text-sm">{t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
