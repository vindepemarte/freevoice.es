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
import { Calendar, Users, DollarSign, MessageSquare, Video, Plus, Edit, Trash2 } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Free Voice Academy - Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage workshops, pricing, content, and testimonials</p>
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
                  <div className="text-2xl font-bold">Mar 15</div>
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
                <CardTitle>Workshop Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workshop-date">Next Workshop Date</Label>
                    <Input id="workshop-date" type="date" defaultValue="2024-03-15" />
                  </div>
                  <div>
                    <Label htmlFor="workshop-location">Location</Label>
                    <Input id="workshop-location" defaultValue="Tenerife, Spain" />
                  </div>
                  <div>
                    <Label htmlFor="max-participants">Max Participants</Label>
                    <Input id="max-participants" type="number" defaultValue="20" />
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
                <Button>Update Workshop Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Journey Pricing Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Essential Retreat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="essential-price">Price (€)</Label>
                        <Input id="essential-price" defaultValue="180" />
                      </div>
                      <div>
                        <Label htmlFor="essential-duration">Duration</Label>
                        <Input id="essential-duration" defaultValue="3 days" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="essential-features">Features (one per line)</Label>
                      <Textarea
                        id="essential-features"
                        rows={6}
                        defaultValue="3 days, 2 nights accommodation
6 vocal coaching sessions
All meals included
Body work workshops
Basic nutrition guidance
Group practice sessions
Private WhatsApp group access
Weekly 2h coach calls"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Premium Journey</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="premium-price">Price (€)</Label>
                        <Input id="premium-price" defaultValue="350" />
                      </div>
                      <div>
                        <Label htmlFor="premium-duration">Duration</Label>
                        <Input id="premium-duration" defaultValue="4 days" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="premium-features">Features (one per line)</Label>
                      <Textarea
                        id="premium-features"
                        rows={8}
                        defaultValue="Everything in Essential
4 days instead of 3
3 hours of 1-on-1 coaching
Personalized nutrition plan
Recording studio session
Performance feedback video
Private WhatsApp group access
Weekly coach calls + 1-on-1 booking (€50/hour)"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">VIP Intensive</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vip-price">Price (€)</Label>
                        <Input id="vip-price" defaultValue="750" />
                      </div>
                      <div>
                        <Label htmlFor="vip-duration">Duration</Label>
                        <Input id="vip-duration" defaultValue="7 days" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="vip-features">Features (one per line)</Label>
                      <Textarea
                        id="vip-features"
                        rows={8}
                        defaultValue="Everything in Premium
7 days total experience
5 days coaching + 1 day prep + 1 day live
3 individual 1-on-1 coaching sessions
Live performance with DJFaxBeat in Tenerife
Professional recording of your performance
Private WhatsApp group access
Priority 1-on-1 coach booking"
                      />
                    </div>
                  </div>
                </div>
                <Button>Save All Pricing Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="hero-title">Hero Section Title</Label>
                  <Input id="hero-title" defaultValue="Unlock Your Voice, Transform Your Life" />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Hero Section Subtitle</Label>
                  <Textarea
                    id="hero-subtitle"
                    rows={3}
                    defaultValue="Experience personalized vocal coaching, body work, and nutrition guidance in our immersive retreat. Discover your authentic voice and unleash your full potential."
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp-number">WhatsApp Contact Number</Label>
                  <Input id="whatsapp-number" defaultValue="+34697798991" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" defaultValue="info@freevoice.es" />
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
                          <p className="text-sm text-muted-foreground">Premium Journey Graduate</p>
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
                      question: "Is accommodation included?",
                      answer: "Yes, all packages include accommodation and meals.",
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
