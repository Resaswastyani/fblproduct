"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Code,
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

interface Indicator {
  id: number;
  name: string;
  platform: string;
  version: string;
  downloads: number;
  status: string;
  price: string;
  updated_at: string;
}

export default function AdminIndicatorPage() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    platform: "MT4",
    version: "",
    downloads: 0,
    status: "active",
    price: "Free",
    updated_at: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndicators();
  }, []);

  const fetchIndicators = async () => {
    try {
      const res = await fetch("/api/indicators");
      const data = await res.json();
      setIndicators(
        data.map((i: any) => ({
          ...i,
          updatedAt: i.updated_at || i.updatedAt,
        })),
      );
    } catch (error) {
      console.error("Failed to fetch indicators:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/indicators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAddDialogOpen(false);
        setFormData({
          name: "",
          platform: "MT4",
          version: "",
          downloads: 0,
          status: "active",
          price: "Free",
          updated_at: "",
        });
        fetchIndicators();
      }
    } catch (error) {
      console.error("Failed to add indicator:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedIndicator) return;
    try {
      const res = await fetch(`/api/indicators/${selectedIndicator.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsEditDialogOpen(false);
        setSelectedIndicator(null);
        fetchIndicators();
      }
    } catch (error) {
      console.error("Failed to edit indicator:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/indicators/${id}`, { method: "DELETE" });
      if (res.ok) fetchIndicators();
    } catch (error) {
      console.error("Failed to delete indicator:", error);
    }
  };

  const filteredIndicators = indicators.filter((indicator) =>
    indicator.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">Loading...</div>
    );

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Indicators</h1>
          <p className="text-muted-foreground">
            Manage trading indicators for MT4/MT5
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Indicator
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Indicator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Indicator Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter indicator name"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(v) =>
                      setFormData({ ...formData, platform: v })
                    }
                  >
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                      <SelectItem value="MT4">MT4</SelectItem>
                      <SelectItem value="MT5">MT5</SelectItem>
                      <SelectItem value="MT4/MT5">MT4/MT5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price Type</Label>
                  <Select
                    value={formData.price}
                    onValueChange={(v) =>
                      setFormData({ ...formData, price: v })
                    }
                  >
                    <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  placeholder="e.g., 1.0.0"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter description"
                  className="bg-[#1E2433] border-[#2A3142]"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Files (.ex4/.ex5)</Label>
                <div className="border-2 border-dashed border-[#2A3142] rounded-lg p-6 text-center hover:border-[#EF4444] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload indicator files
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    .ex4, .ex5, .mq4, .mq5
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
                <Button
                  className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]"
                  onClick={handleAdd}
                >
                  Save Indicator
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
            placeholder="Search indicators..."
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

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIndicators.map((indicator, index) => (
          <motion.div
            key={indicator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5 hover:border-[#3A4152] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2962FF] to-[#00BCD4] flex items-center justify-center">
                <LineChart className="w-6 h-6 text-white" />
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
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedIndicator(indicator);
                      setFormData({
                        name: indicator.name,
                        platform: indicator.platform,
                        version: indicator.version,
                        downloads: indicator.downloads,
                        status: indicator.status,
                        price: indicator.price,
                        updated_at: indicator.updated_at || "",
                      });
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Code className="w-4 h-4 mr-2" />
                    View Source
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-[#EF4444]"
                    onClick={() => handleDelete(indicator.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="font-semibold text-foreground mb-1">
              {indicator.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Version {indicator.version}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 rounded-md bg-[#1E2433] text-xs text-foreground">
                {indicator.platform}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs ${
                  indicator.price === "Premium"
                    ? "bg-[#F7C948]/10 text-[#F7C948]"
                    : "bg-[#10B981]/10 text-[#10B981]"
                }`}
              >
                {indicator.price}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs ${
                  indicator.status === "active"
                    ? "bg-[#10B981]/10 text-[#10B981]"
                    : "bg-[#2962FF]/10 text-[#2962FF]"
                }`}
              >
                {indicator.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#2A3142]">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Download className="w-4 h-4" />
                <span className="text-sm">
                  {indicator.downloads.toLocaleString()}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Updated {indicator.updated_at || indicator.updatedAt}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Indicator</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Indicator Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(v) =>
                    setFormData({ ...formData, platform: v })
                  }
                >
                  <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                    <SelectItem value="MT4">MT4</SelectItem>
                    <SelectItem value="MT5">MT5</SelectItem>
                    <SelectItem value="MT4/MT5">MT4/MT5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price Type</Label>
                <Select
                  value={formData.price}
                  onValueChange={(v) => setFormData({ ...formData, price: v })}
                >
                  <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Version</Label>
              <Input
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-[#2A3142]"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]"
                onClick={handleEdit}
              >
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Indicators</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {indicators.length}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Downloads</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {indicators
              .reduce((acc, i) => acc + i.downloads, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Premium</p>
          <p className="text-2xl font-bold text-[#F7C948] mt-1">
            {indicators.filter((i) => i.price === "Premium").length}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Free</p>
          <p className="text-2xl font-bold text-[#10B981] mt-1">
            {indicators.filter((i) => i.price === "Free").length}
          </p>
        </div>
      </div>
    </div>
  );
}
