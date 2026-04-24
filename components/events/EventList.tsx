"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Share2, Globe, Heart, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { localize } from "@/lib/utils";

interface EventListProps {
  events: any[];
  loading: boolean;
  currentLanguage: string;
}

export const EventList = ({ events, loading, currentLanguage }: EventListProps) => {
  if (loading) {
    return (
      <div className="space-y-8">
         {[1, 2, 3].map(i => (
           <div key={i} className="h-64 bg-muted animate-pulse rounded-3xl" />
         ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-card p-20 rounded-[3rem] border-2 border-dashed text-center">
         <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
         <p className="text-muted-foreground font-bold italic">Stay tuned! We are finalizing new event dates.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {events.map((event: any, i: number) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="flex flex-col md:flex-row overflow-hidden border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] bg-card group">
            <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
               <img 
                src={event.cover_image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000"} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={localize(event.title, currentLanguage)}
               />
               <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-md p-3 rounded-2xl text-center min-w-[70px] shadow-lg">
                  <p className="text-2xl font-bold text-primary leading-none">
                    {new Date(event.start_date || Date.now()).getDate()}
                  </p>
                  <p className="text-[10px] font-bold capitalize text-secondary mt-1">
                    {new Date(event.start_date || Date.now()).toLocaleString('default', { month: 'short' })}
                  </p>
               </div>
            </div>
            <div className="flex-grow p-10 md:p-14 flex flex-col">
               <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-none">Workshop</Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-none font-bold capitalize text-[9px] px-3">Free Entry</Badge>
               </div>
               <h2 className="text-3xl font-serif font-bold text-primary mb-6 group-hover:text-secondary transition-colors leading-tight">
                 {localize(event.title, currentLanguage)}
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="flex items-center text-sm text-muted-foreground font-bold">
                     <Clock className="w-4 h-4 mr-2 text-secondary" />
                     {event.time || "09:00 AM"}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground font-bold">
                     <MapPin className="w-4 h-4 mr-2 text-secondary" />
                     {event.location || "Main Hall"}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground font-bold">
                     <Users className="w-4 h-4 mr-2 text-secondary" />
                     {event.participants_count || "500+"} Joined
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground font-bold">
                     <Globe className="w-4 h-4 mr-2 text-secondary" />
                     {event.type || "Hybrid"}
                  </div>
               </div>
               <div className="mt-auto flex items-center justify-between">
                  <Button size="lg" className="rounded-xl px-10 h-14 font-bold shadow-glow-secondary">
                    Register for Event
                  </Button>
                  <div className="flex space-x-2">
                     <button className="p-3 rounded-xl hover:bg-muted transition-colors border border-border">
                        <Share2 className="w-5 h-5 text-muted-foreground" />
                     </button>
                     <button className="p-3 rounded-xl hover:bg-muted transition-colors border border-border">
                        <Heart className="w-5 h-5 text-muted-foreground" />
                     </button>
                  </div>
               </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
