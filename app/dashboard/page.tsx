"use client"

import { motion } from "framer-motion"
import { 
  Download, 
  BookOpen, 
  LineChart, 
  Bot, 
  TrendingUp, 
  Clock,
  ChevronRight,
  Zap
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const stats = [
  { 
    label: "Total Download", 
    value: "127", 
    change: "+12 bulan ini",
    icon: Download,
    color: "#2962FF"
  },
  { 
    label: "Ebook Download", 
    value: "45", 
    change: "+5 bulan ini",
    icon: BookOpen,
    color: "#F7C948"
  },
  { 
    label: "Indicator Download", 
    value: "52", 
    change: "+4 bulan ini",
    icon: LineChart,
    color: "#00C853"
  },
  { 
    label: "EA Download", 
    value: "30", 
    change: "+3 bulan ini",
    icon: Bot,
    color: "#8B5CF6"
  },
]

const recentActivity = [
  { name: "Price Action Mastery.pdf", type: "Ebook", time: "2 jam lalu" },
  { name: "Trend Indicator Pro v3.2", type: "Indicator", time: "5 jam lalu" },
  { name: "Gold Scalper EA", type: "EA Trading", time: "1 hari lalu" },
  { name: "Risk Management Guide.pdf", type: "Ebook", time: "2 hari lalu" },
]

const quickAccess = [
  { href: "/dashboard/ebook", icon: BookOpen, label: "Ebook PDF", color: "#F7C948" },
  { href: "/dashboard/indicator", icon: LineChart, label: "Indicator", color: "#2962FF" },
  { href: "/dashboard/ea", icon: Bot, label: "EA Trading", color: "#00C853" },
  { href: "/dashboard/calculator", icon: Zap, label: "Calculator", color: "#8B5CF6" },
]

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Welcome, <span className="text-[#F7C948]">Trader</span>
        </h1>
        <p className="text-muted-foreground">
          Akses semua tools trading premium Anda di sini
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 sm:p-6"
          >
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</div>
            <div className="flex items-center gap-1 text-[#00C853] text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickAccess.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="glass-card rounded-xl p-4 text-center hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px] group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-[#F7C948] transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
              <Link href="/dashboard/downloads">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2433]/50 hover:bg-[#1E2433] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2962FF]/20 flex items-center justify-center flex-shrink-0">
                    <Download className="w-5 h-5 text-[#2962FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {activity.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.type}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
