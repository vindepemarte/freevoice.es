import { validateAdminSession } from '@/lib/auth'
import { AdminLoginForm } from '@/components/admin/login-form'
import { AdminDashboard } from '@/components/admin/dashboard'

export default async function AdminPage() {
  const user = await validateAdminSession()

  if (!user) {
    return <AdminLoginForm />
  }

  return <AdminDashboard user={user} />
}