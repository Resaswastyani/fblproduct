"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 candlestick-bg" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2962FF]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F7C948]/10 rounded-full blur-[120px] animate-pulse" />

      {/* Candlestick decorations */}
      <div className="absolute left-10 top-1/3 hidden lg:block opacity-20">
        <CandlestickDecoration />
      </div>
      <div className="absolute right-10 bottom-1/3 hidden lg:block opacity-20">
        <CandlestickDecoration />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#F7C948] text-[#F7C948]"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              5000+ Trader Bergabung
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-foreground">DOWNLOAD </span>
            <span className="text-[#F7C948] text-glow-gold">PREMIUM</span>
            <br />
            <span className="text-foreground">TRADING TOOLS</span>
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {[
              { icon: TrendingUp, text: "Ebook Trading" },
              { icon: Zap, text: "EA Trading" },
              { icon: TrendingUp, text: "Indicator Premium" },
              { icon: Zap, text: "Position Size Calculator" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <item.icon className="w-4 h-4 text-[#2962FF]" />
                <span className="text-sm sm:text-base">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="gradient-gold text-[#0B0F19] font-bold text-lg px-8 py-6 glow-gold hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                GET ACCESS NOW
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-[#2A3142] text-foreground font-semibold text-lg px-8 py-6 hover:bg-[#1E2433] w-full sm:w-auto"
              >
                LOGIN MEMBER
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16"
          >
            {[
              { value: "50+", label: "Premium Tools" },
              { value: "5000+", label: "Active Traders" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#F7C948]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#2A3142] flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-[#F7C948] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CandlestickDecoration() {
  return (
    <svg width="100" height="200" viewBox="0 0 100 200" fill="none">
      {/* Green candle */}
      <rect x="10" y="80" width="20" height="60" fill="#00C853" rx="2" />
      <line x1="20" y1="60" x2="20" y2="80" stroke="#00C853" strokeWidth="2" />
      <line
        x1="20"
        y1="140"
        x2="20"
        y2="160"
        stroke="#00C853"
        strokeWidth="2"
      />

      {/* Red candle */}
      <rect x="40" y="40" width="20" height="80" fill="#EF4444" rx="2" />
      <line x1="50" y1="20" x2="50" y2="40" stroke="#EF4444" strokeWidth="2" />
      <line
        x1="50"
        y1="120"
        x2="50"
        y2="150"
        stroke="#EF4444"
        strokeWidth="2"
      />

      {/* Green candle */}
      <rect x="70" y="60" width="20" height="50" fill="#00C853" rx="2" />
      <line x1="80" y1="40" x2="80" y2="60" stroke="#00C853" strokeWidth="2" />
      <line
        x1="80"
        y1="110"
        x2="80"
        y2="130"
        stroke="#00C853"
        strokeWidth="2"
      />
    </svg>
  );
}
