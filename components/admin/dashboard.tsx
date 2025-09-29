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
import { Calendar, Users, DollarSign, MessageSquare, Video, Plus, Edit, Trash2, LogOut, Star, Upload, Play, Eye, Save, X } from "lucide-react"
import { AdminUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface AdminDashboardProps {
  user: AdminUser
}

interface Workshop {
  id: string
  title_it: string
  title_es: string
  description_it: string
  description_es: string
  details_it: string
  details_es: string
  date: string
  location: string
  price: number
  maxParticipants: number
  instructors: string
  status: 'open' | 'full' | 'closed'
}

interface PricingModal {
  id: string
  title_it: string
  title_es: string
  price: number
  features_it: string[]
  features_es: string[]
  isPopular: boolean
  workshopId: string
}

interface Testimonial {
  id: string
  name: string
  role_it: string
  role_es: string
  content_it: string
  content_es: string
  videoUrl?: string
  imageUrl?: string
  approved: boolean
}

interface Coach {
  id: string
  name: string
  title_it: string
  title_es: string
  bio_it: string
  bio_es: string
  imageUrl: string
  specialties_it: string[]
  specialties_es: string[]
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [pricingModals, setPricingModals] = useState<PricingModal[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    // Initialize with sample data - replace with real API calls
    setPricingModals([
      {
        id: '1',
        title_it: 'Workshop di 1 Giorno',
        title_es: 'Taller de 1 Día',
        price: 50,
        features_it: ['Lezioni di canto'],
        features_es: ['Clases de canto'],
        isPopular: false,
        workshopId: '1'
      },
      {
        id: '2',
        title_it: 'Workshop di 3 Giorni',
        title_es: 'Taller de 3 Días',
        price: 180,
        features_it: ['Lavoro corporeo', 'Orientamento nutrizionale', 'Pratica di gruppo', 'Lezioni di canto', 'Gruppo WhatsApp privato'],
        features_es: ['Trabajo corporal', 'Orientación nutricional', 'Práctica grupal', 'Clases de canto', 'Grupo privado WhatsApp'],
        isPopular: true,
        workshopId: '1'
      }
    ])
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleTogglePopular = async (pricingId: string) => {
    setPricingModals(prev => prev.map(p => ({
      ...p,
      isPopular: p.id === pricingId ? !p.isPopular : false
    })))
  }

  const handleSavePricing = async (pricing: PricingModal) => {
    // API call to save pricing modal
    console.log('Saving pricing:', pricing)
  }

  const handleDeleteItem = async (type: string, id: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      console.log(`Deleting ${type}:`, id)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Free Voice Academy - Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage workshops, pricing, content, and testimonials</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 lg:grid-cols-8 min-w-[800px] sm:min-w-0">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="workshops" className="text-xs sm:text-sm">Workshops</TabsTrigger>
              <TabsTrigger value="pricing" className="text-xs sm:text-sm">Pricing</TabsTrigger>
              <TabsTrigger value="testimonials" className="text-xs sm:text-sm">Testimonials</TabsTrigger>
              <TabsTrigger value="coaches" className="text-xs sm:text-sm">Coaches</TabsTrigger>
              <TabsTrigger value="content" className="text-xs sm:text-sm">Content</TabsTrigger>
              <TabsTrigger value="videos" className="text-xs sm:text-sm">Videos</TabsTrigger>
              <TabsTrigger value="footer" className="text-xs sm:text-sm">Footer</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€6,840</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Workshop</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Oct 12</div>
                  <p className="text-xs text-muted-foreground">12 spots remaining</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">3 pending approval</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workshop Management - Single Workshop Model</CardTitle>
                <p className="text-sm text-muted-foreground">Updated pricing structure: €90 for 1-day workshop</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workshop-date">Workshop Date</Label>
                    <Input id="workshop-date" type="date" defaultValue="2025-10-12" />
                  </div>
                  <div>
                    <Label htmlFor="workshop-location">Location</Label>
                    <Input id="workshop-location" defaultValue="Healing Garden, Guía de Isora" />
                  </div>
                  <div>
                    <Label htmlFor="workshop-price">Price (€)</Label>
                    <Input id="workshop-price" type="number" defaultValue="90" />
                  </div>
                  <div>
                    <Label htmlFor="max-participants">Max Participants</Label>
                    <Input id="max-participants" type="number" defaultValue="20" />
                  </div>
                  <div>
                    <Label htmlFor="instructors">Instructors</Label>
                    <Input id="instructors" defaultValue="Jenny Rospo & Marian Giral Vega" />
                  </div>
                  <div>
                    <Label htmlFor="workshop-status">Status</Label>
                    <Select defaultValue="open">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open for Registration</SelectItem>
                        <SelectItem value="full">Fully Booked</SelectItem>
                        <SelectItem value="closed">Registration Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="workshop-title-it">Workshop Title (Italian)</Label>
                    <Input id="workshop-title-it" defaultValue="Workshop di 1 Giorno - Ottobre" />
                  </div>
                  <div>
                    <Label htmlFor="workshop-title-es">Workshop Title (Spanish)</Label>
                    <Input id="workshop-title-es" defaultValue="Taller de 1 Día - Octubre" />
                  </div>
                  <div>
                    <Label htmlFor="workshop-desc-it">Description (Italian)</Label>
                    <Textarea 
                      id="workshop-desc-it" 
                      rows={3}
                      defaultValue="Esperienza immersiva di 8 ore per scoprire la tua voce autentica attraverso tecniche vocali, lavoro corporeo e respirazione."
                    />
                  </div>
                  <div>
                    <Label htmlFor="workshop-desc-es">Description (Spanish)</Label>
                    <Textarea 
                      id="workshop-desc-es" 
                      rows={3}
                      defaultValue="Experiencia inmersiva de 8 horas para descubrir tu voz auténtica a través de técnicas vocales, trabajo corporal y respiración."
                    />
                  </div>
                </div>
                <Button>Update Workshop Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Pricing Modals Management</CardTitle>
                  <p className="text-sm text-muted-foreground">Add, edit, and delete pricing modals with "Most Popular" toggle (only one can be popular at a time)</p>
                </div>
                <Button onClick={() => { setEditingItem({ type: 'pricing', data: null }); setShowModal(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pricing Modal
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pricingModals.map((pricing) => (
                    <div key={pricing.id} className={`relative border rounded-lg p-6 ${pricing.isPopular ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                      {pricing.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-yellow-500 text-white px-3 py-1">
                            <Star className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">{pricing.title_it}</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={pricing.isPopular}
                                onCheckedChange={() => handleTogglePopular(pricing.id)}
                              />
                              <Label className="text-sm">Most Popular</Label>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-2xl font-bold text-primary">€{pricing.price}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Italian Features:</h4>
                          <ul className="text-sm space-y-1">
                            {pricing.features_it.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground">Spanish Features:</h4>
                          <ul className="text-sm space-y-1">
                            {pricing.features_es.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => { setEditingItem({ type: 'pricing', data: pricing }); setShowModal(true); }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteItem('pricing', pricing.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview Modal
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Workshop Details - {pricing.title_it}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Italian Description:</h4>
                                    <p className="text-sm text-muted-foreground">Workshop details would appear here in Italian...</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Spanish Description:</h4>
                                    <p className="text-sm text-muted-foreground">Workshop details would appear here in Spanish...</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Italian Content</h3>
                    <div>
                      <Label htmlFor="hero-title-it">Hero Section Title</Label>
                      <Input id="hero-title-it" defaultValue="Trasforma la Tua Voce, Trasforma la Tua Vita" />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle-it">Hero Section Subtitle</Label>
                      <Textarea
                        id="hero-subtitle-it"
                        rows={3}
                        defaultValue="Scopri il potere della tua voce autentica con il nostro approccio olistico che combina tecniche vocali avanzate, lavoro corporeo e orientamento nutrizionale personalizzato."
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Spanish Content</h3>
                    <div>
                      <Label htmlFor="hero-title-es">Hero Section Title</Label>
                      <Input id="hero-title-es" defaultValue="Transforma Tu Voz, Transforma Tu Vida" />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle-es">Hero Section Subtitle</Label>
                      <Textarea
                        id="hero-subtitle-es"
                        rows={3}
                        defaultValue="Descubre el poder de tu voz auténtica con nuestro enfoque holístico que combina técnicas vocales avanzadas, trabajo corporal y orientación nutrizional personalizada."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="whatsapp-number">WhatsApp Contact Number</Label>
                    <Input id="whatsapp-number" defaultValue="+34697798991" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" defaultValue="info@freevoice.es" />
                  </div>
                </div>
                <Button>Update Content</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Video Testimonials Management</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Testimonial
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Video className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Maria Rodriguez</h4>
                          <p className="text-sm text-muted-foreground">Workshop Graduate</p>
                          <Badge variant="secondary">Approved</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>FAQ Management</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New FAQ
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      question: "What should I bring to the workshop?",
                      answer: "Comfortable clothes, water bottle, and an open mind!",
                    },
                    {
                      question: "Is lunch included?",
                      answer: "Participants should bring their own light, healthy lunch.",
                    },
                    {
                      question: "Can I get a refund?",
                      answer: "Full refund available up to 14 days before the workshop.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
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
        </Tabs>
      </div>
    </div>
  )
}