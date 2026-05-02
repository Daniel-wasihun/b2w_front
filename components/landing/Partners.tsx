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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {data.map((partner, i) => (
            <motion.a
              key={partner.id}
              href={partner.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group flex items-center justify-center p-8 bg-muted/5 rounded-[5px] border border-border/50 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-32"
            >
              {isValidAssetUrl(partner.logo) ? (
                <img 
                  src={partner.logo} 
                  alt={localize(partner.name, currentLanguage)}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                />
              ) : (
                <span className="font-bold text-muted-foreground group-hover:text-primary transition-colors text-center uppercase tracking-widest text-[10px]">
                  {localize(partner.name, currentLanguage)}
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
