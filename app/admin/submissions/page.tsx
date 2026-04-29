"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileCheck, Search, Filter, Eye, CheckCircle, XCircle, Award, Save, Activity, Shield, ArrowUpRight, ChevronRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Judging State
  const [judgingData, setJudgingData] = useState({
    points: 0,
    status: "graded",
    feedback: "",
  });

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/submissions");
      setSubmissions(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch submissions stream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const openJudgingModal = (submission: any) => {
    setEditingSubmission(submission);
    setJudgingData({
      points: submission.points_awarded || 0,
      status: submission.status || "graded",
      feedback: submission.feedback || "",
    });
    setIsModalOpen(true);
  };

  const handleJudge = async () => {
    setIsSaving(true);
    try {
      await apiClient.post(`/v1/admin/submissions/${editingSubmission.id}/judge`, judgingData);
      toast.success("Merit assessment committed successfully");
      setIsModalOpen(false);
      fetchSubmissions();
    } catch (err) {
      toast.error("Failed to commit assessment");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub: any) => {
      const userName = typeof sub.user?.name === 'string' ? sub.user.name : (sub.user?.name ? JSON.stringify(sub.user.name) : "");
      const raceTitle = typeof sub.race?.title === 'string' ? sub.race.title : (sub.race?.title ? JSON.stringify(sub.race.title) : "");
      return userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             raceTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [submissions, searchTerm]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Review Queue</h1>
            <p className="text-sm text-muted-foreground">Evaluate participant intelligence and allocate verified merits.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-6 px-5 py-2.5 bg-muted/30 rounded-xl border border-border shadow-sm">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Awaiting</span>
                    <span className="text-xl font-black text-foreground tabular-nums">{submissions.filter((s: any) => s.status === 'pending').length}</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Verified</span>
                    <span className="text-xl font-black text-emerald-500 tabular-nums">{submissions.filter((s: any) => s.status === 'graded').length}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by participant or challenge..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-muted">
            Export Audit Data
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Participant Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Challenge Vector</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Deployment State</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Verified Merit</TableHead>
                <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Protocol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={5} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub: any) => (
                  <TableRow key={sub.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-black text-[10px] text-primary border border-primary/20 uppercase">
                          {sub.user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">{sub.user?.name}</span>
                          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">{sub.user?.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-foreground">{localize(sub.race?.title)}</span>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                          {new Date(sub.created_at).toLocaleDateString()} • {new Date(sub.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={sub.status === 'graded' ? 'default' : 'secondary'} 
                        className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", 
                          sub.status === 'graded' ? "bg-emerald-500/10 text-emerald-500 border-none" : 
                          sub.status === 'pending' ? "bg-amber-500/10 text-amber-500 border-none" : ""
                        )}
                      >
                        {sub.status === 'graded' ? 'VERIFIED' : sub.status === 'pending' ? 'IN-REVIEW' : 'REJECTED'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                         <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Award className="w-3.5 h-3.5" />
                         </div>
                         <span className="text-lg font-black tabular-nums text-foreground">{sub.points_awarded || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-[10px] font-black uppercase tracking-widest px-3 hover:bg-primary hover:text-white transition-all border-border shadow-sm group"
                        onClick={() => openJudgingModal(sub)}
                      >
                        Audit
                        <ChevronRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    Review queue is currently empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Merit Assessment Protocol"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleJudge} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              Commit Merit
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="p-6 bg-muted/30 rounded-xl border border-border shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-primary" />
                Submission Narrative
            </h4>
            <p className="text-sm text-foreground leading-relaxed font-medium bg-background p-4 rounded-lg border border-border">
              {editingSubmission?.content || "No textual intelligence provided for this submission."}
            </p>
            {editingSubmission?.submission_url && (
              <div className="mt-4 pt-4 border-t border-border">
                <a 
                  href={editingSubmission.submission_url} 
                  target="_blank" 
                  className="inline-flex items-center gap-2 text-[11px] font-black text-primary hover:underline uppercase tracking-widest"
                >
                  Analyze Primary Asset <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Merit Allocation (Points)"
              type="number"
              value={judgingData.points} 
              onChange={(e) => setJudgingData({...judgingData, points: parseInt(e.target.value)})}
              placeholder="0 - 100"
            />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Operational Verdict</label>
              <select 
                className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                value={judgingData.status}
                onChange={(e) => setJudgingData({...judgingData, status: e.target.value})}
              >
                <option value="graded">VERIFY & ALLOCATE</option>
                <option value="rejected">REJECT & ARCHIVE</option>
                <option value="pending">MAINTAIN QUEUE</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Feedback Narrative</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={judgingData.feedback}
              onChange={(e) => setJudgingData({...judgingData, feedback: e.target.value})}
              placeholder="Provide constructive feedback for the participant..."
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
