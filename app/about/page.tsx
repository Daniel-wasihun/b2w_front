"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { Narrative } from "@/components/about/Narrative";
import { Philosophy } from "@/components/about/Philosophy";
import { Leadership } from "@/components/about/Leadership";
import { Partners } from "@/components/landing/Partners";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await apiClient.get("/v1/about-page");
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch about data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <Skeleton className="h-[400px] w-full rounded-[8px]" />
        <Skeleton className="h-96 w-full mt-12" />
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Our Story of Excellence"
        italicWord="Excellence"
        badge="About B2W"
        subtitle="Empowering the next generation of leaders through healthy competition and verified achievements."
      />
      
      <Narrative narratives={data?.narrative || []} />
      <Leadership leaders={data?.leadership || []} />
      <Philosophy philosophies={data?.philosophy || []} />
      <Partners 
        data={data?.partners || []} 
        title={<>Our Strategic <span className="italic text-secondary">Alliances</span></>}
        subtitle="We collaborate with world-class organizations to ensure our community has access to the best opportunities and resources."
      />
    </main>
  );
}
