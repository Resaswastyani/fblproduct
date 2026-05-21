"use client"

import { motion } from "framer-motion"
import { Download, FileText, Calendar, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ebooks = [
  { 
    name: "Price Action Mastery", 
    size: "15.2 MB", 
    version: "v2.1", 
    description: "Panduan lengkap price action trading untuk pemula hingga advanced. Dilengkapi dengan chart examples dan case studies.",
    category: "Technical Analysis",
    date: "2024-01-15"
  },
  { 
    name: "Risk Management Guide", 
    size: "8.5 MB", 
    version: "v1.3", 
    description: "Strategi manajemen risiko profesional. Pelajari cara mengelola risiko seperti trader profesional.",
    category: "Risk Management",
    date: "2024-01-10"
  },
  { 
    name: "Psychology of Trading", 
    size: "12.8 MB", 
    version: "v1.0", 
    description: "Menguasai psikologi dalam trading. Belajar mengendalikan emosi dan mengembangkan mindset pemenang.",
    category: "Trading Psychology",
    date: "2024-01-05"
  },
  { 
    name: "Technical Analysis Complete", 
    size: "22.4 MB", 
    version: "v3.0", 
    description: "Analisis teknikal dari dasar hingga advanced. Mencakup chart patterns, indicators, dan price action.",
    category: "Technical Analysis",
    date: "2024-01-01"
  },
  { 
    name: "Candlestick Patterns Bible", 
    size: "18.6 MB", 
    version: "v2.0", 
    description: "Pelajari semua pola candlestick untuk entry dan exit yang akurat.",
    category: "Technical Analysis",
    date: "2023-12-20"
  },
  { 
    name: "Forex Trading Fundamentals", 
    size: "14.2 MB", 
    version: "v1.5", 
    description: "Panduan dasar trading forex untuk pemula. Memahami market structure dan currency pairs.",
    category: "Fundamentals",
    date: "2023-12-15"
  },
]

export default function EbookPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Ebook PDF
        </h1>
        <p className="text-muted-foreground">
          Koleksi ebook trading premium untuk meningkatkan pengetahuan Anda
        </p>
      </motion.div>

      {/* Ebooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ebooks.map((ebook, index) => (
          <motion.div
            key={ebook.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#F7C948]/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 text-[#F7C948]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{ebook.name}</h3>
                <Badge variant="outline" className="text-xs border-[#2A3142] text-muted-foreground">
                  {ebook.category}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {ebook.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {ebook.size}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {ebook.date}
              </span>
              <span>{ebook.version}</span>
            </div>

            <Button className="w-full gradient-gold text-[#0B0F19] font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
