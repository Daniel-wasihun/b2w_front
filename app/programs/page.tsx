"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";

// Programs Page Components
import { ProgramTracks } from "@/components/programs/ProgramTracks";
import { Methodology } from "@/components/programs/Methodology";

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Pathways to Achievement"
        italicWord="Achievement"
        badge="Curriculum"
        subtitle="Our programs are specialized tracks designed to cultivate specific talents and turn them into world-class expertise."
      />
      
      <ProgramTracks />
      <Methodology />
    </main>
  );
}
