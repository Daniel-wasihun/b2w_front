"use client";

import React from "react";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/premium-card";
import { localize } from "@/lib/utils";
import { Bell } from "lucide-react";

interface EventListProps {
  events: any[];
  loading: boolean;
  currentLanguage: string;
  category?: string;
}

export const EventList = ({ events, loading, currentLanguage, category }: EventListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {[1, 2, 3].map(i => (
           <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-[5px]" />
         ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-card/50 p-20 rounded-[5px] border border-dashed border-border text-center backdrop-blur-sm">
         <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
         <h3 className="text-xl font-serif font-bold text-primary mb-2">No {category} events</h3>
         <p className="text-muted-foreground font-medium italic">
           {category === 'upcoming' && "Stay tuned! We are finalizing new event dates."}
           {category === 'ongoing' && "There are no events happening at this moment."}
           {category === 'past' && "Our event history is currently being archived."}
         </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event: any, i: number) => {
        const eventDate = new Date(event.start_date || Date.now());
        const formattedDate = `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}`;
        
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <PremiumCard
              title={localize(event.title, currentLanguage)}
              description={
                <div className="space-y-3">
                  <div className="flex flex-col gap-1 text-[13px]">
                    <span className="font-bold text-primary flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2" />
                      {event.location || "Main Campus Hall"}
                    </span>
                    <span className="text-muted-foreground italic">
                      {event.time || "09:00 AM - 05:00 PM"}
                    </span>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed">
                    {localize(event.summary, currentLanguage) || "Join us for this transformative session where we explore new horizons of student excellence and leadership."}
                  </p>
                </div>
              }
              image={event.cover_image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000"}
              badge={formattedDate}
              badgeVariant={new Date(event.start_date) > new Date() ? "success" : "secondary"}
              onClick={() => console.log(`Opening event ${event.id}`)}
              socials={[
                { type: "linkedin", url: "#" }
              ]}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
