"use client";

import React from "react";

interface GalleryFiltersProps {
  categories: string[];
  filter: string;
  setFilter: (filter: string) => void;
}

export const GalleryFilters = ({ categories, filter, setFilter }: GalleryFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
       {categories.map((cat) => (
         <button
           key={cat}
           onClick={() => setFilter(cat)}
           className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${
             filter === cat 
               ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
               : "bg-card text-muted-foreground hover:bg-muted border border-border/50"
           }`}
         >
           {cat}
         </button>
       ))}
    </div>
  );
};
