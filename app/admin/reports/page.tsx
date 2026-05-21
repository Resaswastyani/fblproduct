"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const reports = [
  {
    id: 1,
    name: "Monthly Revenue Report",
    type: "revenue",
    date: "January 2024",
    status: "ready",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "User Growth Report",
    type: "users",
    date: "January 2024",
    status: "ready",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Downloads Analytics",
    type: "downloads",
    date: "January 2024",
    status: "ready",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Traffic Sources Report",
    type: "traffic",
    date: "January 2024",
    status: "processing",
    size: "-",
  },
  {
    id: 5,
    name: "Membership Conversion",
    type: "conversion",
    date: "December 2023",
    status: "ready",
    size: "1.5 MB",
  },
]

const stats = [
  {
    label: "Total Revenue",
    value: "Rp 45.678.000",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "#10B981",
  },
  {
    label: "New Users",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#2962FF",
  },
  {
    label: "Total Downloads",
    value: "8,456",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "#F7C948",
  },
  {
    label: "Page Views",
    value: "156,789",
    change: "-2.3%",
    trend: "down",
    icon: Eye,
    color: "#EF4444",
  },
]

const monthlyData = [
  { month: "Jul", revenue: 28000000, users: 890 },
  { month: "Aug", revenue: 32000000, users: 1020 },
  { month: "Sep", revenue: 29000000, users: 950 },
  { month: "Oct", revenue: 38000000, users: 1150 },
  { month: "Nov", revenue: 42000000, users: 1280 },
  { month: "Dec", revenue: 45678000, users: 1420 },
]

const topProducts = [
  { name: "Smart Money Indicator", downloads: 3456, revenue: 12500000 },
  { name: "Gold Scalper EA", downloads: 2891, revenue: 9800000 },
  { name: "Price Action Ebook", downloads: 4123, revenue: 8500000 },
  { name: "Supply Demand Zones", downloads: 1567, revenue: 6200000 },
  { name: "Risk Management Guide", downloads: 2234, revenue: 4500000 },
]

export default function AdminReportsPage() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">View and download platform reports</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="jan2024">
            <SelectTrigger className="w-[160px] bg-[#1E2433] border-[#2A3142]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E2433] border-[#2A3142]">
              <SelectItem value="jan2024">January 2024</SelectItem>
              <SelectItem value="dec2023">December 2023</SelectItem>
              <SelectItem value="nov2023">November 2023</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
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
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
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
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Revenue Trend</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
              <span className="text-sm text-[#10B981]">+18.2%</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-40">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#2962FF] to-[#00BCD4] rounded-t"
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-6">Top Products by Revenue</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{product.downloads.toLocaleString()} downloads</span>
                    <span>-</span>
                    <span>Rp {(product.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                <div className="w-24 bg-[#1E2433] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(product.revenue / topProducts[0].revenue) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="h-2 rounded-full bg-[#F7C948]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#2A3142] flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Available Reports</h3>
          <Button variant="outline" size="sm" className="border-[#2A3142]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A3142]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Report Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Period</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#2A3142] hover:bg-[#1E2433]/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1E2433] flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{report.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-md bg-[#1E2433] text-xs text-foreground capitalize">
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{report.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.status === "ready"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#F7C948]/10 text-[#F7C948]"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={report.status !== "ready"}
                      className="text-[#2962FF] hover:text-[#2962FF] hover:bg-[#2962FF]/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {report.size !== "-" ? report.size : "..."}
                    </Button>
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
