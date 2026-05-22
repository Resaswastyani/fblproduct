"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Download, LineChart, Calendar, HardDrive, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Indicator {
  id: number;
  name: string;
  platform: string;
  version: string;
  downloads: number;
  file_url: string;
  status: string;
  price: string;
  updated_at?: string;
  created_at?: string;
}

export default function IndicatorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const parsed: User = JSON.parse(stored);
    setUser(parsed);
    fetchIndicators(parsed.id);
  }, [router]);

  const fetchIndicators = async (userId: number) => {
    try {
      const res = await fetch(`/api/users/${userId}/products`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setIndicators(Array.isArray(data.indicators) ? data.indicators : []);
    } catch (err) {
      console.error("Failed to load indicators:", err);
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
          Loading indicators...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Indicator Premium
        </h1>
        <p className="text-muted-foreground">
          Koleksi indicator MT4/MT5 untuk analisa teknikal yang lebih akurat
        </p>
      </motion.div>

      {/* Indicators Grid */}
      {indicators.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">
          No indicators assigned to your account.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {indicators.map((indicator, index) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px]"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#2962FF]/20 flex items-center justify-center flex-shrink-0">
                  <LineChart className="w-7 h-7 text-[#2962FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {indicator.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-xs border-[#2A3142] text-muted-foreground flex-shrink-0"
                    >
                      {indicator.version || "v1.0"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {(indicator.platform
                      ? indicator.platform.split(/,\s*|\//)
                      : ["MT4"]
                    ).map((p: string) => (
                      <Badge
                        key={p}
                        className="text-xs bg-[#2962FF]/20 text-[#2962FF] border-0"
                      >
                        {p.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {indicator.price || "Premium"} · {indicator.status || "Active"}
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
                  Indicator File
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {indicator.updated_at ||
                    new Date(indicator.created_at).toLocaleDateString()}
                </span>
              </div>

              <Button
                className="w-full bg-[#2962FF] hover:bg-[#2962FF]/90 text-white font-semibold"
                onClick={() =>
                  handleDownload(indicator.file_url, indicator.name)
                }
              >
                <Download className="w-4 h-4 mr-2" />
                Download Indicator
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
