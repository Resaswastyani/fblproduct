// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   Search,
//   Plus,
//   MoreHorizontal,
//   Eye,
//   Pencil,
//   Trash2,
//   Download,
//   Filter,
//   Mail,
//   Calendar,
//   Shield,
//   Check,
//   X,
//   FileText,
//   Bot,
//   LineChart,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   date: string;
//   status: string;
//   products?: any[];
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     status: "Active",
//   });
//   const [ebooks, setEbooks] = useState<any[]>([]);
//   const [eas, setEas] = useState<any[]>([]);
//   const [indicators, setIndicators] = useState<any[]>([]);
//   const [selectedProducts, setSelectedProducts] = useState<
//     { type: string; id: number }[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchUsers();
//     fetchProducts();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("/api/users");
//       if (!res.ok) throw new Error("Failed to fetch users");
//       const data = await res.json();
//       setUsers(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//       setError("Failed to load users. Check database connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const [ebooksRes, easRes, indicatorsRes] = await Promise.all([
//         fetch("/api/ebooks"),
//         fetch("/api/eas"),
//         fetch("/api/indicators"),
//       ]);
//       if (ebooksRes.ok) {
//         const data = await ebooksRes.json();
//         setEbooks(Array.isArray(data) ? data : []);
//       }
//       if (easRes.ok) {
//         const data = await easRes.json();
//         setEas(Array.isArray(data) ? data : []);
//       }
//       if (indicatorsRes.ok) {
//         const data = await indicatorsRes.json();
//         setIndicators(Array.isArray(data) ? data : []);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       const res = await fetch("/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, products: selectedProducts }),
//       });
//       if (res.ok) {
//         setIsAddDialogOpen(false);
//         setFormData({ name: "", email: "", status: "Active" });
//         setSelectedProducts([]);
//         fetchUsers();
//       }
//     } catch (error) {
//       console.error("Failed to add user:", error);
//     }
//   };

//   const handleEdit = async () => {
//     if (!selectedUser) return;
//     try {
//       const res = await fetch(`/api/users/${selectedUser.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, products: selectedProducts }),
//       });
//       if (res.ok) {
//         setIsEditDialogOpen(false);
//         setSelectedUser(null);
//         setSelectedProducts([]);
//         fetchUsers();
//       }
//     } catch (error) {
//       console.error("Failed to edit user:", error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
//       if (res.ok) fetchUsers();
//     } catch (error) {
//       console.error("Failed to delete user:", error);
//     }
//   };

//   const openProductDialog = async (user: User, isEdit: boolean = false) => {
//     setSelectedUser(user);
//     setIsProductDialogOpen(true);
//     try {
//       const res = await fetch(`/api/users/${user.id}/products`);
//       const data = await res.json();
//       const currentProducts: { type: string; id: number }[] = [];
//       data.ebooks?.forEach((e: any) =>
//         currentProducts.push({ type: "ebook", id: e.id }),
//       );
//       data.eas?.forEach((e: any) =>
//         currentProducts.push({ type: "ea", id: e.id }),
//       );
//       data.indicators?.forEach((i: any) =>
//         currentProducts.push({ type: "indicator", id: i.id }),
//       );
//       setSelectedProducts(currentProducts);
//     } catch (error) {
//       console.error("Failed to fetch user products:", error);
//       setSelectedProducts([]);
//     }
//   };

//   const handleAssignProducts = async () => {
//     if (!selectedUser) return;
//     try {
//       const res = await fetch(`/api/users/${selectedUser.id}/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ products: selectedProducts }),
//       });
//       if (res.ok) {
//         setIsProductDialogOpen(false);
//         fetchUsers();
//       }
//     } catch (error) {
//       console.error("Failed to assign products:", error);
//     }
//   };

//   const toggleProduct = (type: string, id: number) => {
//     setSelectedProducts((prev) => {
//       const exists = prev.some((p) => p.type === type && p.id === id);
//       if (exists) {
//         return prev.filter((p) => !(p.type === type && p.id === id));
//       }
//       return [...prev, { type, id }];
//     });
//   };

//   const isProductSelected = (type: string, id: number) => {
//     return selectedProducts.some((p) => p.type === type && p.id === id);
//   };

//   const getProductIcon = (type: string) => {
//     switch (type) {
//       case "ebook":
//         return <FileText className="w-3 h-3" />;
//       case "ea":
//         return <Bot className="w-3 h-3" />;
//       case "indicator":
//         return <LineChart className="w-3 h-3" />;
//       default:
//         return null;
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || user.status?.toLowerCase() === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-muted-foreground">Loading...</div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-[#EF4444] mb-4">{error}</p>
//         <Button
//           onClick={() => {
//             setError(null);
//             setLoading(true);
//             fetchUsers();
//           }}
//         >
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
//       >
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
//             User Management
//           </h1>
//           <p className="text-muted-foreground">
//             Kelola semua user yang terdaftar
//           </p>
//         </div>
//         <Button
//           className="bg-[#2962FF] hover:bg-[#2962FF]/90 text-white"
//           onClick={() => {
//             setFormData({ name: "", email: "", status: "Active" });
//             setSelectedProducts([]);
//             setIsAddDialogOpen(true);
//           }}
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add User
//         </Button>
//       </motion.div>

//       {/* Stats */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
//       >
//         <div className="glass-card rounded-xl p-4">
//           <div className="text-2xl font-bold text-foreground">
//             {users.length}
//           </div>
//           <div className="text-sm text-muted-foreground">Total Users</div>
//         </div>
//         <div className="glass-card rounded-xl p-4">
//           <div className="text-2xl font-bold text-[#00C853]">
//             {users.filter((u) => u.status === "Active").length}
//           </div>
//           <div className="text-sm text-muted-foreground">Active Users</div>
//         </div>
//         <div className="glass-card rounded-xl p-4">
//           <div className="text-2xl font-bold text-[#EF4444]">
//             {users.filter((u) => u.status === "Inactive").length}
//           </div>
//           <div className="text-sm text-muted-foreground">Inactive Users</div>
//         </div>
//       </motion.div>

//       {/* Filters */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="glass-card rounded-2xl p-4 mb-6"
//       >
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//             <Input
//               placeholder="Search users..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-11"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-[150px] bg-[#1E2433] border-[#2A3142] text-foreground h-11">
//               <Filter className="w-4 h-4 mr-2" />
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent className="bg-[#151B28] border-[#2A3142]">
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       {/* Table */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="glass-card rounded-2xl p-4 sm:p-6"
//       >
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="border-[#2A3142]">
//                 <TableHead className="text-muted-foreground">Name</TableHead>
//                 <TableHead className="text-muted-foreground hidden md:table-cell">
//                   Email
//                 </TableHead>
//                 <TableHead className="text-muted-foreground hidden lg:table-cell">
//                   Join Date
//                 </TableHead>
//                 <TableHead className="text-muted-foreground">Status</TableHead>
//                 <TableHead className="text-muted-foreground">
//                   Products
//                 </TableHead>
//                 <TableHead className="text-muted-foreground w-[50px]"></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredUsers.map((user) => (
//                 <TableRow key={user.id} className="border-[#2A3142]">
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center text-[#0B0F19] font-bold text-xs">
//                         {user.name
//                           ?.split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </div>
//                       <div className="font-medium text-foreground">
//                         {user.name}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-muted-foreground hidden md:table-cell">
//                     <div className="flex items-center gap-1">
//                       <Mail className="w-3 h-3" />
//                       {user.email}
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-muted-foreground hidden lg:table-cell">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3" />
//                       {user.date}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant="outline"
//                       className={
//                         user.status === "Active"
//                           ? "border-[#00C853] text-[#00C853]"
//                           : "border-[#EF4444] text-[#EF4444]"
//                       }
//                     >
//                       {user.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex flex-wrap gap-1">
//                       {user.products && user.products.length > 0 ? (
//                         user.products.map((p: any, idx: number) => (
//                           <Badge
//                             key={idx}
//                             variant="outline"
//                             className="text-xs flex items-center gap-1"
//                           >
//                             {getProductIcon(p.type)}
//                             {p.type === "ebook" && "E"}
//                             {p.type === "ea" && "EA"}
//                             {p.type === "indicator" && "I"}
//                           </Badge>
//                         ))
//                       ) : (
//                         <span className="text-xs text-muted-foreground">
//                           None
//                         </span>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0"
//                         >
//                           <MoreHorizontal className="w-4 h-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent
//                         align="end"
//                         className="bg-[#151B28] border-[#2A3142]"
//                       >
//                         <DropdownMenuItem
//                           className="text-foreground hover:bg-[#1E2433]"
//                           onClick={() => openProductDialog(user, true)}
//                         >
//                           <Shield className="w-4 h-4 mr-2" />
//                           Assign Products
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="text-foreground hover:bg-[#1E2433]">
//                           <Eye className="w-4 h-4 mr-2" />
//                           View Details
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-foreground hover:bg-[#1E2433]"
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setFormData({
//                               name: user.name,
//                               email: user.email,
//                               status: user.status,
//                             });
//                             openProductDialog(user, true);
//                             setIsEditDialogOpen(true);
//                           }}
//                         >
//                           <Pencil className="w-4 h-4 mr-2" />
//                           Edit User
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           className="text-[#EF4444] hover:bg-[#EF4444]/10"
//                           onClick={() => handleDelete(user.id)}
//                         >
//                           <Trash2 className="w-4 h-4 mr-2" />
//                           Delete User
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </motion.div>

//       {/* Add User Dialog */}
//       <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//         <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Add New User</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 pt-4">
//             <div className="space-y-2">
//               <Label>Name</Label>
//               <Input
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="bg-[#1E2433] border-[#2A3142]"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="bg-[#1E2433] border-[#2A3142]"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Status</Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(v) => setFormData({ ...formData, status: v })}
//               >
//                 <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1E2433] border-[#2A3142]">
//                   <SelectItem value="Active">Active</SelectItem>
//                   <SelectItem value="Inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Product Selection */}
//             <div className="space-y-4 pt-4 border-t border-[#2A3142]">
//               <h3 className="font-semibold text-foreground">Select Products</h3>

//               {/* Ebooks */}
//               <div>
//                 <h4 className="text-sm font-semibold text-[#EF4444] mb-2 flex items-center gap-2">
//                   <FileText className="w-4 h-4" /> Ebooks
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {ebooks.map((ebook) => (
//                     <div
//                       key={`ebook-${ebook.id}`}
//                       className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                         isProductSelected("ebook", ebook.id)
//                           ? "border-[#2962FF] bg-[#2962FF]/10"
//                           : "border-[#2A3142] hover:bg-[#1E2433]"
//                       }`}
//                       onClick={() => toggleProduct("ebook", ebook.id)}
//                     >
//                       <div
//                         className={`w-5 h-5 rounded border flex items-center justify-center ${
//                           isProductSelected("ebook", ebook.id)
//                             ? "bg-[#2962FF] border-[#2962FF]"
//                             : "border-[#2A3142]"
//                         }`}
//                       >
//                         {isProductSelected("ebook", ebook.id) && (
//                           <Check className="w-3 h-3 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-foreground">
//                           {ebook.title}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {ebook.category}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* EAs */}
//               <div>
//                 <h4 className="text-sm font-semibold text-[#F7C948] mb-2 flex items-center gap-2">
//                   <Bot className="w-4 h-4" /> Expert Advisors
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {eas.map((ea) => (
//                     <div
//                       key={`ea-${ea.id}`}
//                       className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                         isProductSelected("ea", ea.id)
//                           ? "border-[#2962FF] bg-[#2962FF]/10"
//                           : "border-[#2A3142] hover:bg-[#1E2433]"
//                       }`}
//                       onClick={() => toggleProduct("ea", ea.id)}
//                     >
//                       <div
//                         className={`w-5 h-5 rounded border flex items-center justify-center ${
//                           isProductSelected("ea", ea.id)
//                             ? "bg-[#2962FF] border-[#2962FF]"
//                             : "border-[#2A3142]"
//                         }`}
//                       >
//                         {isProductSelected("ea", ea.id) && (
//                           <Check className="w-3 h-3 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-foreground">
//                           {ea.name}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {ea.platform} | {ea.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Indicators */}
//               <div>
//                 <h4 className="text-sm font-semibold text-[#00C853] mb-2 flex items-center gap-2">
//                   <LineChart className="w-4 h-4" /> Indicators
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {indicators.map((indicator) => (
//                     <div
//                       key={`indicator-${indicator.id}`}
//                       className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                         isProductSelected("indicator", indicator.id)
//                           ? "border-[#2962FF] bg-[#2962FF]/10"
//                           : "border-[#2A3142] hover:bg-[#1E2433]"
//                       }`}
//                       onClick={() => toggleProduct("indicator", indicator.id)}
//                     >
//                       <div
//                         className={`w-5 h-5 rounded border flex items-center justify-center ${
//                           isProductSelected("indicator", indicator.id)
//                             ? "bg-[#2962FF] border-[#2962FF]"
//                             : "border-[#2A3142]"
//                         }`}
//                       >
//                         {isProductSelected("indicator", indicator.id) && (
//                           <Check className="w-3 h-3 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-foreground">
//                           {indicator.name}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {indicator.platform} | {indicator.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-2 pt-4">
//               <Button
//                 variant="outline"
//                 className="flex-1 border-[#2A3142]"
//                 onClick={() => setIsAddDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="flex-1 bg-[#2962FF] hover:bg-[#2962FF]/90"
//                 onClick={handleAdd}
//               >
//                 Save User
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Edit User Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 pt-4">
//             <div className="space-y-2">
//               <Label>Name</Label>
//               <Input
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="bg-[#1E2433] border-[#2A3142]"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="bg-[#1E2433] border-[#2A3142]"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Status</Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(v) => setFormData({ ...formData, status: v })}
//               >
//                 <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#1E2433] border-[#2A3142]">
//                   <SelectItem value="Active">Active</SelectItem>
//                   <SelectItem value="Inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Product Selection */}
//             <div className="space-y-4 pt-4 border-t border-[#2A3142]">
//               <h3 className="font-semibold text-foreground">Select Products</h3>

//               {/* Ebooks */}
//               <div>
//                 <h4 className="text-sm font-semibold text-[#EF4444] mb-2 flex items-center gap-2">
//                   <FileText className="w-4 h-4" /> Ebooks
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {ebooks.map((ebook) => (
//                     <div
//                       key={`ebook-${ebook.id}`}
//                       className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                         isProductSelected("ebook", ebook.id)
//                           ? "border-[#2962FF] bg-[#2962FF]/10"
//                           : "border-[#2A3142] hover:bg-[#1E2433]"
//                       }`}
//                       onClick={() => toggleProduct("ebook", ebook.id)}
//                     >
//                       <div
//                         className={`w-5 h-5 rounded border flex items-center justify-center ${
//                           isProductSelected("ebook", ebook.id)
//                             ? "bg-[#2962FF] border-[#2962FF]"
//                             : "border-[#2A3142]"
//                         }`}
//                       >
//                         {isProductSelected("ebook", ebook.id) && (
//                           <Check className="w-3 h-3 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-foreground">
//                           {ebook.title}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {ebook.category}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* EAs */}
//               <div>
//                 <h4 className="text-sm font-semibold text-[#F7C948] mb-2 flex items-center gap-2">
//                   <Bot className="w-4 h-4" /> Expert Advisors
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {eas.map((ea) => (
//                     <div
//                       key={`ea-${ea.id}`}
//                       className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                         isProductSelected("ea", ea.id)
//                           ? "border-[#2962FF] bg-[#2962FF]/10"
//                           : "border-[#2A3142] hover:bg-[#1E2433]"
//                       }`}
//                       onClick={() => toggleProduct("ea", ea.id)}
//                     >
//                       <div
//                         className={`w-5 h-5 rounded border flex items-center justify-center ${
//                           isProductSelected("ea", ea.id)
//                             ? "bg-[#2962FF] border-[#2962FF]"
//                             : "border-[#2A3142]"
//                         }`}
//                       >
//                         {isProductSelected("ea", ea.id) && (
//                           <Check className="w-3 h-3 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-foreground">
//                           {ea.name}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {ea.platform} | {ea.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Indicators */}
//               <div>
//                 <h4 className="text-sm font-semibold text-[#00C853] mb-2 flex items-center gap-2">
//                   <LineChart className="w-4 h-4" /> Indicators
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   {indicators.map((indicator) => (
//                     <div
//                       key={`indicator-${indicator.id}`}
//                       className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                         isProductSelected("indicator", indicator.id)
//                           ? "border-[#2962FF] bg-[#2962FF]/10"
//                           : "border-[#2A3142] hover:bg-[#1E2433]"
//                       }`}
//                       onClick={() => toggleProduct("indicator", indicator.id)}
//                     >
//                       <div
//                         className={`w-5 h-5 rounded border flex items-center justify-center ${
//                           isProductSelected("indicator", indicator.id)
//                             ? "bg-[#2962FF] border-[#2962FF]"
//                             : "border-[#2A3142]"
//                         }`}
//                       >
//                         {isProductSelected("indicator", indicator.id) && (
//                           <Check className="w-3 h-3 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-foreground">
//                           {indicator.name}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {indicator.platform} | {indicator.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-2 pt-4">
//               <Button
//                 variant="outline"
//                 className="flex-1 border-[#2A3142]"
//                 onClick={() => setIsEditDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="flex-1 bg-[#2962FF] hover:bg-[#2962FF]/90"
//                 onClick={handleEdit}
//               >
//                 Update User
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Assign Products Dialog (standalone) */}
//       <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
//         <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Assign Products to {selectedUser?.name}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-6 pt-4">
//             {/* Ebooks */}
//             <div>
//               <h3 className="text-sm font-semibold text-[#EF4444] mb-3 flex items-center gap-2">
//                 <FileText className="w-4 h-4" /> Ebooks
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {ebooks.map((ebook) => (
//                   <div
//                     key={`ebook-${ebook.id}`}
//                     className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                       isProductSelected("ebook", ebook.id)
//                         ? "border-[#2962FF] bg-[#2962FF]/10"
//                         : "border-[#2A3142] hover:bg-[#1E2433]"
//                     }`}
//                     onClick={() => toggleProduct("ebook", ebook.id)}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded border flex items-center justify-center ${
//                         isProductSelected("ebook", ebook.id)
//                           ? "bg-[#2962FF] border-[#2962FF]"
//                           : "border-[#2A3142]"
//                       }`}
//                     >
//                       {isProductSelected("ebook", ebook.id) && (
//                         <Check className="w-3 h-3 text-white" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-foreground">
//                         {ebook.title}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {ebook.category}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* EAs */}
//             <div>
//               <h3 className="text-sm font-semibold text-[#F7C948] mb-3 flex items-center gap-2">
//                 <Bot className="w-4 h-4" /> Expert Advisors
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {eas.map((ea) => (
//                   <div
//                     key={`ea-${ea.id}`}
//                     className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                       isProductSelected("ea", ea.id)
//                         ? "border-[#2962FF] bg-[#2962FF]/10"
//                         : "border-[#2A3142] hover:bg-[#1E2433]"
//                     }`}
//                     onClick={() => toggleProduct("ea", ea.id)}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded border flex items-center justify-center ${
//                         isProductSelected("ea", ea.id)
//                           ? "bg-[#2962FF] border-[#2962FF]"
//                           : "border-[#2A3142]"
//                       }`}
//                     >
//                       {isProductSelected("ea", ea.id) && (
//                         <Check className="w-3 h-3 text-white" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-foreground">
//                         {ea.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {ea.platform} | {ea.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Indicators */}
//             <div>
//               <h3 className="text-sm font-semibold text-[#00C853] mb-3 flex items-center gap-2">
//                 <LineChart className="w-4 h-4" /> Indicators
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {indicators.map((indicator) => (
//                   <div
//                     key={`indicator-${indicator.id}`}
//                     className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                       isProductSelected("indicator", indicator.id)
//                         ? "border-[#2962FF] bg-[#2962FF]/10"
//                         : "border-[#2A3142] hover:bg-[#1E2433]"
//                     }`}
//                     onClick={() => toggleProduct("indicator", indicator.id)}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded border flex items-center justify-center ${
//                         isProductSelected("indicator", indicator.id)
//                           ? "bg-[#2962FF] border-[#2962FF]"
//                           : "border-[#2A3142]"
//                       }`}
//                     >
//                       {isProductSelected("indicator", indicator.id) && (
//                         <Check className="w-3 h-3 text-white" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-foreground">
//                         {indicator.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {indicator.platform} | {indicator.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-2 pt-4 border-t border-[#2A3142]">
//               <Button
//                 variant="outline"
//                 className="flex-1 border-[#2A3142]"
//                 onClick={() => setIsProductDialogOpen(false)}
//               >
//                 <X className="w-4 h-4 mr-2" /> Cancel
//               </Button>
//               <Button
//                 className="flex-1 bg-[#2962FF] hover:bg-[#2962FF]/90"
//                 onClick={handleAssignProducts}
//               >
//                 <Check className="w-4 h-4 mr-2" /> Save Assignment
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

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

  const handleDownload = async (ebook: Ebook) => {
    if (!ebook.file_url) {
      alert("No PDF file available for this ebook");
      return;
    }

    // Increment download count
    try {
      await fetch(`/api/ebooks/${ebook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloads: ebook.downloads + 1 }),
      });
      fetchEbooks();
    } catch (error) {
      console.error("Failed to update download count:", error);
    }

    // Open/download the file
    window.open(ebook.file_url, "_blank");
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

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>Ebook Details</DialogTitle>
          </DialogHeader>
          {selectedEbook && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[#EF4444]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedEbook.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedEbook.category}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              {selectedEbook.file_url && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]"
                    onClick={() => handleDownload(selectedEbook)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#2A3142]"
                    onClick={() =>
                      window.open(selectedEbook.file_url, "_blank")
                    }
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View PDF
                  </Button>
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
