"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  ShieldCheck, 
  Sparkles, 
  Layout, 
  Plus, 
  Save, 
  Trash2, 
  Edit2, 
  ArrowLeft,
  MousePointer2,
  ListChecks,
  Gift,
  Layers,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { LandingDataTable } from "@/components/dashboard/LandingDataTable";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { PremiumCard } from "@/components/ui/premium-card";

export default function AdminProgramsPageManager() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(tabParam || "hero");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({ hero: [], methodology: [], benefits: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [heroRes, methRes, benRes] = await Promise.all([
        apiClient.get("/v1/admin/programs-page/hero"),
        apiClient.get("/v1/admin/programs-page/methodology"),
        apiClient.get("/v1/admin/programs-page/benefits"),
      ]);
      setData({
        hero: heroRes.data.data || [],
        methodology: methRes.data.data || [],
        benefits: benRes.data.data || [],
      });
    } catch (err) {
      toast.error("Failed to fetch programs page data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let endpoint = `/v1/admin/programs-page/${activeTab}`;
      if (editingItem?.id) endpoint += `/${editingItem.id}`;

      await apiClient.post(endpoint, formData);
      toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} updated successfully`);
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await apiClient.delete(`/v1/admin/programs-page/${activeTab}/${id}`);
      toast.success("Item removed from stack");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const tabs = [
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "methodology", label: "Methodology", icon: ListChecks },
    { id: "benefits", label: "Page Benefits", icon: Gift },
  ];

  const columns: any = {
    hero: [
      { header: "Main Title", accessor: "title" },
      { header: "Emphasis Word", accessor: "italic_word" },
      { header: "Status", accessor: "is_active", render: (val: boolean) => (
        <Badge variant={val ? "success" : "secondary"} className="rounded-lg text-[9px] font-black tracking-widest px-3 py-1 uppercase">
          {val ? "LIVE" : "DRAFT"}
        </Badge>
      )},
    ],
    methodology: [
      { header: "Process Title", accessor: "title" },
      { header: "Visual Icon", accessor: "icon", render: (val: string) => (
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-lg">{val}</div>
      )},
      { header: "Priority Order", accessor: "order", render: (val: number) => (
        <span className="text-xs font-black text-muted-foreground">{val || 0}</span>
      )},
    ],
    benefits: [
      { header: "Benefit Essence", accessor: "title" },
      { header: "Visual Asset", accessor: "icon", render: (val: string) => (
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-lg">{val}</div>
      )},
      { header: "Display Order", accessor: "order", render: (val: number) => (
        <span className="text-xs font-black text-muted-foreground">{val || 0}</span>
      )},
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
          <div className="flex items-center gap-6">
            <Link href="/admin/landing">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border/60 hover:bg-muted group transition-all">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Button>
            </Link>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                    <Layers className="w-3 h-3" />
                    Architecture v1.5
                </div>
                <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/60">
                    Programs Page Design
                </h1>
                <p className="text-muted-foreground text-lg font-medium">Coordinate high-level sections and curriculum narratives.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/programs" target="_blank">
                <Button variant="premium" className="h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 font-black">
                    Live Preview
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
             </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl border whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm" 
                  : "text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary" : "text-muted-foreground/60")} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-4">
           <LandingDataTable 
            title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Stack`}
            columns={columns[activeTab]}
            data={data[activeTab]}
            loading={loading}
            onCreate={() => {
              setEditingItem(null);
              setFormData(activeTab === "hero" ? { title: "", italic_word: "", badge: "", subtitle: "", is_active: true } : { title: "", description: "", icon: "", order: 0, is_active: true });
              setIsModalOpen(true);
            }}
            onEdit={(item) => {
              setEditingItem(item);
              setFormData(item);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            createLabel={activeTab === "hero" ? "Initialize Hero" : `Append ${activeTab}`}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? `Update Intelligence Cluster` : `Initialize New Layer`}
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl h-12 px-6 font-bold">Discard</Button>
            <Button variant="premium" onClick={handleSave} isLoading={isSaving} className="rounded-xl h-12 px-8 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-[10px]">
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? "Commit Changes" : "Deploy Component"}
            </Button>
          </div>
        }
      >
        <div className="space-y-8 py-4">
           {activeTab === "hero" ? (
             <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Main Title</label>
                    <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="h-12 rounded-2xl" placeholder="Curriculum Alpha..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Emphasis Word</label>
                    <Input value={formData.italic_word} onChange={(e) => setFormData({...formData, italic_word: e.target.value})} className="h-12 rounded-2xl" placeholder="Evolution..." />
                  </div>
               </div>
               <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Header Badge</label>
                    <Input value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})} className="h-12 rounded-2xl" placeholder="Limited Cohort..." />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Narrative Subtitle</label>
                  <textarea 
                    className="w-full min-h-[120px] rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all font-medium"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    placeholder="Describe the program vision..."
                  />
               </div>
             </>
           ) : (
             <>
               <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Component Title</label>
                    <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="h-12 rounded-2xl" placeholder="Strategic Thinking..." />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Process Description</label>
                  <textarea 
                    className="w-full min-h-[120px] rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all font-medium"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Outline the details of this component..."
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Asset / Emoji</label>
                    <Input value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="h-12 rounded-2xl" placeholder="🚀" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stack Priority</label>
                    <Input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} className="h-12 rounded-2xl" />
                  </div>
               </div>
             </>
           )}
           <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
              <input 
                type="checkbox" 
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="w-5 h-5 accent-primary rounded-md"
              />
              <div className="flex flex-col">
                <label htmlFor="is_active" className="text-sm font-black tracking-tight">Active Deployment</label>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Toggle visibility on the live programs track</p>
              </div>
            </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
