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
           <Card key={i} className="overflow-hidden bg-card border-none shadow-sm rounded-[2.5rem]">
             <Skeleton className="h-64 w-full" />
             <CardHeader className="p-8">
               <Skeleton className="h-8 w-3/4 mb-4" />
               <Skeleton className="h-4 w-full" />
             </CardHeader>
             <CardFooter className="p-8 pt-0">
               <Skeleton className="h-14 w-full rounded-2xl" />
             </CardFooter>
           </Card>
         ))}
      </div>
    );
  }

  if (races.length === 0) {
    return (
      <div className="text-center py-24 bg-card rounded-[4rem] border-2 border-dashed border-border/50 flex flex-col items-center">
         <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-8">
            <Trophy className="w-12 h-12 text-muted-foreground/30" />
         </div>
         <h2 className="text-3xl font-serif font-bold text-primary">No active races right now</h2>
         <p className="text-muted-foreground mt-4 max-w-md mx-auto">
           We are currently curating the next set of elite challenges. Check back soon for upcoming opportunities.
         </p>
         <Button variant="outline" className="mt-10 rounded-xl h-14 px-10">Back to Dashboard</Button>
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
        >
          <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[3rem] bg-card overflow-hidden flex flex-col h-full relative">
            <div className="relative h-64 overflow-hidden">
               <img 
                src={race.cover_image || "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1000"} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt={localize(race.title, currentLanguage)}
               />
               <div className="absolute top-8 left-8 flex gap-2">
                  <Badge className="bg-white/90 backdrop-blur-md text-primary border-none shadow-sm font-bold px-4 py-2 rounded-xl">
                     {localize(race.category?.name, currentLanguage) || "Global Arena"}
                  </Badge>
               </div>
               <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-bold capitalize flex items-center">
                     <Clock className="w-4 h-4 mr-2 text-secondary" />
                     Registration Open
                  </p>
               </div>
            </div>
            <CardHeader className="p-10 pb-6">
              <div className="flex items-center text-[10px] font-bold capitalize text-secondary mb-4">
                 <Calendar size={12} className="mr-2" />
                 Deadline: {new Date(race.end_date).toLocaleDateString()}
              </div>
              <CardTitle className="text-3xl font-serif font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                {localize(race.title, currentLanguage)}
              </CardTitle>
              <p className="text-muted-foreground text-base line-clamp-2 leading-relaxed">
                 {localize(race.description, currentLanguage) || "Take part in the most anticipated event of the academic calendar. Prove your skills and earn your place among the elite."}
              </p>
            </CardHeader>
            <CardContent className="px-10 pb-10">
               <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold capitalize text-muted-foreground">Participants</p>
                     <p className="text-lg font-bold text-primary flex items-center">
                        <Users className="w-4 h-4 mr-2 text-secondary" />
                        {race.participants_count || 0}
                     </p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold capitalize text-muted-foreground">Prize Pool</p>
                     <p className="text-lg font-bold text-primary">$5,000+</p>
                  </div>
               </div>
            </CardContent>
            <CardFooter className="p-10 pt-0 mt-auto">
               <Link href={`/races/${race.id}`} className="w-full">
                  <Button className="w-full rounded-2xl h-16 text-lg font-bold shadow-glow-primary group/btn">
                     Enter the Arena 
                     <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
               </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
