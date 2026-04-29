"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Layers, ArrowRight, LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface MethodologyProps {
  methods: any[];
}

export const Methodology = ({ methods }: MethodologyProps) => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 text-[20rem] font-serif font-bold text-primary/[0.02] select-none pointer-events-none">
        B2W
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="flex items-center space-x-3 mb-6 justify-center lg:justify-start">
               <span className="w-12 h-px bg-secondary" />
               <span className="text-xs font-bold uppercase tracking-widest text-secondary">The Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary leading-tight">
              A Methodology Built for <span className="italic text-secondary">Champions</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md text-center lg:text-left leading-relaxed">
            We've distilled decades of performance psychology into a three-step mastery cycle designed to turn talent into undisputed excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((m, i) => {
            const IconComponent = (LucideIcons as any)[m.icon] || Zap;
            
            return (
              <motion.div
                key={m.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
              >
                <div className={`relative h-full bg-card rounded-[8px] p-12 border border-primary/10 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group-hover:border-primary/20 overflow-hidden`}>
                  <span className="absolute -top-4 -right-4 text-9xl font-serif font-bold text-primary/[0.03] group-hover:text-primary/[0.06] transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-20 h-20 rounded-[8px] bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className={`w-10 h-10 text-primary`} />
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-primary mb-6 group-hover:text-secondary transition-colors">
                      {m.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-lg flex-grow">
                      {m.description}
                    </p>

                    <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between group/link cursor-pointer">
                      <span className="text-sm font-bold text-primary/60 group-hover/link:text-primary transition-colors">Explore Step {i + 1}</span>
                      <div className="w-10 h-10 rounded-[8px] bg-muted flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
