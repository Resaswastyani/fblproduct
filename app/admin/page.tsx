"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Download,
  DollarSign,
  Video,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreHorizontal,
  FileDown,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  downloads: number;
  price: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [usersRes, ebooksRes, easRes, indicatorsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/ebooks"),
        fetch("/api/eas"),
        fetch("/api/indicators"),
      ]);

      const usersData = usersRes.ok ? await usersRes.json() : [];
      const ebooks = ebooksRes.ok ? await ebooksRes.json() : [];
      const eas = easRes.ok ? await easRes.json() : [];
      const indicators = indicatorsRes.ok ? await indicatorsRes.json() : [];

      setUsers(Array.isArray(usersData) ? usersData : []);

      // Calculate total downloads
      let downloads = 0;
      const allProducts: Product[] = [];

      ebooks.forEach((e: any) => {
        downloads += e.downloads || 0;
        allProducts.push({
          id: e.id,
          name: e.title,
          downloads: e.downloads || 0,
          price: e.status || "Free",
        });
      });
      eas.forEach((e: any) => {
        downloads += e.downloads || 0;
        allProducts.push({
          id: e.id,
          name: e.name,
          downloads: e.downloads || 0,
          price: e.price || "Free",
        });
      });
      indicators.forEach((i: any) => {
        downloads += i.downloads || 0;
        allProducts.push({
          id: i.id,
          name: i.name,
          downloads: i.downloads || 0,
          price: i.price || "Free",
        });
      });

      setTotalDownloads(downloads);
      setProducts(
        allProducts.sort((a, b) => b.downloads - a.downloads).slice(0, 4),
      );
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;

  const adminStats = [
    {
      label: "Total Users",
      value: String(users.length),
      change: `+${activeUsers} active`,
      trend: "up" as const,
      icon: Users,
      color: "#2962FF",
    },
    {
      label: "Total Downloads",
      value: totalDownloads.toLocaleString(),
      change: "All products",
      trend: "up" as const,
      icon: Download,
      color: "#F7C948",
    },
    {
      label: "Premium Products",
      value: String(products.filter((p) => p.price === "Premium").length),
      change: "Available",
      trend: "up" as const,
      icon: DollarSign,
      color: "#00C853",
    },
    {
      label: "Inactive Users",
      value: String(inactiveUsers),
      change: "Need attention",
      trend: "down" as const,
      icon: Video,
      color: "#EF4444",
    },
  ];

  const recentUsers = users.slice(0, 5);

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview performa platform TradeVault Pro
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-[#2A3142] text-foreground"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button className="bg-[#00C853] hover:bg-[#00C853]/90 text-white">
            <FileDown className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {adminStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: stat.color }}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${
                  stat.trend === "up" ? "text-[#00C853]" : "text-[#EF4444]"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-5 flex items-center justify-between"
        >
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Conversion Rate
            </div>
            <div className="text-xl font-bold text-foreground">
              {users.length > 0
                ? `${((activeUsers / users.length) * 100).toFixed(1)}%`
                : "0%"}
            </div>
          </div>
          <Badge variant="outline" className="border-[#00C853] text-[#00C853]">
            Active rate
          </Badge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-5 flex items-center justify-between"
        >
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Admin Users
            </div>
            <div className="text-xl font-bold text-foreground">
              {users.filter((u) => u.role === "admin").length}
            </div>
          </div>
          <Badge variant="outline" className="border-[#F7C948] text-[#F7C948]">
            Admin count
          </Badge>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Recent Users
              </h2>
              <Link href="/admin/users">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2A3142]">
                    <TableHead className="text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground hidden md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Role
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id} className="border-[#2A3142]">
                      <TableCell className="font-medium text-foreground">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">
                        {user.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "Active"
                              ? "border-[#00C853] text-[#00C853]"
                              : "border-[#EF4444] text-[#EF4444]"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === "admin"
                              ? "bg-[#F7C948] text-[#0B0F19]"
                              : "bg-[#1E2433] text-muted-foreground"
                          }
                        >
                          {user.role === "admin" ? "Admin" : "Member"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-[#151B28] border-[#2A3142]"
                          >
                            <DropdownMenuItem className="text-foreground hover:bg-[#1E2433]">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Top Products
            </h2>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2433]/50"
                >
                  <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-[#0B0F19] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.downloads} downloads
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#00C853]">
                    {product.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
