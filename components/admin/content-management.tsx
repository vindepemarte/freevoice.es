"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

interface ContentManagementProps {
  siteContent: any
  onSave: (contentData: any) => void
  isLoading: boolean
}

export function ContentManagement({ siteContent, onSave, isLoading }: ContentManagementProps) {
  const [formData, setFormData] = useState<any>({
    hero_title_it: '',
    hero_title_es: '',
    hero_subtitle_it: '',
    hero_subtitle_es: '',
    contact_whatsapp: '+34697798991',
    contact_email: 'info@freevoice.es',
    contact_address_it: 'Healing Garden, Guía de Isora, Tenerife',
    contact_address_es: 'Jardín de Sanación, Guía de Isora, Tenerife',
    footer_description_it: 'Free Voice Academy - Trasforma la tua voce, trasforma la tua vita. Scopri il potere della tua voce autentica.',
    footer_description_es: 'Free Voice Academy - Transforma tu voz, transforma tu vida. Descubre el poder de tu voz auténtica.',
    intro_video_url_it: 'https://www.youtube.com/embed/wz9EIsW0VRU',
    intro_video_url_es: 'https://www.youtube.com/embed/aTEZkprxE9A',
    testimonials_video_url_it: 'https://www.youtube.com/embed/bnT4iavyXTw',
    testimonials_video_url_es: 'https://www.youtube.com/embed/5gA6ewP0nQk'
  })

  useEffect(() => {
    // Update form data when siteContent changes
    setFormData({
      hero_title_it: siteContent.hero_title_it || 'Trasforma la Tua Voce, Trasforma la Tua Vita',
      hero_title_es: siteContent.hero_title_es || 'Transforma Tu Voz, Transforma Tu Vida',
      hero_subtitle_it: siteContent.hero_subtitle_it || 'Scopri il potere della tua voce autentica e trasforma la tua vita attraverso workshop intensivi e personali di espressione vocale.',
      hero_subtitle_es: siteContent.hero_subtitle_es || 'Descubre el poder de tu voz auténtica y transforma tu vida a través de talleres intensivos y personales de expresión vocal.',
      contact_whatsapp: siteContent.contact_whatsapp || '+34697798991',
      contact_email: siteContent.contact_email || 'info@freevoice.es',
      contact_address_it: siteContent.contact_address_it || 'Healing Garden, Guía de Isora, Tenerife',
      contact_address_es: siteContent.contact_address_es || 'Jardín de Sanación, Guía de Isora, Tenerife',
      footer_description_it: siteContent.footer_description_it || 'Free Voice Academy - Trasforma la tua voce, trasforma la tua vita. Scopri il potere della tua voce autentica.',
      footer_description_es: siteContent.footer_description_es || 'Free Voice Academy - Transforma tu voz, transforma tu vida. Descubre el poder de tu voz auténtica.',
      intro_video_url_it: siteContent.intro_video_url_it || 'https://www.youtube.com/embed/wz9EIsW0VRU',
      intro_video_url_es: siteContent.intro_video_url_es || 'https://www.youtube.com/embed/aTEZkprxE9A',
      testimonials_video_url_it: siteContent.testimonials_video_url_it || 'https://www.youtube.com/embed/bnT4iavyXTw',
      testimonials_video_url_es: siteContent.testimonials_video_url_es || 'https://www.youtube.com/embed/5gA6ewP0nQk'
    })
  }, [siteContent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-4">
        <CardTitle className="text-gray-800">Gestione Contenuto Sito</CardTitle>
        <p className="text-sm text-gray-600">
          Modifica i contenuti principali del sito web (titoli, testi, informazioni di contatto)
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800">Sezione Hero - Italiano</h3>
              <div>
                <Label className="text-gray-700 font-medium">Titolo Principale</Label>
                <Input 
                  value={formData.hero_title_it}
                  onChange={(e) => handleInputChange('hero_title_it', e.target.value)}
                  placeholder="Trasforma la Tua Voce, Trasforma la Tua Vita" 
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Sottotitolo</Label>
                <Textarea 
                  value={formData.hero_subtitle_it}
                  onChange={(e) => handleInputChange('hero_subtitle_it', e.target.value)}
                  rows={3}
                  placeholder="Scopri il potere della tua voce autentica..."
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
            </div>
            
            <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800">Sezione Hero - Spagnolo</h3>
              <div>
                <Label className="text-gray-700 font-medium">Titolo Principale</Label>
                <Input 
                  value={formData.hero_title_es}
                  onChange={(e) => handleInputChange('hero_title_es', e.target.value)}
                  placeholder="Transforma Tu Voz, Transforma Tu Vida" 
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Sottotitolo</Label>
                <Textarea 
                  value={formData.hero_subtitle_es}
                  onChange={(e) => handleInputChange('hero_subtitle_es', e.target.value)}
                  rows={3}
                  placeholder="Descubre el poder de tu voz auténtica..."
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Informazioni di Contatto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 font-medium">Numero WhatsApp</Label>
                <Input 
                  value={formData.contact_whatsapp}
                  onChange={(e) => handleInputChange('contact_whatsapp', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Email di Contatto</Label>
                <Input 
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Indirizzo (Italiano)</Label>
                <Input 
                  value={formData.contact_address_it}
                  onChange={(e) => handleInputChange('contact_address_it', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Indirizzo (Spagnolo)</Label>
                <Input 
                  value={formData.contact_address_es}
                  onChange={(e) => handleInputChange('contact_address_es', e.target.value)}
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
            </div>
          </div>
          
          {/* Footer Content */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Contenuto Footer</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700 font-medium">Descrizione Footer (Italiano)</Label>
                <Textarea
                  value={formData.footer_description_it}
                  onChange={(e) => handleInputChange('footer_description_it', e.target.value)}
                  rows={4}
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Descrizione Footer (Spagnolo)</Label>
                <Textarea
                  value={formData.footer_description_es}
                  onChange={(e) => handleInputChange('footer_description_es', e.target.value)}
                  rows={4}
                  className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                />
              </div>
            </div>
          </div>
          
          {/* Video URLs Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Video YouTube</h3>
            <p className="text-sm text-gray-600 mb-4">
              Inserisci gli URL dei video YouTube (formato embed: https://www.youtube.com/embed/VIDEO_ID)
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700 font-medium">Video Introduzione (Italiano)</Label>
                  <Input 
                    value={formData.intro_video_url_it}
                    onChange={(e) => handleInputChange('intro_video_url_it', e.target.value)}
                    placeholder="https://www.youtube.com/embed/wz9EIsW0VRU"
                    className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Video Introduzione (Spagnolo)</Label>
                  <Input 
                    value={formData.intro_video_url_es}
                    onChange={(e) => handleInputChange('intro_video_url_es', e.target.value)}
                    placeholder="https://www.youtube.com/embed/aTEZkprxE9A"
                    className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700 font-medium">Video Testimonianze (Italiano)</Label>
                  <Input 
                    value={formData.testimonials_video_url_it}
                    onChange={(e) => handleInputChange('testimonials_video_url_it', e.target.value)}
                    placeholder="https://www.youtube.com/embed/bnT4iavyXTw"
                    className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Video Testimonianze (Spagnolo)</Label>
                  <Input 
                    value={formData.testimonials_video_url_es}
                    onChange={(e) => handleInputChange('testimonials_video_url_es', e.target.value)}
                    placeholder="https://www.youtube.com/embed/5gA6ewP0nQk"
                    className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-sm sm:w-auto sm:px-8"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salva Modifiche al Contenuto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}