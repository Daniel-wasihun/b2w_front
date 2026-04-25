"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";

// Landing Page Components
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { Testimonial } from "@/components/landing/Testimonial";
import { CTA } from "@/components/landing/CTA";
import { PremiumCard } from "@/components/ui/premium-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/lib/languageStore";
import { localize } from "@/lib/utils";

export default function LandingPage() {
  const router = useRouter();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <Hero />
      <Stats />
      
      {/* Programs Section */}
      <section className="py-24 bg-muted/10 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="text-secondary font-bold tracking-widest uppercase text-xs"
               >
                 Academic Excellence
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
               >
                 Our <span className="italic text-secondary">Programs</span>
               </motion.h2>
            </div>
            <Link href="/programs">
              <Button className="rounded-[5px] bg-primary hover:bg-secondary text-white font-bold group">
                View All Programs <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PremiumCard 
              title="Elite Tech Accelerator"
              description="Master full-stack architectures and emerging tech through intensive challenges."
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
              badge="High Performance"
              onClick={() => router.push('/programs')}
            />
            <PremiumCard 
              title="Business Strategy Hub"
              description="Developing the next generation of CEOs through strategic planning and market analysis."
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
              badge="Leadership"
              badgeVariant="secondary"
              onClick={() => router.push('/programs')}
            />
            <PremiumCard 
              title="Innovation Lab"
              description="Scientific research programs focused on solving global challenges through experimentation."
              image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800"
              badge="Innovation"
              badgeVariant="default"
              onClick={() => router.push('/programs')}
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-background border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="text-primary font-bold tracking-widest uppercase text-xs"
               >
                 Mark Your Calendar
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
               >
                 Upcoming <span className="italic text-secondary">Events</span>
               </motion.h2>
            </div>
            <Link href="/events">
              <Button variant="outline" className="rounded-[5px] border-primary text-primary hover:bg-primary hover:text-white font-bold group">
                View All Events <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PremiumCard 
              title="Global Tech Summit"
              description="Annual gathering of industry leaders and innovators."
              image="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800"
              badge="Conference"
              onClick={() => router.push('/events')}
            />
            <PremiumCard 
              title="B2W Hackathon"
              description="48 hours of intense coding and problem solving."
              image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800"
              badge="Competition"
              badgeVariant="warning"
              onClick={() => router.push('/events')}
            />
            <PremiumCard 
              title="Leadership Seminar"
              description="Interactive workshop with top-tier corporate CEOs."
              image="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800"
              badge="Workshop"
              badgeVariant="secondary"
              onClick={() => router.push('/events')}
            />
            <PremiumCard 
              title="Innovation Award"
              description="Celebrating the most groundbreaking student projects."
              image="https://images.unsplash.com/photo-1523580494863-6f30312246d5?q=80&w=800"
              badge="Ceremony"
              badgeVariant="success"
              onClick={() => router.push('/events')}
            />
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="text-secondary font-bold tracking-widest uppercase text-xs"
               >
                 Arena of Valor
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
               >
                 Elite <span className="italic text-secondary">Challenges</span>
               </motion.h2>
            </div>
            <Link href="/races">
              <Button className="rounded-[5px] bg-primary hover:bg-secondary text-white font-bold group">
                View All Challenges <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PremiumCard 
              title="AI Innovation Cup"
              description="Master machine learning and build predictive models for sustainable energy solutions."
              image="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800"
              badge="Tech Challenge"
              onClick={() => router.push('/races')}
            />
            <PremiumCard 
              title="Strategy Sprint"
              description="Solve real-world business cases and pitch to top-tier enterprise consultants."
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
              badge="Business Derby"
              badgeVariant="secondary"
              onClick={() => router.push('/races')}
            />
            <PremiumCard 
              title="Impact Challenge"
              description="Redefine civic engagement through human-centered design and social innovation."
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800"
              badge="Design Mission"
              badgeVariant="default"
              onClick={() => router.push('/races')}
            />
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="text-secondary font-bold tracking-widest uppercase text-xs"
               >
                 B2W Daily
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
               >
                 Latest <span className="italic text-secondary">News</span>
               </motion.h2>
            </div>
            <Link href="/news">
              <Button className="rounded-[5px] bg-secondary hover:bg-primary text-white font-bold group">
                View All News <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <PremiumCard 
              className="[&_.aspect-\[4\/5\]]:aspect-video"
              title={localize({ en: "B2W Partnership with Silicon Valley Hubs", am: "B2W ከሲሊኮን ቫሊ ማዕከላት ጋር ስትራቴጂካዊ አጋርነት ፈጠረ" }, currentLanguage)}
              description={
                <div className="space-y-4">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
                    {localize({ 
                      en: "We are excited to announce a strategic partnership that will provide our students with direct internships at leading tech firms.",
                      am: "ተማሪዎቻችን በታዋቂ የቴክኖሎጂ ኩባንያዎች ውስጥ ቀጥተኛ የልምምድ ዕድል የሚያገኙበት ስትራቴጂካዊ አጋርነት መፈጠሩን ስናበስር በታላቅ ደስታ ነው።"
                    }, currentLanguage)}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-secondary">
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                      Insight
                    </span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>5 Min Read</span>
                  </div>
                </div>
              }
              image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
              badge="Press Release"
              onClick={() => router.push('/news')}
            />
            <PremiumCard 
              className="[&_.aspect-\[4\/5\]]:aspect-video"
              title={localize({ en: "Student Innovation Reaches New Heights", am: "የተማሪዎች ፈጠራ አዲስ ምዕራፍ ላይ ደረሰ" }, currentLanguage)}
              description={
                <div className="space-y-4">
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
                    {localize({
                      en: "Last month's innovation lab results showed a 40% increase in patent-ready student projects.",
                      am: "ባለፈው ወር የተካሄደው የፈጠራ ዑደት ለፓተንት ዝግጁ በሆኑ የተማሪዎች ፕሮጀክቶች ላይ የ 40% ጭማሪ የታየበት ነው።"
                    }, currentLanguage)}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-secondary">
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                      Achievement
                    </span>
                    <span className="text-muted-foreground/40">|</span>
                    <span>4 Min Read</span>
                  </div>
                </div>
              }
              image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
              badge="Achievement"
              badgeVariant="success"
              onClick={() => router.push('/news')}
            />
          </div>
        </div>
      </section>

      <Features />
      <Testimonial />
      <CTA />
    </main>
  );
}
