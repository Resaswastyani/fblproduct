"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ImageIcon,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ExternalLink,
  Monitor,
  Smartphone,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const banners = [
  {
    id: 1,
    title: "New Year Promo 2024",
    location: "Homepage Hero",
    type: "desktop",
    status: "active",
    clicks: 2456,
    impressions: 45678,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: 2,
    title: "Premium Membership",
    location: "Dashboard Sidebar",
    type: "both",
    status: "active",
    clicks: 1234,
    impressions: 23456,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: 3,
    title: "Free Indicator",
    location: "Download Page",
    type: "mobile",
    status: "active",
    clicks: 876,
    impressions: 12345,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
  },
  {
    id: 4,
    title: "Webinar Trading",
    location: "Homepage Hero",
    type: "desktop",
    status: "scheduled",
    clicks: 0,
    impressions: 0,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
  },
  {
    id: 5,
    title: "EA Trading Launch",
    location: "EA Page",
    type: "both",
    status: "inactive",
    clicks: 3456,
    impressions: 56789,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
  },
]

export default function AdminBannerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredBanners = banners.filter((banner) =>
    banner.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#10B981]/10 text-[#10B981]"
      case "scheduled":
        return "bg-[#2962FF]/10 text-[#2962FF]"
      case "inactive":
        return "bg-[#6B7280]/10 text-[#6B7280]"
      default:
        return "bg-[#6B7280]/10 text-[#6B7280]"
    }
  }

  const getCTR = (clicks: number, impressions: number) => {
    if (impressions === 0) return "0%"
    return ((clicks / impressions) * 100).toFixed(2) + "%"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Banner Management</h1>
          <p className="text-muted-foreground">Manage promotional banners across your platform</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Banner Title</Label>
                <Input
                  placeholder="Enter banner title"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select>
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                      <SelectItem value="homepage">Homepage Hero</SelectItem>
                      <SelectItem value="sidebar">Dashboard Sidebar</SelectItem>
                      <SelectItem value="download">Download Page</SelectItem>
                      <SelectItem value="ea">EA Page</SelectItem>
                      <SelectItem value="popup">Popup Modal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Device Type</Label>
                  <Select>
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                      <SelectItem value="desktop">Desktop Only</SelectItem>
                      <SelectItem value="mobile">Mobile Only</SelectItem>
                      <SelectItem value="both">All Devices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Link URL</Label>
                <Input
                  placeholder="https://example.com/promo"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Banner Image</Label>
                <div className="border-2 border-dashed border-[#2A3142] rounded-lg p-6 text-center hover:border-[#EF4444] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload banner image
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF (max 2MB)</p>
                </div>
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
                  Save Banner
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Banners</p>
          <p className="text-2xl font-bold text-foreground mt-1">{banners.length}</p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-[#10B981] mt-1">
            {banners.filter((b) => b.status === "active").length}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Clicks</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {banners.reduce((acc, b) => acc + b.clicks, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Avg CTR</p>
          <p className="text-2xl font-bold text-[#2962FF] mt-1">
            {(
              (banners.reduce((acc, b) => acc + b.clicks, 0) /
                banners.reduce((acc, b) => acc + b.impressions, 0)) *
              100
            ).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search banners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#1E2433] border-[#2A3142]"
        />
      </div>

      {/* Banners Table */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A3142]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Banner</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Location</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">CTR</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Toggle</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.map((banner, index) => (
                <motion.tr
                  key={banner.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#2A3142] hover:bg-[#1E2433]/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-[#1E2433] to-[#2A3142] flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{banner.title}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{banner.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{banner.location}</td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {(banner.type === "desktop" || banner.type === "both") && (
                        <Monitor className="w-4 h-4 text-muted-foreground" />
                      )}
                      {(banner.type === "mobile" || banner.type === "both") && (
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {getCTR(banner.clicks, banner.impressions)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {banner.clicks.toLocaleString()} clicks
                      </p>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(banner.status)}`}>
                      {banner.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Switch checked={banner.status === "active"} />
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1E2433] border-[#2A3142]">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Stats
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-[#EF4444]">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
