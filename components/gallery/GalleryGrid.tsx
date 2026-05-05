"use client";

import React from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { localize } from "@/lib/utils";
import { useLanguageStore } from "@/lib/languageStore";

interface GalleryGridProps {
  items: any[];
  onSelectItem: (item: any) => void;
}

export const GalleryGrid = ({ items, onSelectItem }: GalleryGridProps) => {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
       {items.map((item) => (
         <motion.div
           layout
           key={item.id}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           className="relative group cursor-pointer overflow-hidden rounded-[8px] bg-card border border-border/50 break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500"
           onClick={() => onSelectItem(item)}
         >
            <img 
              src={item.logo} 
              alt={localize(item.name, currentLanguage)}
              className="max-h-16 max-w-[140px] object-contain transition-all duration-300 rounded-[7.5px]"
            />
           <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
              <Badge className="w-fit mb-4 bg-secondary text-primary font-bold border-none">{item.category}</Badge>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
              <div className="flex items-center text-white/70 text-[10px] font-bold capitalize">
                 <Maximize2 className="w-4 h-4 mr-2" />
                 Expand Memory
              </div>
           </div>
         </motion.div>
       ))}
    </div>
  );
};
