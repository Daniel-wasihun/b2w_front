"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, Globe, Share2, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const infoItems = [
  { icon: Mail, t: "Email Us", v: "hello@borntowin.initiative" },
  { icon: Phone, t: "Call Us", v: "+251 900 123 456" },
  { icon: MapPin, t: "Visit Us", v: "Woldia University, Ethiopia" },
  { icon: Clock, t: "Working Hours", v: "Mon - Fri, 9AM - 5PM" }
];

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
       <div className="bg-primary p-12 rounded-[5px] text-white space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[60px] rounded-[5px]" />
          <div className="space-y-4">
             <h3 className="text-3xl font-serif font-bold">Contact Info</h3>
             <p className="text-white/60 text-sm">Reach out through any of these channels for immediate assistance.</p>
          </div>
          
          <div className="space-y-8">
             {infoItems.map((item, i) => (
               <div key={i} className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-[5px] bg-white/10 flex items-center justify-center shrink-0">
                     <item.icon size={20} className="text-secondary" />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold capitalize text-white/50">{item.t}</p>
                     <p className="font-bold">{item.v}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="pt-10 border-t border-white/10 flex space-x-4">
             {[Share2, MessageCircle, Heart].map((Icon, i) => (
               <div key={i} className="w-10 h-10 rounded-[5px] bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                  <Icon size={18} />
               </div>
             ))}
          </div>
       </div>

       <div className="bg-card p-10 rounded-[5px] border border-border/50 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-[5px] bg-secondary/10 flex items-center justify-center text-secondary mx-auto">
             <Globe size={32} />
          </div>
          <h4 className="text-xl font-serif font-bold text-primary">Global Presence</h4>
          <p className="text-muted-foreground text-sm">We are expanding our mentorship network across all major universities.</p>
          <Button variant="outline" className="w-full rounded-[5px] border-secondary/20 text-secondary hover:bg-secondary/5">View Network</Button>
       </div>
    </div>
  );
};
