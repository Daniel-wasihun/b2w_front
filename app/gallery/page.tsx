"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { motion } from "framer-motion";

const images = [
  { url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200", title: "Global Summit 2025" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200", title: "Tech Workshop" },
  { url: "https://images.unsplash.com/photo-1523240715639-99a8080df18d?q=80&w=1200", title: "Innovators Meetup" },
  { url: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1200", title: "Achievement Awards" },
  { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200", title: "Leadership Retreat" },
  { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200", title: "Digital Transformation" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Visualizing Excellence"
        italicWord="Excellence"
        badge="Gallery"
        subtitle="Explore the moments that define the B2W journey through our lens of impact and innovation."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-[5px] break-inside-avoid border border-border bg-card shadow-sm hover:shadow-2xl transition-all"
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <p className="text-white font-serif text-xl font-bold">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
