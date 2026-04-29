"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PremiumCard } from "@/components/ui/premium-card";
import { Trophy, Users, FileText, Zap, ChevronRight, Star, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";
import { localize } from "@/lib/utils";
import apiClient from "@/lib/apiClient";
import { SkillRadar } from "@/components/dashboard/SkillRadar";
import { usePointsStore } from "@/lib/pointsStore";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { xp, level } = usePointsStore();
  const currentLanguage = useLanguageStore((state: any) => state.currentLanguage);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/my/stats");
      setStats(res.data.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground text-sm">
                Welcome back, {localize(user?.name, currentLanguage)}. Here's your elite performance summary.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block border-l border-border/50 pl-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none mb-1">
                Last Updated
              </p>
              <p className="text-xs font-mono text-foreground/70">
                {currentTime}
              </p>
            </div>
            <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchStats} 
                disabled={loading}
                className="rounded-xl hover:bg-primary/5 hover:text-primary transition-all active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="premium" className="rounded-xl shadow-lg shadow-primary/20 group">
              Join New Challenge
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Elite XP", value: xp, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "Mastery Level", value: `Lvl ${level}`, icon: Trophy, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Certificates", value: stats?.certificates ?? 0, icon: Star, color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20" },
            { label: "Global Rank", value: stats?.rank ?? 'N/A', icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <PremiumCard className="p-6 relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
                <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500`} />
                <div className="flex flex-col gap-4">
                  <div className={`w-10 h-10 ${item.bg} ${item.border} border rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                    {loading ? (
                        <Skeleton className="h-8 w-24 mt-1" />
                    ) : (
                        <h3 className="text-2xl font-black mt-1">{item.value}</h3>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-grow bg-muted rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            className={`h-full ${item.bg.replace('/10', '')}`}
                        />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">65%</span>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PremiumCard className="h-full">
              <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Recent Activity</h3>
                  <p className="text-xs text-muted-foreground">Your latest submissions and challenge progress.</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5">View All</Button>
              </div>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-none">
                      <TableHead className="pl-6 h-10 text-[10px] uppercase tracking-wider font-bold">Activity</TableHead>
                      <TableHead className="h-10 text-[10px] uppercase tracking-wider font-bold">Date</TableHead>
                      <TableHead className="h-10 text-[10px] uppercase tracking-wider font-bold">Status</TableHead>
                      <TableHead className="pr-6 h-10 text-right text-[10px] uppercase tracking-wider font-bold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "UI/UX Design Challenge", type: "Submission", date: "2 mins ago", status: "Reviewing" },
                      { name: "Fullstack Hackathon", type: "Joined Challenge", date: "1 hour ago", status: "Active" },
                      { name: "Cyber Security Quiz", type: "Certificate", date: "Yesterday", status: "Issued" },
                      { name: "Mobile App Contest", type: "Submission", date: "3 days ago", status: "Graded" },
                    ].map((activity, i) => (
                      <TableRow key={i} className="group hover:bg-primary/[0.02] border-border/40 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm">{activity.name}</span>
                              <span className="text-[10px] text-muted-foreground font-medium uppercase">{activity.type}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-medium">{activity.date}</TableCell>
                        <TableCell>
                          <Badge variant={activity.status === "Issued" ? "success" : activity.status === "Reviewing" ? "warning" : "secondary"} className="rounded-md text-[10px] py-0 px-2 font-bold uppercase tracking-tight">
                            {activity.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Skill Radar Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <PremiumCard className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary/[0.03] to-transparent">
                <div className="w-full text-left mb-6">
                    <h3 className="text-lg font-bold">Talent DNA</h3>
                    <p className="text-xs text-muted-foreground">Real-time visualization of your core competencies.</p>
                </div>
                <div className="w-full h-[220px] flex items-center justify-center relative">
                    <SkillRadar />
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10" />
                </div>
                <div className="grid grid-cols-2 w-full gap-2 mt-6">
                    {['Coding', 'Design', 'Strategy', 'Logic'].map((skill) => (
                        <div key={skill} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-[10px] font-bold uppercase">{skill}</span>
                        </div>
                    ))}
                </div>
                </PremiumCard>
            </motion.div>

            {/* Elite Announcements */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
            >
                <PremiumCard>
                <div className="px-6 py-5 border-b border-border/50">
                    <h3 className="text-lg font-bold">Elite Announcements</h3>
                    <p className="text-xs text-muted-foreground">Stay updated with the latest news.</p>
                </div>
                <div className="p-6 space-y-6">
                    {[
                    { title: "New AI Challenge Starting Soon!", date: "Oct 24", color: "bg-blue-500" },
                    { title: "Certificate issuance delay resolved.", date: "Oct 23", color: "bg-amber-500" },
                    { title: "Top 10 Champions of October.", date: "Oct 22", color: "bg-purple-500" },
                    ].map((news, i) => (
                    <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                        <div className={`w-2 h-2 mt-1.5 rounded-full ${news.color} shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_15px_var(--tw-shadow-color)]`} style={{'--tw-shadow-color': news.color.replace('bg-', '')} as any} />
                        <div className="flex-grow">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors leading-tight">{news.title}</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">{news.date}</p>
                        </div>
                        <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                        View CMS Portal
                    </Button>
                </div>
                </PremiumCard>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
