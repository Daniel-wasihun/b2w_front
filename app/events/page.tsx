"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/lib/languageStore";
import axios from "axios";

// Events Page Components
import { FeaturedEvent } from "@/components/events/FeaturedEvent";
import { EventList } from "@/components/events/EventList";
import { EventNewsletter } from "@/components/events/EventNewsletter";

export default function EventsPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/events`);
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Epic Events Calendar"
        italicWord="Calendar"
        badge="Engagement"
        subtitle="Connect, collaborate, and compete in our world-class workshops and networking summits."
      />

      <FeaturedEvent />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
             <h2 className="text-3xl font-serif font-bold text-primary">Upcoming Schedule</h2>
             <div className="flex space-x-2">
                <Button variant="outline" className="rounded-xl border-border">All Types</Button>
                <Button variant="outline" className="rounded-xl border-border">Online Only</Button>
             </div>
          </div>

          <EventList 
            events={events} 
            loading={loading} 
            currentLanguage={currentLanguage} 
          />
        </div>
      </section>

      <EventNewsletter />
    </main>
  );
}
