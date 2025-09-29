"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-[#9852A7]" />
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className={`text-xs ${
          language === "es" 
            ? "bg-[#3C318D] text-white hover:bg-[#3C318D]/90" 
            : "text-[#9852A7] hover:text-[#3C318D] hover:bg-[#9852A7]/10"
        }`}
      >
        ES
      </Button>
      <Button
        variant={language === "it" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("it")}
        className={`text-xs ${
          language === "it" 
            ? "bg-[#3C318D] text-white hover:bg-[#3C318D]/90" 
            : "text-[#9852A7] hover:text-[#3C318D] hover:bg-[#9852A7]/10"
        }`}
      >
        IT
      </Button>
    </div>
  )
}
