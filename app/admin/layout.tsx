import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
