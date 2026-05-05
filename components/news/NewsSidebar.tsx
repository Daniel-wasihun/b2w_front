"use client";

import React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const NewsSidebar = () => {
  return (
    <div className="hidden lg:block space-y-10">
       <div className="bg-card p-8 rounded-[8px] border border-border/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
             <Search className="w-5 h-5 text-primary" />
             <h3 className="font-bold">Search Articles</h3>
          </div>
          <input 
            type="text" 
            placeholder="Keywords..." 
            className="w-full h-12 bg-muted rounded-[8px] px-4 text-sm outline-none border border-border focus:border-primary/50"
          />
       </div>

       <div className="bg-card p-8 rounded-[8px] border border-border/50 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
             <Filter className="w-5 h-5 text-secondary" />
             <h3 className="font-bold">Categories</h3>
          </div>
          <div className="space-y-3">
             {["All News", "Competition Updates", "Success Stories", "Tech Trends", "Announcements"].map((cat) => (
               <div key={cat} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{cat}</span>
                  <Badge variant="outline" className="text-[10px] rounded-[8px]">12</Badge>
               </div>
             ))}
          </div>
       </div>

       <div className="bg-primary/5 p-8 rounded-[8px] border border-primary/10">
          <h3 className="font-bold text-primary mb-4">Newsletter</h3>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
            Get the latest winning strategies delivered to your inbox every week.
          </p>
          <Button className="w-full rounded-[8px] shadow-glow-primary">Subscribe</Button>
       </div>
    </div>
  );
};
