"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GalleryLightboxProps {
  selectedImage: any;
  onClose: () => void;
}

export const GalleryLightbox = ({ selectedImage, onClose }: GalleryLightboxProps) => {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
          onClick={onClose}
        >
           <button 
              className="absolute top-10 right-10 text-white/50 hover:text-white p-4 transition-colors z-[110]"
              onClick={onClose}
           >
              <X size={48} />
           </button>
           <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative max-w-5xl w-full bg-card rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
           >
              <div className="lg:w-2/3 h-[400px] lg:h-[600px]">
                  <img src={selectedImage.image} className="w-full h-full object-cover rounded-[7.5px]" alt={selectedImage.title} />
              </div>
              <div className="lg:w-1/3 p-12 flex flex-col justify-center space-y-8">
                 <div className="space-y-4">
                    <Badge className="bg-secondary/10 text-secondary border-none">{selectedImage.category}</Badge>
                    <h2 className="text-4xl font-serif font-bold text-primary leading-tight">{selectedImage.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedImage.desc}
                    </p>
                 </div>
                 <div className="pt-8 border-t border-border">
                    <Button className="w-full h-14 rounded-xl font-bold">Share Memory</Button>
                 </div>
              </div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
