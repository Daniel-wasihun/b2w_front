"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HeroHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  italicWord?: string;
}

export const HeroHeader = ({ title, subtitle, badge, italicWord }: HeroHeaderProps) => {
  return (
    <section className="pt-40 pb-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Badge className="bg-secondary/20 text-secondary border-none px-4 py-1.5 capitalize text-[10px] font-bold">
              {badge}
            </Badge>
          </motion.div>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight"
        >
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {word === italicWord ? (
                <span className="text-secondary italic">{word} </span>
              ) : (
                word + ' '
              )}
            </span>
          ))}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};
