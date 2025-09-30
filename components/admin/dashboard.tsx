"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Calendar, Users, DollarSign, MessageSquare, Star, 
  Plus, Edit, Trash2, LogOut, Eye, Save, X, 
  Upload, Play, Video, AlertTriangle, CheckCircle 
} from "lucide-react"
import { AdminUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface AdminDashboardProps {
  user: AdminUser
}

interface Workshop {
  id: number
  title_it: string
  title_es: string
  description_it: string
  description_es: string
  price: number
  date: string
  location: string
  instructors: string
  max_participants: number
  is_active: boolean
  is_popular: boolean
}

interface Testimonial {
  id: number
  name: string
  role: string
  content_it: string
  content_es: string
  video_url?: string
  image_url?: string
  is_approved: boolean
  display_order: number
}

interface Coach {
  id: number
  name: string
  title_it: string
  title_es: string
  bio_it: string
  bio_es: string
  image_url: string
  specialties_it: string[]
  specialties_es: string[]
  display_order: number
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Temporarily use public endpoints to show data while session issue is fixed
      const [workshopsRes, testimonialsRes, coachesRes] = await Promise.all([
        fetch('/api/public/workshops'),
        fetch('/api/public/testimonials'),
        fetch('/api/public/coaches')
      ])

      if (workshopsRes.ok) {
        const workshopsData = await workshopsRes.json()
        setWorkshops(workshopsData.workshops || [])
        console.log('Loaded workshops:', workshopsData.workshops?.length || 0)
      } else {
        console.error('Failed to load workshops:', workshopsRes.status)
        setError('Failed to load workshops - please check login')
      }

      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json()
        setTestimonials(testimonialsData.testimonials || [])
        console.log('Loaded testimonials:', testimonialsData.testimonials?.length || 0)
      } else {
        console.error('Failed to load testimonials:', testimonialsRes.status)
      }

      if (coachesRes.ok) {
        const coachesData = await coachesRes.json()
        setCoaches(coachesData.coaches || [])
        console.log('Loaded coaches:', coachesData.coaches?.length || 0)
      } else {
        console.error('Failed to load coaches:', coachesRes.status)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Failed to load data - please check connection')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      console.log('Logout button clicked')
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      })
      
      console.log('Logout response status:', response.status)
      
      if (response.ok) {
        console.log('Logout successful, redirecting...')
        // Force page reload to clear all state
        window.location.href = '/admin'
      } else {
        console.error('Logout failed with status:', response.status)
        // Still try to redirect in case of server error
        window.location.href = '/admin'
      }
    } catch (error) {
      console.error('Logout network error:', error)
      // Force redirect even on network error
      window.location.href = '/admin'
    }
  }

  const handleSave = async (type: string, data: any) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const endpoint = `/api/admin/${type}`
      const method = data.id ? 'PUT' : 'POST'
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSuccess(`${type} saved successfully`)
        setShowModal(false)
        setEditingItem(null)
        loadData()
      } else {
        const errorData = await response.json()
        setError(errorData.error || `Failed to save ${type}`)
      }
    } catch (error) {
      setError(`Network error saving ${type}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (type: string, id: number) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/${type}?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSuccess(`${type} deleted successfully`)
        loadData()
      } else {
        setError(`Failed to delete ${type}`)
      }
    } catch (error) {
      setError(`Network error deleting ${type}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-[#3C318D] mb-2">Free Voice Academy - Admin</h1>
            <p className="text-gray-600">Gestione completa del contenuto del sito web</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            <Button variant="outline" onClick={handleLogout} className="border-[#3C318D] text-[#3C318D] hover:bg-[#3C318D] hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-300 bg-red-50 shadow-sm">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            <Button variant="ghost" size="sm" onClick={() => setError("")} className="ml-auto text-red-600 hover:text-red-800">
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-300 bg-green-50 shadow-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
            <Button variant="ghost" size="sm" onClick={() => setSuccess("")} className="ml-auto text-green-600 hover:text-green-800">
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <TabsList className="grid w-full grid-cols-5 bg-gray-50">
              <TabsTrigger value="overview" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium">Panoramica</TabsTrigger>
              <TabsTrigger value="workshops" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium">Workshop</TabsTrigger>
              <TabsTrigger value="testimonials" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium">Testimonianze</TabsTrigger>
              <TabsTrigger value="coaches" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium">Coach</TabsTrigger>
              <TabsTrigger value="content" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium">Contenuto</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Workshop Attivi</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3C318D]">{workshops.filter(w => w.is_active).length}</div>
                  <p className="text-xs text-gray-600">Workshop disponibili</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Testimonianze</CardTitle>
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#F02A30]">{testimonials.length}</div>
                  <p className="text-xs text-gray-600">
                    {testimonials.filter(t => t.is_approved).length} approvate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Coach</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#9852A7]">{coaches.length}</div>
                  <p className="text-xs text-gray-600">Team membri</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Prezzo Base</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3C318D]">€90</div>
                  <p className="text-xs text-gray-600">Workshop 1 giorno</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'workshops', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#3C318D] hover:bg-[#3C318D]/90 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuovo Workshop
                </Button>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'testimonials', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuova Testimonianza
                </Button>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'coaches', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#9852A7] hover:bg-[#9852A7]/90 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuovo Coach
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workshops Tab */}
          <TabsContent value="workshops" className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <CardTitle className="text-gray-800">Gestione Workshop</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Crea e gestisci i workshop disponibili</p>
                </div>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'workshops', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#3C318D] hover:bg-[#3C318D]/90 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Workshop
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {workshop.title_it}
                            </h3>
                            {workshop.is_popular && (
                              <Badge className="bg-[#F02A30] text-white shadow-sm">
                                <Star className="h-3 w-3 mr-1" />
                                Popolare
                              </Badge>
                            )}
                            {!workshop.is_active && (
                              <Badge variant="secondary" className="bg-gray-200 text-gray-700">Inattivo</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {workshop.description_it}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="text-gray-700"><strong className="text-gray-800">Prezzo:</strong> €{workshop.price}</div>
                            <div className="text-gray-700"><strong className="text-gray-800">Data:</strong> {workshop.date}</div>
                            <div className="text-gray-700"><strong className="text-gray-800">Luogo:</strong> {workshop.location}</div>
                            <div className="text-gray-700"><strong className="text-gray-800">Max partecipanti:</strong> {workshop.max_participants}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingItem({ type: 'workshops', data: workshop })
                              setShowModal(true)
                            }}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete('workshops', workshop.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <CardTitle className="text-gray-800">Gestione Testimonianze</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Gestisci le testimonianze dei clienti con supporto video</p>
                </div>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'testimonials', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Testimonianza
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border border-gray-300">
                            {testimonial.image_url ? (
                              <Image 
                                src={testimonial.image_url} 
                                alt={testimonial.name} 
                                width={64} 
                                height={64} 
                                className="object-cover" 
                              />
                            ) : (
                              <Video className="h-6 w-6 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {testimonial.name}
                              </h3>
                              {testimonial.is_approved ? (
                                <Badge className="bg-green-500 text-white shadow-sm">Approvato</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">In attesa</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {testimonial.role}
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-2 mb-1">
                              <span className="font-medium">IT:</span> {testimonial.content_it}
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-2">
                              <span className="font-medium">ES:</span> {testimonial.content_es}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingItem({ type: 'testimonials', data: testimonial })
                              setShowModal(true)
                            }}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete('testimonials', testimonial.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          {testimonial.video_url && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(testimonial.video_url, '_blank')}
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coaches Tab */}
          <TabsContent value="coaches" className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <CardTitle className="text-gray-800">Gestione Coach</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Gestisci i profili del team con specialità e biografie</p>
                </div>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'coaches', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#9852A7] hover:bg-[#9852A7]/90 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Coach
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {coaches.map((coach) => (
                    <div key={coach.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border border-gray-300">
                          {coach.image_url ? (
                            <Image 
                              src={coach.image_url} 
                              alt={coach.name} 
                              width={80} 
                              height={80} 
                              className="object-cover" 
                            />
                          ) : (
                            <Users className="h-8 w-8 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800">{coach.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">IT:</span> {coach.title_it} <br />
                            <span className="font-medium">ES:</span> {coach.title_es}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {coach.specialties_it?.map((specialty, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-700">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingItem({ type: 'coaches', data: coach })
                              setShowModal(true)
                            }}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete('coaches', coach.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium text-xs text-gray-600 mb-1">Bio Italiana:</p>
                          <p className="text-gray-700 line-clamp-2">{coach.bio_it}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium text-xs text-gray-600 mb-1">Bio Spagnola:</p>
                          <p className="text-gray-700 line-clamp-2">{coach.bio_es}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100 pb-4">
                <CardTitle className="text-gray-800">Gestione Contenuto Sito</CardTitle>
                <p className="text-sm text-gray-600">
                  Modifica i contenuti principali del sito web (titoli, testi, informazioni di contatto)
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hero Section */}
                  <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800">Sezione Hero - Italiano</h3>
                    <div>
                      <Label className="text-gray-700 font-medium">Titolo Principale</Label>
                      <Input 
                        placeholder="Trasforma la Tua Voce, Trasforma la Tua Vita" 
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Sottotitolo</Label>
                      <Textarea 
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
                        placeholder="Transforma Tu Voz, Transforma Tu Vida" 
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Sottotitolo</Label>
                      <Textarea 
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium">Numero WhatsApp</Label>
                      <Input 
                        defaultValue="+34697798991" 
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Email di Contatto</Label>
                      <Input 
                        defaultValue="info@freevoice.es" 
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Indirizzo (Italiano)</Label>
                      <Input 
                        defaultValue="Healing Garden, Guía de Isora, Tenerife" 
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Indirizzo (Spagnolo)</Label>
                      <Input 
                        defaultValue="Jardín de Sanación, Guía de Isora, Tenerife" 
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Footer Content */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Contenuto Footer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium">Descrizione Footer (Italiano)</Label>
                      <Textarea
                        rows={4}
                        defaultValue="Free Voice Academy - Trasforma la tua voce, trasforma la tua vita. Scopri il potere della tua voce autentica."
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Descrizione Footer (Spagnolo)</Label>
                      <Textarea
                        rows={4}
                        defaultValue="Free Voice Academy - Transforma tu voz, transforma tu vida. Descubre el poder de tu voz auténtica."
                        className="mt-1 border-gray-300 focus:border-[#3C318D] focus:ring-[#3C318D]"
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-sm">
                  <Save className="h-4 w-4 mr-2" />
                  Salva Modifiche al Contenuto
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal for editing/creating items */}
        <EditModal 
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setEditingItem(null)
          }}
          editingItem={editingItem}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

// Separate Modal Component for editing
function EditModal({ isOpen, onClose, editingItem, onSave, isLoading }: any) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (editingItem?.data) {
      setFormData(editingItem.data)
    } else {
      setFormData({})
    }
  }, [editingItem])

  if (!isOpen || !editingItem) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editingItem.type, formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-300 shadow-2xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-bold text-[#3C318D]">
            {editingItem.data ? 'Modifica' : 'Aggiungi'} {editingItem.type}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {editingItem.type === 'workshops' && (
            <WorkshopForm formData={formData} setFormData={setFormData} />
          )}
          {editingItem.type === 'testimonials' && (
            <TestimonialForm formData={formData} setFormData={setFormData} />
          )}
          {editingItem.type === 'coaches' && (
            <CoachForm formData={formData} setFormData={setFormData} />
          )}
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Annulla
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-sm"
            >
              {isLoading ? 'Salvando...' : 'Salva'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Form components for different types
function WorkshopForm({ formData, setFormData }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Titolo (Italiano)</Label>
        <Input 
          value={formData.title_it || ''} 
          onChange={(e) => setFormData({...formData, title_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Es: Workshop di 1 Giorno - Ottobre"
          required
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Titolo (Spagnolo)</Label>
        <Input 
          value={formData.title_es || ''} 
          onChange={(e) => setFormData({...formData, title_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Ej: Taller de 1 Día - Octubre"
          required
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Descrizione (Italiano)</Label>
        <Textarea 
          value={formData.description_it || ''} 
          onChange={(e) => setFormData({...formData, description_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Descrizione dettagliata del workshop in italiano..."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Descrizione (Spagnolo)</Label>
        <Textarea 
          value={formData.description_es || ''} 
          onChange={(e) => setFormData({...formData, description_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Descripción detallada del taller en español..."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Itinerario Completo (Italiano)</Label>
        <Textarea 
          value={formData.itinerary_it || ''} 
          onChange={(e) => setFormData({...formData, itinerary_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="9:30 - Arrivo e accoglienza\n10:00 - Inizio attività\n13:00 - Pausa pranzo\n14:00 - Sessione pomeridiana\n18:30 - Cerchio di chiusura"
          rows={6}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Itinerario Completo (Spagnolo)</Label>
        <Textarea 
          value={formData.itinerary_es || ''} 
          onChange={(e) => setFormData({...formData, itinerary_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="9:30 - Llegada y bienvenida\n10:00 - Inicio de actividades\n13:00 - Pausa para el almuerzo\n14:00 - Sesión de tarde\n18:30 - Círculo de cierre"
          rows={6}
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Prezzo (€)</Label>
        <Input 
          type="number" 
          value={formData.price || ''} 
          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="90"
          required
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Data</Label>
        <Input 
          type="date" 
          value={formData.date || ''} 
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Luogo</Label>
        <Input 
          value={formData.location || ''} 
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Healing Garden, Guía de Isora"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Istruttori</Label>
        <Input 
          value={formData.instructors || ''} 
          onChange={(e) => setFormData({...formData, instructors: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Jenny Rospo & Marian Giral Vega"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Max Partecipanti</Label>
        <Input 
          type="number" 
          value={formData.max_participants || ''} 
          onChange={(e) => setFormData({...formData, max_participants: parseInt(e.target.value)})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="20"
        />
      </div>
      <div className="flex items-center space-x-4 md:col-span-2">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={formData.is_active || false} 
            onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
            className="data-[state=checked]:bg-[#3C318D]"
          />
          <Label className="text-gray-800 font-medium">Attivo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={formData.is_popular || false} 
            onCheckedChange={(checked) => setFormData({...formData, is_popular: checked})}
            className="data-[state=checked]:bg-[#F02A30]"
          />
          <Label className="text-gray-800 font-medium">Popolare</Label>
        </div>
      </div>
    </div>
  )
}

function TestimonialForm({ formData, setFormData }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Nome</Label>
        <Input 
          value={formData.name || ''} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Es: Maria Rodriguez"
          required
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Ruolo</Label>
        <Input 
          value={formData.role || ''} 
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Es: Ex Studentessa / Ex Estudiante"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Contenuto (Italiano)</Label>
        <Textarea 
          value={formData.content_it || ''} 
          onChange={(e) => setFormData({...formData, content_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Il workshop ha cambiato la mia vita! Ho scoperto una voce che non sapevo di avere."
          rows={4}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Contenuto (Spagnolo)</Label>
        <Textarea 
          value={formData.content_es || ''} 
          onChange={(e) => setFormData({...formData, content_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="El workshop cambió mi vida! Descubrí una voz que no sabía que tenía."
          rows={4}
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">URL Video</Label>
        <Input 
          value={formData.video_url || ''} 
          onChange={(e) => setFormData({...formData, video_url: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="/testimonials/nome-video.mp4"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">URL Immagine</Label>
        <Input 
          value={formData.image_url || ''} 
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="/immagine-profilo.jpg"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Ordine di visualizzazione</Label>
        <Input 
          type="number" 
          value={formData.display_order || 0} 
          onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="1"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={formData.is_approved || false} 
          onCheckedChange={(checked) => setFormData({...formData, is_approved: checked})}
          className="data-[state=checked]:bg-green-600"
        />
        <Label className="text-gray-800 font-medium">Approvato</Label>
      </div>
    </div>
  )
}

function CoachForm({ formData, setFormData }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Nome</Label>
        <Input 
          value={formData.name || ''} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Es: Jenny Rospo"
          required
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">URL Immagine</Label>
        <Input 
          value={formData.image_url || ''} 
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="/coach-immagine.jpg"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Titolo (Italiano)</Label>
        <Input 
          value={formData.title_it || ''} 
          onChange={(e) => setFormData({...formData, title_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Es: Cantante, Vocal Coach"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Titolo (Spagnolo)</Label>
        <Input 
          value={formData.title_es || ''} 
          onChange={(e) => setFormData({...formData, title_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Ej: Cantante, Vocal Coach"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Bio (Italiano)</Label>
        <Textarea 
          value={formData.bio_it || ''} 
          onChange={(e) => setFormData({...formData, bio_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Cantante professionale e vocal coach specializzata nella liberazione della voce autentica."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Bio (Spagnolo)</Label>
        <Textarea 
          value={formData.bio_es || ''} 
          onChange={(e) => setFormData({...formData, bio_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Cantante profesional y coach vocal especializada en liberación de la voz auténtica."
          rows={3}
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Specialità (Italiano) - separate da virgola</Label>
        <Input 
          value={formData.specialties_it?.join(', ') || ''} 
          onChange={(e) => setFormData({
            ...formData, 
            specialties_it: e.target.value.split(',').map(s => s.trim()).filter(s => s)
          })}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Tecnica Vocale, Interpretazione, Performance"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Specialità (Spagnolo) - separate da virgola</Label>
        <Input 
          value={formData.specialties_es?.join(', ') || ''} 
          onChange={(e) => setFormData({
            ...formData, 
            specialties_es: e.target.value.split(',').map(s => s.trim()).filter(s => s)
          })}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Técnica Vocal, Interpretación, Performance"
        />
      </div>
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Ordine di visualizzazione</Label>
        <Input 
          type="number" 
          value={formData.display_order || 0} 
          onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="1"
        />
      </div>
    </div>
  )
}