// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   ChevronRight,
//   Shield,
//   User,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";

// const demoAccounts = [
//   {
//     type: "member",
//     email: "member@demo.com",
//     password: "member123",
//     label: "Member Demo",
//     icon: User,
//     redirect: "/dashboard",
//   },
//   {
//     type: "admin",
//     email: "admin@demo.com",
//     password: "admin123",
//     label: "Admin Demo",
//     icon: Shield,
//     redirect: "/admin",
//   },
// ];

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleDemoLogin = (account: (typeof demoAccounts)[0]) => {
//     setEmail(account.email);
//     setPassword(account.password);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     if (!email || !password) {
//       setError("Please enter email and password");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       setIsLoading(false);

//       if (!res.ok) {
//         setError(data.error || "Invalid email or password");
//         return;
//       }

//       localStorage.setItem("user", JSON.stringify(data.user));

//       if (data.user.role === "admin") {
//         router.push("/admin");
//       } else {
//         router.push("/dashboard");
//       }
//     } catch (err) {
//       setIsLoading(false);
//       setError("Network error. Please try again.");
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
//       <div className="absolute inset-0 candlestick-bg" />
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2962FF]/20 rounded-full blur-[120px]" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F7C948]/10 rounded-full blur-[120px]" />

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 w-full max-w-md"
//       >
//         <Link href="/" className="flex items-center justify-center gap-2 mb-8">
//           <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
//             <span className="text-[#0B0F19] font-bold text-xl">TV</span>
//           </div>
//           <span className="text-2xl font-bold text-foreground">
//             TradeVault <span className="text-[#F7C948]">Pro</span>
//           </span>
//         </Link>

//         <div className="glass-card rounded-2xl p-6 sm:p-8 glow-blue">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
//               WELCOME BACK
//             </h1>
//             <p className="text-muted-foreground">
//               Masuk ke member area untuk mengakses tools premium
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2 mb-4">
//               <Label className="text-muted-foreground text-sm">
//                 Quick Demo Login
//               </Label>
//               <div className="grid grid-cols-2 gap-2">
//                 {demoAccounts.map((account) => (
//                   <button
//                     key={account.type}
//                     type="button"
//                     onClick={() => handleDemoLogin(account)}
//                     className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
//                       email === account.email
//                         ? "border-[#F7C948] bg-[#F7C948]/10"
//                         : "border-[#2A3142] bg-[#1E2433] hover:border-[#3A4152]"
//                     }`}
//                   >
//                     <account.icon
//                       className={`w-4 h-4 ${
//                         account.type === "admin"
//                           ? "text-[#EF4444]"
//                           : "text-[#2962FF]"
//                       }`}
//                     />
//                     <span className="text-sm text-foreground">
//                       {account.label}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {error && (
//               <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-foreground">
//                 Email
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="trader@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#2962FF] focus:ring-[#2962FF]"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-foreground">
//                 Password
//               </Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#2962FF] focus:ring-[#2962FF]"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   id="remember"
//                   className="border-[#2A3142] data-[state=checked]:bg-[#2962FF] data-[state=checked]:border-[#2962FF]"
//                 />
//                 <Label
//                   htmlFor="remember"
//                   className="text-sm text-muted-foreground cursor-pointer"
//                 >
//                   Remember Me
//                 </Label>
//               </div>
//               <Link
//                 href="/forgot-password"
//                 className="text-sm text-[#2962FF] hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full gradient-gold text-[#0B0F19] font-bold h-12 text-lg hover:opacity-90 transition-opacity"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" />
//               ) : (
//                 <>
//                   LOGIN
//                   <ChevronRight className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-muted-foreground">
//               Belum punya akun?{" "}
//               <Link
//                 href="/register"
//                 className="text-[#F7C948] font-semibold hover:underline"
//               >
//                 Register Here
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <Link
//             href="/"
//             className="text-muted-foreground hover:text-foreground text-sm"
//           >
//             Back to Home
//           </Link>
//         </div>
//       </motion.div>
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ChevronRight,
  Shield,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const demoAccounts = [
  {
    type: "member",
    email: "member@demo.com",
    password: "member123",
    label: "Member Demo",
    icon: User,
    redirect: "/dashboard",
  },
  {
    type: "admin",
    email: "admin@demo.com",
    password: "admin123",
    label: "Admin Demo",
    icon: Shield,
    redirect: "/admin",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Load custom logo from admin settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.logo) setLogoUrl(parsed.logo);
      }
    } catch {
      // ignore parse error
    }
  }, []);

  const handleDemoLogin = (account: (typeof demoAccounts)[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 candlestick-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2962FF]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F7C948]/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center overflow-hidden">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#0B0F19] font-bold text-xl">TV</span>
            )}
          </div>
          <span className="text-2xl font-bold text-foreground">
            TradeVault <span className="text-[#F7C948]">Pro</span>
          </span>
        </Link>

        <div className="glass-card rounded-2xl p-6 sm:p-8 glow-blue">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              WELCOME BACK
            </h1>
            <p className="text-muted-foreground">
              Masuk ke member area untuk mengakses tools premium
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 mb-4">
              <Label className="text-muted-foreground text-sm">
                Quick Demo Login
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.type}
                    type="button"
                    onClick={() => handleDemoLogin(account)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      email === account.email
                        ? "border-[#F7C948] bg-[#F7C948]/10"
                        : "border-[#2A3142] bg-[#1E2433] hover:border-[#3A4152]"
                    }`}
                  >
                    <account.icon
                      className={`w-4 h-4 ${
                        account.type === "admin"
                          ? "text-[#EF4444]"
                          : "text-[#2962FF]"
                      }`}
                    />
                    <span className="text-sm text-foreground">
                      {account.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="trader@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#2962FF] focus:ring-[#2962FF]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#1E2433] border-[#2A3142] text-foreground placeholder:text-muted-foreground h-12 focus:border-[#2962FF] focus:ring-[#2962FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="border-[#2A3142] data-[state=checked]:bg-[#2962FF] data-[state=checked]:border-[#2962FF]"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember Me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#2962FF] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-gold text-[#0B0F19] font-bold h-12 text-lg hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" />
              ) : (
                <>
                  LOGIN
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-[#F7C948] font-semibold hover:underline"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
