"use client"

import { motion } from "framer-motion"
import { Download, LineChart, Calendar, HardDrive, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const indicators = [
  { 
    name: "Trend Indicator Pro", 
    size: "2.1 MB", 
    version: "v3.2", 
    description: "Indicator trend detection canggih untuk MT4/MT5. Akurasi tinggi dalam mendeteksi perubahan trend.",
    platform: ["MT4", "MT5"],
    features: ["Multi-timeframe", "Alert system", "Non-repaint"],
    date: "2024-01-18"
  },
  { 
    name: "Support Resistance Auto", 
    size: "1.8 MB", 
    version: "v2.5", 
    description: "Otomatis menggambar level support dan resistance penting. Menghemat waktu analisa.",
    platform: ["MT4", "MT5"],
    features: ["Auto draw", "Historical levels", "Color coded"],
    date: "2024-01-12"
  },
  { 
    name: "Volume Profile Indicator", 
    size: "3.2 MB", 
    version: "v1.4", 
    description: "Analisis volume tingkat lanjut untuk memahami area value dan POC.",
    platform: ["MT4"],
    features: ["POC detection", "Value area", "Session based"],
    date: "2024-01-08"
  },
  { 
    name: "Multi Timeframe Dashboard", 
    size: "2.5 MB", 
    version: "v2.0", 
    description: "Monitor kondisi market dari berbagai timeframe dalam satu dashboard.",
    platform: ["MT4", "MT5"],
    features: ["8 timeframes", "Custom alerts", "Signal filter"],
    date: "2024-01-03"
  },
  { 
    name: "RSI Divergence Scanner", 
    size: "1.5 MB", 
    version: "v1.8", 
    description: "Scan divergence RSI secara otomatis dengan alert notification.",
    platform: ["MT4"],
    features: ["Auto scan", "Push alerts", "Multi-pair"],
    date: "2023-12-28"
  },
  { 
    name: "Fibonacci Auto Draw", 
    size: "1.9 MB", 
    version: "v2.2", 
    description: "Otomatis menggambar level Fibonacci berdasarkan swing high/low.",
    platform: ["MT4", "MT5"],
    features: ["Auto swing", "Extension levels", "Customizable"],
    date: "2023-12-22"
  },
]

export default function IndicatorPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Indicator Premium
        </h1>
        <p className="text-muted-foreground">
          Koleksi indicator MT4/MT5 untuk analisa teknikal yang lebih akurat
        </p>
      </motion.div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#2962FF]/20 flex items-center justify-center flex-shrink-0">
                <LineChart className="w-7 h-7 text-[#2962FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{indicator.name}</h3>
                  <Badge variant="outline" className="text-xs border-[#2A3142] text-muted-foreground flex-shrink-0">
                    {indicator.version}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {indicator.platform.map((p) => (
                    <Badge key={p} className="text-xs bg-[#2962FF]/20 text-[#2962FF] border-0">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {indicator.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {indicator.features.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-[#1E2433] px-2 py-1 rounded">
                  <Check className="w-3 h-3 text-[#00C853]" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {indicator.size}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {indicator.date}
              </span>
            </div>

            <Button className="w-full bg-[#2962FF] hover:bg-[#2962FF]/90 text-white font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download Indicator
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
