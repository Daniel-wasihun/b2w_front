"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Users, 
  Trophy, 
  FileCheck, 
  Calendar, 
  TrendingUp, 
  Activity, 
  Shield, 
  Palette, 
  Newspaper, 
  Award,
  ArrowUpRight,
  ChevronRight,
  Download,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/v1/admin/stats");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpis = [
    { label: "Identity Nodes", value: stats?.overview?.total_users, icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Active Races", value: stats?.overview?.active_races, icon: Trophy, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Review Queue", value: stats?.overview?.pending_submissions, icon: FileCheck, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { label: "Global Events", value: stats?.overview?.total_events, icon: Calendar, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 transition-colors duration-300">
        {/* Elite Analytics Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Intelligence Dashboard</h1>
            <p className="text-sm text-muted-foreground font-medium">Holistic platform analytics and operational data streams.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 font-bold text-[11px] uppercase tracking-wider">
               <Filter className="w-3.5 h-3.5 mr-2" />
               Filter Stream
            </Button>
            <Button size="sm" className="h-9 font-bold text-[11px] uppercase tracking-wider">
               <Download className="w-3.5 h-3.5 mr-2" />
               Generate Report
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((item, i) => (
            <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between relative z-10">
                <div className={`p-2.5 rounded-md ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                   <TrendingUp className="w-3 h-3" /> +12%
                </div>
              </div>
              <div className="mt-5 relative z-10">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                {loading ? (
                  <Skeleton className="h-8 w-20 mt-1" />
                ) : (
                  <h3 className="text-3xl font-bold text-foreground mt-1 tabular-nums">{item.value || 0}</h3>
                )}
              </div>
              {/* Subtle background decoration */}
              <div className="absolute -right-4 -bottom-4 text-muted/20 opacity-50 group-hover:text-primary/5 transition-colors">
                 <item.icon className="w-24 h-24 rotate-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Primary Activity Stream */}
          <div className="lg:col-span-2 space-y-8">
             {/* Submissions Section */}
             <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                     <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Live Submission Stream</h3>
                  </div>
                  <Link href="/admin/submissions">
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider hover:bg-muted text-muted-foreground">
                       Manage Queue <ArrowUpRight className="w-3 h-3 ml-1.5" />
                    </Button>
                  </Link>
                </div>
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="pl-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-10">Identity Node</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-10">Target Challenge</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-10">Timestamp</TableHead>
                      <TableHead className="pr-6 text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground h-10">Op</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                       Array(5).fill(0).map((_, i) => (
                        <TableRow key={i} className="border-border">
                          <TableCell colSpan={4} className="px-6 py-3"><Skeleton className="h-10 w-full" /></TableCell>
                        </TableRow>
                       ))
                    ) : (
                      stats?.recent_activity?.map((activity: any) => (
                        <TableRow key={activity.id} className="border-border hover:bg-muted/50 transition-colors">
                          <TableCell className="pl-6 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] text-muted-foreground border border-border">
                                {activity.user?.name?.[0]}
                              </div>
                              <span className="font-bold text-sm text-foreground/80">{activity.user?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <Badge variant="outline" className="text-[10px] font-bold border-border text-muted-foreground px-2 py-0">
                               {activity.race?.title || 'General'}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 text-[11px] font-bold text-muted-foreground">
                             {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                          <TableCell className="pr-6 py-3 text-right">
                            <Link href="/admin/submissions">
                               <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/5">
                                 <ChevronRight className="w-4 h-4" />
                               </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
             </div>

             {/* Secondary Analytics Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* News & Events Summary */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                   <h3 className="font-bold text-foreground text-xs uppercase tracking-widest mb-6 flex items-center justify-between">
                      Communication Stream
                      <Newspaper className="w-4 h-4 text-muted-foreground/30" />
                   </h3>
                   <div className="space-y-4">
                      {[
                        { label: "Active Publications", count: stats?.overview?.total_posts || 0, icon: Newspaper, color: "text-blue-500" },
                        { label: "Upcoming Summits", count: stats?.overview?.total_events || 0, icon: Calendar, color: "text-emerald-500" },
                        { label: "Visual Asset Count", count: stats?.overview?.total_gallery_items || 0, icon: Palette, color: "text-purple-500" },
                      ].map((mod, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-md border border-border group hover:border-primary/20 transition-all cursor-default">
                           <div className="flex items-center gap-3">
                              <mod.icon className={cn("w-4 h-4", mod.color)} />
                              <span className="text-[12px] font-bold text-muted-foreground">{mod.label}</span>
                           </div>
                           <span className="text-sm font-black text-foreground tabular-nums">{mod.count}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Community & Security */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                   <h3 className="font-bold text-foreground text-xs uppercase tracking-widest mb-6 flex items-center justify-between">
                      Platform Governance
                      <Shield className="w-4 h-4 text-muted-foreground/30" />
                   </h3>
                   <div className="space-y-4">
                      {[
                        { label: "Total Certificates", count: stats?.overview?.total_certificates || 0, icon: Award, color: "text-amber-500" },
                        { label: "Security Roles", count: stats?.overview?.total_roles || 0, icon: Shield, color: "text-slate-500" },
                      ].map((mod, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-md border border-border group hover:border-primary/20 transition-all cursor-default">
                           <div className="flex items-center gap-3">
                              <mod.icon className={cn("w-4 h-4", mod.color)} />
                              <span className="text-[12px] font-bold text-muted-foreground">{mod.label}</span>
                           </div>
                           <span className="text-sm font-black text-foreground tabular-nums">{mod.count}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Side Analytics Panels */}
          <div className="space-y-8">
            {/* Department Distribution */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-primary" />
                Departmental Growth
              </h3>
              <div className="space-y-6">
                {loading ? (
                  Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-md" />)
                ) : (
                  stats?.demographics?.map((dept: any, i: number) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span>{dept.name}</span>
                        <span className="text-foreground/80">{dept.count} Units</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${(dept.count / (stats.overview?.total_users || 1)) * 100}%` }}
                          className="h-full bg-primary transition-all duration-1000"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-slate-950 rounded-xl p-6 shadow-xl border border-slate-900">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">Global Status</h3>
                  <div className="flex items-center gap-2 text-emerald-400">
                     <Activity className="w-4 h-4 animate-pulse" />
                     <span className="text-[10px] font-black tracking-widest">STABLE</span>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                     <span className="text-slate-400 uppercase text-[10px] tracking-widest">API Throughput</span>
                     <span className="text-white tabular-nums">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold">
                     <span className="text-slate-400 uppercase text-[10px] tracking-widest">Storage Load</span>
                     <span className="text-white tabular-nums">14.2 TB</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold">
                     <span className="text-slate-400 uppercase text-[10px] tracking-widest">Active Sockets</span>
                     <span className="text-white tabular-nums">1,204</span>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-slate-900">
                  <Button variant="outline" className="w-full bg-slate-900 border-slate-800 text-white hover:bg-slate-700 text-[10px] font-bold uppercase tracking-widest h-10">
                     Systems Monitor
                  </Button>
               </div>
            </div>

            {/* Achievement Node */}
            <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-card rounded-md border border-primary/10 shadow-sm">
                     <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <h3 className="text-sm font-bold text-foreground">Merit Issuance</h3>
                     <p className="text-[11px] text-muted-foreground mt-1 font-medium leading-relaxed">
                        Total of <span className="text-primary font-bold">{stats?.overview?.total_certificates || 0}</span> credentials issued globally across all challenge tracks.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
