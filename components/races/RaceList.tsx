"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Users, ArrowRight, Clock, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { localize } from "@/lib/utils";
import { PremiumCard } from "@/components/ui/premium-card";

interface RaceListProps {
  races: any[];
  loading: boolean;
  currentLanguage: string;
}

export const RaceList = ({ races, loading, currentLanguage }: RaceListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {[1, 2, 3].map(i => (
           <div key={i} className="aspect-video bg-muted animate-pulse rounded-[8px]" />
         ))}
      </div>
    );
  }

  if (races.length === 0) {
    return (
      <div className="text-center py-24 bg-card rounded-[8px] border-2 border-dashed border-border/50 flex flex-col items-center">
         <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-8">
            <Trophy className="w-12 h-12 text-muted-foreground/30" />
         </div>
         <h2 className="text-3xl font-serif font-bold text-primary">No active derbies right now</h2>
         <p className="text-muted-foreground mt-4 max-w-md mx-auto">
           We are currently curating the next set of elite challenges. Check back soon for upcoming opportunities.
         </p>
         <Button variant="outline" className="mt-10 rounded-[8px] h-14 px-10">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {races.map((race: any, i: number) => (
        <motion.div
          key={race.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <PremiumCard 
            title={localize(race.title, currentLanguage)}
            description={
              <div className="space-y-6">
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                   {localize(race.description, currentLanguage) || "Take part in the most anticipated event of the academic calendar. Prove your skills and earn your place among the elite."}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold uppercase text-muted-foreground">Participants</p>
                     <p className="text-sm font-bold text-primary flex items-center">
                        <Users className="w-3.5 h-3.5 mr-2 text-secondary" />
                        {race.participants_count || "2.4K"}
                     </p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold uppercase text-muted-foreground">Prize Pool</p>
                     <p className="text-sm font-bold text-primary flex items-center">
                        <Trophy className="w-3.5 h-3.5 mr-2 text-secondary" />
                        $5,000+
                     </p>
                  </div>
                </div>
              </div>
            }
            image={race.cover_image || "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1000"}
            badge={localize(race.category?.name, currentLanguage) || "Global Arena"}
            badgeVariant="success"
            onClick={() => window.location.href = `/races/${race.id}`}
            action={
              <Button className="w-full h-12 rounded-[8px] font-bold shadow-lg shadow-primary/20 mt-4 group">
                Register Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            }
          />
        </motion.div>
      ))}
    </div>
  );
};
