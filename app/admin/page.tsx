"use client"

import { motion } from "framer-motion"
import { 
  Users, 
  Download, 
  DollarSign, 
  Video,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  FileDown,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const adminStats = [
  { 
    label: "Total Users", 
    value: "5,247",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#2962FF"
  },
  { 
    label: "Total Downloads", 
    value: "28,459",
    change: "+8.2%",
    trend: "up",
    icon: Download,
    color: "#F7C948"
  },
  { 
    label: "Revenue", 
    value: "$45,890",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "#00C853"
  },
  { 
    label: "TikTok Traffic", 
    value: "12,847",
    change: "-2.1%",
    trend: "down",
    icon: Video,
    color: "#EF4444"
  },
]

const additionalStats = [
  { label: "Conversion Rate", value: "4.2%", change: "+0.5%" },
  { label: "Produk Terlaris", value: "Gold EA", change: "523 downloads" },
]

const recentUsers = [
  { id: 1, name: "Ahmad Faisal", email: "ahmad@email.com", date: "2024-01-20", status: "Active", plan: "Premium" },
  { id: 2, name: "Budi Santoso", email: "budi@email.com", date: "2024-01-19", status: "Active", plan: "Premium" },
  { id: 3, name: "Dewi Lestari", email: "dewi@email.com", date: "2024-01-19", status: "Active", plan: "Free" },
  { id: 4, name: "Rudi Hermawan", email: "rudi@email.com", date: "2024-01-18", status: "Inactive", plan: "Premium" },
  { id: 5, name: "Siti Nurhaliza", email: "siti@email.com", date: "2024-01-18", status: "Active", plan: "Free" },
]

const topProducts = [
  { name: "Gold Scalper EA", downloads: 523, revenue: "$5,230" },
  { name: "Trend Indicator Pro", downloads: 412, revenue: "$2,060" },
  { name: "Price Action Mastery", downloads: 389, revenue: "$1,945" },
  { name: "Risk Management Guide", downloads: 345, revenue: "$1,725" },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview performa platform TradeVault Pro
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#2A3142] text-foreground">
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button className="bg-[#00C853] hover:bg-[#00C853]/90 text-white">
            <FileDown className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                stat.trend === "up" ? "text-[#00C853]" : "text-[#EF4444]"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {additionalStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="glass-card rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
            </div>
            <Badge variant="outline" className="border-[#00C853] text-[#00C853]">
              {stat.change}
            </Badge>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Recent Users</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2A3142]">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground hidden sm:table-cell">Email</TableHead>
                    <TableHead className="text-muted-foreground hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Plan</TableHead>
                    <TableHead className="text-muted-foreground w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id} className="border-[#2A3142]">
                      <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell">{user.email}</TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">{user.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={
                            user.status === "Active" 
                              ? "border-[#00C853] text-[#00C853]" 
                              : "border-[#EF4444] text-[#EF4444]"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            user.plan === "Premium" 
                              ? "bg-[#F7C948] text-[#0B0F19]" 
                              : "bg-[#1E2433] text-muted-foreground"
                          }
                        >
                          {user.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#151B28] border-[#2A3142]">
                            <DropdownMenuItem className="text-foreground hover:bg-[#1E2433]">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground hover:bg-[#1E2433]">
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#EF4444] hover:bg-[#EF4444]/10">
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2433]/50"
                >
                  <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-[#0B0F19] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.downloads} downloads
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#00C853]">
                    {product.revenue}
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
