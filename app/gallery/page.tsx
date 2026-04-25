"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["All", "Events", "Trainings", "Projects"];

const images = [
  { url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200", title: "Global Summit 2025", category: "Events" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200", title: "Tech Workshop", category: "Trainings" },
  { url: "https://images.unsplash.com/photo-1523240715639-99a8080df18d?q=80&w=1200", title: "Innovators Meetup", category: "Projects" },
  { url: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1200", title: "Achievement Awards", category: "Events" },
  { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200", title: "Leadership Retreat", category: "Trainings" },
  { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200", title: "Digital Transformation", category: "Projects" },
  { url: "https://images.unsplash.com/photo-1475721027785-f74dea327912?q=80&w=1200", title: "Community Launch", category: "Events" },
  { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200", title: "Coding Bootcamp", category: "Trainings" },
  { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200", title: "System Architecture", category: "Projects" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Visualizing Excellence"
        italicWord="Excellence"
        badge="Gallery"
        subtitle="Explore the moments that define the B2W journey through our lens of impact and innovation."
      />

      {/* Filter Bar */}
      <section className="pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-[8px] text-sm font-bold transition-all border",
                  activeCategory === cat 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                    : "bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="relative group overflow-hidden rounded-[8px] border border-border bg-card shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 h-1/2">
                     <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-1">{img.category}</span>
                     <p className="text-white font-serif text-lg font-bold">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
