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

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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

        <div className="flex gap-6 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory -mx-6 px-6">
          {data.map((partner, i) => (
            <motion.a
              key={partner.id}
              href={partner.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col items-center justify-center p-8 bg-muted/5 dark:bg-white/5 rounded-[20px] border border-border/50 hover:border-primary/30 dark:hover:border-secondary/30 hover:bg-muted/10 dark:hover:bg-white/10 transition-all duration-300 h-36 min-w-[200px] md:min-w-[240px] snap-center relative"
            >
              <div className="flex flex-col items-center transition-all duration-300 group-hover:-translate-y-2">
                {isValidAssetUrl(partner.logo) ? (
                  <img 
                    src={partner.logo} 
                    alt={localize(partner.name, currentLanguage)}
                    className="max-h-16 max-w-[140px] object-contain transition-all duration-300"
                  />
                ) : (
                  <span className="font-black text-muted-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors text-center uppercase tracking-widest text-[10px]">
                    {localize(partner.name, currentLanguage)}
                  </span>
                )}
                
                {/* Name Reveal Below */}
                <span className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-primary dark:text-secondary text-center whitespace-nowrap">
                  {localize(partner.name, currentLanguage)}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
};
