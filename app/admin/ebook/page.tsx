"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  X,
  ExternalLink,
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

interface Ebook {
  id: number;
  title: string;
  category: string;
  pages: number;
  downloads: number;
  status: string;
  file_url?: string;
  created_at: string;
}

export default function AdminEbookPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    pages: 0,
    downloads: 0,
    status: "draft",
    description: "",
    file_url: "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      const res = await fetch("/api/ebooks");
      const data = await res.json();
      setEbooks(
        Array.isArray(data)
          ? data.map((e: any) => ({
              ...e,
              created_at: e.created_at?.split("T")[0] || e.created_at,
            }))
          : [],
      );
    } catch (error) {
      console.error("Failed to fetch ebooks:", error);
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
      const res = await fetch("/api/ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAddDialogOpen(false);
        setFormData({
          title: "",
          category: "",
          pages: 0,
          downloads: 0,
          status: "draft",
          description: "",
          file_url: "",
        });
        fetchEbooks();
      }
    } catch (error) {
      console.error("Failed to add ebook:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedEbook) return;
    try {
      const res = await fetch(`/api/ebooks/${selectedEbook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsEditDialogOpen(false);
        setSelectedEbook(null);
        fetchEbooks();
      } else {
        const error = await res.json();
        console.error("Edit failed:", error);
        alert("Failed to update: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to edit ebook:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/ebooks/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEbooks();
      } else {
        const error = await res.json();
        console.error("Delete failed:", error);
        alert("Failed to delete: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to delete ebook:", error);
    }
  };

  const handleView = (ebook: Ebook) => {
    setSelectedEbook(ebook);
    setIsViewDialogOpen(true);
  };

  const handleDownload = (ebook: Ebook) => {
    if (!ebook.file_url) {
      alert("No PDF file available for this ebook");
      return;
    }

    fetch(`/api/ebooks/${ebook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ downloads: ebook.downloads + 1 }),
    })
      .then(() => fetchEbooks())
      .catch(console.error);

    const link = document.createElement("a");
    link.href = ebook.file_url;
    link.download = `${ebook.title.replace(/[^a-z0-9]/gi, "_")}.pdf`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEbooks = ebooks.filter((ebook) =>
    ebook.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <h1 className="text-2xl font-bold text-foreground">PDF Ebook</h1>
          <p className="text-muted-foreground">
            Manage your trading ebooks and guides
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Ebook
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Ebook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter ebook title"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData({ ...formData, category: v })
                  }
                >
                  <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Risk">Risk Management</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="Basics">Basics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pages</Label>
                <Input
                  type="number"
                  value={formData.pages}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pages: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  className="bg-[#1E2433] border-[#2A3142]"
                  rows={3}
                />
              </div>
              {/* Upload File */}
              <div className="space-y-2">
                <Label>Upload PDF</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
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
                      <FileText className="w-5 h-5 text-[#10B981]" />
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
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF (max 50MB)
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
                  Save Ebook
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
            placeholder="Search ebooks..."
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

      {/* Ebooks Table */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A3142]">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Title
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Pages
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Downloads
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEbooks.map((ebook, index) => (
                <motion.tr
                  key={ebook.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[#2A3142] hover:bg-[#1E2433]/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#EF4444]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {ebook.title}
                        </p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {ebook.category}
                        </p>
                        {ebook.file_url && (
                          <p className="text-xs text-[#10B981]">PDF ready</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="px-2 py-1 rounded-md bg-[#1E2433] text-xs text-foreground">
                      {ebook.category}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">
                    {ebook.pages}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="w-4 h-4" />
                      {ebook.downloads.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        ebook.status === "published"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#F7C948]/10 text-[#F7C948]"
                      }`}
                    >
                      {ebook.status}
                    </span>
                  </td>
                  <td className="p-4">
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
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleView(ebook)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        {ebook.file_url && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleDownload(ebook)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedEbook(ebook);
                            setFormData({
                              title: ebook.title,
                              category: ebook.category,
                              pages: ebook.pages,
                              downloads: ebook.downloads,
                              status: ebook.status,
                              description: "",
                              file_url: ebook.file_url || "",
                            });
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-[#EF4444]"
                          onClick={() => handleDelete(ebook.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Ebook</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                  <SelectItem value="Strategy">Strategy</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Risk">Risk Management</SelectItem>
                  <SelectItem value="Psychology">Psychology</SelectItem>
                  <SelectItem value="Basics">Basics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pages</Label>
                <Input
                  type="number"
                  value={formData.pages}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pages: parseInt(e.target.value) || 0,
                    })
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
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Upload File in Edit */}
            <div className="space-y-2">
              <Label>Upload PDF</Label>
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf"
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
                    <FileText className="w-5 h-5 text-[#10B981]" />
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
                    Click to upload PDF
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

      {/* View Dialog - Tanpa iframe, hanya info + link buttons */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>Ebook Details</DialogTitle>
          </DialogHeader>
          {selectedEbook && (
            <div className="space-y-5 pt-4">
              {/* Header Card */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#EF4444]/10 flex items-center justify-center shrink-0">
                  <FileText className="w-8 h-8 text-[#EF4444]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {selectedEbook.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedEbook.category}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1E2433] rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Pages</p>
                  <p className="text-lg font-semibold">{selectedEbook.pages}</p>
                </div>
                <div className="bg-[#1E2433] rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Downloads</p>
                  <p className="text-lg font-semibold">
                    {selectedEbook.downloads.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#1E2433] rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <span
                    className={`text-sm font-medium ${
                      selectedEbook.status === "published"
                        ? "text-[#10B981]"
                        : "text-[#F7C948]"
                    }`}
                  >
                    {selectedEbook.status}
                  </span>
                </div>
                <div className="bg-[#1E2433] rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">
                    {selectedEbook.created_at}
                  </p>
                </div>
              </div>

              {/* PDF Actions */}
              {selectedEbook.file_url ? (
                <div className="space-y-3">
                  <div className="bg-[#1E2433] rounded-lg p-3 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#10B981] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {selectedEbook.title}.pdf
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF file available
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* Open PDF - native anchor, tidak ke-blok */}
                    <a
                      href={selectedEbook.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-[#2A3142] hover:bg-[#1E2433]"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open PDF
                      </Button>
                    </a>

                    {/* Download PDF */}
                    <Button
                      className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]"
                      onClick={() => handleDownload(selectedEbook)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#1E2433]/50 rounded-lg p-6 text-center">
                  <FileText className="w-10 h-10 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No PDF file uploaded
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Ebooks</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {ebooks.length}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Downloads</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {ebooks.reduce((acc, e) => acc + e.downloads, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="text-2xl font-bold text-[#10B981] mt-1">
            {ebooks.filter((e) => e.status === "published").length}
          </p>
        </div>
        <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Draft</p>
          <p className="text-2xl font-bold text-[#F7C948] mt-1">
            {ebooks.filter((e) => e.status === "draft").length}
          </p>
        </div>
      </div>
    </div>
  );
}
