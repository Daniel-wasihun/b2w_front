"use client";

import React from "react";
import { motion } from "framer-motion";
import { localize, isValidAssetUrl } from "@/lib/utils";
import { useLanguageStore } from "@/lib/languageStore";

interface Partner {
  id: number;
  name: any;
  logo: string;
  website?: string;
  type: string;
}

interface PartnersProps {
  data: Partner[];
  title?: React.ReactNode;
  subtitle?: string;
}

export const Partners = ({ data = [], title, subtitle }: PartnersProps) => {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);

  if (!data || data.length === 0) return null;

  // Duplicate data to ensure a seamless infinite loop
  const displayData = [...data, ...data, ...data];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-secondary font-bold tracking-widest uppercase text-xs"
          >
            Alliances & Sponsors
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
          >
            {title || <>Strategic <span className="italic text-secondary">Partners</span></>}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Infinite Horizontal Scroll Container */}
      <div className="relative w-full">
        {/* Gradients for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div 
          className="flex gap-8 w-max px-6"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {displayData.map((partner, i) => (
            <motion.a
              key={`${partner.id}-${i}`}
              href={partner.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-8 bg-muted/5 dark:bg-white/5 rounded-[8px] border border-border/50 hover:border-primary/30 dark:hover:border-secondary/30 hover:bg-muted/10 dark:hover:bg-white/10 transition-all duration-500 h-36 min-w-[200px] md:min-w-[240px] relative"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex flex-col items-center">
                 {isValidAssetUrl(partner.logo) ? (
                    <motion.img 
                      src={partner.logo} 
                      alt={localize(partner.name, currentLanguage)}
                      className="max-h-16 max-w-[140px] object-contain transition-all duration-500 rounded-[7.5px] group-hover:scale-110"
                    />
                 ) : (
                   <span className="font-black text-foreground/80 group-hover:text-primary dark:group-hover:text-secondary transition-colors text-center uppercase tracking-widest text-xs">
                     {localize(partner.name, currentLanguage)}
                   </span>
                 )}
                
                {/* Name Reveal Below */}
                <span className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary dark:text-secondary text-center whitespace-nowrap transition-all duration-500 opacity-60 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                  {localize(partner.name, currentLanguage)}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
