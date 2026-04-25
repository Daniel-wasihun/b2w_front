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
        title="Stipend-Based Mastery"
        italicWord="Mastery"
        badge="Opportunity"
        subtitle="Bridging the gap between talent and the global workforce through internships, hackathons, and certified mastery programs."
      />
      
      <ProgramTracks />
      <Methodology />

      {/* Program Benefits Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center">
              What we <span className="italic text-secondary">provide</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { 
                  icon: "💰", 
                  title: "Stipend-based participation", 
                  desc: "We value your time, energy, and dedication. Earn while you learn and contribute." 
                },
                { 
                  icon: "📜", 
                  title: "Verifiable certification", 
                  desc: "Advanced credentials from our legally registered organizations in the United States." 
                },
                { 
                  icon: "🚀", 
                  title: "Performance opportunities", 
                  desc: "Clear paths to work with us in training, coaching, and professional internships." 
                },
                { 
                  icon: "🌍", 
                  title: "Global Network", 
                  desc: "Unparalleled access to a worldwide mentorship and professional opportunity network." 
                },
                { 
                  icon: "🧠", 
                  title: "Hands-on Mastery", 
                  desc: "Skill-based learning perfectly aligned with high-impact real-world scenarios." 
                },
                { 
                  icon: "☑️", 
                  title: "Multidisciplinary Exposure", 
                  desc: "Expertise across Web Dev, AI, ML, Mobile, Leadership, Management, Law, and more." 
                }
              ].map((benefit, i) => (
                <div key={i} className="flex items-start space-x-6 group">
                  <div className="text-4xl bg-white/10 p-4 rounded-[5px] group-hover:bg-secondary transition-colors">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.desc}</p>
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
