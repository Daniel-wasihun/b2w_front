"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Trophy, 
  Star, 
  ShieldCheck, 
  RefreshCcw,
  Calendar,
  Flag,
  Newspaper,
  Sparkles,
  Layers,
  Activity,
  ArrowUpRight,
  BarChart3,
  Edit2
} from "lucide-react";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { cn, isValidAssetUrl } from "@/lib/utils";

export default function LandingMasterDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/landing");
      setData(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch landing data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "programs", label: "Program Tracks", icon: Trophy },
    { id: "features", label: "Core Features", icon: ShieldCheck },
    { id: "events", label: "Elite Events", icon: Calendar },
    { id: "challenges", label: "Global Flag", icon: Flag },
    { id: "news", label: "Press & News", icon: Newspaper },
    { id: "testimonials", label: "Success Stories", icon: Star },
    { id: "stats", label: "Live Metrics", icon: BarChart3 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Landing Page Architect</h1>
            <p className="text-sm text-muted-foreground">Manage all sections and components of the landing page.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" onClick={fetchAllData} disabled={loading} className="font-bold text-[11px] uppercase tracking-widest h-9">
              <RefreshCcw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
              Sync
            </Button>
            <Link href="/" target="_blank">
              <Button className="font-bold text-[11px] uppercase tracking-widest h-9 shadow-lg shadow-primary/20">
                View Live Site
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1 border-b border-border/50 pb-px overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                activeTab === tab.id 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary" : "text-muted-foreground/60")} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
           {activeTab === "overview" && (
            <OverviewGrid data={data} loading={loading} onNavigate={setActiveTab} />
          )}
          
          {activeTab === "hero" && (
            <HeroTable data={data?.hero ? [data.hero] : []} loading={loading} />
          )}

          {activeTab === "programs" && (
            <DataTable 
              title="Programs" 
              data={data?.programs || []} 
              loading={loading} 
              href="/admin/landing/programs"
            />
          )}

          {activeTab === "features" && (
            <DataTable 
              title="Features" 
              data={data?.features || []} 
              loading={loading} 
              href="/admin/landing/features"
            />
          )}

          {activeTab === "testimonials" && (
            <DataTable 
              title="Testimonials" 
              data={data?.testimonials || []} 
              loading={loading} 
              href="/admin/landing/testimonials"
            />
          )}

          {activeTab === "events" && (
            <DataTable 
              title="Events" 
              data={data?.events || []} 
              loading={loading} 
              href="/admin/events"
            />
          )}

          {activeTab === "challenges" && (
            <DataTable 
              title="Challenges" 
              data={data?.challenges || []} 
              loading={loading} 
              href="/admin/challenges"
            />
          )}

          {activeTab === "news" && (
            <DataTable 
              title="News" 
              data={data?.news || []} 
              loading={loading} 
              href="/admin/posts"
            />
          )}

          {activeTab === "stats" && (
            <StatsOverview data={data?.stats} loading={loading} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function OverviewGrid({ data, loading, onNavigate }: any) {
  const sections = [
    { id: "hero", title: "Hero Header", count: data?.hero ? 1 : 0, icon: Sparkles },
    { id: "programs", title: "Programs", count: data?.programs?.length || 0, icon: Trophy },
    { id: "features", title: "Features", count: data?.features?.length || 0, icon: ShieldCheck },
    { id: "events", title: "Events", count: data?.events?.length || 0, icon: Calendar },
    { id: "challenges", title: "Challenges", count: data?.challenges?.length || 0, icon: Flag },
    { id: "news", title: "News", count: data?.news?.length || 0, icon: Newspaper },
    { id: "testimonials", title: "Success Stories", count: data?.testimonials?.length || 0, icon: Star },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(7).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sections.map((s) => (
        <div 
          key={s.id} 
          onClick={() => onNavigate(s.id)}
          className="bg-card p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <s.icon className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-foreground tabular-nums">{s.count}</span>
          </div>
          <p className="mt-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.title}</p>
        </div>
      ))}
    </div>
  );
}

function HeroTable({ data, loading }: any) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">Hero Section Configuration</h3>
        <Link href="/admin/landing/hero">
          <Button variant="outline" size="sm" className="h-8 font-bold text-[10px] uppercase tracking-widest">Configure</Button>
        </Link>
      </div>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border">
            <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Title Intelligence</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Deployment</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">CTA Link</TableHead>
            <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
             <TableRow><TableCell colSpan={4} className="p-8 text-center"><Skeleton className="h-10 w-full rounded-md" /></TableCell></TableRow>
          ) : data.length > 0 ? (
            data.map((hero: any) => (
              <TableRow key={hero.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    {isValidAssetUrl(hero.image) ? (
                      <img src={hero.image} className="w-10 h-10 rounded-lg object-cover border border-border bg-muted" alt="" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                        <Sparkles className="w-4 h-4 text-muted-foreground/40" />
                      </div>
                    )}
                    <span className="font-bold text-sm text-foreground">{hero.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={hero.is_active ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", hero.is_active && "bg-emerald-500/10 text-emerald-500 border-none")}>
                    {hero.is_active ? "LIVE" : "DRAFT"}
                  </Badge>
                </TableCell>
                <TableCell className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{hero.cta_text}</TableCell>
                <TableCell className="pr-6 text-right">
                  <Link href="/admin/landing/hero">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><Edit2 className="w-4 h-4" /></Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow><TableCell colSpan={4} className="h-32 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">No hero nodes indexed.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function DataTable({ title, data, loading, href }: any) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground">{title} Matrix</h3>
        <Link href={href}>
          <Button variant="outline" size="sm" className="h-8 font-bold text-[10px] uppercase tracking-widest">Manage All</Button>
        </Link>
      </div>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border">
            <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Label / Identity</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
            <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
             <TableRow><TableCell colSpan={3} className="p-8"><Skeleton className="h-10 w-full rounded-md" /></TableCell></TableRow>
          ) : data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border">
                      <Layers className="w-4 h-4 text-muted-foreground/60" />
                    </div>
                    <span className="font-bold text-sm text-foreground">{item.title || item.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={(item.is_active ?? item.is_featured) ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", (item.is_active ?? item.is_featured) && "bg-emerald-500/10 text-emerald-500 border-none")}>
                    {(item.is_active ?? item.is_featured) ? "ACTIVE" : "HIDDEN"}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Link href={href}>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><Edit2 className="w-4 h-4" /></Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow><TableCell colSpan={3} className="h-32 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">No items found.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function StatsOverview({ data, loading }: any) {
  if (loading) return <div className="grid grid-cols-4 gap-6">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}</div>;
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(data).map(([key, value]: any) => (
        <div key={key} className="bg-card p-6 rounded-xl border border-border group hover:border-primary transition-all">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{key.replace(/_/g, ' ')}</p>
          <h4 className="text-2xl font-black text-foreground mt-3 tabular-nums">{value.toLocaleString()}</h4>
          <Link href="/admin/landing/stats" className="mt-5 block">
            <span className="text-[10px] font-black text-primary hover:underline cursor-pointer uppercase tracking-widest">Update Metrics</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
