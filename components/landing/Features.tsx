"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Award, Users, ChevronRight } from "lucide-react";

const features = [
  { 
    title: "Real-time Competition", 
    desc: "Engage in live races with instant feedback and live leaderboards. Experience the adrenaline of competing with peers in real-world scenarios.",
    icon: Target,
    bg: "bg-blue-500/10",
    color: "text-blue-600",
    accent: "bg-blue-600"
  },
  { 
    title: "Verified Certification", 
    desc: "Earn blockchain-backed certificates recognized by top industry leaders. Build a portfolio that speaks volumes about your verified expertise.",
    icon: Award,
    bg: "bg-emerald-500/10",
    color: "text-emerald-600",
    accent: "bg-emerald-600"
  },
  { 
    title: "Elite Community", 
    desc: "Connect with high-achievers and mentors from diverse departments. Join a global network of students who are defining the future.",
    icon: Users,
    bg: "bg-amber-500/10",
    color: "text-amber-600",
    accent: "bg-amber-600"
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 text-[15rem] font-serif font-bold text-primary/[0.01] select-none pointer-events-none rotate-90">
        FEATURES
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-[5px] bg-secondary/10 border border-secondary/20">
             <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Why Choose Us</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary">
            Designed for <span className="italic text-secondary">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            We provide the tools and platform for students to transcend their limits and achieve global recognition through a scientifically proven growth framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-12 bg-card rounded-[5px] border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                {/* Accent line */}
                <div className={`absolute top-0 left-0 w-full h-1.5 ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className={`${feature.bg} w-20 h-20 rounded-[5px] flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform duration-500`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-primary mb-6 group-hover:text-secondary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg mb-10 flex-grow">
                  {feature.desc}
                </p>

                <div className="flex items-center text-primary font-bold text-sm group/btn cursor-pointer">
                   <span>Learn More</span>
                   <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
