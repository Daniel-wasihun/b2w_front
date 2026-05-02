"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Mail, Trash2, Search, Download, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Subscription {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminNewsletterSyncPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/newsletter-subscriptions");
      setSubscriptions(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch subscription stream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const deleteSubscription = async (id: number) => {
    if (!confirm("Permanently purge this subscription?")) return;
    try {
      await apiClient.delete(`/v1/newsletter/unsubscribe`, { data: { email: subscriptions.find((s: any) => s.id === id)?.email } });
      toast.success("Subscription purged");
      fetchSubscriptions();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredSubscriptions = subscriptions.filter((s: any) => 
    (s.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Newsletter Sync</h1>
            <p className="text-sm text-muted-foreground">Monitor and manage global email subscription clusters.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="h-9 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-muted">
                <Download className="w-3.5 h-3.5 mr-2" />
                Export CSV
             </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by email address..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border flex flex-col items-center">
             <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active</span>
             <span className="text-lg font-black text-foreground tabular-nums">{subscriptions.filter((s: any) => s.is_active).length}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Subscription Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Registry Date</TableHead>
                <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={4} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((sub: any) => (
                  <TableRow key={sub.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                         </div>
                         <span className="font-bold text-sm text-foreground">{sub.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                         {sub.is_active ? (
                            <Badge variant="default" className="rounded font-black text-[9px] uppercase tracking-widest flex items-center gap-1 bg-emerald-500/10 text-emerald-500 border-none px-2 py-0.5">
                               <CheckCircle2 className="w-3 h-3" /> ACTIVE
                            </Badge>
                         ) : (
                            <Badge variant="secondary" className="rounded font-black text-[9px] uppercase tracking-widest flex items-center gap-1 px-2 py-0.5">
                               <XCircle className="w-3 h-3" /> INACTIVE
                            </Badge>
                         )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteSubscription(sub.id)}>
                          <Trash2 className="w-4 h-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    Subscription stream is currently empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
