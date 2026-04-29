"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BarChart3, Save, RefreshCw, Plus, Users, Trophy, Award, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export default function AdminStatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/landing");
      setStats(res.data.data.stats);
    } catch (err) {
      toast.error("Failed to fetch metrics stream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.post("/v1/admin/landing/config", { stats });
      toast.success("Landing metrics synchronized");
      fetchStats();
    } catch (err) {
      toast.error("Failed to commit metrics");
    } finally {
      setIsSaving(false);
    }
  };

  const statEntries = stats ? [
    { key: "participants", label: "Total Members", icon: Users, value: stats.participants || 0 },
    { key: "challenges", label: "Active Challenges", icon: Trophy, value: stats.challenges || 0 },
    { key: "certificates", label: "Elite Certificates", icon: Award, value: stats.certificates || 0 },
    { key: "projects", label: "Innovation Projects", icon: Zap, value: stats.projects || 0 },
  ] : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Metrics Management</h1>
            <p className="text-sm text-muted-foreground">Configure social proof offsets and platform growth statistics.</p>
          </div>
          <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Save className="w-4 h-4 mr-2" />
            Commit All Changes
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Metric Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Current Value (With Offset)</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
                <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={4} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : statEntries.map((entry) => (
                <TableRow key={entry.key} className="border-border/50 hover:bg-muted/30 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shadow-sm">
                        <entry.icon className="w-5 h-5 text-primary/60" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{entry.label}</span>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Offset Key: {entry.key}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <input 
                      type="number"
                      className="h-10 w-32 rounded-xl border border-input bg-background px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all tabular-nums text-foreground"
                      value={entry.value}
                      onChange={(e) => setStats({...stats, [entry.key]: parseInt(e.target.value) || 0})}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border-none">
                        LIVE SYNC
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={fetchStats}>
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
           <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-card border border-border shadow-sm">
                 <Activity className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-foreground">Operational Integrity</h3>
                 <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-medium">
                    Adjusting these offsets allows you to account for historical data and offline achievements that aren't automatically indexed by the real-time core. All changes are committed to the secure cloud archive upon saving.
                 </p>
                 <Button className="mt-6 font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20" onClick={handleSave} isLoading={isSaving}>
                    Commit All Offsets
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
