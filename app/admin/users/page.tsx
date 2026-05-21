"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Download,
  Filter,
  Mail,
  Calendar,
  Shield,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  id: number;
  name: string;
  email: string;
  date: string;
  status: string;
  plan: string;
  downloads: number;
  products?: any[];
}

interface Product {
  id: number;
  name?: string;
  title?: string;
  type: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    plan: "Free",
    downloads: 0,
  });
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [eas, setEas] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { type: string; id: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const [ebooksRes, easRes, indicatorsRes] = await Promise.all([
        fetch("/api/ebooks"),
        fetch("/api/eas"),
        fetch("/api/indicators"),
      ]);
      setEbooks(await ebooksRes.json());
      setEas(await easRes.json());
      setIndicators(await indicatorsRes.json());
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAddDialogOpen(false);
        setFormData({
          name: "",
          email: "",
          status: "Active",
          plan: "Free",
          downloads: 0,
        });
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const openProductDialog = async (user: User) => {
    setSelectedUser(user);
    setIsProductDialogOpen(true);

    // Fetch current user products
    try {
      const res = await fetch(`/api/users/${user.id}/products`);
      const data = await res.json();
      const currentProducts: { type: string; id: number }[] = [];

      data.ebooks?.forEach((e: any) =>
        currentProducts.push({ type: "ebook", id: e.id }),
      );
      data.eas?.forEach((e: any) =>
        currentProducts.push({ type: "ea", id: e.id }),
      );
      data.indicators?.forEach((i: any) =>
        currentProducts.push({ type: "indicator", id: i.id }),
      );

      setSelectedProducts(currentProducts);
    } catch (error) {
      console.error("Failed to fetch user products:", error);
    }
  };

  const handleAssignProducts = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/users/${selectedUser.id}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: selectedProducts }),
      });
      if (res.ok) {
        setIsProductDialogOpen(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to assign products:", error);
    }
  };

  const toggleProduct = (type: string, id: number) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.type === type && p.id === id);
      if (exists) {
        return prev.filter((p) => !(p.type === type && p.id === id));
      }
      return [...prev, { type, id }];
    });
  };

  const isProductSelected = (type: string, id: number) => {
    return selectedProducts.some((p) => p.type === type && p.id === id);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status?.toLowerCase() === statusFilter;
    const matchesPlan =
      planFilter === "all" || user.plan?.toLowerCase() === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Loading...</div>
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
            User Management
          </h1>
          <p className="text-muted-foreground">
            Kelola semua user yang terdaftar
          </p>
        </div>
        <Button
          className="bg-[#2962FF] hover:bg-[#2962FF]/90 text-white"
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              status: "Active",
              plan: "Free",
              downloads: 0,
            });
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
      >
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-foreground">
            {users.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Users</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-[#00C853]">
            {users.filter((u) => u.status === "Active").length}
          </div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-[#F7C948]">
            {users.filter((u) => u.plan === "Premium").length}
          </div>
          <div className="text-sm text-muted-foreground">Premium Users</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-[#EF4444]">
            {users.filter((u) => u.status === "Inactive").length}
          </div>
          <div className="text-sm text-muted-foreground">Inactive Users</div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-4 mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-11"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px] bg-[#1E2433] border-[#2A3142] text-foreground h-11">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#151B28] border-[#2A3142]">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full sm:w-[150px] bg-[#1E2433] border-[#2A3142] text-foreground h-11">
              <Shield className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent className="bg-[#151B28] border-[#2A3142]">
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-4 sm:p-6"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2A3142]">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">
                  Join Date
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Plan</TableHead>
                <TableHead className="text-muted-foreground hidden sm:table-cell">
                  Downloads
                </TableHead>
                <TableHead className="text-muted-foreground hidden sm:table-cell">
                  Products
                </TableHead>
                <TableHead className="text-muted-foreground w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-[#2A3142]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-[#0B0F19] font-bold text-xs">
                        {user.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="font-medium text-foreground">
                        {user.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {user.date}
                    </div>
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
                        user.plan === "Premium"
                          ? "bg-[#F7C948] text-[#0B0F19]"
                          : "bg-[#1E2433] text-muted-foreground"
                      }
                    >
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="w-3 h-3" />
                      {user.downloads}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex gap-1">
                      {user.products && user.products.length > 0 ? (
                        <Badge variant="outline" className="text-xs">
                          {user.products.length} items
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          None
                        </span>
                      )}
                    </div>
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
                        <DropdownMenuItem
                          className="text-foreground hover:bg-[#1E2433]"
                          onClick={() => openProductDialog(user)}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Assign Products
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-foreground hover:bg-[#1E2433]">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-foreground hover:bg-[#1E2433]"
                          onClick={() => {
                            setSelectedUser(user);
                            setFormData({
                              name: user.name,
                              email: user.email,
                              status: user.status,
                              plan: user.plan,
                              downloads: user.downloads,
                            });
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-[#EF4444] hover:bg-[#EF4444]/10"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Plan</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(v) => setFormData({ ...formData, plan: v })}
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
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-[#2A3142]"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#2962FF] hover:bg-[#2962FF]/90"
                onClick={handleAdd}
              >
                Save User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-[#1E2433] border-[#2A3142]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Plan</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(v) => setFormData({ ...formData, plan: v })}
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
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-[#2A3142]"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#2962FF] hover:bg-[#2962FF]/90"
                onClick={handleEdit}
              >
                Update User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Products Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Products to {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* Ebooks */}
            <div>
              <h3 className="text-sm font-semibold text-[#EF4444] mb-3 flex items-center gap-2">
                <Download className="w-4 h-4" /> Ebooks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ebooks.map((ebook) => (
                  <div
                    key={`ebook-${ebook.id}`}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isProductSelected("ebook", ebook.id)
                        ? "border-[#2962FF] bg-[#2962FF]/10"
                        : "border-[#2A3142] hover:bg-[#1E2433]"
                    }`}
                    onClick={() => toggleProduct("ebook", ebook.id)}
                  >
                    <Checkbox checked={isProductSelected("ebook", ebook.id)} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {ebook.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ebook.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EAs */}
            <div>
              <h3 className="text-sm font-semibold text-[#F7C948] mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Expert Advisors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {eas.map((ea) => (
                  <div
                    key={`ea-${ea.id}`}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isProductSelected("ea", ea.id)
                        ? "border-[#2962FF] bg-[#2962FF]/10"
                        : "border-[#2A3142] hover:bg-[#1E2433]"
                    }`}
                    onClick={() => toggleProduct("ea", ea.id)}
                  >
                    <Checkbox checked={isProductSelected("ea", ea.id)} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {ea.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ea.platform} | {ea.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div>
              <h3 className="text-sm font-semibold text-[#00C853] mb-3 flex items-center gap-2">
                <Pencil className="w-4 h-4" /> Indicators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {indicators.map((indicator) => (
                  <div
                    key={`indicator-${indicator.id}`}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isProductSelected("indicator", indicator.id)
                        ? "border-[#2962FF] bg-[#2962FF]/10"
                        : "border-[#2A3142] hover:bg-[#1E2433]"
                    }`}
                    onClick={() => toggleProduct("indicator", indicator.id)}
                  >
                    <Checkbox
                      checked={isProductSelected("indicator", indicator.id)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {indicator.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {indicator.platform} | {indicator.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-[#2A3142]">
              <Button
                variant="outline"
                className="flex-1 border-[#2A3142]"
                onClick={() => setIsProductDialogOpen(false)}
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button
                className="flex-1 bg-[#2962FF] hover:bg-[#2962FF]/90"
                onClick={handleAssignProducts}
              >
                <Check className="w-4 h-4 mr-2" /> Save Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
