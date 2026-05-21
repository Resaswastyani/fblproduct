"use client"

import { motion } from "framer-motion"
import { Play, Clock, Calendar, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const videos = [
  { 
    title: "Introduction to Price Action", 
    duration: "45:30",
    category: "Price Action",
    description: "Dasar-dasar price action untuk pemula. Memahami candlestick dan market structure.",
    thumbnail: "/api/placeholder/400/225",
    date: "2024-01-15"
  },
  { 
    title: "Risk Management Mastery", 
    duration: "38:15",
    category: "Risk Management",
    description: "Strategi manajemen risiko yang wajib dikuasai setiap trader.",
    thumbnail: "/api/placeholder/400/225",
    date: "2024-01-10"
  },
  { 
    title: "Setup Trading MT4/MT5", 
    duration: "25:40",
    category: "Tutorial",
    description: "Panduan lengkap setup platform trading MT4 dan MT5.",
    thumbnail: "/api/placeholder/400/225",
    date: "2024-01-05"
  },
  { 
    title: "Cara Menggunakan Position Size Calculator", 
    duration: "18:20",
    category: "Tutorial",
    description: "Tutorial penggunaan position size calculator untuk manajemen risiko.",
    thumbnail: "/api/placeholder/400/225",
    date: "2024-01-01"
  },
  { 
    title: "Supply and Demand Trading", 
    duration: "52:10",
    category: "Technical Analysis",
    description: "Strategi trading menggunakan supply dan demand zone.",
    thumbnail: "/api/placeholder/400/225",
    date: "2023-12-28"
  },
  { 
    title: "Install dan Setting EA Trading", 
    duration: "22:45",
    category: "Tutorial",
    description: "Cara install dan mengoptimalkan EA trading di MT4/MT5.",
    thumbnail: "/api/placeholder/400/225",
    date: "2023-12-20"
  },
]

export default function VideoPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Video Tutorial
        </h1>
        <p className="text-muted-foreground">
          Pelajari trading melalui video tutorial yang mudah dipahami
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
      >
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#F7C948]">{videos.length}</div>
          <div className="text-sm text-muted-foreground">Total Videos</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#2962FF]">3</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#00C853]">5+</div>
          <div className="text-sm text-muted-foreground">Hours Content</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#8B5CF6]">HD</div>
          <div className="text-sm text-muted-foreground">Quality</div>
        </div>
      </motion.div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px] group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-[#1E2433]">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#F7C948] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
                  <Play className="w-6 h-6 text-[#0B0F19] ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <Badge className="text-xs bg-[#2962FF]/20 text-[#2962FF] border-0 mb-2">
                {video.category}
              </Badge>
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-[#F7C948] transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {video.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
