"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/authStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state: any) => state.login);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    try {
      await login(formData);
      toast.success("Welcome back champion!");
      
      // Role-based redirection logic
      const user = useAuthStore.getState().user;
      const userRole = user?.roles?.[0]?.slug;
      
      if (['admin', 'super_admin', 'executive'].includes(userRole as string)) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[140px] rounded-full animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[140px] rounded-full animate-pulse-subtle" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Club Branding & Features Grid */}
          <div className="hidden lg:flex flex-col items-center lg:items-start text-center lg:text-start">
            <Link href="/" className="flex items-center space-x-3 mb-8 group cursor-pointer">
              <div className="p-3 premium-gradient rounded-2xl shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
                Born To <span className="text-primary italic">Win</span>
              </h1>
            </Link>

            <div className="mb-10 space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                Welcome <br />
                <span className="text-primary">Back Champion</span>
              </h2>
              <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">
                Access your elite dashboard and continue your winning journey.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-lg">
              <div key="1" className="flex flex-col items-center space-y-3 group">
                <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5 group-hover:border-primary/30 group-hover:shadow-primary/10 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest text-center uppercase">EXCELLENCE</span>
              </div>
              <div key="2" className="flex flex-col items-center space-y-3 group">
                <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5 group-hover:border-primary/30 group-hover:shadow-primary/10 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest text-center uppercase">COMMUNICATION</span>
              </div>
              <div key="3" className="flex flex-col items-center space-y-3 group">
                <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5 group-hover:border-primary/30 group-hover:shadow-primary/10 transition-all duration-300 transform group-hover:-translate-y-1">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest text-center uppercase">SECURITY</span>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="premium-card p-10 lg:p-12 w-full max-w-xl relative group overflow-hidden min-h-[500px] flex flex-col justify-center">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000" />
              
              {/* Mobile Only Branding */}
              <div className="lg:hidden flex items-center justify-between mb-8 pb-6 border-b border-border/50 relative z-10">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="p-2 premium-gradient rounded-lg">
                    <Trophy className="text-white w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm tracking-tight text-foreground">Born To Win</span>
                </Link>
                <Link href="/" className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest flex items-center">
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Back Home
                </Link>
              </div>
              
              <div className="mb-10 relative z-10">
                <h2 className="text-3xl font-bold text-foreground">Login</h2>
                <p className="text-sm text-muted-foreground mt-2 hidden lg:block">Access your champion dashboard.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="relative">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11"
                    placeholder="Enter your email"
                    error={fieldErrors.email?.[0]}
                  />
                  <Mail className="absolute left-4 top-[42px] w-4 h-4 text-muted-foreground/50" />
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 pr-11"
                    placeholder="••••••••"
                    error={fieldErrors.password?.[0]}
                  />
                  <Lock className="absolute left-4 top-[42px] w-4 h-4 text-muted-foreground/50" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[42px] text-muted-foreground/40 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="w-4 h-4 rounded border-border bg-background/50 text-primary focus:ring-primary/20 transition-all"
                    />
                    <label htmlFor="remember" className="text-[11px] font-bold capitalize text-muted-foreground/60 cursor-pointer hover:text-primary transition-colors">
                      Remember Me
                    </label>
                  </div>
                  <Link href="/forgot-password" title="Forgot Password" className="text-[11px] font-bold capitalize text-primary hover:opacity-80 transition-opacity">
                    Lost password?
                  </Link>
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full h-14 shadow-xl shadow-primary/10 capitalize text-lg font-bold" 
                    variant="premium"
                    isLoading={loading}
                  >
                    Sign In to Portal
                  </Button>
                </div>
              </form>

              <div className="mt-10 pt-10 border-t border-border/50 text-center relative z-10">
                <p className="text-sm text-muted-foreground">
                  Not a member yet?{" "}
                  <Link href="/register" className="text-primary font-bold hover:underline">
                    Join the Club
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}