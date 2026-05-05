"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  data?: {
    title: string;
    subtitle: string;
    image: string;
    cta_text: string;
    cta_link: string;
  };
}

export const Hero = ({ data }: HeroProps) => {
  return (
    <section className="relative py-32 overflow-hidden bg-primary text-white w-full max-w-full">
      <div className="absolute inset-0 z-0">
        {data?.image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-110 blur-sm"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary shadow-lg shadow-black/20"
        >
          <Trophy size={14} className="animate-bounce" />
          <span>Born To Win Initiative 2026</span>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif font-black tracking-tight leading-[0.9]"
          >
            {data?.title || "Build Your Winning Legacy"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium"
          >
            {data?.subtitle || "Join the elite league of innovators and leaders. Compete, grow, and claim your place among the champions."}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Link href={data?.cta_link || "/register"}>
            <Button variant="premium" className="h-16 px-10 rounded-[8px] text-lg font-bold shadow-2xl group">
              {data?.cta_text || "Join the Initiative"}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/races">
            <Button variant="outline" className="h-16 px-10 rounded-[8px] text-lg font-bold border-white/20 hover:bg-white/10 backdrop-blur-md">
              Explore Arena
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
