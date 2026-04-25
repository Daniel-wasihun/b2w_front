"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Layers, ArrowRight } from "lucide-react";

const methods = [
  { 
    id: "01",
    icon: Zap, 
    t: "Immersive Learning", 
    d: "Hands-on projects from day one. No theory without practice. Dive deep into real-world architectures and master complex systems by building them from scratch.",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-600",
    shadow: "shadow-blue-500/10"
  },
  { 
    id: "02",
    icon: Target, 
    t: "Real-world Simulation", 
    d: "Competitions that mirror actual industry challenges. Face the same pressure as elite developers and managers in our curated race environments.",
    color: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-600",
    shadow: "shadow-amber-500/10"
  },
  { 
    id: "03",
    icon: Layers, 
    t: "Tiered Recognition", 
    d: "Badges and certificates that grow with your skills. Our blockchain-verified credentials are more than just paper—they are proof of your champion status.",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-600",
    shadow: "shadow-emerald-500/10"
  }
];

export const Methodology = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative background text */}
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
          {methods.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative"
            >
              <div className={`relative h-full bg-card rounded-[8px] p-12 border border-primary/10 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group-hover:border-primary/20 overflow-hidden`}>
                {/* Number Overlay */}
                <span className="absolute -top-4 -right-4 text-9xl font-serif font-bold text-primary/[0.03] group-hover:text-primary/[0.06] transition-colors">
                  {m.id}
                </span>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-20 h-20 rounded-[8px] bg-linear-to-br ${m.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                    <m.icon className={`w-10 h-10 ${m.iconColor}`} />
                  </div>

                  <h3 className="text-3xl font-serif font-bold text-primary mb-6 group-hover:text-secondary transition-colors">
                    {m.t}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg flex-grow">
                    {m.d}
                  </p>

                  <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between group/link cursor-pointer">
                    <span className="text-sm font-bold text-primary/60 group-hover/link:text-primary transition-colors">Explore Step {m.id}</span>
                    <div className="w-10 h-10 rounded-[8px] bg-muted flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
