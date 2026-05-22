"use client";

import { useState, useEffect, useRef } from "react";
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
  X,
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

interface EA {
  id: number;
  name: string;
  platform: string;
  version: string;
  downloads: number;
  status: string;
  win_rate: number;
  pairs: string[];
  price: string;
  file_url?: string;
}

export default function AdminEAPage() {
  const [expertAdvisors, setExpertAdvisors] = useState<EA[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEA, setSelectedEA] = useState<EA | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    platform: "MT4",
    version: "",
    downloads: 0,
    status: "active",
    win_rate: 0,
    pairs: "",
    price: "Free",
    file_url: "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchEAs();
  }, []);

  const fetchEAs = async () => {
    try {
      const res = await fetch("/api/eas");
      const data = await res.json();
      setExpertAdvisors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch EAs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, file_url: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const payload = {
        ...formData,
        pairs: formData.pairs
          .split(",")
          .map((p: string) => p.trim())
          .filter(Boolean),
      };
      const res = await fetch("/api/eas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsAddDialogOpen(false);
        setFormData({
          name: "",
          platform: "MT4",
          version: "",
          downloads: 0,
          status: "active",
          win_rate: 0,
          pairs: "",
          price: "Free",
          file_url: "",
        });
        fetchEAs();
      }
    } catch (error) {
      console.error("Failed to add EA:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedEA) return;
    try {
      const payload = {
        ...formData,
        pairs: formData.pairs
          .split(",")
          .map((p: string) => p.trim())
          .filter(Boolean),
      };
      const res = await fetch(`/api/eas/${selectedEA.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsEditDialogOpen(false);
        setSelectedEA(null);
        fetchEAs();
      }
    } catch (error) {
      console.error("Failed to edit EA:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/eas/${id}`, { method: "DELETE" });
      if (res.ok) fetchEAs();
    } catch (error) {
      console.error("Failed to delete EA:", error);
    }
  };

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

  const filteredEAs = expertAdvisors.filter((ea) =>
    ea.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter EA name"
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
              </div>
              <div className="space-y-2">
                <Label>Trading Pairs</Label>
                <Input
                  value={formData.pairs}
                  onChange={(e) =>
                    setFormData({ ...formData, pairs: e.target.value })
                  }
                  placeholder="e.g., XAUUSD, EURUSD"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Win Rate (%)</Label>
                  <Input
                    type="number"
                    value={formData.win_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        win_rate: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Select
                    value={formData.price}
                    onValueChange={(v) =>
                      setFormData({ ...formData, price: v })
                    }
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
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the EA strategy"
                  className="bg-[#1E2433] border-[#2A3142]"
                  rows={3}
                />
              </div>
              {/* Upload File */}
              <div className="space-y-2">
                <Label>Upload EA Files</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".ex4,.ex5,.mq4,.mq5"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <div
                  className="border-2 border-dashed border-[#2A3142] rounded-lg p-6 text-center hover:border-[#EF4444] transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.file_url ? (
                    <div className="flex items-center justify-center gap-2">
                      <Bot className="w-5 h-5 text-[#10B981]" />
                      <span className="text-sm text-[#10B981]">
                        File uploaded
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({ ...formData, file_url: "" });
                        }}
                        className="ml-2"
                      >
                        <X className="w-4 h-4 text-[#EF4444]" />
                      </button>
                    </div>
                  ) : uploading ? (
                    <span className="text-sm text-muted-foreground">
                      Uploading...
                    </span>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload EA files
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        .ex4, .ex5
                      </p>
                    </>
                  )}
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
                  {ea.file_url && (
                    <p className="text-xs text-[#10B981]">File ready</p>
                  )}
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
                  {ea.file_url && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Download className="w-4 h-4 mr-2" />
                      Download File
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedEA(ea);
                      setFormData({
                        name: ea.name,
                        platform: ea.platform,
                        version: ea.version,
                        downloads: ea.downloads,
                        status: ea.status,
                        win_rate: ea.win_rate,
                        pairs: Array.isArray(ea.pairs)
                          ? ea.pairs.join(", ")
                          : ea.pairs,
                        price: ea.price,
                        file_url: ea.file_url || "",
                      });
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-[#EF4444]"
                    onClick={() => handleDelete(ea.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-2 py-1 rounded-md text-xs ${getStatusColor(
                  ea.status,
                )}`}
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
              {Array.isArray(ea.pairs) &&
                ea.pairs.map((pair: string) => (
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
                    {ea.win_rate}%
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Expert Advisor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>EA Name</Label>
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
                <Label>Version</Label>
                <Input
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Trading Pairs</Label>
              <Input
                value={formData.pairs}
                onChange={(e) =>
                  setFormData({ ...formData, pairs: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Win Rate (%)</Label>
                <Input
                  type="number"
                  value={formData.win_rate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      win_rate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
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
            {/* Upload File in Edit */}
            <div className="space-y-2">
              <Label>Upload EA Files</Label>
              <input
                type="file"
                ref={fileInputRef}
                accept=".ex4,.ex5,.mq4,.mq5"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div
                className="border-2 border-dashed border-[#2A3142] rounded-lg p-4 text-center hover:border-[#EF4444] transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.file_url ? (
                  <div className="flex items-center justify-center gap-2">
                    <Bot className="w-5 h-5 text-[#10B981]" />
                    <span className="text-sm text-[#10B981]">
                      File uploaded
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, file_url: "" });
                      }}
                      className="ml-2"
                    >
                      <X className="w-4 h-4 text-[#EF4444]" />
                    </button>
                  </div>
                ) : uploading ? (
                  <span className="text-sm text-muted-foreground">
                    Uploading...
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Click to upload EA files
                  </span>
                )}
              </div>
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
              expertAdvisors.reduce((acc, ea) => acc + (ea.win_rate || 0), 0) /
              (expertAdvisors.length || 1)
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
