"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Download, FileText, Calendar, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Ebook {
  id: number;
  title: string;
  category: string;
  pages: number;
  downloads: number;
  file_url: string;
  status: string;
  date?: string;
  created_at?: string;
}

export default function EbookPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Coba multiple key untuk backward compatibility
    let stored = localStorage.getItem("user");
    if (!stored) stored = localStorage.getItem("tradevault_user");

    if (!stored) {
      router.push("/login");
      return;
    }

    try {
      const parsed: User = JSON.parse(stored);
      if (!parsed.id) {
        router.push("/login");
        return;
      }
      setUser(parsed);
      fetchEbooks(parsed.id);
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  const fetchEbooks = async (userId: number) => {
    try {
      console.log("Fetching ebooks for user:", userId); // Debug
      const res = await fetch(`/api/users/${userId}/products`);
      if (!res.ok) {
        const err = await res.json();
        console.error("API Error:", err);
        throw new Error(err.error || "Failed to fetch");
      }
      const data = await res.json();
      console.log("API Response:", data); // Debug
      setEbooks(Array.isArray(data.ebooks) ? data.ebooks : []);
    } catch (err) {
      console.error("Failed to load ebooks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl: string, title: string) => {
    if (!fileUrl) {
      alert("File not available");
      return;
    }
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = `${title}.pdf`;
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
          Loading ebooks...
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
          Ebook PDF
        </h1>
        <p className="text-muted-foreground">
          Koleksi ebook trading premium untuk meningkatkan pengetahuan Anda
        </p>
      </motion.div>

      {/* Ebooks Grid */}
      {ebooks.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">
          No ebooks assigned to your account.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px]"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#F7C948]/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-[#F7C948]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">
                    {ebook.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#2A3142] text-muted-foreground"
                  >
                    {ebook.category || "Ebook"}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {ebook.pages} pages · {ebook.status || "Published"}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3" />
                  PDF
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {ebook.date ||
                    (ebook.created_at
                      ? new Date(ebook.created_at).toLocaleDateString()
                      : "N/A")}
                </span>
              </div>

              <Button
                className="w-full gradient-gold text-[#0B0F19] font-semibold"
                onClick={() => handleDownload(ebook.file_url, ebook.title)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
