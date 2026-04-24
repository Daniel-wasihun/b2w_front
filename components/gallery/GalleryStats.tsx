"use client";

import React from "react";
import { Camera, Star, Award, Users } from "lucide-react";

const stats = [
  { l: "Total Photos", v: "2.5K+", i: Camera },
  { l: "Events Covered", v: "150+", i: Star },
  { l: "Winning Moments", v: "800+", i: Award },
  { l: "Community Members", v: "15K+", i: Users },
];

export const GalleryStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
       {stats.map((s, i) => (
         <div key={i} className="bg-card p-8 rounded-[2rem] border border-border/50 text-center space-y-2 shadow-sm hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-4">
               <s.i size={24} />
            </div>
            <p className="text-3xl font-serif font-bold text-primary">{s.v}</p>
            <p className="text-[10px] font-bold capitalize text-muted-foreground">{s.l}</p>
         </div>
       ))}
    </div>
  );
};
