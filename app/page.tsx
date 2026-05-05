"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { Testimonial } from "@/components/landing/Testimonial";
import { Partners } from "@/components/landing/Partners";
import { PremiumCard } from "@/components/ui/premium-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/lib/languageStore";
import { localize } from "@/lib/utils";
import apiClient from "@/lib/apiClient";

export default function LandingPage() {
  const router = useRouter();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const res = await apiClient.get("/v1/landing");
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch landing data");
      } finally {
        setLoading(false);
      }
    };
    fetchLandingData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <Hero data={data?.hero} />
      <Stats data={data?.stats} />
      
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
              <Button className="rounded-[8px] bg-primary hover:bg-secondary text-white font-bold group">
                View All Programs <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data?.programs?.map((program: any) => (
              <PremiumCard 
                key={program.id}
                title={localize(program.title, currentLanguage)}
                description={localize(program.description, currentLanguage)}
                image={program.image}
                badge={localize(program.badge, currentLanguage)}
                badgeVariant={program.badge_variant}
                onClick={() => router.push('/programs')}
              />
            ))}
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
              <Button variant="outline" className="rounded-[8px] border-primary text-primary hover:bg-primary hover:text-white font-bold group">
                View All Events <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.events?.map((event: any) => (
              <PremiumCard 
                key={event.id}
                title={localize(event.title, currentLanguage)}
                description={localize(event.description, currentLanguage)}
                image={event.image || "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800"}
                badge={event.type || "Event"}
                onClick={() => router.push(`/events/${event.id}`)}
              />
            ))}
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
              <Button className="rounded-[8px] bg-primary hover:bg-secondary text-white font-bold group">
                View All Challenges <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data?.challenges?.map((race: any) => (
              <PremiumCard 
                key={race.id}
                title={localize(race.title, currentLanguage)}
                description={localize(race.description, currentLanguage)}
                image={race.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800"}
                badge="Open Challenge"
                onClick={() => router.push(`/races/${race.id}`)}
              />
            ))}
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
              <Button className="rounded-[8px] bg-secondary hover:bg-primary text-white font-bold group">
                View All News <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data?.news?.map((post: any) => (
              <PremiumCard 
                key={post.id}
                className="[&_.aspect-\[4\/5\]]:aspect-video"
                title={localize(post.title, currentLanguage)}
                description={
                  <div className="space-y-4">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
                      {localize(post.content, currentLanguage)}
                    </p>
                  </div>
                }
                image={post.cover_image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"}
                badge="Update"
                onClick={() => router.push('/news')}
              />
            ))}
          </div>
        </div>
      </section>

      <Features data={data?.features} />
      <Partners data={data?.partners} />
      <Testimonial data={data?.testimonials} />
    </main>
  );
}
