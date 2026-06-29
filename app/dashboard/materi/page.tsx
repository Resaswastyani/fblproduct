"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  LineChart,
  Bot,
  Download,
  FileText,
  Clock,
  Menu,
  X,
  PlayCircle,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  file_url?: string;
  created_at?: string;
}

export default function MateriPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true); // For desktop sidebar

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
        all.push({ ...e, type: "ebook", name: e.title })
      );
      data.eas?.forEach((e: any) =>
        all.push({ ...e, type: "ea", name: e.name })
      );
      data.indicators?.forEach((i: any) =>
        all.push({ ...i, type: "indicator", name: i.name })
      );
      setProducts(all);
      
      // Auto select first product if available
      if (all.length > 0) {
        setSelectedProduct(all[0]);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string, className = "w-5 h-5") => {
    if (type === "ebook") return <BookOpen className={className} />;
    if (type === "ea") return <Bot className={className} />;
    return <LineChart className={className} />;
  };

  const getColor = (type: string) => {
    if (type === "ebook") return "#F7C948";
    if (type === "ea") return "#00C853";
    return "#2962FF";
  };

  const getTypeName = (type: string) => {
    if (type === "ebook") return "Ebook";
    if (type === "ea") return "EA Trading";
    return "Indicator";
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-9rem)] lg:h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2962FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-9rem)] lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0B0F19] relative">
      
      {/* Mobile Header / Toggle Sidebar */}
      <div className="lg:hidden p-4 border-b border-[#2A3142] flex items-center justify-between bg-[#151B28] z-20">
        <div className="font-bold text-foreground truncate max-w-[70%]">
          {selectedProduct ? selectedProduct.name : "Koleksi Materi"}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="border-[#2A3142] bg-[#1E2433]"
        >
          {isSidebarOpen ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
          Daftar Materi
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute inset-x-0 top-0 bottom-0 lg:hidden z-30 w-full sm:w-80 bg-[#151B28] border-r border-[#2A3142] flex flex-col shadow-2xl flex-shrink-0"
          >
            <div className="p-4 border-b border-[#2A3142] flex-shrink-0 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Koleksi Materi</h2>
                <p className="text-sm text-muted-foreground mt-1">{products.length} materi premium tersedia</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {products.map((product) => {
                const isSelected = selectedProduct?.id === product.id && selectedProduct?.type === product.type;
                const color = getColor(product.type);
                return (
                  <div
                    key={`mob-${product.type}-${product.id}`}
                    onClick={() => { setSelectedProduct(product); setIsSidebarOpen(false); }}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected ? 'bg-[#1E2433] border-[#2A3142] shadow-[inset_4px_0_0_0_#F7C948]' : 'bg-transparent border-transparent hover:bg-[#1E2433]/50 hover:border-[#2A3142]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15`, color }}>
                        {getIcon(product.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>{product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] py-0 px-1.5" style={{ color, borderColor: `${color}30` }}>{getTypeName(product.type)}</Badge>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />{product.created_at ? new Date(product.created_at).toLocaleDateString() : 'Tersedia'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <AnimatePresence initial={false}>
        {isDesktopSidebarOpen && (
          <motion.div
            key="desktop-sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="hidden lg:flex flex-col h-full bg-[#151B28] border-r border-[#2A3142] overflow-hidden flex-shrink-0"
          >
            <div className="p-4 lg:p-6 border-b border-[#2A3142] flex-shrink-0">
              <h2 className="text-xl font-bold text-foreground">Koleksi Materi</h2>
              <p className="text-sm text-muted-foreground mt-1">{products.length} materi premium tersedia</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {products.length > 0 ? (
                products.map((product) => {
                  const isSelected = selectedProduct?.id === product.id && selectedProduct?.type === product.type;
                  const color = getColor(product.type);
                  return (
                    <div
                      key={`${product.type}-${product.id}`}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        isSelected ? 'bg-[#1E2433] border-[#2A3142] shadow-[inset_4px_0_0_0_#F7C948]' : 'bg-transparent border-transparent hover:bg-[#1E2433]/50 hover:border-[#2A3142]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15`, color }}>
                          {getIcon(product.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5" style={{ color, borderColor: `${color}30` }}>{getTypeName(product.type)}</Badge>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />{product.created_at ? new Date(product.created_at).toLocaleDateString() : 'Tersedia'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-8 text-muted-foreground">Belum ada materi.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewer Area */}
      <div className="flex-1 flex flex-col bg-[#0B0F19] relative z-10">
        {selectedProduct ? (
          <div className="flex-1 flex flex-col w-full min-h-0">
            {/* Viewer Header - Desktop */}
            <div className="hidden lg:flex items-center gap-3 p-3 border-b border-[#2A3142] bg-[#151B28]">
              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
                className="p-2 rounded-lg hover:bg-[#2A3142] text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                title={isDesktopSidebarOpen ? "Sembunyikan daftar" : "Tampilkan daftar"}
              >
                {isDesktopSidebarOpen
                  ? <PanelLeftClose className="w-5 h-5" />
                  : <PanelLeftOpen className="w-5 h-5" />}
              </button>
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getColor(selectedProduct.type)}20`, color: getColor(selectedProduct.type) }}
              >
                {getIcon(selectedProduct.type, "w-4 h-4")}
              </div>
              <h1 className="text-base font-bold text-foreground flex-1 truncate">
                {selectedProduct.name}
              </h1>
              {selectedProduct.file_url && (
                <Button asChild size="sm" className="gradient-gold text-[#0B0F19] font-bold flex-shrink-0">
                  <a href={selectedProduct.file_url} target="_blank" rel="noreferrer">
                    {selectedProduct.type === 'ebook' ? (
                      <><BookOpen className="w-4 h-4 mr-2" /> Buka PDF</>
                    ) : (
                      <><Download className="w-4 h-4 mr-2" /> Download</>
                    )}
                  </a>
                </Button>
              )}
            </div>

            {/* Viewer Content */}
            <div className="flex-1 w-full flex flex-col min-h-0">
              {selectedProduct.file_url ? (
                selectedProduct.type === 'ebook' ? (
                  <>
                    {/* Desktop Ebook Viewer (Iframe) */}
                    <div className="hidden lg:flex flex-1 w-full bg-[#151B28]">
                      <iframe
                        src={`${selectedProduct.file_url}#toolbar=0`}
                        className="w-full h-full border-0 bg-white"
                        title={selectedProduct.name}
                      />
                    </div>
                    {/* Mobile Ebook Fallback */}
                    <div className="lg:hidden flex-1 w-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#151B28] to-[#0B0F19] overflow-y-auto">
                      <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-24 h-24 mb-6 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0"
                        style={{ backgroundColor: `${getColor(selectedProduct.type)}20`, color: getColor(selectedProduct.type) }}
                      >
                        {getIcon(selectedProduct.type, "w-12 h-12")}
                      </motion.div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">{selectedProduct.name}</h2>
                      <p className="text-muted-foreground max-w-md mb-8">
                        File Ebook PDF tidak dapat dipreview langsung di browser HP. Silakan buka atau unduh PDF untuk membacanya.
                      </p>
                      <Button asChild size="lg" className="gradient-gold text-[#0B0F19] font-bold shadow-[0_0_20px_rgba(247,201,72,0.3)] hover:scale-105 transition-transform">
                        <a href={selectedProduct.file_url} target="_blank" rel="noreferrer">
                          <BookOpen className="w-5 h-5 mr-2" /> Buka PDF
                        </a>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 w-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#151B28] to-[#0B0F19] overflow-y-auto">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-24 h-24 mb-6 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0"
                      style={{ backgroundColor: `${getColor(selectedProduct.type)}20`, color: getColor(selectedProduct.type) }}
                    >
                      {getIcon(selectedProduct.type, "w-12 h-12")}
                    </motion.div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{selectedProduct.name}</h2>
                    <p className="text-muted-foreground max-w-md mb-8">
                      Materi ini adalah sebuah {getTypeName(selectedProduct.type)}. Karena jenis file ini tidak dapat dipreview langsung di browser, silakan unduh untuk menggunakannya.
                    </p>
                    <Button asChild size="lg" className="gradient-gold text-[#0B0F19] font-bold shadow-[0_0_20px_rgba(247,201,72,0.3)] hover:scale-105 transition-transform">
                      <a href={selectedProduct.file_url} target="_blank" rel="noreferrer">
                        <Download className="w-5 h-5 mr-2" /> Download {getTypeName(selectedProduct.type)}
                      </a>
                    </Button>
                  </div>
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <h2 className="text-xl font-bold text-foreground mb-2">File Belum Tersedia</h2>
                  <p className="text-muted-foreground">Admin belum mengunggah file untuk materi ini.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Library className="w-20 h-20 text-muted-foreground/20 mb-6" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pilih Materi</h2>
            <p className="text-muted-foreground max-w-sm">
              Silakan pilih materi dari daftar di samping untuk melihat atau membaca isinya di sini.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
