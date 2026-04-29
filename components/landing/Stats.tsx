"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Trophy, Award, Zap } from "lucide-react";

interface StatsProps {
  data?: {
    participants?: number;
    challenges?: number;
    certificates?: number;
    projects?: number;
  };
}

export const Stats = ({ data }: StatsProps) => {
  const stats = [
    { label: "Total Members", value: data?.participants || 0, icon: Users, color: "text-blue-500" },
    { label: "Active Challenges", value: data?.challenges || 0, icon: Trophy, color: "text-amber-500" },
    { label: "Elite Certificates", value: data?.certificates || 0, icon: Award, color: "text-emerald-500" },
    { label: "Innovation Projects", value: data?.projects || 0, icon: Zap, color: "text-purple-500" },
  ];

  return (
    <section className="py-20 bg-background border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className={`w-12 h-12 rounded-2xl bg-muted flex items-center justify-center border border-border/50`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black tracking-tight">{stat.value.toLocaleString()}+</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
