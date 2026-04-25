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

const staticEvents = [
  {
    id: 'static-1',
    title: { en: "Elite Tech Mentorship", am: "የሊቆች የቴክኖሎጂ አማካሪነት" },
    summary: { en: "Connect with industry leaders in Web Dev and AI for personalized guidance and career-mapping sessions.", am: "ለግል ብጁ መመሪያ እና የሥራ ካርታ ክፍለ ጊዜዎች በዌብ ልማት እና በ AI የኢንዱስትሪ መሪዎች ጋር ይገናኙ።" },
    location: "B2W Virtual Center",
    cover_image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200",
    start_date: "2026-06-15",
    end_date: "2026-06-17",
    time: "02:00 PM"
  },
  {
    id: 'static-2',
    title: { en: "Artificial Intelligence Workshop", am: "አርቲፊሻል ኢንተለጀንስ ወርክሾፕ" },
    summary: { en: "Hands-on implementation of neural networks and machine learning models in real-world business scenarios.", am: "በእውነተኛ የንግድ ሁኔታዎች ውስጥ የነርቭ አውታረ መረቦች እና የማሽን መማሪያ ሞዴሎችን ተግባራዊ ማድረግ።" },
    location: "Global Tech Hub",
    cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    start_date: "2026-07-20",
    end_date: "2026-07-20",
    time: "10:00 AM"
  },
  {
    id: 'static-3',
    title: { en: "Global Networking Summit", am: "ዓለም አቀፍ የግንኙነት ጉባኤ" },
    summary: { en: "Expansive networking opportunities with students and professionals from across 50+ countries.", am: "ከ 50 በላይ አገሮች ከተውጣጡ ተማሪዎች እና ባለሙያዎች ጋር ሰፊ የግንኙነት ዕድሎች።" },
    location: "Grand Convention Plaza",
    cover_image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1200",
    start_date: "2026-05-10",
    end_date: "2026-05-12",
    time: "09:00 AM"
  }
];

export default function EventsPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [events, setEvents] = useState<any[]>(staticEvents);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<"upcoming" | "ongoing" | "past" | "all">("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiClient.get('/v1/events');
        const apiEvents = res.data.data || [];
        setEvents([...staticEvents, ...apiEvents]);
      } catch (err) {
        console.error("Failed to fetch events");
        setEvents(staticEvents);
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

      <FeaturedEvent />

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

            <div className="flex p-1 bg-white/50 backdrop-blur-sm border border-border/50 rounded-[5px] shadow-inner">
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id as any)}
                   className={`px-6 py-2.5 text-sm font-bold transition-all rounded-[5px] ${
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
