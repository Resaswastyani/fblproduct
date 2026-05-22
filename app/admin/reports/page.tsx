"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthlyData {
  month: string;
  revenue: number;
  users: number;
}

interface TopProduct {
  name: string;
  downloads: number;
  revenue: number;
}

interface Report {
  id: number;
  name: string;
  type: string;
  date: string;
  status: string;
  size: string;
}

export default function AdminReportsPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(45678000);
  const [pageViews, setPageViews] = useState(156789);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
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

      let downloads = 0;
      const allProducts: any[] = [];

      ebooks.forEach((e: any) => {
        downloads += e.downloads || 0;
        allProducts.push({
          name: e.title,
          downloads: e.downloads || 0,
          revenue: (e.downloads || 0) * 2500,
        });
      });
      eas.forEach((e: any) => {
        downloads += e.downloads || 0;
        allProducts.push({
          name: e.name,
          downloads: e.downloads || 0,
          revenue: (e.downloads || 0) * 5000,
        });
      });
      indicators.forEach((i: any) => {
        downloads += i.downloads || 0;
        allProducts.push({
          name: i.name,
          downloads: i.downloads || 0,
          revenue: (i.downloads || 0) * 3500,
        });
      });

      setTotalDownloads(downloads);
      setProducts(allProducts);
      setTopProducts(
        allProducts.sort((a, b) => b.revenue - a.revenue).slice(0, 5),
      );

      // Generate monthly data based on user count
      const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const baseUsers = Math.max(usersData.length, 5);
      setMonthlyData(
        months.map((month, i) => ({
          month,
          revenue: 28000000 + i * 3500000 + Math.random() * 5000000,
          users: Math.floor(baseUsers * (0.7 + i * 0.1)),
        })),
      );

      setReports([
        {
          id: 1,
          name: "Monthly Revenue Report",
          type: "revenue",
          date: "January 2024",
          status: "ready",
          size: "2.4 MB",
        },
        {
          id: 2,
          name: "User Growth Report",
          type: "users",
          date: "January 2024",
          status: "ready",
          size: "1.8 MB",
        },
        {
          id: 3,
          name: "Downloads Analytics",
          type: "downloads",
          date: "January 2024",
          status: "ready",
          size: "3.2 MB",
        },
        {
          id: 4,
          name: "Traffic Sources Report",
          type: "traffic",
          date: "January 2024",
          status: "processing",
          size: "-",
        },
        {
          id: 5,
          name: "Membership Conversion",
          type: "conversion",
          date: "December 2023",
          status: "ready",
          size: "1.5 MB",
        },
      ]);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Revenue",
      value: `Rp ${(totalRevenue / 1000000).toFixed(1)}M`,
      change: "+18.2%",
      trend: "up" as const,
      icon: DollarSign,
      color: "#10B981",
    },
    {
      label: "New Users",
      value: String(users.length),
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      color: "#2962FF",
    },
    {
      label: "Total Downloads",
      value: totalDownloads.toLocaleString(),
      change: "+23.1%",
      trend: "up" as const,
      icon: ShoppingCart,
      color: "#F7C948",
    },
    {
      label: "Page Views",
      value: pageViews.toLocaleString(),
      change: "-2.3%",
      trend: "down" as const,
      icon: Eye,
      color: "#EF4444",
    },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue), 1);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="p-8 text-center text-muted-foreground">
          Loading reports...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">
            View and download platform reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="jan2024">
            <SelectTrigger className="w-[160px] bg-[#1E2433] border-[#2A3142]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E2433] border-[#2A3142]">
              <SelectItem value="jan2024">January 2024</SelectItem>
              <SelectItem value="dec2023">December 2023</SelectItem>
              <SelectItem value="nov2023">November 2023</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Revenue Trend</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
              <span className="text-sm text-[#10B981]">+18.2%</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyData.map((data) => (
              <div
                key={data.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex items-end justify-center h-40">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(data.revenue / maxRevenue) * 100}%`,
                    }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#2962FF] to-[#00BCD4] rounded-t"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-6">
            Top Products by Revenue
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="text-sm text-muted-foreground w-6">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{product.downloads.toLocaleString()} downloads</span>
                    <span>-</span>
                    <span>Rp {(product.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                <div className="w-24 bg-[#1E2433] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(product.revenue / topProducts[0].revenue) * 100}%`,
                    }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="h-2 rounded-full bg-[#F7C948]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#2A3142] flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Available Reports</h3>
          <Button variant="outline" size="sm" className="border-[#2A3142]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A3142]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Report Name
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Type
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Period
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#2A3142] hover:bg-[#1E2433]/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1E2433] flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {report.name}
                        </p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {report.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-md bg-[#1E2433] text-xs text-foreground capitalize">
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">
                    {report.date}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.status === "ready"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#F7C948]/10 text-[#F7C948]"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={report.status !== "ready"}
                      className="text-[#2962FF] hover:text-[#2962FF] hover:bg-[#2962FF]/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {report.size !== "-" ? report.size : "..."}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
