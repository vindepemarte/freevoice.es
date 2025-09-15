"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className="text-xs"
      >
        ES
      </Button>
      <Button
        variant={language === "it" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("it")}
        className="text-xs"
      >
        IT
      </Button>
    </div>
  )
}
