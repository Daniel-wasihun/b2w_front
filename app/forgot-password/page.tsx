"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Mail, 
  Send,
  ArrowLeft,
  Award,
  Zap,
  Users,
  Heart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email });
      setSubmitted(true);
      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans transition-colors duration-500">
      {/* Decorative Background Elements (Elite Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[140px] rounded-full animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[140px] rounded-full animate-pulse-subtle" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Branding & Features */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <Link href="/" className="flex items-center space-x-3 mb-8 group cursor-pointer">
              <div className="p-3 premium-gradient rounded-[8px] shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
                Born To <span className="text-primary italic">Win</span>
              </h1>
            </Link>

            <div className="mb-10 space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                Recover Your <br />
                <span className="text-primary">Champion Status</span>
              </h2>
              <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">
                Reset your credentials and get back to the race.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-lg">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center space-y-3 group">
                  <div className="w-20 h-20 bg-card border border-border rounded-[8px] flex items-center justify-center shadow-lg shadow-primary/5 group-hover:border-primary/30 group-hover:shadow-primary/10 transition-all duration-300 transform group-hover:-translate-y-1">
                    <f.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground tracking-widest text-center uppercase">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
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
                <h2 className="text-3xl font-bold text-foreground">Reset Password</h2>
                <p className="text-sm text-muted-foreground mt-2 hidden lg:block">Safe recovery for your club account.</p>
              </div>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="relative">
                    <Input
                      label="Email Address"
                      placeholder="Enter your email address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12"
                    />
                    <Mail className="absolute left-4 top-[44px] w-4 h-4 text-muted-foreground/40" />
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full h-14 shadow-xl shadow-primary/10 capitalize text-lg font-bold" 
                      variant="premium"
                      isLoading={loading}
                      rightIcon={<Send className="w-5 h-5 ml-2" />}
                    >
                      Send Recovery Link
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Check your email</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We've sent a recovery link to <span className="text-foreground font-bold">{email}</span>.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-[8px]"
                    onClick={() => setSubmitted(false)}
                  >
                    Try a different email
                  </Button>
                </div>
              )}

              <div className="mt-10 pt-10 border-t border-border/50 text-center relative z-10">
                <Link href="/login" className="flex items-center justify-center text-sm font-bold text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
