"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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
        // Fallback to localStorage if API fails
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Please enter email");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 candlestick-bg opacity-30" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#E91E63]/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#00BCD4]/20 rounded-full blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center gap-4 mb-8"
          >
            <div className="relative w-48 h-20">
              <img
                src="/logo-fbl.png"
                alt="Forex For Better Living Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Animated decorative glow inside card */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-[#E91E63]/20 rounded-full blur-[60px]"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00BCD4]/20 rounded-full blur-[60px]"
          />

          <div className="text-center mb-8 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              WELCOME BACK
            </h1>
            <p className="text-muted-foreground">
              Masuk ke member area untuk mengakses tools premium
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="trader@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#2962FF] focus:ring-[#2962FF]"
                  required
                />
              </div>
            </div>



            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="border-[#2A3142] data-[state=checked]:bg-[#2962FF] data-[state=checked]:border-[#2962FF]"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember Me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#2962FF] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-gold text-[#0B0F19] font-bold h-12 text-lg hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" />
              ) : (
                <>
                  LOGIN
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-[#F7C948] font-semibold hover:underline"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
