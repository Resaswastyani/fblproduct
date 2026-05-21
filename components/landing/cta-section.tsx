"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2962FF]/5 to-transparent" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2962FF]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Siap Untuk <span className="text-[#F7C948]">Upgrade</span> Trading Anda?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Bergabung dengan ribuan trader yang telah meningkatkan performa trading mereka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="gradient-gold text-[#0B0F19] font-bold text-lg px-10 py-6 glow-gold hover:opacity-90 transition-opacity"
              >
                START NOW
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-[#2A3142] text-foreground font-semibold text-lg px-10 py-6 hover:bg-[#1E2433]"
              >
                Already a Member?
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
