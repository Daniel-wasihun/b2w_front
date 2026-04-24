"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Users, Zap } from "lucide-react";

const stats = [
  { label: "Active Users", value: "15K+", icon: Users, color: "text-blue-600", bg: "bg-blue-500/10" },
  { label: "Competitions", value: "250+", icon: Trophy, color: "text-amber-600", bg: "bg-amber-500/10" },
  { label: "Certificates", value: "8K+", icon: Award, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { label: "Success Rate", value: "98%", icon: Zap, color: "text-purple-600", bg: "bg-purple-500/10" },
];

export const Stats = () => {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-10 rounded-[3rem] shadow-sm border border-border/50 text-center flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className={`${stat.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-5xl font-serif font-bold text-primary group-hover:text-secondary transition-colors duration-500">
                {stat.value}
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-4">{stat.label}</p>
              
              {/* Subtle underline decoration */}
              <div className="w-10 h-1 bg-secondary/20 rounded-full mt-6 group-hover:w-20 group-hover:bg-secondary transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
