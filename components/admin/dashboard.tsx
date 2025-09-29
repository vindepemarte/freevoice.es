"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, DollarSign, MessageSquare, Video, Plus, Edit, Trash2, LogOut } from "lucide-react"
import { AdminUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface AdminDashboardProps {
  user: AdminUser
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

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

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Updated Single Workshop Pricing</CardTitle>
                <p className="text-sm text-muted-foreground">New structure: Single workshop at €90 (updated from €50)</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Workshop di 1 Giorno / Taller de 1 Día</h3>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="current-price">Current Price (€)</Label>
                      <Input id="current-price" defaultValue="90" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" defaultValue="8 hours (10:00 - 18:00)" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="features-it">Features (Italian) - One per line</Label>
                      <Textarea
                        id="features-it"
                        rows={8}
                        defaultValue="Lavoro vocale intensivo
Tecniche di respirazione avanzate  
Esercizi di movimento corporeo
Connessione con la natura
Pausa pranzo inclusa
Ambiente supportivo e sicuro
Esperienza trasformativa di gruppo
Accesso al gruppo WhatsApp privato"
                      />
                    </div>
                    <div>
                      <Label htmlFor="features-es">Features (Spanish) - One per line</Label>
                      <Textarea
                        id="features-es"
                        rows={8}
                        defaultValue="Trabajo vocal intensivo
Técnicas de respiración avanzadas
Ejercicios de movimiento corporal  
Conexión con la naturaleza
Pausa para el almuerzo incluida
Ambiente de apoyo y seguro
Experiencia transformadora grupal
Acceso al grupo privado de WhatsApp"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Pricing Update Information</h4>
                  <p className="text-sm text-yellow-700">
                    The pricing structure has been updated from the previous two-workshop model (€50 and €180) 
                    to a single workshop offering at €90. This reflects the new focused approach as specified in the requirements.
                  </p>
                </div>
                
                <Button className="w-full">Save Pricing Changes</Button>
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