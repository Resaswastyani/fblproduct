"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  LineChart,
  Bot,
  Calculator,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Ebook Trading",
    description: ["Psikologi Trading", "Risk Management", "Price Action"],
    color: "#2962FF",
    href: "/dashboard/ebook",
  },
  {
    icon: LineChart,
    title: "Indicator Premium",
    description: ["MT4", "MT5", "Trend Indicator"],
    color: "#F7C948",
    href: "/dashboard/indicator",
  },
  {
    icon: Bot,
    title: "EA Trading",
    description: ["Auto Trading", "Scalping EA", "Gold EA"],
    color: "#00C853",
    href: "/dashboard/ea",
  },
  {
    icon: Calculator,
    title: "Position Size Calculator",
    description: ["Risk Management Tool"],
    color: "#8B5CF6",
    href: "/dashboard/calculator",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F7C948] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Premium Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trading Tools Yang Anda Butuhkan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Akses berbagai tools trading premium untuk meningkatkan performa
            trading Anda
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col hover:border-[#2A3142]/50 transition-all duration-300 hover:translate-y-[-4px]">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon
                    className="w-7 h-7"
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <ul className="text-muted-foreground text-sm space-y-1 mb-6 flex-grow">
                  {feature.description.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link href={feature.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-muted-foreground hover:text-foreground group-hover:bg-[#1E2433]"
                  >
                    Explore
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
