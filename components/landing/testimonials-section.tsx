"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Faisal",
    role: "Full-time Trader",
    content:
      "Risk management saya jauh lebih rapi setelah menggunakan Position Size Calculator. Sangat membantu!",
    rating: 5,
    avatar: "AF",
  },
  {
    name: "Budi Santoso",
    role: "Forex Trader",
    content:
      "EA membantu trading saya lebih disiplin. Tidak lagi overtrading dan hasilnya konsisten.",
    rating: 5,
    avatar: "BS",
  },
  {
    name: "Dewi Lestari",
    role: "Part-time Trader",
    content:
      "Ebook trading sangat comprehensive. Psikologi trading yang diajarkan benar-benar aplikatif.",
    rating: 5,
    avatar: "DL",
  },
  {
    name: "Rudi Hermawan",
    role: "Scalper",
    content:
      "Indicator premium sangat akurat untuk menentukan entry point. Profit saya meningkat 40%.",
    rating: 5,
    avatar: "RH",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F7C948] text-sm font-semibold tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ribuan trader telah merasakan manfaat dari tools premium kami
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-[#F7C948]" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#F7C948] text-[#F7C948]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-[#0B0F19] font-bold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
