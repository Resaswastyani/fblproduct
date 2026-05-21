"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Play,
  Pause,
  Settings,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const expertAdvisors = [
  {
    id: 1,
    name: "Gold Scalper Pro",
    platform: "MT4",
    version: "3.2.1",
    downloads: 2456,
    status: "active",
    winRate: 78.5,
    pairs: ["XAUUSD"],
    price: "Premium",
  },
  {
    id: 2,
    name: "Trend Master EA",
    platform: "MT5",
    version: "2.1.0",
    downloads: 1891,
    status: "active",
    winRate: 72.3,
    pairs: ["EURUSD", "GBPUSD"],
    price: "Premium",
  },
  {
    id: 3,
    name: "Grid Trading Bot",
    platform: "MT4/MT5",
    version: "1.5.2",
    downloads: 3123,
    status: "maintenance",
    winRate: 65.8,
    pairs: ["Multi-pair"],
    price: "Free",
  },
  {
    id: 4,
    name: "News Trader EA",
    platform: "MT4",
    version: "4.0.0",
    downloads: 1567,
    status: "active",
    winRate: 81.2,
    pairs: ["EURUSD", "USDJPY"],
    price: "Premium",
  },
  {
    id: 5,
    name: "Martingale Safe",
    platform: "MT5",
    version: "2.8.1",
    downloads: 987,
    status: "beta",
    winRate: 68.9,
    pairs: ["GBPJPY"],
    price: "Premium",
  },
];

export default function AdminEAPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEAs = expertAdvisors.filter((ea) =>
    ea.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#10B981]/10 text-[#10B981]";
      case "maintenance":
        return "bg-[#F7C948]/10 text-[#F7C948]";
      case "beta":
        return "bg-[#2962FF]/10 text-[#2962FF]";
      default:
        return "bg-[#6B7280]/10 text-[#6B7280]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">EA Trading</h1>
          <p className="text-muted-foreground">
            Manage Expert Advisors and trading bots
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add EA
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Expert Advisor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>EA Name</Label>
                <Input
                  placeholder="Enter EA name"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select>
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                      <SelectItem value="mt4">MT4</SelectItem>
                      <SelectItem value="mt5">MT5</SelectItem>
                      <SelectItem value="both">MT4/MT5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Input
                    placeholder="e.g., 1.0.0"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Trading Pairs</Label>
                <Input
                  placeholder="e.g., XAUUSD, EURUSD"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the EA strategy"
                  className="bg-[#1E2433] border-[#2A3142]"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload EA Files</Label>
                <div className="border-2 border-dashed border-[#2A3142] rounded-lg p-6 text-center hover:border-[#EF4444] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload EA files
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    .ex4, .ex5
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-[#2A3142]"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]">
                  Save EA
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search EAs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1E2433] border-[#2A3142]"
          />
        </div>
        <Button variant="outline" className="border-[#2A3142]">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* EA Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEAs.map((ea, index) => (
          <motion.div
            key={ea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5 hover:border-[#3A4152] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#F97316] flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{ea.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ea.platform} | v{ea.version}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#1E2433] border-[#2A3142]"
                >
                  <DropdownMenuItem className="cursor-pointer">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-[#EF4444]">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-2 py-1 rounded-md text-xs ${getStatusColor(ea.status)}`}
              >
                {ea.status}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs ${
                  ea.price === "Premium"
                    ? "bg-[#F7C948]/10 text-[#F7C948]"
                    : "bg-[#10B981]/10 text-[#10B981]"
                }`}
              >
                {ea.price}
              </span>
              {ea.pairs.map((pair) => (
                <span
                  key={pair}
                  className="px-2 py-1 rounded-md bg-[#1E2433] text-xs text-foreground"
                >
                  {pair}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2A3142]">
              <div>
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span className="font-semibold text-[#10B981]">
                    {ea.winRate}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Downloads</p>
                <div className="flex items-center gap-1 mt-1">
                  <Download className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    {ea.downloads.toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <div className="flex items-center gap-1 mt-1">
                  {ea.status === "active" ? (
                    <Play className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <Pause className="w-4 h-4 text-[#F7C948]" />
                  )}
                  <span className="font-semibold text-foreground capitalize">
                    {ea.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total EAs</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {expertAdvisors.length}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Downloads</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {expertAdvisors
              .reduce((acc, ea) => acc + ea.downloads, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Avg Win Rate</p>
          <p className="text-2xl font-bold text-[#10B981] mt-1">
            {(
              expertAdvisors.reduce((acc, ea) => acc + ea.winRate, 0) /
              expertAdvisors.length
            ).toFixed(1)}
            %
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Active EAs</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {expertAdvisors.filter((ea) => ea.status === "active").length}
          </p>
        </div>
      </div>
    </div>
  );
}
