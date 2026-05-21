import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="lg:pl-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  )
}
