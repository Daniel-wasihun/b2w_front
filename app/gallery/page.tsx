"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";

// Gallery Page Components
import { GalleryStats } from "@/components/gallery/GalleryStats";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

const galleryItems = [
  { id: 1, title: "Grand Finale 2025", category: "Ceremony", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000", desc: "A night of triumph and celebration for the top performers." },
  { id: 2, title: "Tech Hackathon", category: "Competition", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000", desc: "48 hours of non-stop coding and innovation." },
  { id: 3, title: "Leadership Workshop", category: "Training", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000", desc: "Developing the leaders of tomorrow." },
  { id: 4, title: "Design Sprint Showcase", category: "Exhibition", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000", desc: "Where creativity meets functionality." },
  { id: 5, title: "Innovation Awards", category: "Ceremony", image: "https://images.unsplash.com/photo-1531050171669-01449b685ad0?q=80&w=1000", desc: "Recognizing bold ideas that solve real problems." },
  { id: 6, title: "Networking Night", category: "Event", image: "https://images.unsplash.com/photo-1528605248644-14dd04cb21c7?q=80&w=1000", desc: "Connecting students with industry giants." },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Ceremony", "Competition", "Training", "Exhibition"];

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Visual Showcase of Victory"
        italicWord="Victory"
        badge="Archive"
        subtitle="Relive the moments that define the Born To Win legacy. Every frame tells a story of perseverance and success."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <GalleryStats />
          
          <GalleryFilters 
            categories={categories} 
            filter={filter} 
            setFilter={setFilter} 
          />

          <GalleryGrid 
            items={filteredItems} 
            onSelectItem={setSelectedImage} 
          />
        </div>
      </section>

      <GalleryLightbox 
        selectedImage={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </main>
  );
}
