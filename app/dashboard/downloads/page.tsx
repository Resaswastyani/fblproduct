"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Download, 
  FileText, 
  LineChart, 
  Bot,
  Filter,
  Calendar,
  HardDrive,
  Tag
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const downloadItems = {
  ebook: [
    { name: "Price Action Mastery", size: "15.2 MB", version: "v2.1", description: "Panduan lengkap price action trading", date: "2024-01-15" },
    { name: "Risk Management Guide", size: "8.5 MB", version: "v1.3", description: "Strategi manajemen risiko profesional", date: "2024-01-10" },
    { name: "Psychology of Trading", size: "12.8 MB", version: "v1.0", description: "Menguasai psikologi dalam trading", date: "2024-01-05" },
    { name: "Technical Analysis Complete", size: "22.4 MB", version: "v3.0", description: "Analisis teknikal dari dasar hingga advanced", date: "2024-01-01" },
  ],
  indicator: [
    { name: "Trend Indicator Pro", size: "2.1 MB", version: "v3.2", description: "MT4/MT5 trend detection indicator", date: "2024-01-18" },
    { name: "Support Resistance Auto", size: "1.8 MB", version: "v2.5", description: "Auto draw support & resistance", date: "2024-01-12" },
    { name: "Volume Profile Indicator", size: "3.2 MB", version: "v1.4", description: "Advanced volume analysis", date: "2024-01-08" },
    { name: "Multi Timeframe Dashboard", size: "2.5 MB", version: "v2.0", description: "Monitor multiple timeframes", date: "2024-01-03" },
  ],
  ea: [
    { name: "Gold Scalper EA", size: "4.5 MB", version: "v5.1", description: "Automated gold scalping strategy", date: "2024-01-20" },
    { name: "Trend Following EA", size: "3.8 MB", version: "v2.3", description: "EA berbasis trend following", date: "2024-01-14" },
    { name: "News Trading EA", size: "5.2 MB", version: "v1.8", description: "Auto trading saat high impact news", date: "2024-01-09" },
    { name: "Grid EA Pro", size: "4.1 MB", version: "v3.5", description: "Advanced grid trading system", date: "2024-01-04" },
  ],
}

const categoryIcons = {
  ebook: FileText,
  indicator: LineChart,
  ea: Bot,
}

const categoryColors = {
  ebook: "#F7C948",
  indicator: "#2962FF",
  ea: "#00C853",
}

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filterItems = (items: typeof downloadItems.ebook, category: string) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Download Center
        </h1>
        <p className="text-muted-foreground">
          Akses semua tools trading premium Anda
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-11"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px] bg-[#1E2433] border-[#2A3142] text-foreground h-11">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#151B28] border-[#2A3142]">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="ebook">Ebook</SelectItem>
              <SelectItem value="indicator">Indicator</SelectItem>
              <SelectItem value="ea">EA Trading</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="ebook" className="w-full">
          <TabsList className="w-full sm:w-auto flex bg-[#151B28] border border-[#2A3142] p-1 rounded-xl mb-6">
            <TabsTrigger 
              value="ebook" 
              className="flex-1 sm:flex-none data-[state=active]:bg-[#F7C948] data-[state=active]:text-[#0B0F19] rounded-lg"
            >
              <FileText className="w-4 h-4 mr-2" />
              Ebook
            </TabsTrigger>
            <TabsTrigger 
              value="indicator"
              className="flex-1 sm:flex-none data-[state=active]:bg-[#2962FF] data-[state=active]:text-white rounded-lg"
            >
              <LineChart className="w-4 h-4 mr-2" />
              Indicator
            </TabsTrigger>
            <TabsTrigger 
              value="ea"
              className="flex-1 sm:flex-none data-[state=active]:bg-[#00C853] data-[state=active]:text-white rounded-lg"
            >
              <Bot className="w-4 h-4 mr-2" />
              EA Trading
            </TabsTrigger>
          </TabsList>

          {(Object.keys(downloadItems) as Array<keyof typeof downloadItems>).map((category) => {
            const Icon = categoryIcons[category]
            const color = categoryColors[category]
            
            return (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterItems(downloadItems[category], category).map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card rounded-2xl p-5 hover:border-[#2A3142]/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <Badge variant="outline" className="text-xs border-[#2A3142] text-muted-foreground flex-shrink-0">
                              {item.version}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-3 h-3" />
                              {item.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                          </div>
                          <Button
                            className="w-full sm:w-auto"
                            style={{ backgroundColor: color }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </motion.div>
    </div>
  )
}
