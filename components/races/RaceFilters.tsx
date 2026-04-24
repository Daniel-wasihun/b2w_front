"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RaceFilters = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-8 mb-16">
       <div className="flex flex-wrap gap-3">
          {["All", "Ongoing", "Upcoming", "Finished"].map(status => (
            <Button key={status} variant={status === "All" ? "default" : "outline"} className="rounded-xl px-8 h-12 font-bold transition-all hover:scale-105">
              {status}
            </Button>
          ))}
       </div>
       <div className="flex items-center space-x-3 text-muted-foreground bg-card px-6 py-3 rounded-2xl border border-border/50 shadow-sm">
          <Search size={18} className="text-primary" />
          <span className="text-sm font-bold capitalize">Global Discovery</span>
       </div>
    </div>
  );
};
