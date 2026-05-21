"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  BookOpen,
  LineChart,
  Bot,
  Calculator,
  Video,
  Download,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/ebook", icon: BookOpen, label: "Ebook PDF" },
  { href: "/dashboard/indicator", icon: LineChart, label: "Indicator" },
  { href: "/dashboard/ea", icon: Bot, label: "EA Trading" },
  { href: "/dashboard/calculator", icon: Calculator, label: "Position Size Calculator" },
  { href: "/dashboard/video", icon: Video, label: "Video Tutorial" },
  { href: "/dashboard/downloads", icon: Download, label: "Download Center" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
]

const mobileNavLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/downloads", icon: Download, label: "Download" },
  { href: "/dashboard/calculator", icon: Calculator, label: "Calculator" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
              <span className="text-[#0B0F19] font-bold text-lg">TV</span>
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">
              TradeVault <span className="text-[#F7C948]">Pro</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <span className="text-[#0B0F19] font-bold text-sm">TV</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              TradeVault <span className="text-[#F7C948]">Pro</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-foreground"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#0B0F19]/95 backdrop-blur-lg pt-16"
          >
            <nav className="p-4">
              <ul className="space-y-1">
                {sidebarLinks.map((link, index) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive
                            ? "bg-[#2962FF] text-white"
                            : "text-foreground/70 hover:bg-[#1E2433] hover:text-foreground"
                        )}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                })}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sidebarLinks.length * 0.05 }}
                >
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-[#2A3142]">
        <div className="flex items-center justify-around py-2">
          {mobileNavLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[60px]",
                  isActive ? "text-[#F7C948]" : "text-muted-foreground"
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
