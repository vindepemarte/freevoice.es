"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function TestimonialSubmissionForm() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content_it: "",
    content_es: "",
  })

  const translations = {
    it: {
      title: "Condividi la Tua Esperienza",
      buttonText: "Invia Testimonianza",
      name: "Nome Completo",
      namePlaceholder: "Es: Maria Rossi",
      role: "Professione/Ruolo",
      rolePlaceholder: "Es: Cantante, Attore, Insegnante...",
      contentIt: "La Tua Testimonianza (Italiano)",
      contentItPlaceholder: "Racconta la tua esperienza con Free Voice Academy...",
      contentEs: "La Tua Testimonianza (Spagnolo)",
      contentEsPlaceholder: "Cuenta tu experiencia con Free Voice Academy...",
      uploadImage: "Carica Foto (Opzionale)",
      uploadButton: "Scegli Foto",
      submit: "Invia",
      cancel: "Annulla",
      submitting: "Invio in corso...",
      successTitle: "Grazie!",
      successMessage: "La tua testimonianza è stata inviata con successo. Il nostro team la esaminerà a breve.",
      errorMessage: "Si è verificato un errore. Per favore riprova.",
      bilingual: "Per favore compila la testimonianza in entrambe le lingue (italiano e spagnolo).",
    },
    es: {
      title: "Comparte Tu Experiencia",
      buttonText: "Enviar Testimonio",
      name: "Nombre Completo",
      namePlaceholder: "Ej: María Rodríguez",
      role: "Profesión/Rol",
      rolePlaceholder: "Ej: Cantante, Actor, Profesor...",
      contentIt: "Tu Testimonio (Italiano)",
      contentItPlaceholder: "Racconta la tua esperienza con Free Voice Academy...",
      contentEs: "Tu Testimonio (Español)",
      contentEsPlaceholder: "Cuenta tu experiencia con Free Voice Academy...",
      uploadImage: "Subir Foto (Opcional)",
      uploadButton: "Elegir Foto",
      submit: "Enviar",
      cancel: "Cancelar",
      submitting: "Enviando...",
      successTitle: "¡Gracias!",
      successMessage: "Tu testimonio ha sido enviado con éxito. Nuestro equipo lo revisará pronto.",
      errorMessage: "Ocurrió un error. Por favor intenta de nuevo.",
      bilingual: "Por favor completa el testimonio en ambos idiomas (italiano y español).",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.it

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError(language === "it" ? "L'immagine è troppo grande. Massimo 5MB." : "La imagen es demasiado grande. Máximo 5MB.")
        return
      }
      
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      content_it: "",
      content_es: "",
    })
    setImageFile(null)
    setImagePreview(null)
    setError("")
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      let imageUrl = null

      // Upload image if provided
      if (imageFile) {
        const imageFormData = new FormData()
        imageFormData.append('image', imageFile)
        imageFormData.append('type', 'testimonial')
        imageFormData.append('public', 'true')

        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: imageFormData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          imageUrl = uploadData.imageUrl
        } else {
          throw new Error('Image upload failed')
        }
      }

      // Submit testimonial
      const response = await fetch('/api/public/testimonials/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_url: imageUrl,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          resetForm()
        }, 3000)
      } else {
        setError(data.error || t.errorMessage)
      }
    } catch (err) {
      console.error('Error submitting testimonial:', err)
      setError(t.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-[#F02A30] text-[#F02A30] hover:bg-[#F02A30] hover:text-white font-semibold shadow-md"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {t.buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-[#3C318D]/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#3C318D]">{t.title}</DialogTitle>
        </DialogHeader>

        {success ? (
          <Alert className="border-green-300 bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">
              <strong>{t.successTitle}</strong><br />
              {t.successMessage}
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="border-red-300 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <Alert className="border-blue-300 bg-blue-50">
              <AlertDescription className="text-blue-800 text-sm">
                {t.bilingual}
              </AlertDescription>
            </Alert>

            <div>
              <Label className="text-gray-800 font-medium mb-2 block">{t.name} *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.namePlaceholder}
                className="border-gray-400 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-800 font-medium mb-2 block">{t.role}</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder={t.rolePlaceholder}
                className="border-gray-400 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-800 font-medium mb-2 block">{t.uploadImage}</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t.uploadButton}
                </Label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-lg border-2 border-gray-300"
                  />
                )}
              </div>
            </div>

            <div>
              <Label className="text-gray-800 font-medium mb-2 block">{t.contentIt} *</Label>
              <Textarea
                required
                value={formData.content_it}
                onChange={(e) => setFormData({ ...formData, content_it: e.target.value })}
                placeholder={t.contentItPlaceholder}
                className="border-gray-400 text-gray-900 placeholder:text-gray-500 min-h-[100px]"
              />
            </div>

            <div>
              <Label className="text-gray-800 font-medium mb-2 block">{t.contentEs} *</Label>
              <Textarea
                required
                value={formData.content_es}
                onChange={(e) => setFormData({ ...formData, content_es: e.target.value })}
                placeholder={t.contentEsPlaceholder}
                className="border-gray-400 text-gray-900 placeholder:text-gray-500 min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-white"
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white"
              >
                {isSubmitting ? t.submitting : t.submit}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
