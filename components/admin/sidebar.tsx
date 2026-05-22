"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  LineChart,
  Bot,
  BarChart3,
  Video,
  Image,
  CreditCard,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminSidebarLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/ebook", icon: FileText, label: "PDF Ebook" },
  { href: "/admin/indicator", icon: LineChart, label: "Indicators" },
  { href: "/admin/ea", icon: Bot, label: "EA Trading" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/tiktok", icon: Video, label: "TikTok Traffic" },
  { href: "/admin/banner", icon: Image, label: "Banner" },
  { href: "/admin/membership", icon: CreditCard, label: "Membership" },
  { href: "/admin/reports", icon: FileSpreadsheet, label: "Reports" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[#0D1117] border-r border-[#2A3142]">
        {/* Logo */}
        <div className="p-6 border-b border-[#2A3142]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#EF4444] flex items-center justify-center">
              <span className="text-white font-bold text-lg">FBL</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              Admin <span className="text-[#EF4444]">Panel</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {adminSidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#EF4444] text-white"
                        : "text-foreground/70 hover:bg-[#1E2433] hover:text-foreground",
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#2A3142]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-[#1E2433] hover:text-foreground transition-all"
          >
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              Admin <span className="text-[#EF4444]">Panel</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-foreground"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
                {adminSidebarLinks.map((link, index) => {
                  const isActive = pathname === link.href;
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
                            ? "bg-[#EF4444] text-white"
                            : "text-foreground/70 hover:bg-[#1E2433] hover:text-foreground",
                        )}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
