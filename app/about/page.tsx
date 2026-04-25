"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";

// About Page Components
import { Narrative } from "@/components/about/Narrative";
import { Philosophy } from "@/components/about/Philosophy";
import { Leadership } from "@/components/about/Leadership";


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Our Story of Excellence"
        italicWord="Excellence"
        badge="About B2W"
        subtitle="Empowering the next generation of leaders through healthy competition and verified achievements."
      />
      
      <Narrative />
      <Leadership />
      <Philosophy />

    </main>
  );
}
