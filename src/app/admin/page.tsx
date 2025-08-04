import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ApiKeysSection from '@/components/admin/ApiKeysSection'
import AgentsSection from '@/components/admin/AgentsSection'
import LogsSection from '@/components/admin/LogsSection'

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <ApiKeysSection />
        <AgentsSection />
        <LogsSection />
      </div>
    </div>
  )
}
