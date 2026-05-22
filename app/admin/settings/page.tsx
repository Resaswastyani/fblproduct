"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Default settings
const DEFAULT_SETTINGS = {
  siteName: "TradeVault Pro",
  siteUrl: "https://tradevault.pro",
  siteDescription: "Platform trading terlengkap untuk trader Indonesia",
  language: "id",
  timezone: "asia-jakarta",
  primaryColor: "#2962FF",
  accentColor: "#F7C948",
  logo: null as string | null,
  notifications: {
    newUser: true,
    newPurchase: true,
    downloadAlert: false,
    weeklyReport: true,
    systemAlert: true,
  },
  security: {
    twoFactor: false,
  },
};

export default function AdminSettingsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<<AdminUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General settings state
  const [siteName, setSiteName] = useState(DEFAULT_SETTINGS.siteName);
  const [siteUrl, setSiteUrl] = useState(DEFAULT_SETTINGS.siteUrl);
  const [siteDescription, setSiteDescription] = useState(
    DEFAULT_SETTINGS.siteDescription,
  );
  const [language, setLanguage] = useState(DEFAULT_SETTINGS.language);
  const [timezone, setTimezone] = useState(DEFAULT_SETTINGS.timezone);
  const [primaryColor, setPrimaryColor] = useState(
    DEFAULT_SETTINGS.primaryColor,
  );
  const [accentColor, setAccentColor] = useState(DEFAULT_SETTINGS.accentColor);
  const [logo, setLogo] = useState<string | null>(DEFAULT_SETTINGS.logo);

  // Notifications state
  const [notifications, setNotifications] = useState(
    DEFAULT_SETTINGS.notifications,
  );

  // Security state
  const [security, setSecurity] = useState(DEFAULT_SETTINGS.security);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (parsed.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    setAdmin(parsed);

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("admin_settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSiteName(parsed.siteName || DEFAULT_SETTINGS.siteName);
        setSiteUrl(parsed.siteUrl || DEFAULT_SETTINGS.siteUrl);
        setSiteDescription(
          parsed.siteDescription || DEFAULT_SETTINGS.siteDescription,
        );
        setLanguage(parsed.language || DEFAULT_SETTINGS.language);
        setTimezone(parsed.timezone || DEFAULT_SETTINGS.timezone);
        setPrimaryColor(parsed.primaryColor || DEFAULT_SETTINGS.primaryColor);
        setAccentColor(parsed.accentColor || DEFAULT_SETTINGS.accentColor);
        setLogo(parsed.logo || DEFAULT_SETTINGS.logo);
        if (parsed.notifications) {
          setNotifications({
            ...DEFAULT_SETTINGS.notifications,
            ...parsed.notifications,
          });
        }
        if (parsed.security) {
          setSecurity({ ...DEFAULT_SETTINGS.security, ...parsed.security });
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }

    setLoading(false);
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Save to localStorage
    const settingsToSave = {
      siteName,
      siteUrl,
      siteDescription,
      language,
      timezone,
      primaryColor,
      accentColor,
      logo,
      notifications,
      security,
    };

    localStorage.setItem("admin_settings", JSON.stringify(settingsToSave));

    // Simulate API delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleLogoUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setLogo(data.url);
        } else {
          console.error("Upload error:", data.error);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };
    input.click();
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePassword = async () => {
    if (!admin) return;
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch(`/api/me?id=${admin.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Failed to change password");
      } else {
        setPasswordSuccess("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setPasswordError("Network error");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleResetSettings = () => {
    if (!confirm("Reset all settings to default?")) return;
    setSiteName(DEFAULT_SETTINGS.siteName);
    setSiteUrl(DEFAULT_SETTINGS.siteUrl);
    setSiteDescription(DEFAULT_SETTINGS.siteDescription);
    setLanguage(DEFAULT_SETTINGS.language);
    setTimezone(DEFAULT_SETTINGS.timezone);
    setPrimaryColor(DEFAULT_SETTINGS.primaryColor);
    setAccentColor(DEFAULT_SETTINGS.accentColor);
    setLogo(DEFAULT_SETTINGS.logo);
    setNotifications(DEFAULT_SETTINGS.notifications);
    setSecurity(DEFAULT_SETTINGS.security);
    localStorage.removeItem("admin_settings");
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="p-8 text-center text-muted-foreground">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your platform settings</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            className="border-[#2A3142] text-foreground"
          >
            Reset Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] text-sm"
        >
          Settings saved successfully!
        </motion.div>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-[#0D1117] border border-[#2A3142] p-1">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#1E2433]"
          >
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[#1E2433]"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#1E2433]"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-[#1E2433]"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2962FF]" />
                Site Settings
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Site URL</Label>
                    <Input
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Site Description</Label>
                  <Textarea
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="bg-[#1E2433] border-[#2A3142]"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-[#1E2433] border-[#2A3142]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E2433] border-[#2A3142]">
                        <SelectItem value="asia-jakarta">
                          Asia/Jakarta (WIB)
                        </SelectItem>
                        <SelectItem value="asia-makassar">
                          Asia/Makassar (WITA)
                        </SelectItem>
                        <SelectItem value="asia-jayapura">
                          Asia/Jayapura (WIT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#F7C948]" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-[#1E2433] flex items-center justify-center overflow-hidden">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-[#F7C948]">
                          TV
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#2A3142]"
                      onClick={handleLogoUpload}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="bg-[#1E2433] border-[#2A3142]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: accentColor }}
                      />
                      <Input
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="bg-[#1E2433] border-[#2A3142]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2962FF]" />
              Admin Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2962FF] to-[#00BCD4] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {admin?.name?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
                <Button variant="outline" className="border-[#2A3142]">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={admin?.name || ""}
                    disabled
                    className="bg-[#1E2433] border-[#2A3142] disabled:opacity-70"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={admin?.email || ""}
                    disabled
                    className="bg-[#1E2433] border-[#2A3142] disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={admin?.role === "admin" ? "Super Admin" : "Member"}
                    disabled
                    className="bg-[#1E2433] border-[#2A3142] disabled:opacity-70"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#F7C948]" />
              Notification Preferences
            </h3>
            <div className="space-y-6">
              {[
                {
                  key: "newUser",
                  label: "New User Registration",
                  desc: "Get notified when a new user registers",
                },
                {
                  key: "newPurchase",
                  label: "New Purchase",
                  desc: "Get notified for new membership purchases",
                },
                {
                  key: "downloadAlert",
                  label: "Download Alerts",
                  desc: "Get notified for high download activity",
                },
                {
                  key: "weeklyReport",
                  label: "Weekly Reports",
                  desc: "Receive weekly analytics summary via email",
                },
                {
                  key: "systemAlert",
                  label: "System Alerts",
                  desc: "Get notified for system issues or updates",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={
                      notifications[item.key as keyof typeof notifications]
                    }
                    onCheckedChange={(checked) =>
                      handleNotificationChange(item.key, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#10B981]" />
                Password
              </h3>

              {passwordError && (
                <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm mb-4">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="p-3 rounded-lg bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] text-sm mb-4">
                  {passwordSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="bg-[#1E2433] border-[#2A3142]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="bg-[#1E2433] border-[#2A3142]"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-[#2A3142]"
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                >
                  {changingPassword ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Update Password
                </Button>
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={security.twoFactor}
                  onCheckedChange={(checked) =>
                    setSecurity((prev) => ({ ...prev, twoFactor: checked }))
                  }
                />
              </div>
            </div>

            <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Active Sessions
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1E2433] rounded-lg">
                  <div>
                    <p className="text-foreground">Chrome on Windows</p>
                    <p className="text-sm text-muted-foreground">
                      Jakarta, Indonesia - Current session
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1E2433] rounded-lg">
                  <div>
                    <p className="text-foreground">Safari on iPhone</p>
                    <p className="text-sm text-muted-foreground">
                      Jakarta, Indonesia - 2 days ago
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#EF4444]">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}