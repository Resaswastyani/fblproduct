"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, Send, Mail, Shield } from "lucide-react";

const footerLinks = {
  product: [
    { href: "#features", label: "Tools" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: "https://tiktok.com", label: "TikTok" },
  { icon: Send, href: "https://telegram.me", label: "Telegram" },
  { icon: Mail, href: "mailto:support@tradevault.pro", label: "Email" },
];

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [siteName, setSiteName] = useState("Forex For Better Living");

  // Load settings from API + sync to localStorage
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const general = data.general || data;
        if (general.logo) setLogoUrl(general.logo);
        if (general.siteName) setSiteName(general.siteName);

        try {
          const existing = localStorage.getItem("admin_settings");
          const parsed = existing ? JSON.parse(existing) : {};
          localStorage.setItem(
            "admin_settings",
            JSON.stringify({ ...parsed, ...general }),
          );
        } catch {}
      })
      .catch(() => {
        try {
          const raw = localStorage.getItem("admin_settings");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.logo) setLogoUrl(parsed.logo);
            if (parsed.siteName) setSiteName(parsed.siteName);
          }
        } catch {}
      });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A3142] bg-[#0D1117]">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center overflow-hidden p-1">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[#0B0F19] font-bold text-lg">FBL</span>
                )}
              </div>
              <span className="text-xl font-bold text-foreground">
                {siteName} <span className="text-[#F7C948]">Pro</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Platform premium untuk trader profesional. Download ebook,
              indicator, EA trading, dan akses tools trading terbaik.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-[#F7C948] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2A3142] mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              {currentYear} {siteName} Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Shield className="w-4 h-4" />
              <span>Secure & Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
