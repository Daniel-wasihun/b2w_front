"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Palette, Briefcase, Microscope, Lightbulb, Code, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Elite Tech Accelerator",
    category: "Technology",
    icon: Terminal,
    desc: "Intensive coding challenges and hackathons designed to push the boundaries of software development. Master full-stack architectures and emerging tech.",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    features: ["System Design", "Cloud Computing", "AI Integration"]
  },
  {
    title: "Creative Design Studio",
    category: "Design",
    icon: Palette,
    desc: "A sanctuary for artists and UI/UX designers to redefine digital aesthetics. Focus on human-centered design and emotional interaction.",
    color: "text-purple-600",
    bg: "bg-purple-600/10",
    features: ["Visual Theory", "Prototyping", "UX Research"]
  },
  {
    title: "Business Strategy Hub",
    category: "Business",
    icon: Briefcase,
    desc: "Developing the next generation of CEOs through strategic planning. Learn to navigate global markets and lead complex organizations.",
    color: "text-emerald-600",
    bg: "bg-emerald-600/10",
    features: ["Market Analysis", "Lead Ops", "Fiscal Growth"]
  },
  {
    title: "Innovation Lab",
    category: "R&D",
    icon: Microscope,
    desc: "Scientific research and development programs focused on solving global challenges through empirical analysis and bold experimentation.",
    color: "text-amber-600",
    bg: "bg-amber-600/10",
    features: ["Ethical Research", "Data Sci", "Lab Protocol"]
  },
  {
    title: "Entrepreneurship Wing",
    category: "Startup",
    icon: Lightbulb,
    desc: "From idea to impact. We provide the mentorship and network needed to launch successful ventures that disrupt established industries.",
    color: "text-rose-600",
    bg: "bg-rose-600/10",
    features: ["Pitch Deck", "Angel Funding", "Scale-up"]
  },
  {
    title: "Cyber Security Wing",
    category: "Security",
    icon: Code,
    desc: "Advanced training in offensive and defensive security strategies. Protect the digital frontier and master the art of ethical hacking.",
    color: "text-indigo-600",
    bg: "bg-indigo-600/10",
    features: ["Pentesting", "Cryptography", "SOC Ops"]
  }
];

export const ProgramTracks = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-card overflow-hidden flex flex-col h-full">
                <CardHeader className="p-10">
                  <div className={`${program.bg} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6`}>
                    <program.icon className={`w-10 h-10 ${program.color}`} />
                  </div>
                  <Badge variant="outline" className="mb-4 capitalize text-[10px] font-bold border-primary/20 text-primary">
                     {program.category}
                  </Badge>
                  <CardTitle className="text-3xl font-serif font-bold group-hover:text-primary transition-colors leading-tight">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-6 text-base leading-relaxed">
                    {program.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-4">
                   <div className="flex flex-wrap gap-2">
                      {program.features.map(f => (
                         <span key={f} className="text-[10px] font-bold capitalize bg-muted px-3 py-1.5 rounded-lg text-muted-foreground">
                            {f}
                         </span>
                      ))}
                   </div>
                </CardContent>
                <CardFooter className="p-10 pt-6 mt-auto border-t border-border/50">
                  <Button variant="ghost" className="p-0 text-primary font-bold hover:bg-transparent group/btn text-lg">
                     Enroll in Track <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
