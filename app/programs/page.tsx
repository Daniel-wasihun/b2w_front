"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { ProgramTracks } from "@/components/programs/ProgramTracks";
import { Methodology } from "@/components/programs/Methodology";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProgramsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        const [pageRes, landingRes] = await Promise.all([
          apiClient.get("/v1/programs-page"),
          apiClient.get("/v1/landing")
        ]);
        
        setData({
          hero: pageRes.data.data.hero,
          methodology: pageRes.data.data.methodology,
          benefits: pageRes.data.data.benefits,
          programs: landingRes.data.data.programs // Reusing landing programs for tracks
        });
      } catch (err) {
        console.error("Failed to fetch programs data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramsData();
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <Skeleton className="h-[400px] w-full rounded-[8px]" />
        <div className="grid grid-cols-3 gap-8 mt-12">
           <Skeleton className="h-64 w-full" />
           <Skeleton className="h-64 w-full" />
           <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </main>
  );

  const hero = data?.hero || {
    title: "Stipend-Based Mastery",
    italicWord: "Mastery",
    badge: "Opportunity",
    subtitle: "Bridging the gap between talent and the global workforce through internships, hackathons, and certified mastery programs."
  };

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title={hero.title}
        italicWord={hero.italic_word || hero.italicWord}
        badge={hero.badge}
        subtitle={hero.subtitle}
      />
      
      <ProgramTracks programs={data?.programs || []} />
      <Methodology methods={data?.methodology || []} />

      {/* Program Benefits Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center">
              What we <span className="italic text-secondary">provide</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(data?.benefits || []).map((benefit: any, i: number) => (
                <div key={i} className="flex items-start space-x-6 group">
                  <div className="text-4xl bg-white/10 p-4 rounded-[5px] group-hover:bg-secondary transition-colors">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
