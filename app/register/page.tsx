"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");



    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login");
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
        className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#00BCD4]/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#E91E63]/20 rounded-full blur-[120px]"
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
              CREATE ACCOUNT
            </h1>
            <p className="text-muted-foreground">
              Daftar untuk mengakses semua tools trading premium
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#F7C948] focus:ring-[#F7C948]"
                  required
                />
              </div>
            </div>

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
                  className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#F7C948] focus:ring-[#F7C948]"
                  required
                />
              </div>
            </div>



            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                className="border-[#2A3142] data-[state=checked]:bg-[#F7C948] data-[state=checked]:border-[#F7C948] mt-0.5"
                required
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground cursor-pointer leading-tight"
              >
                Saya setuju dengan{" "}
                <Link href="/terms" className="text-[#F7C948] hover:underline">
                  Terms of Service
                </Link>{" "}
                dan{" "}
                <Link
                  href="/privacy"
                  className="text-[#F7C948] hover:underline"
                >
                  Privacy Policy
                </Link>
              </Label>
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
                  CREATE ACCOUNT
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-[#2962FF] font-semibold hover:underline"
              >
                Login Here
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
