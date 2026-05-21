"use client"

import { motion } from "framer-motion"
import { Download, Bot, Calendar, HardDrive, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const eaTradingList = [
  { 
    name: "Gold Scalper EA", 
    size: "4.5 MB", 
    version: "v5.1", 
    description: "EA khusus untuk scalping XAUUSD dengan manajemen risiko terintegrasi. Cocok untuk akun dengan spread rendah.",
    platform: ["MT4", "MT5"],
    strategy: "Scalping",
    pairs: ["XAUUSD"],
    features: ["Auto lot sizing", "News filter", "Drawdown protection"],
    date: "2024-01-20",
    riskLevel: "Medium"
  },
  { 
    name: "Trend Following EA", 
    size: "3.8 MB", 
    version: "v2.3", 
    description: "EA berbasis trend following dengan entry pada pullback. Menggunakan multiple indicators untuk konfirmasi.",
    platform: ["MT4"],
    strategy: "Trend Following",
    pairs: ["EURUSD", "GBPUSD", "USDJPY"],
    features: ["Multi-pair", "Trailing stop", "Break even"],
    date: "2024-01-14",
    riskLevel: "Low"
  },
  { 
    name: "News Trading EA", 
    size: "5.2 MB", 
    version: "v1.8", 
    description: "Automated trading saat high impact news release. Dilengkapi dengan economic calendar terintegrasi.",
    platform: ["MT4", "MT5"],
    strategy: "News Trading",
    pairs: ["Major Pairs"],
    features: ["Built-in calendar", "Spike detection", "Auto close"],
    date: "2024-01-09",
    riskLevel: "High"
  },
  { 
    name: "Grid EA Pro", 
    size: "4.1 MB", 
    version: "v3.5", 
    description: "Advanced grid trading system dengan recovery mode. Memiliki fitur martingale yang bisa dikustom.",
    platform: ["MT4"],
    strategy: "Grid",
    pairs: ["EURUSD", "GBPUSD"],
    features: ["Recovery mode", "Custom grid", "Profit lock"],
    date: "2024-01-04",
    riskLevel: "High"
  },
  { 
    name: "Asian Session EA", 
    size: "3.2 MB", 
    version: "v2.0", 
    description: "EA yang aktif hanya pada sesi Asia. Memanfaatkan low volatility untuk ranging strategy.",
    platform: ["MT4", "MT5"],
    strategy: "Range Trading",
    pairs: ["USDJPY", "AUDJPY"],
    features: ["Session filter", "Range detection", "Time based"],
    date: "2023-12-30",
    riskLevel: "Low"
  },
  { 
    name: "Breakout Hunter EA", 
    size: "3.9 MB", 
    version: "v1.5", 
    description: "Mendeteksi dan trade breakout dari consolidation zone secara otomatis.",
    platform: ["MT4"],
    strategy: "Breakout",
    pairs: ["EURUSD", "GBPUSD", "XAUUSD"],
    features: ["Zone detection", "Momentum filter", "Multiple TP"],
    date: "2023-12-25",
    riskLevel: "Medium"
  },
]

const riskColors = {
  Low: "#00C853",
  Medium: "#F7C948",
  High: "#EF4444"
}

export default function EAPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          EA Trading
        </h1>
        <p className="text-muted-foreground">
          Expert Advisors untuk automated trading di MT4/MT5
        </p>
      </motion.div>

      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-4 mb-6 border-[#F7C948]/30 bg-[#F7C948]/5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F7C948] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Perhatian</p>
            <p className="text-xs text-muted-foreground">
              Trading menggunakan EA memiliki risiko. Selalu test di akun demo terlebih dahulu dan gunakan manajemen risiko yang tepat.
            </p>
          </div>
        </div>
      </motion.div>

      {/* EA Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eaTradingList.map((ea, index) => (
          <motion.div
            key={ea.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#00C853]/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-7 h-7 text-[#00C853]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{ea.name}</h3>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-0 flex-shrink-0"
                    style={{ 
                      backgroundColor: `${riskColors[ea.riskLevel as keyof typeof riskColors]}20`,
                      color: riskColors[ea.riskLevel as keyof typeof riskColors]
                    }}
                  >
                    {ea.riskLevel} Risk
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ea.platform.map((p) => (
                    <Badge key={p} className="text-xs bg-[#00C853]/20 text-[#00C853] border-0">
                      {p}
                    </Badge>
                  ))}
                  <Badge className="text-xs bg-[#8B5CF6]/20 text-[#8B5CF6] border-0">
                    {ea.strategy}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {ea.description}
            </p>

            {/* Pairs */}
            <div className="text-xs text-muted-foreground mb-3">
              <span className="text-foreground">Pairs:</span> {ea.pairs.join(", ")}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ea.features.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-[#1E2433] px-2 py-1 rounded">
                  <Check className="w-3 h-3 text-[#00C853]" />
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {ea.size}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {ea.date}
              </span>
              <span>{ea.version}</span>
            </div>

            <Button className="w-full bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download EA
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
