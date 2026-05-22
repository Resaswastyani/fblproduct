"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Camera,
  Download,
  BookOpen,
  LineChart,
  Bot,
  Key,
  ChevronRight,
  Save,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  date: string;
  status: string;
  created_at: string;
}

interface Product {
  id: number;
  type: string;
  name: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const parsed = JSON.parse(stored);
    fetchProfile(parsed.id);
    fetchProducts(parsed.id);
  }, [router]);

  const fetchProfile = async (userId: number) => {
    try {
      const res = await fetch(`/api/me?id=${userId}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setUser(data);
      setFormData({ name: data.name, email: data.email });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (userId: number) => {
    try {
      const res = await fetch(`/api/users/${userId}/products`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const all: Product[] = [];
      data.ebooks?.forEach((e: any) =>
        all.push({ id: e.id, type: "Ebook", name: e.title }),
      );
      data.eas?.forEach((e: any) =>
        all.push({ id: e.id, type: "EA", name: e.name }),
      );
      data.indicators?.forEach((i: any) =>
        all.push({ id: i.id, type: "Indicator", name: i.name }),
      );
      setProducts(all);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/me?id=${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Update failed");
        setSaving(false);
        return;
      }
      setUser(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: data.name, email: data.email }),
      );
      setIsEditMode(false);
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordData.current || !passwordData.new) {
      setPasswordError("All fields required");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      setPasswordError("New passwords do not match");
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch(`/api/me?id=${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.current,
          newPassword: passwordData.new,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Failed");
      } else {
        setPasswordSuccess("Password updated successfully");
        setPasswordData({ current: "", new: "", confirm: "" });
      }
    } catch (err) {
      setPasswordError("Network error");
    } finally {
      setChangingPassword(false);
    }
  };

  const getIcon = (type: string) => {
    if (type === "Ebook") return BookOpen;
    if (type === "EA") return Bot;
    return LineChart;
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="p-8 text-center text-muted-foreground">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Kelola informasi profil dan keamanan akun Anda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-card rounded-2xl p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-[#0B0F19] text-3xl font-bold">
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2962FF] flex items-center justify-center border-2 border-[#0B0F19]">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>

            {/* Member Status */}
            <div className="glass-card rounded-xl p-4 mb-6 bg-[#F7C948]/10 border-[#F7C948]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#F7C948]" />
                  <span className="text-sm font-medium text-foreground">
                    Member Status
                  </span>
                </div>
                <Badge className="bg-[#F7C948] text-[#0B0F19]">
                  {user.role === "admin" ? "Admin" : "Premium"}
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#2A3142]">
                <span className="text-sm text-muted-foreground">
                  Member Since
                </span>
                <span className="text-sm text-foreground">
                  {new Date(user.date).toLocaleDateString("id-ID", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#2A3142]">
                <span className="text-sm text-muted-foreground">
                  Total Products
                </span>
                <span className="text-sm text-foreground">
                  {products.length}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm text-foreground">{user.status}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Edit Profile */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">
                Profile Information
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (isEditMode) {
                    setFormData({ name: user.name, email: user.email });
                  }
                  setIsEditMode(!isEditMode);
                  setError("");
                }}
                className="border-[#2A3142] text-foreground"
              >
                {isEditMode ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditMode}
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!isEditMode}
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Join Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={new Date(user.date).toLocaleDateString("id-ID")}
                    disabled
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Member Role</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={
                      user.role === "admin" ? "Administrator" : "Premium Member"
                    }
                    disabled
                    className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground h-11 disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {isEditMode && (
              <Button
                className="mt-6 gradient-gold text-[#0B0F19] font-semibold"
                onClick={handleUpdateProfile}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Update Profile
              </Button>
            )}
          </div>

          {/* Security */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Security</h3>

            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1E2433] hover:bg-[#1E2433]/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2962FF]/20 flex items-center justify-center">
                      <Key className="w-5 h-5 text-[#2962FF]" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">
                        Change Password
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Update your password securely
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#151B28] border-[#2A3142]">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Change Password
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Enter your current password and new password
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  {passwordError && (
                    <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm">
                      {passwordError}
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="p-3 rounded-lg bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] text-sm">
                      {passwordSuccess}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label className="text-foreground">Current Password</Label>
                    <Input
                      type="password"
                      value={passwordData.current}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          current: e.target.value,
                        })
                      }
                      className="bg-[#1E2433] border-[#2A3142] text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">New Password</Label>
                    <Input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          new: e.target.value,
                        })
                      }
                      className="bg-[#1E2433] border-[#2A3142] text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">
                      Confirm New Password
                    </Label>
                    <Input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirm: e.target.value,
                        })
                      }
                      className="bg-[#1E2433] border-[#2A3142] text-foreground"
                    />
                  </div>
                  <Button
                    className="w-full gradient-gold text-[#0B0F19] font-semibold"
                    onClick={handleChangePassword}
                    disabled={changingPassword}
                  >
                    {changingPassword ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Update Password
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Download History / Products */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Your Products
            </h3>
            <div className="space-y-3">
              {products.length > 0 ? (
                products.map((item, index) => {
                  const Icon = getIcon(item.type);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#1E2433]/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#2962FF]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#2962FF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.type}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No products assigned.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
