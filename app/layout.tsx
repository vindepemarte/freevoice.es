import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/hooks/use-language"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Free Voice Academy - Libera Tu Voz, Transforma Tu Vida",
  description:
    "Academia de coaching vocal con retiros inmersivos en Tenerife. Descubre tu voz auténtica con nuestros coaches expertos.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>{children}</LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
