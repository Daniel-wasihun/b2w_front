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

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold capitalize text-secondary"
          >
            <Trophy size={14} className="text-secondary" />
            <span>Born To Win Initiative 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[0.95]"
          >
            Unleash Your <span className="text-secondary italic">Inner</span> Champion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/80 max-w-2xl font-sans leading-relaxed"
          >
            The most prestigious platform for students to compete, innovate, and get recognized. 
            Join the elite league and claim your path to victory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 md:h-16 px-10 rounded-2xl text-lg font-bold shadow-glow-secondary bg-secondary hover:bg-secondary/90 text-white">
                Join the Initiative
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/races" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-10 rounded-2xl text-lg font-bold border-white/30 text-white bg-white/5 hover:bg-white/10 transition-all">
                Explore Races
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
