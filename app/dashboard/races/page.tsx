"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Trophy, Calendar, Users, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/lib/apiClient";

export default function DashboardRacesPage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRaces = async () => {
      try {
        const res = await apiClient.get("/v1/my/races");
        setRaces(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch my races");
      } finally {
        setLoading(false);
      }
    };
    fetchMyRaces();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Competitions</h1>
          <p className="text-muted-foreground">Manage your active races and track your performance.</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardHeader className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full rounded-xl" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : races.length === 0 ? (
          <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4 border-dashed">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">No active races yet</h3>
              <p className="text-muted-foreground max-w-sm">
                You haven't joined any competitions. Explore the active races and start winning!
              </p>
            </div>
            <Button variant="premium">Explore Races</Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {races.map((race: any) => (
              <Card key={race.id} className="group overflow-hidden hover:border-primary/50 transition-all border-border/50">
                <div className="h-40 bg-muted relative">
                  <img 
                    src={race.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={race.title}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none">
                      {race.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl line-clamp-1">{race.title}</CardTitle>
                    <Badge variant={race.pivot?.status === 'active' ? 'secondary' : 'success'} className="ml-2">
                      {race.pivot?.status || 'Joined'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{race.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Ends Oct 30</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{race.participants_count} users</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold capitalize">
                      <span>Progress</span>
                      <span>{race.pivot?.progress || 0}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full premium-gradient transition-all duration-1000" 
                        style={{ width: `${race.pivot?.progress || 0}%` }} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full" variant="outline">
                    Go to Workspace
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
