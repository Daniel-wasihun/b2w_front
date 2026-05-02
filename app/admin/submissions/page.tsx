"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileCheck, Search, Filter, Eye, CheckCircle, XCircle, Award, Save, Activity, Shield, ArrowUpRight, ChevronRight, Layers } from "lucide-react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, localize } from "@/lib/utils";
import { useAdminApi } from "@/lib/hooks/useAdminApi";

interface Submission {
  id: number;
  user: {
    name: string;
    email: string;
  };
  race: {
    title: string;
  };
  content: string;
  submission_url?: string;
  points_awarded: number;
  status: 'pending' | 'graded' | 'rejected';
  feedback: string;
  created_at: string;
}

interface JudgingData {
  points: number;
  status: 'graded' | 'rejected' | 'pending';
  feedback: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [judgingData, setJudgingData] = useState<JudgingData>({
    points: 0,
    status: "graded",
    feedback: "",
  });
  
  const { execute, loading: apiLoading, error } = useAdminApi();

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

  const openJudgingModal = (submission: Submission) => {
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
      const res = await apiClient.post(`/v1/admin/submissions/${editingSubmission?.id}/judge`, judgingData);
      const updatedItem = res.data.data;
      setSubmissions(prev => prev.map(item => item.id === editingSubmission?.id ? updatedItem : item));
      toast.success("Merit assessment committed successfully");
      setIsModalOpen(false);
      // Reset judging data
      setJudgingData({
        points: 0,
        status: "graded",
        feedback: "",
      });
    } catch (err) {
      toast.error("Failed to commit assessment");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const userName = sub.user.name.toLowerCase();
      const raceTitle = sub.race.title.toLowerCase();
      const search = searchTerm.toLowerCase();
      return userName.includes(search) || raceTitle.includes(search);
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
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Awaiting</span>
              <span className="text-xl font-black text-foreground tabular-nums">{submissions.filter((s) => s.status === 'pending').length}</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Verified</span>
              <span className="text-xl font-black text-emerald-500 tabular-nums">{submissions.filter((s) => s.status === 'graded').length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <AdminSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by participant or challenge..."
          />
          <AdminButton variant="outline" size="sm" className="h-9 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-muted">
            Export Audit Data
          </AdminButton>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <AdminTable<Submission>
            columns={[
              {
                header: "Participant Node",
                accessor: (sub: Submission) => (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-black text-[10px] text-primary border border-primary/20 uppercase">
                      {sub.user.name?.[0] || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-foreground">{sub.user.name}</span>
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">{sub.user.email}</span>
                    </div>
                  </div>
                ),
              },
              {
                header: "Challenge Vector",
                accessor: (sub: Submission) => (
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-foreground">{localize(sub.race.title)}</span>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                      {new Date(sub.created_at).toLocaleDateString()} • {new Date(sub.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ),
              },
              {
                header: "Deployment State",
                accessor: (sub: Submission) => (
                  <Badge 
                    variant={sub.status === 'graded' ? 'default' : 'secondary'} 
                    className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", 
                      sub.status === 'graded' ? "bg-emerald-500/10 text-emerald-500 border-none" : 
                      sub.status === 'pending' ? "bg-amber-500/10 text-amber-500 border-none" : ""
                    )}
                  >
                    {sub.status === 'graded' ? 'VERIFIED' : sub.status === 'pending' ? 'IN-REVIEW' : 'REJECTED'}
                  </Badge>
                ),
              },
              {
                header: "Verified Merit",
                accessor: (sub: Submission) => (
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-lg font-black tabular-nums text-foreground">{sub.points_awarded || 0}</span>
                  </div>
                ),
              },
            ]}
            renderActions={(sub: Submission) => (
              <AdminButton 
                variant="outline" 
                size="sm" 
                className="h-8 text-[10px] font-black uppercase tracking-widest px-3 hover:bg-primary hover:text-white transition-all border-border shadow-sm group"
                onClick={() => openJudgingModal(sub)}
              >
                Audit
                <ChevronRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </AdminButton>
            )}
            data={filteredSubmissions}
            loading={loading}
            emptyMessage="Review queue is currently empty."
          />
        </div>

        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setJudgingData({
              points: 0,
              status: "graded",
              feedback: "",
            });
            setEditingSubmission(null);
          }}
          title="Merit Assessment Protocol"
          footer={
            <div className="flex gap-2">
              <AdminButton variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">
                Discard
              </AdminButton>
              <AdminButton onClick={handleJudge} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
                <Save className="w-4 h-4 mr-2" />
                Commit Merit
              </AdminButton>
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
                onChange={(e) => setJudgingData({...judgingData, points: parseInt(e.target.value) || 0})}
                placeholder="0 - 100"
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Operational Verdict</label>
                <select 
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                  value={judgingData.status}
                  onChange={(e) => setJudgingData({...judgingData, status: e.target.value as JudgingData['status']})}
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
        </AdminModal>
      </div>
    </DashboardLayout>
  );
}