"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { BookingForm } from "./booking-form"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className={`mx-auto max-w-7xl transition-all duration-500 ease-out ${
        isScrolled ? 'mt-2 sm:mt-4' : 'mt-4 sm:mt-6 md:mt-8'
      }`}>
        <nav className={`
          relative overflow-visible rounded-full transition-all duration-500 ease-out
          bg-gradient-to-r from-[#F02A30] via-[#9852A7] to-[#3C318D]
          shadow-lg hover:shadow-xl
          ${isScrolled ? 'py-1.5 px-3 sm:py-2 sm:px-4 h-10 sm:h-12' : 'py-2.5 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 h-14 sm:h-16 md:h-20'}
        `}>
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <div className="flex items-center">
              <div className={`transition-all duration-300 ${isScrolled ? 'h-8 w-8 sm:h-12 sm:w-12' : 'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24'} max-h-[300px] max-w-[300px]`}>
                <Image
                  src="/free-voice-logo.png"
                  alt="Free Voice Academy Logo"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <h1 className={`ml-2 sm:ml-3 font-bold transition-all duration-300 ${
                isScrolled 
                  ? 'text-sm sm:text-base md:text-lg' 
                  : 'text-base sm:text-lg md:text-xl lg:text-2xl'
              } text-white`}>
                FREE VOICE
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
              <LanguageSwitcher />
              <BookingForm>
                <Button className={`
                  bg-white/20 backdrop-blur-sm hover:bg-white/30 
                  text-white font-semibold rounded-full 
                  transition-all duration-300 
                  border border-white/30 hover:border-white/50
                  shadow-lg hover:shadow-xl transform hover:scale-105
                  ${isScrolled ? 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm' : 'px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base'}
                `}>
                  {t.hero.bookSpot}
                </Button>
              </BookingForm>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
              <LanguageSwitcher />
              <button 
                className={`
                  rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white 
                  transition-all duration-300 border border-white/30
                  ${isScrolled ? 'p-1.5' : 'p-2'}
                `}
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className={isScrolled ? "h-4 w-4" : "h-5 w-5"} /> : <Menu className={isScrolled ? "h-4 w-4" : "h-5 w-5"} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <BookingForm>
                <Button className="
                  bg-white/20 backdrop-blur-sm hover:bg-white/30 
                  text-white w-full font-semibold py-3 rounded-full 
                  border border-white/30 hover:border-white/50
                  shadow-lg transform hover:scale-105 transition-all duration-300
                ">
                  {t.hero.bookSpot}
                </Button>
              </BookingForm>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
