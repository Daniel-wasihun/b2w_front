"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award, Users, Target, Globe } from "lucide-react";
import { PremiumCard } from "@/components/ui/premium-card";

const iconMap: any = {
  ShieldCheck, Zap, Award, Users, Target, Globe
};

interface FeaturesProps {
  data?: any[];
}

export const Features = ({ data }: FeaturesProps) => {
  return (
    <section className="py-24 bg-muted/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs"
          >
            Core Values
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-primary"
          >
            Why We <span className="italic text-secondary">Lead</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            We provide the infrastructure for excellence, ensuring every member has the tools to succeed globally.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.map((feature: any, i: number) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <PremiumCard 
                  title={feature.title}
                  description={feature.description}
                  className="[&_.aspect-video]:hidden p-10 h-full border-none shadow-none bg-background hover:bg-muted/30"
                  action={
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
