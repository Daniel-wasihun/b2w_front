"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Flag, Plus, Edit2, Trash2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminPhilosophyPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    icon: "Flag",
    order: "0",
    is_active: true,
  });

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/philosophy-sections");
      setSections(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch philosophy nodes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData, order: parseInt(formData.order) };
      if (editingSection) {
        await apiClient.put(`/v1/admin/philosophy-sections/${editingSection.id}`, payload);
        toast.success("Philosophy node updated");
      } else {
        await apiClient.post("/v1/admin/philosophy-sections", payload);
        toast.success("New philosophy node initialized");
      }
      setIsModalOpen(false);
      fetchSections();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteSection = async (id: number) => {
    if (!confirm("Permanently purge this philosophy node?")) return;
    try {
      await apiClient.delete(`/v1/admin/philosophy-sections/${id}`);
      toast.success("Node purged");
      fetchSections();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredSections = sections.filter((s: any) => {
    const titleString = typeof s.title === 'string' ? s.title : (s.title ? JSON.stringify(s.title) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Philosophy Nodes</h1>
            <p className="text-sm text-muted-foreground">Manage the core values and philosophical pillars of the platform.</p>
          </div>
          <Button onClick={() => {
            setEditingSection(null);
            setFormData({ title: "", content: "", icon: "Flag", order: "0", is_active: true });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Node
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search philosophy nodes..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Core Value Node</TableHead>
                <TableHead className="text-[10px) font-black uppercase tracking-widest text-muted-foreground h-12">Sequence</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
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
              ) : filteredSections.length > 0 ? (
                filteredSections.map((section: any) => (
                  <TableRow key={section.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                            <Flag className="w-4 h-4 text-amber-500" />
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{localize(section.title)}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest line-clamp-1 max-w-[250px]">{localize(section.content)}</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground">
                      Rank #{section.order}
                    </TableCell>
                    <TableCell>
                      <Badge variant={section.is_active ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", section.is_active && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {section.is_active ? "ACTIVE" : "HIDDEN"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingSection(section);
                          setFormData({ 
                            title: localize(section.title), 
                            content: localize(section.content), 
                            icon: section.icon || "Flag", 
                            order: section.order.toString(), 
                            is_active: !!section.is_active 
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteSection(section.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No philosophy nodes indexed in the architecture.
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
        title={editingSection ? "Sync Philosophy Data" : "Initialize New Pillar"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingSection ? "Commit Sync" : "Deploy Pillar"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Pillar Title"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Innovation First" 
            />
            <Input 
              label="Sequence Priority"
              type="number"
              value={formData.order} 
              onChange={(e) => setFormData({...formData, order: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Philosophical Narrative</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Describe the philosophical foundation..."
            />
          </div>
          <Input 
            label="Icon Key"
            value={formData.icon} 
            onChange={(e) => setFormData({...formData, icon: e.target.value})} 
            placeholder="e.g. Target" 
          />
          <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
            <input 
              type="checkbox" 
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              className="w-5 h-5 accent-primary rounded-md"
            />
            <div className="flex flex-col">
                <label htmlFor="is_active" className="text-sm font-black tracking-tight cursor-pointer">Active Deployment</label>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the philosophical track</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
