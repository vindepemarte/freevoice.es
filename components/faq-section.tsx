"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">{t.faq.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.faq.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.questions.map((faq: any, index: number) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-card-foreground pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t.faq.stillQuestions}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@freevoiceacademy.com" className="text-primary hover:underline font-medium">
              info@freevoiceacademy.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a href="tel:+1234567890" className="text-primary hover:underline font-medium">
              +1 (234) 567-8900
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
