"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  TrendingDown,
  Target,
  Scale,
  Info,
  RefreshCw
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const tradingPairs = [
  { value: "EURUSD", label: "EUR/USD", pipValue: 10 },
  { value: "GBPUSD", label: "GBP/USD", pipValue: 10 },
  { value: "USDJPY", label: "USD/JPY", pipValue: 9.1 },
  { value: "XAUUSD", label: "XAU/USD (Gold)", pipValue: 10 },
  { value: "AUDUSD", label: "AUD/USD", pipValue: 10 },
  { value: "USDCAD", label: "USD/CAD", pipValue: 7.5 },
  { value: "NZDUSD", label: "NZD/USD", pipValue: 10 },
]

export default function CalculatorPage() {
  const [balance, setBalance] = useState("")
  const [riskPercent, setRiskPercent] = useState("")
  const [stopLoss, setStopLoss] = useState("")
  const [pair, setPair] = useState("EURUSD")
  const [takeProfit, setTakeProfit] = useState("")
  const [results, setResults] = useState<{
    riskAmount: number
    lotSize: number
    positionSize: number
    riskReward: number
  } | null>(null)

  const calculatePosition = useCallback(() => {
    const balanceNum = parseFloat(balance)
    const riskNum = parseFloat(riskPercent)
    const slPips = parseFloat(stopLoss)
    const tpPips = parseFloat(takeProfit)
    const selectedPair = tradingPairs.find(p => p.value === pair)
    
    if (!balanceNum || !riskNum || !slPips || !selectedPair) {
      return
    }

    const riskAmount = (balanceNum * riskNum) / 100
    const pipValue = selectedPair.pipValue
    const lotSize = riskAmount / (slPips * pipValue)
    const positionSize = lotSize * 100000
    const riskReward = tpPips ? tpPips / slPips : 0

    setResults({
      riskAmount: Math.round(riskAmount * 100) / 100,
      lotSize: Math.round(lotSize * 100) / 100,
      positionSize: Math.round(positionSize),
      riskReward: Math.round(riskReward * 100) / 100,
    })
  }, [balance, riskPercent, stopLoss, pair, takeProfit])

  const resetForm = () => {
    setBalance("")
    setRiskPercent("")
    setStopLoss("")
    setTakeProfit("")
    setPair("EURUSD")
    setResults(null)
  }

  return (
    <TooltipProvider>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Position Size Calculator
          </h1>
          <p className="text-muted-foreground">
            Hitung ukuran posisi optimal untuk manajemen risiko yang tepat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#F7C948]" />
                Input Data
              </h2>

              <div className="space-y-5">
                {/* Balance */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="balance" className="text-foreground">Account Balance</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#151B28] border-[#2A3142]">
                        <p>Total balance akun trading Anda dalam USD</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="balance"
                      type="number"
                      placeholder="10000"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12"
                    />
                  </div>
                </div>

                {/* Risk Percentage */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="risk" className="text-foreground">Risk Percentage</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#151B28] border-[#2A3142]">
                        <p>Persentase risiko per trade (rekomendasi: 1-2%)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="risk"
                      type="number"
                      step="0.1"
                      placeholder="1"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(e.target.value)}
                      className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12"
                    />
                  </div>
                </div>

                {/* Stop Loss */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="stoploss" className="text-foreground">Stop Loss (Pips)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#151B28] border-[#2A3142]">
                        <p>Jarak stop loss dalam pips</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <TrendingDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="stoploss"
                      type="number"
                      placeholder="50"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12"
                    />
                  </div>
                </div>

                {/* Take Profit (Optional) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="takeprofit" className="text-foreground">Take Profit (Pips)</Label>
                    <span className="text-xs text-muted-foreground">(Optional)</span>
                  </div>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="takeprofit"
                      type="number"
                      placeholder="100"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12"
                    />
                  </div>
                </div>

                {/* Trading Pair */}
                <div className="space-y-2">
                  <Label className="text-foreground">Trading Pair</Label>
                  <Select value={pair} onValueChange={setPair}>
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142] text-foreground h-12">
                      <SelectValue placeholder="Select pair" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#151B28] border-[#2A3142]">
                      {tradingPairs.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={calculatePosition}
                    className="flex-1 gradient-gold text-[#0B0F19] font-bold h-12"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    CALCULATE
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-[#2A3142] text-foreground h-12"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 h-full">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#2962FF]" />
                Results
              </h2>

              {results ? (
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {/* Risk Amount */}
                    <div className="glass-card rounded-xl p-4 bg-[#EF4444]/10 border-[#EF4444]/20">
                      <div className="text-sm text-muted-foreground mb-1">Risk Amount</div>
                      <div className="text-2xl font-bold text-[#EF4444]">
                        ${results.riskAmount}
                      </div>
                    </div>

                    {/* Lot Size */}
                    <div className="glass-card rounded-xl p-4 bg-[#F7C948]/10 border-[#F7C948]/20">
                      <div className="text-sm text-muted-foreground mb-1">Lot Size</div>
                      <div className="text-2xl font-bold text-[#F7C948]">
                        {results.lotSize}
                      </div>
                    </div>

                    {/* Position Size */}
                    <div className="glass-card rounded-xl p-4 bg-[#2962FF]/10 border-[#2962FF]/20">
                      <div className="text-sm text-muted-foreground mb-1">Position Size</div>
                      <div className="text-2xl font-bold text-[#2962FF]">
                        {results.positionSize.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">units</div>
                    </div>

                    {/* Risk Reward */}
                    <div className="glass-card rounded-xl p-4 bg-[#00C853]/10 border-[#00C853]/20">
                      <div className="text-sm text-muted-foreground mb-1">Risk Reward</div>
                      <div className="text-2xl font-bold text-[#00C853]">
                        1:{results.riskReward || "-"}
                      </div>
                    </div>
                  </motion.div>

                  {/* Tips */}
                  <div className="glass-card rounded-xl p-4 mt-6">
                    <h4 className="font-semibold text-foreground mb-2">Trading Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>- Jangan pernah risiko lebih dari 2% per trade</li>
                      <li>- Idealnya risk:reward minimal 1:2</li>
                      <li>- Selalu gunakan stop loss</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#1E2433] flex items-center justify-center mb-4">
                    <Calculator className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-1">Belum ada hasil</p>
                  <p className="text-sm text-muted-foreground">
                    Isi form di samping dan klik Calculate
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  )
}
