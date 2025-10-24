"use client"
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
  Plus, Edit, Trash2, LogOut, Eye, Save, X, Settings,
  Upload, Play, Video, AlertTriangle, CheckCircle 
} from "lucide-react"
import { AdminUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ContentManagement } from "./content-management"
import { UserManagementModal } from "./user-management-modal"

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
  itinerary_it?: string
  itinerary_es?: string
  overview_title_it?: string
  overview_title_es?: string
  overview_description_it?: string
  overview_description_es?: string
  overview_expectations_it?: string
  overview_expectations_es?: string
  overview_target_audience_it?: string
  overview_target_audience_es?: string
  details_what_to_bring_it?: string
  details_what_to_bring_es?: string
  details_phone_policy_it?: string
  details_phone_policy_es?: string
  details_facilitators_it?: string
  details_facilitators_es?: string
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
  const [siteContent, setSiteContent] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
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
      // Use admin endpoints to get all data including unapproved items
      const [workshopsRes, testimonialsRes, coachesRes, contentRes] = await Promise.all([
        fetch('/api/admin/workshops'),
        fetch('/api/admin/testimonials'),
        fetch('/api/admin/coaches'),
        fetch('/api/admin/content')
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

      if (contentRes.ok) {
        const contentData = await contentRes.json()
        // Convert array to object for easier access
        const contentObj: any = {}
        contentData.content?.forEach((item: any) => {
          const key = `${item.section}_${item.content_key}`
          contentObj[key + '_it'] = item.content_it
          contentObj[key + '_es'] = item.content_es
        })
        setSiteContent(contentObj)
        console.log('Loaded content:', Object.keys(contentObj).length, 'items')
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

  const handleContentSave = async (contentData: any) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Save each content field separately to the content API
      const contentUpdates = []
      
      // Hero section
      if (contentData.hero_title_it || contentData.hero_title_es) {
        contentUpdates.push({
          section: 'hero',
          content_key: 'title',
          content_it: contentData.hero_title_it,
          content_es: contentData.hero_title_es
        })
      }
      
      if (contentData.hero_subtitle_it || contentData.hero_subtitle_es) {
        contentUpdates.push({
          section: 'hero',
          content_key: 'subtitle',
          content_it: contentData.hero_subtitle_it,
          content_es: contentData.hero_subtitle_es
        })
      }
      
      // Contact info
      if (contentData.contact_whatsapp) {
        contentUpdates.push({
          section: 'contact',
          content_key: 'whatsapp',
          content_it: contentData.contact_whatsapp,
          content_es: contentData.contact_whatsapp
        })
      }
      
      if (contentData.contact_email) {
        contentUpdates.push({
          section: 'contact',
          content_key: 'email',
          content_it: contentData.contact_email,
          content_es: contentData.contact_email
        })
      }
      
      if (contentData.contact_address_it || contentData.contact_address_es) {
        contentUpdates.push({
          section: 'contact',
          content_key: 'address',
          content_it: contentData.contact_address_it,
          content_es: contentData.contact_address_es
        })
      }
      
      // Footer
      if (contentData.footer_description_it || contentData.footer_description_es) {
        contentUpdates.push({
          section: 'footer',
          content_key: 'description',
          content_it: contentData.footer_description_it,
          content_es: contentData.footer_description_es
        })
      }

      // Save all content updates
      for (const update of contentUpdates) {
        const response = await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        })
        
        if (!response.ok) {
          throw new Error(`Failed to save ${update.section}_${update.content_key}`)
        }
      }
      
      setSuccess('Content saved successfully')
      loadData()
    } catch (error) {
      setError(`Error saving content: ${error}`)
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
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3C318D] mb-2">Free Voice Academy - Admin</h1>
            <p className="text-gray-600 text-sm sm:text-base">Gestione completa del contenuto del sito web</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">Welcome, {user.email}</span>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setShowUserModal(true)}
                className="border-[#9852A7] text-[#9852A7] hover:bg-[#9852A7] hover:text-white flex-1 sm:flex-none text-xs sm:text-sm"
                size="sm"
              >
                <Settings className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="border-[#3C318D] text-[#3C318D] hover:bg-[#3C318D] hover:text-white flex-1 sm:flex-none text-xs sm:text-sm"
                size="sm"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 sm:p-2">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-gray-50 gap-1 sm:gap-0">
              <TabsTrigger value="overview" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium text-xs sm:text-sm px-2 py-1">Panoramica</TabsTrigger>
              <TabsTrigger value="workshops" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium text-xs sm:text-sm px-2 py-1">Workshop</TabsTrigger>
              <TabsTrigger value="testimonials" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium text-xs sm:text-sm px-2 py-1 sm:block hidden">Testimonianze</TabsTrigger>
              <TabsTrigger value="coaches" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium text-xs sm:text-sm px-2 py-1 sm:block hidden">Coach</TabsTrigger>
              <TabsTrigger value="content" className="text-gray-700 data-[state=active]:bg-[#3C318D] data-[state=active]:text-white font-medium text-xs sm:text-sm px-2 py-1 sm:block hidden">Contenuto</TabsTrigger>
            </TabsList>
            {/* Mobile tabs dropdown for small screens */}
            <div className="sm:hidden mt-2">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="testimonials">Testimonianze</SelectItem>
                  <SelectItem value="coaches">Coach</SelectItem>
                  <SelectItem value="content">Contenuto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Workshop Attivi</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-[#3C318D]">{workshops.filter(w => w.is_active).length}</div>
                  <p className="text-xs text-gray-600">Workshop disponibili</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Testimonianze</CardTitle>
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-[#F02A30]">{testimonials.length}</div>
                  <p className="text-xs text-gray-600">
                    {testimonials.filter(t => t.is_approved).length} approvate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Coach</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-[#9852A7]">{coaches.length}</div>
                  <p className="text-xs text-gray-600">Team membri</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Prezzo Base</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-[#3C318D]">€90</div>
                  <p className="text-xs text-gray-600">Workshop 1 giorno</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 text-lg sm:text-xl">Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'workshops', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#3C318D] hover:bg-[#3C318D]/90 text-white shadow-sm w-full sm:w-auto"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuovo Workshop
                </Button>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'testimonials', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#F02A30] hover:bg-[#F02A30]/90 text-white shadow-sm w-full sm:w-auto"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuova Testimonianza
                </Button>
                <Button 
                  onClick={() => {
                    setEditingItem({ type: 'coaches', data: null })
                    setShowModal(true)
                  }}
                  className="bg-[#9852A7] hover:bg-[#9852A7]/90 text-white shadow-sm w-full sm:w-auto"
                  size="sm"
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
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      In attesa: {testimonials.filter(t => !t.is_approved).length}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      Approvate: {testimonials.filter(t => t.is_approved).length}
                    </Badge>
                  </div>
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
                  {/* Show pending testimonials first */}
                  {testimonials
                    .sort((a, b) => {
                      // Pending first, then by display_order
                      if (a.is_approved === b.is_approved) {
                        return (a.display_order || 999) - (b.display_order || 999)
                      }
                      return a.is_approved ? 1 : -1
                    })
                    .map((testimonial) => (
                    <div key={testimonial.id} className={`border rounded-lg p-4 transition-colors ${
                      testimonial.is_approved 
                        ? 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                        : 'border-yellow-300 bg-yellow-50/50 hover:bg-yellow-50'
                    }`}>
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
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 animate-pulse">In attesa di approvazione</Badge>
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
            <ContentManagement 
              siteContent={siteContent}
              onSave={handleContentSave}
              isLoading={isLoading}
            />
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
        
        {/* User Management Modal */}
        <UserManagementModal 
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          currentUser={user}
          onSuccess={setSuccess}
          onError={setError}
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
      // Format the date properly for the date input
      const formattedData = { ...editingItem.data }
      if (formattedData.date) {
        // Extract just the date part (YYYY-MM-DD) from any date string to avoid timezone issues
        // Handle both ISO strings and simple date strings
        let dateValue = formattedData.date;
        if (dateValue.includes('T')) {
          dateValue = dateValue.split('T')[0];
        }
        // Ensure it's a valid YYYY-MM-DD format
        if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
          formattedData.date = dateValue;
        } else {
          console.warn('Invalid date format:', formattedData.date);
          formattedData.date = '';
        }
      }
      setFormData(formattedData)
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-300 shadow-2xl mx-2 sm:mx-4">
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      <div className="lg:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Descrizione (Italiano)</Label>
        <Textarea 
          value={formData.description_it || ''} 
          onChange={(e) => setFormData({...formData, description_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Descrizione dettagliata del workshop in italiano..."
          rows={3}
        />
      </div>
      <div className="lg:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Descrizione (Spagnolo)</Label>
        <Textarea 
          value={formData.description_es || ''} 
          onChange={(e) => setFormData({...formData, description_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Descripción detallada del taller en español..."
          rows={3}
        />
      </div>
      <div className="lg:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Itinerario Completo (Italiano)</Label>
        <Textarea 
          value={formData.itinerary_it || ''} 
          onChange={(e) => setFormData({...formData, itinerary_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="9:30 - Arrivo e accoglienza\n10:00 - Inizio attività\n13:00 - Pausa pranzo\n14:00 - Sessione pomeridiana\n18:30 - Cerchio di chiusura"
          rows={6}
        />
      </div>
      <div className="lg:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Itinerario Completo (Spagnolo)</Label>
        <Textarea 
          value={formData.itinerary_es || ''} 
          onChange={(e) => setFormData({...formData, itinerary_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="9:30 - Llegada y bienvenida\n10:00 - Inicio de actividades\n13:00 - Pausa para el almuerzo\n14:00 - Sesión de tarde\n18:30 - Círculo de cierre"
          rows={6}
        />
      </div>
      
      {/* Overview Section */}
      <div className="md:col-span-2 border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-[#3C318D] mb-4">Sezione Panoramica</h3>
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Titolo Panoramica (Italiano)</Label>
        <Input 
          value={formData.overview_title_it || ''} 
          onChange={(e) => setFormData({...formData, overview_title_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="🎶 Canta per ritrovarti, cresci per risuonare con la tua anima autentica"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Titolo Panoramica (Spagnolo)</Label>
        <Input 
          value={formData.overview_title_es || ''} 
          onChange={(e) => setFormData({...formData, overview_title_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="🎶 Canta para reencontrarte, crece para resonar con tu alma auténtica"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Descrizione Panoramica (Italiano)</Label>
        <Textarea 
          value={formData.overview_description_it || ''} 
          onChange={(e) => setFormData({...formData, overview_description_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Una giornata speciale per ritrovare la tua voce... e qualcosa di più profondo..."
          rows={4}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Descrizione Panoramica (Spagnolo)</Label>
        <Textarea 
          value={formData.overview_description_es || ''} 
          onChange={(e) => setFormData({...formData, overview_description_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Un día especial para redescubrir tu voz... y algo más profundo..."
          rows={4}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Cosa ti aspetta (Italiano)</Label>
        <Textarea 
          value={formData.overview_expectations_it || ''} 
          onChange={(e) => setFormData({...formData, overview_expectations_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Un percorso esperienziale tra voce, corpo, respiro e emozione..."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Qué te espera (Spagnolo)</Label>
        <Textarea 
          value={formData.overview_expectations_es || ''} 
          onChange={(e) => setFormData({...formData, overview_expectations_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Un recorrido experiencial entre voz, cuerpo, respiración y emoción..."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">A chi è rivolto (Italiano)</Label>
        <Textarea 
          value={formData.overview_target_audience_it || ''} 
          onChange={(e) => setFormData({...formData, overview_target_audience_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="A chi canta, per passione o professione\nA chi lavora con la voce\nA chi vuole ritrovare la propria voce autentica"
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">A quién está dirigido (Spagnolo)</Label>
        <Textarea 
          value={formData.overview_target_audience_es || ''} 
          onChange={(e) => setFormData({...formData, overview_target_audience_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Quienes cantan, por pasión o profesión\nProfesionales de la voz\nQuienes buscan su voz auténtica"
          rows={3}
        />
      </div>
      
      {/* Details Section */}
      <div className="md:col-span-2 border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-[#3C318D] mb-4">Sezione Dettagli</h3>
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Cosa portare (Italiano)</Label>
        <Textarea 
          value={formData.details_what_to_bring_it || ''} 
          onChange={(e) => setFormData({...formData, details_what_to_bring_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Un cuore aperto e la voglia di metterti in gioco\nAcqua o tisana\nUn block notes per annotare ispirazioni\nAbiti comodi\nPranzo semplice e leggero"
          rows={4}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Qué traer (Spagnolo)</Label>
        <Textarea 
          value={formData.details_what_to_bring_es || ''} 
          onChange={(e) => setFormData({...formData, details_what_to_bring_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Un corazón abierto y ganas de experimentar\nAgua o infusión\nCuaderno para inspiraciones\nRopa cómoda\nAlmuerzo ligero y saludable"
          rows={4}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Politica Telefoni (Italiano)</Label>
        <Textarea 
          value={formData.details_phone_policy_it || ''} 
          onChange={(e) => setFormData({...formData, details_phone_policy_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Durante le attività, i telefoni resteranno in silenzio..."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Política de Teléfonos (Spagnolo)</Label>
        <Textarea 
          value={formData.details_phone_policy_es || ''} 
          onChange={(e) => setFormData({...formData, details_phone_policy_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Durante las actividades, los teléfonos permanecerán en silencio..."
          rows={3}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Facilitatori (Italiano)</Label>
        <Textarea 
          value={formData.details_facilitators_it || ''} 
          onChange={(e) => setFormData({...formData, details_facilitators_it: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Jenny Rospo - Cantante vocal coach\nMarian Giral Vega - Ballerina Insegnante Body brain..."
          rows={4}
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Facilitadores (Spagnolo)</Label>
        <Textarea 
          value={formData.details_facilitators_es || ''} 
          onChange={(e) => setFormData({...formData, details_facilitators_es: e.target.value})}
          className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white placeholder:text-gray-500"
          placeholder="Jenny Rospo - Cantante vocal coach\nMarian Giral Vega - Bailarina, profesora Body-brain..."
          rows={4}
        />
      </div>
      
      {/* Basic Fields Section */}
      <div className="md:col-span-2 border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-[#3C318D] mb-4">Informazioni Base</h3>
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
          onChange={(e) => {
            // Ensure date is handled as pure string to avoid timezone conversion
            const dateValue = e.target.value; // This is already in YYYY-MM-DD format
            setFormData({...formData, date: dateValue});
          }}
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
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError("")

    try {
      // Convert image to base64
      const reader = new FileReader()
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Set both image_data (base64) and image_url (for compatibility)
      setFormData({...formData, image_data: base64, image_url: base64})
    } catch (error) {
      console.error('Error converting image:', error)
      setUploadError('Failed to process image')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError("")

    try {
      const videoFormData = new FormData()
      videoFormData.append('video', file)
      videoFormData.append('type', 'testimonial')

      const response = await fetch('/api/upload/video', {
        method: 'POST',
        body: videoFormData,
      })

      if (response.ok) {
        const data = await response.json()
        // Set both video_data (base64) and video_url (for compatibility)
        setFormData({...formData, video_data: data.videoUrl, video_url: data.videoUrl})
      } else {
        const error = await response.json()
        setUploadError(error.error || 'Upload failed')
      }
    } catch (error) {
      setUploadError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {uploadError && (
        <Alert className="md:col-span-2 border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{uploadError}</AlertDescription>
        </Alert>
      )}
      
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
      
      {/* Video Upload */}
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Carica Video (Opzionale)</Label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploading}
            className="border-gray-400"
          />
          {formData.video_url && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Caricato
            </Badge>
          )}
        </div>
        {formData.video_url && (
          <p className="text-sm text-gray-600 mt-1">{formData.video_url}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="md:col-span-2">
        <Label className="text-gray-800 font-medium mb-2 block">Carica Immagine</Label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="border-gray-400"
          />
          {formData.image_url && (
            <div className="flex items-center gap-2">
              <Image
                src={formData.image_url}
                alt="Preview"
                width={50}
                height={50}
                className="rounded-lg border-2 border-gray-300 object-cover"
              />
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Caricato
              </Badge>
            </div>
          )}
        </div>
        {formData.image_url && (
          <p className="text-sm text-gray-600 mt-1">{formData.image_url}</p>
        )}
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
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError("")

    try {
      const imageFormData = new FormData()
      imageFormData.append('image', file)
      imageFormData.append('type', 'coach')

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: imageFormData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({...formData, image_url: data.imageUrl})
      } else {
        const error = await response.json()
        setUploadError(error.error || 'Upload failed')
      }
    } catch (error) {
      setUploadError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {uploadError && (
        <Alert className="md:col-span-2 border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{uploadError}</AlertDescription>
        </Alert>
      )}
      
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
      
      {/* Image Upload */}
      <div>
        <Label className="text-gray-800 font-medium mb-2 block">Carica Immagine</Label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="border-gray-400"
          />
          {formData.image_url && (
            <div className="flex items-center gap-2">
              <Image
                src={formData.image_url}
                alt="Preview"
                width={40}
                height={40}
                className="rounded-lg border-2 border-gray-300 object-cover"
              />
            </div>
          )}
        </div>
        {formData.image_url && (
          <p className="text-xs text-gray-600 mt-1 truncate">{formData.image_url}</p>
        )}
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