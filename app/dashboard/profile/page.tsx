"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Camera,
  Download,
  BookOpen,
  LineChart,
  Bot,
  Key,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const downloadHistory = [
  { name: "Price Action Mastery.pdf", type: "Ebook", date: "2024-01-15", icon: BookOpen },
  { name: "Trend Indicator Pro v3.2", type: "Indicator", date: "2024-01-14", icon: LineChart },
  { name: "Gold Scalper EA v5.1", type: "EA", date: "2024-01-12", icon: Bot },
  { name: "Risk Management Guide.pdf", type: "Ebook", date: "2024-01-10", icon: BookOpen },
  { name: "Support Resistance Auto", type: "Indicator", date: "2024-01-08", icon: LineChart },
]

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Kelola informasi profil dan keamanan akun Anda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-card rounded-2xl p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-[#0B0F19] text-3xl font-bold">TR</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2962FF] flex items-center justify-center border-2 border-[#0B0F19]">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-foreground">Trader Pro</h2>
              <p className="text-muted-foreground text-sm">trader@example.com</p>
            </div>

            {/* Member Status */}
            <div className="glass-card rounded-xl p-4 mb-6 bg-[#F7C948]/10 border-[#F7C948]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#F7C948]" />
                  <span className="text-sm font-medium text-foreground">Member Status</span>
                </div>
                <Badge className="bg-[#F7C948] text-[#0B0F19]">Premium</Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#2A3142]">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm text-foreground">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#2A3142]">
                <span className="text-sm text-muted-foreground">Total Downloads</span>
                <span className="text-sm text-foreground">127</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Last Login</span>
                <span className="text-sm text-foreground">Hari ini</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Edit Profile */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Profile Information</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditMode(!isEditMode)}
                className="border-[#2A3142] text-foreground"
              >
                {isEditMode ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    defaultValue="Trader Pro"
                    disabled={!isEditMode}
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    defaultValue="trader@example.com"
                    disabled={!isEditMode}
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Join Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    defaultValue="15 Januari 2024"
                    disabled
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Member Status</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    defaultValue="Premium Member"
                    disabled
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {isEditMode && (
              <Button className="mt-6 gradient-gold text-[#0B0F19] font-semibold">
                Update Profile
              </Button>
            )}
          </div>

          {/* Security */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Security</h3>
            
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1E2433] hover:bg-[#1E2433]/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2962FF]/20 flex items-center justify-center">
                      <Key className="w-5 h-5 text-[#2962FF]" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">Change Password</div>
                      <div className="text-sm text-muted-foreground">Update your password securely</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#151B28] border-[#2A3142]">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Change Password</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Enter your current password and new password
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Current Password</Label>
                    <Input
                      type="password"
                      className="bg-[#1E2433] border-[#2A3142] text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">New Password</Label>
                    <Input
                      type="password"
                      className="bg-[#1E2433] border-[#2A3142] text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Confirm New Password</Label>
                    <Input
                      type="password"
                      className="bg-[#1E2433] border-[#2A3142] text-foreground"
                    />
                  </div>
                  <Button className="w-full gradient-gold text-[#0B0F19] font-semibold">
                    Update Password
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Download History */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Download History</h3>
            <div className="space-y-3">
              {downloadHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2433]/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2962FF]/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#2962FF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.type}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    {item.date}
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
