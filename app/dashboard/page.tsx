"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  BookOpen,
  LineChart,
  Bot,
  TrendingUp,
  Clock,
  ChevronRight,
  Zap,
  ExternalLink,
  PlayCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Product {
  id: number;
  type: string;
  name: string;
  title?: string;
  category?: string;
  platform?: string;
  version?: string;
  size?: string;
  file_url?: string;
  date?: string;
  created_at?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const parsed: User = JSON.parse(stored);
    setUser(parsed);
    fetchProducts(parsed.id);
  }, [router]);

  const fetchProducts = async (userId: number) => {
    try {
      const res = await fetch(`/api/users/${userId}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const all: Product[] = [];
      data.ebooks?.forEach((e: any) =>
        all.push({ ...e, type: "ebook", name: e.title }),
      );
      data.eas?.forEach((e: any) =>
        all.push({ ...e, type: "ea", name: e.name }),
      );
      data.indicators?.forEach((i: any) =>
        all.push({ ...i, type: "indicator", name: i.name }),
      );
      setProducts(all);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const ebookCount = products.filter((p) => p.type === "ebook").length;
  const indicatorCount = products.filter((p) => p.type === "indicator").length;
  const eaCount = products.filter((p) => p.type === "ea").length;
  const totalCount = products.length;

  const quickAccess = [
    {
      href: "/dashboard/ebook",
      icon: BookOpen,
      label: "Ebook PDF",
      color: "#F7C948",
      type: "ebook",
    },
    {
      href: "/dashboard/indicator",
      icon: LineChart,
      label: "Indicator",
      color: "#2962FF",
      type: "indicator",
    },
    {
      href: "/dashboard/ea",
      icon: Bot,
      label: "EA Trading",
      color: "#00C853",
      type: "ea",
    },
    {
      href: "/dashboard/calculator",
      icon: Zap,
      label: "Calculator",
      color: "#8B5CF6",
      type: "calculator",
    },
  ].filter(
    (item) =>
      item.type === "calculator" || products.some((p) => p.type === item.type),
  );

  const recentActivity = products.map((p) => ({
    ...p,
    typeName:
      p.type === "ebook"
        ? "Ebook"
        : p.type === "ea"
          ? "EA Trading"
          : "Indicator",
  }));

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="p-8 text-center text-muted-foreground">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Welcome,{" "}
          <span className="text-[#F7C948]">{user?.name || "Trader"}</span>
        </h1>
        <p className="text-muted-foreground">
          Akses semua tools trading premium Anda di sini
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Products",
            value: String(totalCount),
            change: "Assigned to you",
            icon: Download,
            color: "#2962FF",
          },
          {
            label: "Ebook",
            value: String(ebookCount),
            change: "Available",
            icon: BookOpen,
            color: "#F7C948",
          },
          {
            label: "Indicator",
            value: String(indicatorCount),
            change: "Available",
            icon: LineChart,
            color: "#00C853",
          },
          {
            label: "EA",
            value: String(eaCount),
            change: "Available",
            icon: Bot,
            color: "#8B5CF6",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 sm:p-6"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ color: stat.color }}
              />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">
              {stat.label}
            </div>
            <div className="flex items-center gap-1 text-[#00C853] text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Materials Animated Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Link href="/dashboard/downloads" className="block relative rounded-3xl overflow-hidden glass-card group border border-[#F7C948]/20 hover:border-[#F7C948]/50 transition-colors">
          {/* Animated Glow Backgrounds */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-[#E91E63]/20 rounded-full blur-[80px] pointer-events-none"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 10, delay: 2 }}
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00BCD4]/20 rounded-full blur-[80px] pointer-events-none"
          />
          
          <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 z-10">
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-[#F7C948]/20 border border-[#F7C948]/30 text-[#F7C948] text-xs font-bold uppercase tracking-wider mb-2">
                Akses Penuh
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7C948] to-[#E91E63]">Semua Materi</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto sm:mx-0">
                Jelajahi perpustakaan lengkap yang berisi seluruh Ebook, Indikator, dan Robot Trading (EA) premium Anda dalam satu tempat.
              </p>
              <div className="pt-2">
                <Button className="gradient-gold text-[#0B0F19] font-bold rounded-xl px-8 py-6 text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(247,201,72,0.3)]">
                  Lihat Semua Materi
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex-shrink-0 flex items-center justify-center mt-6 sm:mt-0">
              {/* Floating Ebook */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-0 right-4 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#F7C948]/30 to-[#F7C948]/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-[#F7C948]/40 shadow-xl z-20"
              >
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#F7C948]" />
              </motion.div>
              
              {/* Floating Indicator */}
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-2 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#2962FF]/30 to-[#2962FF]/10 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-[#2962FF]/40 shadow-xl z-30"
              >
                <LineChart className="w-10 h-10 sm:w-12 sm:h-12 text-[#2962FF]" />
              </motion.div>
              
              {/* Floating EA */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#00C853]/30 to-[#00C853]/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-[#00C853]/40 shadow-[0_0_30px_rgba(0,200,83,0.3)] z-10"
              >
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-[#00C853]" />
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickAccess.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="glass-card rounded-xl p-4 text-center hover:border-[#2A3142]/50 transition-all hover:translate-y-[-2px] group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon
                      className="w-6 h-6"
                      style={{ color: item.color }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-[#F7C948] transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Semua Materi Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Materi Premium Anda
            </h2>
            <p className="text-muted-foreground text-sm">
              Klik pada materi untuk membuka dan membacanya secara langsung
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProduct(activity)}
                className="glass-card rounded-2xl p-5 hover:border-[#F7C948]/50 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2962FF]/0 to-[#2962FF]/0 group-hover:from-[#2962FF]/10 group-hover:to-[#F7C948]/10 transition-colors" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'ebook' ? 'bg-[#F7C948]/20 text-[#F7C948]' :
                    activity.type === 'ea' ? 'bg-[#00C853]/20 text-[#00C853]' :
                    'bg-[#2962FF]/20 text-[#2962FF]'
                  }`}>
                    {activity.type === 'ebook' ? <BookOpen className="w-6 h-6" /> :
                     activity.type === 'ea' ? <Bot className="w-6 h-6" /> :
                     <LineChart className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-foreground line-clamp-2 group-hover:text-[#F7C948] transition-colors">
                      {activity.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.typeName}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#2A3142] flex items-center justify-between relative z-10">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.created_at ? new Date(activity.created_at).toLocaleDateString() : 'Tersedia'}
                  </span>
                  <div className="flex items-center gap-1 text-[#F7C948] text-sm font-medium">
                    <PlayCircle className="w-4 h-4" /> Buka
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full glass-card rounded-2xl p-8 text-center text-muted-foreground">
              Belum ada materi yang tersedia untuk Anda.
            </div>
          )}
        </div>
      </motion.div>

      {/* Viewer Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="bg-[#0B0F19] border-[#2A3142] text-foreground max-w-5xl w-full h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b border-[#2A3142] flex-shrink-0 bg-[#151B28]">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              {selectedProduct?.type === 'ebook' ? <BookOpen className="w-5 h-5 text-[#F7C948]" /> :
               selectedProduct?.type === 'ea' ? <Bot className="w-5 h-5 text-[#00C853]" /> :
               <LineChart className="w-5 h-5 text-[#2962FF]" />}
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden bg-black/50 relative">
            {selectedProduct?.file_url ? (
              <iframe 
                src={selectedProduct.file_url} 
                className="w-full h-full border-0"
                title={selectedProduct.name}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                <FileText className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">File Tidak Tersedia</h3>
                <p>Maaf, file materi ini belum diunggah atau link tidak valid.</p>
              </div>
            )}
            
            {/* Download/External Link Button overlay for non-pdf formats if needed */}
            {selectedProduct?.file_url && selectedProduct.type !== 'ebook' && (
              <div className="absolute bottom-6 right-6">
                 <Button asChild className="gradient-gold text-[#0B0F19] font-bold shadow-xl">
                   <a href={selectedProduct.file_url} target="_blank" rel="noreferrer">
                     <Download className="w-4 h-4 mr-2" /> Download File
                   </a>
                 </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
