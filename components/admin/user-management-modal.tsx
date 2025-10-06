"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Save, Eye, EyeOff } from "lucide-react"

interface UserManagementModalProps {
  isOpen: boolean
  onClose: () => void
  currentUser: { email: string }
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function UserManagementModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onSuccess, 
  onError 
}: UserManagementModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newEmail: currentUser.email,
    newPassword: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      onError("New passwords don't match")
      return
    }

    if (formData.newPassword && formData.newPassword.length < 8) {
      onError("New password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const updateData: any = {
        currentPassword: formData.currentPassword
      }

      if (formData.newEmail !== currentUser.email) {
        updateData.newEmail = formData.newEmail
      }

      if (formData.newPassword) {
        updateData.newPassword = formData.newPassword
      }

      const response = await fetch('/api/admin/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        onSuccess('Profile updated successfully. Please log in again.')
        setFormData({
          currentPassword: '',
          newEmail: currentUser.email,
          newPassword: '',
          confirmPassword: ''
        })
        onClose()
        // Force logout and redirect
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        const errorData = await response.json()
        onError(errorData.error || 'Failed to update profile')
      }
    } catch (error) {
      onError('Network error updating profile')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 bg-white border-gray-300 shadow-2xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-bold text-[#3C318D]">
            Gestione Account Amministratore
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label className="text-gray-800 font-medium mb-2 block">Password Attuale *</Label>
            <div className="relative">
              <Input 
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div>
            <Label className="text-gray-800 font-medium mb-2 block">Nuova Email</Label>
            <Input 
              type="email"
              value={formData.newEmail}
              onChange={(e) => setFormData({...formData, newEmail: e.target.value})}
              className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white"
              placeholder="admin@freevoice.es"
            />
          </div>
          
          <div>
            <Label className="text-gray-800 font-medium mb-2 block">Nuova Password</Label>
            <div className="relative">
              <Input 
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white pr-10"
                placeholder="Lascia vuoto per non cambiare"
                minLength={8}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {formData.newPassword && (
            <div>
              <Label className="text-gray-800 font-medium mb-2 block">Conferma Nuova Password</Label>
              <div className="relative">
                <Input 
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="border-gray-400 focus:border-[#3C318D] focus:ring-[#3C318D] text-gray-900 bg-white pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
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
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Aggiorna Account'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}