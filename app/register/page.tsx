"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Mail, 
  Lock, 
  User,
  Building,
  Eye, 
  EyeOff, 
  ArrowLeft,
  Award,
  Zap,
  Users,
  Heart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";
import { cn, localize } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";

const features = [
  { icon: Award, label: "EXCELLENCE" },
  { icon: Trophy, label: "COMPETITION" },
  { icon: Zap, label: "CREATIVITY" },
  { icon: Users, label: "LEADERSHIP" },
  { icon: Heart, label: "COMMUNITY" },
  { icon: Star, label: "VICTORY" },
];

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state: any) => state.register);
  const loading = useAuthStore((state: any) => state.isLoading);
  const currentLanguage = useLanguageStore((state: any) => state.currentLanguage);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    department_id: "",
  });
  const [fieldErrors, setFieldErrors] = useState<any>({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/departments`);
        const data = res.data.data?.data || res.data.data || res.data || [];
        setDepartments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    try {
      await register(formData);
      router.push("/login");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans transition-colors duration-500">
      {/* Decorative Background Elements (Elite Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[140px] rounded-full animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[140px] rounded-full animate-pulse-subtle" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Register Form (Reversed) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="premium-card p-10 lg:p-12 w-full max-w-xl relative group overflow-hidden min-h-[500px] flex flex-col justify-center">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-1000" />
              
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
              
              <div className="mb-8 relative z-10">
                <h2 className="text-3xl font-bold text-foreground">Sign Up</h2>
                <p className="text-sm text-muted-foreground mt-2 hidden lg:block">Become a member of the elite circle.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="relative md:col-span-2">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-11"
                    error={fieldErrors.name?.[0]}
                  />
                  <User className="absolute left-4 top-[42px] w-4 h-4 text-muted-foreground/50" />
                </div>

                <div className="relative md:col-span-2">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11"
                    error={fieldErrors.email?.[0]}
                  />
                  <Mail className="absolute left-4 top-[42px] w-4 h-4 text-muted-foreground/50" />
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11"
                    error={fieldErrors.password?.[0]}
                  />
                  <Lock className="absolute left-4 top-[42px] w-4 h-4 text-muted-foreground/50" />
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                    className="pl-11"
                    error={fieldErrors.password_confirmation?.[0]}
                  />
                  <Lock className="absolute left-4 top-[42px] w-4 h-4 text-muted-foreground/50" />
                </div>

                <div className="relative md:col-span-2">
                  <label className="text-[11px] font-bold capitalize text-muted-foreground/60 ml-1 mb-2 block">
                    Department / Organization
                  </label>
                  <div className="relative group/select">
                    <select
                      className={cn(
                        "flex h-11 w-full rounded-xl border border-border bg-background/50 px-11 py-2 text-sm ring-offset-background appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all duration-300 hover:border-primary/20 cursor-pointer",
                        fieldErrors.department_id && "border-destructive focus:ring-destructive/10 focus:border-destructive/40"
                      )}
                      value={formData.department_id}
                      onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                      required
                    >
                      <option value="" className="bg-background">Select Department</option>
                      {departments.map((dept: any) => (
                        <option key={dept.id} value={dept.id} className="bg-background">
                          {localize(dept.name, currentLanguage)}
                        </option>
                      ))}
                    </select>
                    <Building className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground/50 group-hover/select:text-primary/50 transition-colors" />
                    <div className="absolute right-4 top-3.5 pointer-events-none text-muted-foreground/40">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {fieldErrors.department_id && (
                    <p className="text-[11px] font-bold text-destructive/90 ml-1 mt-1">
                      {fieldErrors.department_id[0]}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 pt-2">
                  <Button 
                    type="submit" 
                    className="w-full h-14 shadow-xl shadow-primary/10 capitalize text-lg font-bold" 
                    variant="premium"
                    isLoading={loading}
                    rightIcon={<Trophy className="w-5 h-5 ml-2" />}
                  >
                    Join the Club
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-border/50 text-center relative z-10">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-bold hover:underline">
                    Login Instead
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Club Branding & Features Grid (Reversed) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
          >
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
                Start Your <br />
                <span className="text-primary">Legacy Today</span>
              </h2>
              <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">
                Join our elite community. Create, compete, and claim your victory.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-lg">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start space-y-3 group">
                  <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5 group-hover:border-primary/30 group-hover:shadow-primary/10 transition-all duration-300 transform group-hover:-translate-y-1">
                    <f.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
