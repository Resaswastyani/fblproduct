"use client";

import { motion } from "framer-motion";
import { UserPlus, LogIn, Download, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Register",
    description: "Buat akun baru dengan mudah dan cepat",
  },
  {
    icon: LogIn,
    number: "02",
    title: "Login",
    description: "Masuk ke member area dengan kredensial Anda",
  },
  {
    icon: Download,
    number: "03",
    title: "Download Tools",
    description: "Unduh semua tools trading premium",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Improve Trading",
    description: "Tingkatkan performa trading Anda",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#151B28]/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F7C948] text-sm font-semibold tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Mulai Trading Dalam 4 Langkah
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proses sederhana untuk memulai perjalanan trading profesional Anda
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector line - desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#2962FF] to-[#2962FF]/20" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Number badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center glow-blue">
                      <step.icon className="w-8 h-8 text-[#2962FF]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                      <span className="text-[#0B0F19] text-xs font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Connector line - mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#2962FF] to-[#2962FF]/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
