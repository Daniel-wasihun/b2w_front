"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EventNewsletter = () => {
  return (
    <section className="pb-24">
       <div className="container mx-auto px-6">
          <div className="bg-muted p-12 rounded-[5px] flex flex-col md:flex-row items-center justify-between gap-8 border border-border/50 shadow-sm">
             <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-[5px] bg-primary text-white flex items-center justify-center shadow-lg">
                   <Bell size={28} />
                </div>
                <div>
                   <h3 className="text-2xl font-serif font-bold text-primary">Never Miss an Opportunity</h3>
                   <p className="text-muted-foreground mt-1">Get real-time alerts for new competitions and workshops.</p>
                </div>
             </div>
             <div className="flex w-full md:w-auto gap-2">
                <input type="email" placeholder="Your Email" className="bg-card border border-border rounded-[5px] px-6 h-14 outline-none focus:border-primary w-full md:w-80 shadow-sm" />
                <Button className="h-14 px-8 rounded-[5px] font-bold">Notify Me</Button>
             </div>
          </div>
       </div>
    </section>
  );
};
