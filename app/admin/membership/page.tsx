"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  TrendingUp,
  DollarSign,
  Crown,
  Star,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const membershipPlans = [
  {
    id: 1,
    name: "Free",
    price: 0,
    interval: "forever",
    features: ["Basic Ebooks", "Limited Indicators", "Community Access"],
    subscribers: 4567,
    icon: Star,
    color: "#6B7280",
    status: "active",
  },
  {
    id: 2,
    name: "Basic",
    price: 99000,
    interval: "month",
    features: ["All Ebooks", "5 Indicators", "Email Support", "Video Tutorials"],
    subscribers: 1234,
    icon: Zap,
    color: "#2962FF",
    status: "active",
  },
  {
    id: 3,
    name: "Pro",
    price: 249000,
    interval: "month",
    features: ["Everything in Basic", "All Indicators", "2 EAs", "Priority Support", "Live Webinars"],
    subscribers: 567,
    icon: Crown,
    color: "#F7C948",
    status: "active",
  },
  {
    id: 4,
    name: "Enterprise",
    price: 499000,
    interval: "month",
    features: ["Everything in Pro", "Unlimited EAs", "1-on-1 Mentoring", "Custom Indicators", "VIP Group"],
    subscribers: 89,
    icon: Crown,
    color: "#EF4444",
    status: "active",
  },
]

const recentTransactions = [
  { id: 1, user: "John Doe", email: "john@email.com", plan: "Pro", amount: 249000, date: "2024-01-20", status: "completed" },
  { id: 2, user: "Jane Smith", email: "jane@email.com", plan: "Basic", amount: 99000, date: "2024-01-19", status: "completed" },
  { id: 3, user: "Mike Johnson", email: "mike@email.com", plan: "Enterprise", amount: 499000, date: "2024-01-18", status: "completed" },
  { id: 4, user: "Sarah Wilson", email: "sarah@email.com", plan: "Pro", amount: 249000, date: "2024-01-17", status: "pending" },
  { id: 5, user: "David Brown", email: "david@email.com", plan: "Basic", amount: 99000, date: "2024-01-16", status: "completed" },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function AdminMembershipPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const totalRevenue = recentTransactions
    .filter((t) => t.status === "completed")
    .reduce((acc, t) => acc + t.amount, 0)

  const totalSubscribers = membershipPlans.reduce((acc, p) => acc + p.subscribers, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Membership</h1>
          <p className="text-muted-foreground">Manage subscription plans and members</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle>Add Membership Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input
                  placeholder="Enter plan name"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interval</Label>
                  <Select>
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  placeholder="Enter features..."
                  className="bg-[#1E2433] border-[#2A3142]"
                  rows={4}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-[#2A3142]"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]">
                  Save Plan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#2962FF]" />
            <span className="text-sm text-muted-foreground">Total Members</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalSubscribers.toLocaleString()}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 text-[#10B981]" />
            <span className="text-sm text-muted-foreground">Paid Members</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {membershipPlans.filter((p) => p.price > 0).reduce((acc, p) => acc + p.subscribers, 0).toLocaleString()}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#F7C948]" />
            <span className="text-sm text-muted-foreground">Revenue (MTD)</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatPrice(totalRevenue)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#EF4444]" />
            <span className="text-sm text-muted-foreground">Growth</span>
          </div>
          <p className="text-2xl font-bold text-[#10B981]">+12.5%</p>
        </motion.div>
      </div>

      {/* Membership Plans */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Membership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5 hover:border-[#3A4152] transition-colors relative"
            >
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1E2433] border-[#2A3142]">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-[#EF4444]">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${plan.color}20` }}
              >
                <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
              </div>

              <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-1 mb-4">
                <span className="text-2xl font-bold text-foreground">
                  {plan.price === 0 ? "Free" : formatPrice(plan.price)}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: plan.color }} />
                    {feature}
                  </li>
                ))}
                {plan.features.length > 3 && (
                  <li className="text-sm text-muted-foreground">+{plan.features.length - 3} more</li>
                )}
              </ul>

              <div className="pt-4 border-t border-[#2A3142] flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {plan.subscribers.toLocaleString()} subscribers
                </span>
                <Switch checked={plan.status === "active"} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#2A3142]">
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A3142]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Plan</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#2A3142] hover:bg-[#1E2433]/50"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{tx.user}</p>
                      <p className="text-xs text-muted-foreground">{tx.email}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-md bg-[#1E2433] text-xs text-foreground">
                      {tx.plan}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-foreground">{formatPrice(tx.amount)}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{tx.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === "completed"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#F7C948]/10 text-[#F7C948]"
                      }`}
                    >
                      {tx.status}
                    </span>
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
