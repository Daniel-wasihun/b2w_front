"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { useLanguageStore } from "@/lib/languageStore";
import apiClient from "@/lib/apiClient";

// Races Page Components
import { RaceFilters } from "@/components/races/RaceFilters";
import { RaceList } from "@/components/races/RaceList";
import { RaceSupportCTA } from "@/components/races/RaceSupportCTA";

export default function RacesPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [races, setRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await apiClient.get('/v1/races');
        setRaces(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch challenges", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, []);

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Arena of Challenges"
        italicWord="Challenges"
        badge="Competitions"
        subtitle="Push your limits and compete with the brightest minds across the university. Claim your victory and join the elite league."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <RaceFilters />
          <RaceList 
            races={races} 
            loading={loading} 
            currentLanguage={currentLanguage} 
          />
        </div>
      </section>

      <RaceSupportCTA />
    </main>
  );
}
