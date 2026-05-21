"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Save,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your platform settings</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#0D1117] border border-[#2A3142] p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#1E2433]">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#1E2433]">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#1E2433]">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#1E2433]">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2962FF]" />
                Site Settings
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      defaultValue="TradeVault Pro"
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Site URL</Label>
                    <Input
                      defaultValue="https://tradevault.pro"
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Site Description</Label>
                  <Textarea
                    defaultValue="Platform trading terlengkap untuk trader Indonesia"
                    className="bg-[#1E2433] border-[#2A3142]"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select defaultValue="id">
                      <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="asia-jakarta">
                      <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                        <SelectItem value="asia-jakarta">Asia/Jakarta (WIB)</SelectItem>
                        <SelectItem value="asia-makassar">Asia/Makassar (WITA)</SelectItem>
                        <SelectItem value="asia-jayapura">Asia/Jayapura (WIT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#F7C948]" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-[#1E2433] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#F7C948]">TV</span>
                    </div>
                    <Button variant="outline" className="border-[#2A3142]">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#2962FF]" />
                      <Input
                        defaultValue="#2962FF"
                        className="bg-[#1E2433] border-[#2A3142]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#F7C948]" />
                      <Input
                        defaultValue="#F7C948"
                        className="bg-[#1E2433] border-[#2A3142]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2962FF]" />
              Admin Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2962FF] to-[#00BCD4] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">A</span>
                </div>
                <Button variant="outline" className="border-[#2A3142]">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    defaultValue="Admin TradeVault"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    defaultValue="admin@tradevault.pro"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    defaultValue="+62 812 3456 7890"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    defaultValue="Super Admin"
                    disabled
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#F7C948]" />
              Notification Preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">New User Registration</p>
                  <p className="text-sm text-muted-foreground">Get notified when a new user registers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">New Purchase</p>
                  <p className="text-sm text-muted-foreground">Get notified for new membership purchases</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Download Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified for high download activity</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly analytics summary via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">System Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified for system issues or updates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#10B981]" />
                Password
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                </div>
                <Button variant="outline" className="border-[#2A3142]">
                  Update Password
                </Button>
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1E2433] rounded-lg">
                  <div>
                    <p className="text-foreground">Chrome on Windows</p>
                    <p className="text-sm text-muted-foreground">Jakarta, Indonesia - Current session</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1E2433] rounded-lg">
                  <div>
                    <p className="text-foreground">Safari on iPhone</p>
                    <p className="text-sm text-muted-foreground">Jakarta, Indonesia - 2 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#EF4444]">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
