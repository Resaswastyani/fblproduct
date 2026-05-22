"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Download, Bot, Calendar, HardDrive, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
}

interface EA {
  id: number;
  name: string;
  platform: string;
  version: string;
  downloads: number;
  file_url: string;
  status: string;
  price: string;
  win_rate?: number;
  pairs?: string[];
  created_at?: string;
}

export default function EAPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [eas, setEas] = useState<EA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const parsed: User = JSON.parse(stored);
    setUser(parsed);
    fetchEAs(parsed.id);
  }, [router]);

  const fetchEAs = async (userId: number) => {
    try {
      const res = await fetch(`/api/users/${userId}/products`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEas(Array.isArray(data.eas) ? data.eas : []);
    } catch (err) {
      console.error("Failed to load EAs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl: string, name: string) => {
    if (!fileUrl) {
      alert("File not available");
      return;
    }
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${name}.ex4`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="p-8 text-center text-muted-foreground">
          Loading EA Trading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          EA Trading
        </h1>
        <p className="text-muted-foreground">
          Koleksi Expert Advisor premium untuk trading otomatis
        </p>
      </motion.div>

      {eas.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">
          No EA assigned to your account.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eas.map((ea, index) => (
            <motion.div
              key={ea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                      className="text-xs border-[#2A3142] text-muted-foreground flex-shrink-0"
                    >
                      {ea.version || "v1.0"}
                    </Badge>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(ea.platform ? ea.platform.split(/,\s*|\//) : ["MT4"]).map(
                      (p: string) => (
                        <Badge
                          key={p}
                          className="text-xs bg-[#00C853]/20 text-[#00C853] border-0"
                        >
                          {p.trim()}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {ea.price || "Premium"} · {ea.status || "Active"}
                {ea.win_rate ? ` · Win Rate ${ea.win_rate}%` : ""}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-[#1E2433] px-2 py-1 rounded">
                  <Check className="w-3 h-3 text-[#00C853]" />
                  Assigned
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3" />
                  EA File
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(ea.created_at).toLocaleDateString()}
                </span>
              </div>

              <Button
                className="w-full bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold"
                onClick={() => handleDownload(ea.file_url, ea.name)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download EA
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
