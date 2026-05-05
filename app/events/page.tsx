"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/lib/languageStore";
import apiClient from "@/lib/apiClient";

// Events Page Components
import { FeaturedEvent } from "@/components/events/FeaturedEvent";
import { EventList } from "@/components/events/EventList";
import { EventNewsletter } from "@/components/events/EventNewsletter";

export default function EventsPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"upcoming" | "ongoing" | "past" | "all">("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiClient.get('/v1/events');
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event: any) => {
    const now = new Date();
    const start = new Date(event.start_date);
    const end = new Date(event.end_date || event.start_date);

    if (activeCategory === "all") return true;
    if (activeCategory === "upcoming") return start > now;
    if (activeCategory === "ongoing") return start <= now && end >= now;
    if (activeCategory === "past") return end < now;
    return true;
  });

  const categories = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "ongoing", label: "Ongoing" },
    { id: "past", label: "Past Events" },
  ];

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Epic Events Calendar"
        italicWord="Calendar"
        badge="Engagement"
        subtitle="Connect, collaborate, and compete in our world-class workshops and networking summits."
      />


      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
               <h2 className="text-4xl font-serif font-bold text-primary capitalize">
                 {activeCategory} <span className="italic text-secondary">Schedule</span>
               </h2>
               <p className="text-muted-foreground mt-4">
                 {activeCategory === 'all' && "Explore our complete timeline of events, including future, current, and past gatherings."}
                 {activeCategory === 'upcoming' && "Don't miss out on these future opportunities to excel."}
                 {activeCategory === 'ongoing' && "Happening right now. Join the action while it lasts."}
                 {activeCategory === 'past' && "Reflect on our previous milestones and successful gatherings."}
               </p>
            </div>

            <div className="flex p-1 bg-white/50 backdrop-blur-sm border border-border/50 rounded-[8px] shadow-inner">
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id as any)}
                   className={`px-6 py-2.5 text-sm font-bold transition-all rounded-[8px] ${
                     activeCategory === cat.id 
                       ? "bg-primary text-white shadow-lg" 
                       : "text-muted-foreground hover:text-primary"
                   }`}
                 >
                   {cat.label}
                 </button>
               ))}
            </div>
          </div>

          <EventList 
            events={filteredEvents} 
            loading={loading} 
            currentLanguage={currentLanguage} 
            category={activeCategory}
          />
        </div>
      </section>

      <EventNewsletter />
    </main>
  );
}
