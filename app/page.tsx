"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";

// Landing Page Components
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { Testimonial } from "@/components/landing/Testimonial";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonial />
      <CTA />
    </main>
  );
}
