"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock, Users, ArrowLeft, Send, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function RaceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [race, setRace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const res = await apiClient.get(`/v1/races/${id}`);
        setRace(res.data.data);
      } catch (err) {
        toast.error("Race not found");
        router.push("/races");
      } finally {
        setLoading(false);
      }
    };
    fetchRace();
  }, [id, router]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please login to join the race");
      router.push("/login");
      return;
    }
    setJoining(true);
    try {
      await apiClient.post(`/v1/races/${id}/join`);
      toast.success("Welcome to the race!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to join race");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  if (!race) return null;

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-40 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-6 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="mb-8 text-white hover:bg-white/10 rounded-[8px]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Derbies
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                 <Badge className="bg-secondary text-primary font-bold">{race.category?.name || "General"}</Badge>
                 <Badge variant="outline" className="text-white border-white/20">Ongoing</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight max-w-3xl">
                {race.title}
              </h1>
              <div className="flex flex-wrap gap-8 pt-4">
                 <div className="flex items-center space-x-2">
                    <Clock className="text-secondary" />
                    <span className="font-bold">Deadline: {new Date(race.end_date).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <Users className="text-secondary" />
                    <span className="font-bold">2.4K Participants</span>
                 </div>
              </div>
            </div>
            <div className="lg:mb-2">
               <Button 
                size="lg" 
                onClick={handleJoin}
                disabled={joining || race.is_joined || race.status !== 'open' || (race.max_participants && race.participants_count >= race.max_participants)}
                className={cn(
                  "h-16 px-10 rounded-[8px] text-lg font-bold shadow-glow-secondary transition-all duration-300",
                  race.is_joined || race.status !== 'open' || (race.max_participants && race.participants_count >= race.max_participants)
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-80"
                    : "bg-secondary hover:bg-secondary/90 text-primary shadow-lg shadow-secondary/20"
                )}
               >
                 {joining ? (
                   "Processing..."
                 ) : race.is_joined ? (
                   <>
                     <CheckCircle2 className="mr-2 w-5 h-5" />
                     Already Entered
                   </>
                 ) : race.status !== 'open' ? (
                   "Registration Closed"
                 ) : (race.max_participants && race.participants_count >= race.max_participants) ? (
                   "Full Capacity"
                 ) : (
                   "Enter the Derby Now"
                 )}
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
               <div className="bg-card p-10 rounded-[8px] border border-border/50 shadow-sm">
                  <h2 className="text-3xl font-serif font-bold mb-8 flex items-center">
                    < ShieldCheck className="mr-4 text-primary" />
                    Derby Description & Goals
                  </h2>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                     {race.description}
                  </div>
               </div>

               <div className="bg-card p-10 rounded-[8px] border border-border/50 shadow-sm">
                  <h2 className="text-3xl font-serif font-bold mb-8 flex items-center">
                    < Trophy className="mr-4 text-secondary" />
                    Grand Prizes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                       { pos: "1st Place", prize: "$5,000 + Trophy", color: "bg-amber-100 text-amber-700" },
                       { pos: "2nd Place", prize: "$2,500 + Medal", color: "bg-slate-100 text-slate-700" },
                       { pos: "3rd Place", prize: "$1,000 + Certificate", color: "bg-orange-100 text-orange-700" },
                     ].map((p, i) => (
                       <div key={i} className={`p-6 rounded-[8px] ${p.color} text-center`}>
                          <p className="font-bold capitalize text-[10px] mb-2">{p.pos}</p>
                          <p className="text-xl font-bold">{p.prize}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
               <Card className="rounded-[8px] border-none shadow-xl overflow-hidden">
                  <CardHeader className="bg-muted p-8">
                    <CardTitle className="text-xl font-serif">Rules of Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    {[
                      "Participants must be current students.",
                      "All work must be original and verified.",
                      "Submissions after the deadline are void.",
                      "Maintain academic integrity at all times."
                    ].map((rule, i) => (
                       <div key={i} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-muted-foreground">{rule}</span>
                       </div>
                    ))}
                  </CardContent>
               </Card>

               <div className="bg-primary/5 p-8 rounded-[8px] border border-primary/10">
                  <div className="flex items-center space-x-4 mb-6">
                     <AlertCircle className="text-primary" />
                     <h3 className="font-bold text-primary">Need Help?</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    If you encounter any issues with joining or submitting, contact the race coordinator.
                  </p>
                  <Button variant="outline" className="w-full rounded-[8px] border-primary/20 text-primary hover:bg-primary/5">
                    Contact Coordinator
                  </Button>
               </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
