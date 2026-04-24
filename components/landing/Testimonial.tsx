"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    text: "The Born To Win initiative completely changed my career path. The certificates I earned here were the key to my first job at a top tech firm.",
    author: "Abebe Kebede",
    role: "Senior Developer @ TechOne",
  },
  {
    text: "Competing in the elite races helped me sharpen my problem-solving skills under pressure. It's more than a club, it's a growth engine.",
    author: "Sara Yohannes",
    role: "Project Manager @ InnovateX",
  },
  {
    text: "Winning the 2025 Creative Sprint was a turning point. The community support and professional recognition are unparalleled.",
    author: "Dawit Molla",
    role: "UX Designer @ CreativeFlow",
  },
  {
    text: "I found my co-founders through the club's events. The networking opportunities for ambitious students are simply the best in the country.",
    author: "Leyla Ahmed",
    role: "Founder @ EcoStride",
  }
];

export const Testimonial = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-1px bg-secondary" />
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
              Stories of <span className="italic text-secondary">Victory</span> from our Members
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("left")}
              className="rounded-full w-12 h-12 border-border/50 hover:bg-primary hover:text-white transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("right")}
              className="rounded-full w-12 h-12 border-border/50 hover:bg-primary hover:text-white transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-full md:min-w-[450px] lg:min-w-[550px] snap-center"
            >
              <div className="premium-card p-10 md:p-12 relative h-full flex flex-col justify-between group hover:border-primary/20 transition-colors">
                <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/5 group-hover:text-primary/10 transition-colors" />
                
                <div className="mb-8">
                  <div className="flex space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-foreground/90 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-8 border-t border-border/50">
                  <div className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{t.author}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
