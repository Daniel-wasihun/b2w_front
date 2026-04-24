"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Compass, Ghost, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on the client to avoid hydration mismatch
    const newParticles = [...Array(6)].map((_, i) => ({
      id: i,
      x: Math.random() * 50 - 25,
      y: Math.random() * 50 - 25,
      duration: 5 + Math.random() * 5,
      width: 20 + Math.random() * 40,
      height: 20 + Math.random() * 40,
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        
        {/* Floating Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.2, 1],
              x: [0, p.x, 0],
              y: [0, p.y, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity,
              delay: p.id * 0.5 
            }}
            className="absolute bg-primary/20 rounded-full blur-xl"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* 404 Watermark */}
          <h1 className="text-[250px] font-black tracking-tighter text-foreground/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none leading-none">
            404
          </h1>

          {/* Icon Composition */}
          <div className="relative inline-block mb-12">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10"
            >
              <Compass className="w-16 h-16 text-primary" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-16 h-16 bg-secondary/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-secondary/20 shadow-lg"
            >
              <Ghost className="w-8 h-8 text-secondary" />
            </motion.div>
          </div>

          <div className="space-y-6 relative z-20">
            <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
              Oops! You're <span className="text-primary italic">Off Track.</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl mx-auto font-medium">
              This path doesn't lead to the podium. The page you're looking for has vanished or never existed in this arena.
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-6 pt-12 relative z-20">
            <Button asChild variant="premium" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 group">
              <Link href="/" className="flex items-center">
                <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Return to Arena
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold group border-border/50 hover:border-primary/50 bg-background/50 backdrop-blur-sm">
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-3 group-hover:rotate-6 transition-transform" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-20 flex items-center justify-center space-x-3 text-muted-foreground/40"
          >
            <div className="h-px w-8 bg-current" />
            <Trophy className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Champion's Circle</span>
            <div className="h-px w-8 bg-current" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
