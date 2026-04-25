"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trophy, Users, FileText, Zap, ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";
import { localize } from "@/lib/utils";
import apiClient from "@/lib/apiClient";
import { SkillRadar } from "@/components/dashboard/SkillRadar";
import { usePointsStore } from "@/lib/pointsStore";
import { ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { xp, level } = usePointsStore();
  const currentLanguage = useLanguageStore((state: any) => state.currentLanguage);
  const [stats, setStats] = useState({
    races: 0,
    submissions: 0,
    certificates: 0,
    rank: "N/A"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/v1/my/stats");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {localize(user?.name, currentLanguage)}. Here's what's happening today.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="rounded-[5px]">Download Report</Button>
            <Button variant="premium" className="rounded-[5px]">Join New Challenge</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Elite XP", value: xp, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Mastery Level", value: `Lvl ${level}`, icon: Trophy, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Certificates", value: stats.certificates, icon: Star, color: "text-secondary", bg: "bg-secondary/10" },
            { label: "Global Rank", value: stats.rank, icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          ].map((item, i) => (
            <Card key={i} className="border-border/50 shadow-sm hover:shadow-2xl transition-all rounded-[5px] group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground capitalize">{item.label}</CardTitle>
                <div className={`${item.bg} p-2 rounded-[5px] group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm rounded-[5px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-serif">Recent Activity</CardTitle>
                <CardDescription>Your latest submissions and challenge progress.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold rounded-[5px]">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "UI/UX Design Challenge", type: "Submission", date: "2 mins ago", status: "Reviewing" },
                    { name: "Fullstack Hackathon", type: "Joined Challenge", date: "1 hour ago", status: "Active" },
                    { name: "Cyber Security Quiz", type: "Certificate", date: "Yesterday", status: "Issued" },
                  ].map((activity, i) => (
                    <TableRow key={i} className="hover:bg-muted/50 cursor-pointer">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{activity.name}</span>
                          <span className="text-xs text-muted-foreground">{activity.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{activity.date}</TableCell>
                      <TableCell>
                        <Badge variant={activity.status === "Issued" ? "success" : "secondary"} className="rounded-[5px]">
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="rounded-[5px]">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Skill Radar Section */}
          <Card className="border-border/50 shadow-sm rounded-[5px] flex flex-col items-center justify-center p-6 bg-primary/[0.02]">
            <CardHeader className="w-full text-left p-0 mb-6">
              <CardTitle className="font-serif">Talent DNA</CardTitle>
              <CardDescription>Real-time visualization of your core competencies.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center pt-8">
              <SkillRadar />
            </CardContent>
          </Card>

          {/* Leaderboard / Announcements */}
          <Card className="border-border/50 shadow-sm rounded-[5px]">
            <CardHeader>
              <CardTitle className="font-serif">Elite Announcements</CardTitle>
              <CardDescription>Stay updated with the latest news.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "New AI Challenge Starting Soon!", date: "Oct 24", color: "bg-blue-500" },
                { title: "Certificate issuance delay resolved.", date: "Oct 23", color: "bg-amber-500" },
                { title: "Top 10 Champions of October.", date: "Oct 22", color: "bg-purple-500" },
              ].map((news, i) => (
                <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${news.color} shrink-0 group-hover:scale-150 transition-transform`} />
                  <div>
                    <p className="text-sm font-bold group-hover:text-primary transition-colors leading-tight">{news.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 rounded-[5px] font-bold">View CMS Portal</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
