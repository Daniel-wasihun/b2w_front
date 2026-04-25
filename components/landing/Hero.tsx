"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] -left-[10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-[5px] text-[10px] font-bold uppercase tracking-widest text-secondary"
          >
            <Trophy size={14} className="text-secondary" />
            <span>Born To Win Initiative 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-none text-white select-text"
          >
            Unleash your <br />
            <span className="text-secondary italic">Mastery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/95 max-w-3xl font-sans leading-relaxed select-text"
          >
            The most prestigious platform for students to compete, innovate, and get recognized globally. 
            Join the elite league and build your future today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto pt-8"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-16 md:h-20 px-12 rounded-[5px] text-xl font-bold shadow-glow-secondary bg-secondary hover:bg-secondary/90 text-white transition-all hover:scale-105">
                Join the Initiative
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <Link href="/races" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 md:h-20 px-12 rounded-[5px] text-xl font-bold border-white/40 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105">
                Explore Challenges
              </Button>
            </Link>
          </motion.div>
          {/* Main content end */}
        </div>
      </div>
    </section>
  );
};
