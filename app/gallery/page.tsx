"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await apiClient.get("/v1/gallery");
        setAlbums(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ["All", ...new Set(albums.map(a => a.title))];

  // Flatten items for display
  const allItems = albums.flatMap(album => 
    album.items.map((item: any) => ({
      ...item,
      albumTitle: album.title
    }))
  );

  const filteredItems = activeCategory === "All" 
    ? allItems 
    : allItems.filter(item => item.albumTitle === activeCategory);

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
            {loading ? (
              [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-32 rounded-[8px]" />)
            ) : (
              categories.map((cat) => (
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
              ))
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-video rounded-[8px] overflow-hidden border border-border">
                    <Skeleton className="w-full h-full" />
                  </div>
                ))
              ) : (
                filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="relative group overflow-hidden rounded-[8px] border border-border bg-card shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 h-1/2">
                       <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-1">{item.albumTitle}</span>
                       <p className="text-white font-serif text-lg font-bold">{item.title}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
