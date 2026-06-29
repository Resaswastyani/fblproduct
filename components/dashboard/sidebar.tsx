"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Library,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/materi", icon: Library, label: "Semua Materi" },
  { href: "/dashboard/ebook", icon: BookOpen, label: "Ebook PDF" },
  { href: "/dashboard/indicator", icon: LineChart, label: "Indicator" },
  { href: "/dashboard/ea", icon: Bot, label: "EA Trading" },
  {
    href: "/dashboard/calculator",
    icon: Calculator,
    label: "Position Size Calculator",
  },
  { href: "/dashboard/video", icon: Video, label: "Video Tutorial" },
  { href: "/dashboard/downloads", icon: Download, label: "Download Center" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
];

const mobileNavLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/materi", icon: Library, label: "Materi" },
  { href: "/dashboard/downloads", icon: Download, label: "Download" },
  { href: "/dashboard/calculator", icon: Calculator, label: "Calculator" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [siteName, setSiteName] = useState("Forex For Better Living");

  // Load custom logo & site name from admin settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.logo) setLogoUrl(parsed.logo);
        if (parsed.siteName) setSiteName(parsed.siteName);
      }
    } catch {
      // ignore parse error
    }
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="p-5 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            {/* Animated Logo Icon */}
            <div className="relative flex-shrink-0">
              {/* Pulsing outer glow */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#F7C948]/40 via-[#E91E63]/30 to-[#2962FF]/40 blur-md"
              />
              {/* Spinning colour ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#F7C948] via-[#E91E63] to-[#2962FF] opacity-60"
                style={{ padding: 2 }}
              />
              {/* Logo box */}
              <div className="relative w-11 h-11 rounded-xl bg-[#0B0F19] flex items-center justify-center overflow-hidden z-10 border border-white/10">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="font-extrabold text-base bg-gradient-to-br from-[#F7C948] via-[#E91E63] to-[#2962FF] bg-clip-text text-transparent leading-none">
                    FBL
                  </span>
                )}
              </div>
            </div>

            {/* Site name with animated gradient underline */}
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-sidebar-foreground tracking-tight group-hover:text-white transition-colors">
                {siteName}
              </span>
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #F7C948, #E91E63, #2962FF, #F7C948)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pro
              </motion.span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
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
          <Link href="/dashboard" className="flex items-center gap-2 group">
            {/* Animated Mobile Logo */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#F7C948]/50 via-[#E91E63]/30 to-[#2962FF]/50 blur-sm"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-[#F7C948] via-[#E91E63] to-[#2962FF] opacity-70"
              />
              <div className="relative w-9 h-9 rounded-lg bg-[#0B0F19] flex items-center justify-center z-10 border border-white/10">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="font-extrabold text-sm bg-gradient-to-br from-[#F7C948] via-[#E91E63] to-[#2962FF] bg-clip-text text-transparent">
                    FBL
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {siteName}
              </span>
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #F7C948, #E91E63, #2962FF, #F7C948)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pro
              </motion.span>
            </div>
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
                {sidebarLinks.map((link, index) => {
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
                            ? "bg-[#2962FF] text-white"
                            : "text-foreground/70 hover:bg-[#1E2433] hover:text-foreground",
                        )}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    </motion.li>
                  );
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
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[60px]",
                  isActive ? "text-[#F7C948]" : "text-muted-foreground",
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
