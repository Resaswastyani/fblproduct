"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Download,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const stats = [
  {
    label: "Total Visitors",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
  },
  {
    label: "Active Users",
    value: "2,345",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Total Downloads",
    value: "12,456",
    change: "+23.1%",
    trend: "up",
    icon: Download,
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: "-2.3%",
    trend: "down",
    icon: Clock,
  },
]

const trafficSources = [
  { source: "Direct", visits: 12456, percentage: 35 },
  { source: "TikTok", visits: 8234, percentage: 23 },
  { source: "Google", visits: 6789, percentage: 19 },
  { source: "Instagram", visits: 4567, percentage: 13 },
  { source: "Facebook", visits: 2345, percentage: 7 },
  { source: "Other", visits: 1234, percentage: 3 },
]

const topPages = [
  { page: "/dashboard", views: 8456, avgTime: "3m 45s" },
  { page: "/dashboard/downloads", views: 6234, avgTime: "5m 12s" },
  { page: "/dashboard/calculator", views: 4567, avgTime: "4m 32s" },
  { page: "/dashboard/ebook", views: 3456, avgTime: "6m 18s" },
  { page: "/dashboard/indicator", views: 2345, avgTime: "3m 56s" },
]

const monthlyData = [
  { month: "Jan", visitors: 12000, downloads: 3400 },
  { month: "Feb", visitors: 15000, downloads: 4200 },
  { month: "Mar", visitors: 18000, downloads: 5100 },
  { month: "Apr", visitors: 22000, downloads: 6300 },
  { month: "May", visitors: 28000, downloads: 7800 },
  { month: "Jun", visitors: 35000, downloads: 9200 },
]

export default function AdminAnalyticsPage() {
  const maxVisitors = Math.max(...monthlyData.map((d) => d.visitors))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your platform performance</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px] bg-[#1E2433] border-[#2A3142]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E2433] border-[#2A3142]">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#1E2433] flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#2962FF]" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Visitors Chart */}
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Monthly Overview</h3>
              <p className="text-sm text-muted-foreground">Visitors & Downloads</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2962FF]" />
                <span className="text-xs text-muted-foreground">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs text-muted-foreground">Downloads</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end justify-center h-40">
                  <div
                    className="w-5 bg-[#2962FF] rounded-t"
                    style={{ height: `${(data.visitors / maxVisitors) * 100}%` }}
                  />
                  <div
                    className="w-5 bg-[#10B981] rounded-t"
                    style={{ height: `${(data.downloads / maxVisitors) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">{source.source}</span>
                  <span className="text-sm text-muted-foreground">
                    {source.visits.toLocaleString()} ({source.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[#1E2433] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="h-2 rounded-full bg-gradient-to-r from-[#2962FF] to-[#00BCD4]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#2A3142]">
          <h3 className="font-semibold text-foreground">Top Pages</h3>
          <p className="text-sm text-muted-foreground">Most visited pages on your platform</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A3142]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Page</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Views</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Avg. Time</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, index) => (
                <motion.tr
                  key={page.page}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#2A3142] hover:bg-[#1E2433]/50"
                >
                  <td className="p-4">
                    <span className="text-foreground font-medium">{page.page}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{page.views.toLocaleString()}</td>
                  <td className="p-4 text-muted-foreground">{page.avgTime}</td>
                  <td className="p-4">
                    <div className="w-24 bg-[#1E2433] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-[#10B981]"
                        style={{ width: `${(page.views / topPages[0].views) * 100}%` }}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
