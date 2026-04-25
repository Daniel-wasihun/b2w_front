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

const staticRaces = [
  {
    id: 'race-1',
    title: { en: "The 2026 AI Innovation Cup", am: "የ 2026 የ AI ፈጠራ ዋንጫ" },
    description: { en: "A race to build the most impactful AI solution for sustainable energy. Compete for a total prize pool of $10,000.", am: "ለዘላቂ ኢነርጂ በጣም ተፅዕኖ ያለው የ AI መፍትሄ ለመገንባት የሚደረግ ውድድር። በጠቅላላው የ 10,000 ዶላር የሽልማት ገንዳ ይወዳደሩ።" },
    cover_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
    category: { name: "Technology" },
    end_date: "2026-08-30",
    participants_count: 850
  },
  {
    id: 'race-2',
    title: { en: "Global Business Strategy Sprint", am: "ዓለም አቀፍ የቢዝነስ ስትራቴጂ ስፕሪንት" },
    description: { en: "Master the art of corporate turnaround and strategic planning in this 4-week intensive business race.", am: "በዚህ የ 4 ሳምንት ከፍተኛ የቢዝነስ ውድድር ውስጥ የኮርፖሬት ለውጥ እና የስትራቴጂክ እቅድ ጥበብን ይቆጣጠሩ።" },
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    category: { name: "Business" },
    end_date: "2026-09-15",
    participants_count: 1200
  },
  {
    id: 'race-3',
    title: { en: "Design for Impact Challenge", am: "ለተፅዕኖ ዲዛይን የማድረግ ፈተና" },
    description: { en: "Redefine user experiences for public service digital platforms. Focus on accessibility and aesthetic excellence.", am: "ለሕዝብ አገልግሎት ዲጂታል መድረኮች የተጠቃሚ ተሞክሮዎችን እንደገና ይግለጹ። በተደራሽነት እና በውበት ጥራት ላይ ያተኩሩ።" },
    cover_image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200",
    category: { name: "Design" },
    end_date: "2026-10-01",
    participants_count: 540
  }
];

export default function RacesPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [races, setRaces] = useState<any[]>(staticRaces);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await apiClient.get('/v1/races');
        const apiRaces = res.data.data || [];
        setRaces([...staticRaces, ...apiRaces]);
      } catch (err) {
        console.error("Failed to fetch challenges");
        setRaces(staticRaces);
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
