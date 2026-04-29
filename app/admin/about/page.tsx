"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Edit2, Trash2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminAboutNarrativePage() {
  const [narratives, setNarratives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNarrative, setEditingNarrative] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    section_name: "",
    title: "",
    content: "",
    image: "",
    is_active: true,
  });

  const fetchNarratives = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/about-narratives");
      setNarratives(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch organizational narrative");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNarratives();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingNarrative) {
        await apiClient.put(`/v1/admin/about-narratives/${editingNarrative.id}`, formData);
        toast.success("Narrative node updated");
      } else {
        await apiClient.post("/v1/admin/about-narratives", formData);
        toast.success("New narrative node initialized");
      }
      setIsModalOpen(false);
      fetchNarratives();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNarrative = async (id: number) => {
    if (!confirm("Permanently purge this narrative node?")) return;
    try {
      await apiClient.delete(`/v1/admin/about-narratives/${id}`);
      toast.success("Node purged");
      fetchNarratives();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredNarratives = narratives.filter((n: any) => {
    const titleString = typeof n.title === 'string' ? n.title : (n.title ? JSON.stringify(n.title) : "");
    const sectionString = typeof n.section_name === 'string' ? n.section_name : (n.section_name ? JSON.stringify(n.section_name) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase()) ||
           sectionString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Organizational Narrative</h1>
            <p className="text-sm text-muted-foreground">Manage the brand story and platform history layers.</p>
          </div>
          <Button onClick={() => {
            setEditingNarrative(null);
            setFormData({ section_name: "", title: "", content: "", image: "", is_active: true });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Section
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search narrative nodes..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Section Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Title Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Deployment</TableHead>
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
              ) : filteredNarratives.length > 0 ? (
                filteredNarratives.map((narrative: any) => (
                  <TableRow key={narrative.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <Badge variant="outline" className="rounded font-black text-[10px] px-2 py-0.5 border-border text-muted-foreground bg-muted/50 uppercase tracking-widest">
                        {localize(narrative.section_name)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <span className="font-bold text-sm text-foreground line-clamp-1 max-w-[250px]">{localize(narrative.title)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={narrative.is_active ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", narrative.is_active && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {narrative.is_active ? "PUBLISHED" : "HIDDEN"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingNarrative(narrative);
                          setFormData({ 
                            section_name: localize(narrative.section_name), 
                            title: localize(narrative.title), 
                            content: localize(narrative.content), 
                            image: narrative.image || "", 
                            is_active: !!narrative.is_active 
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteNarrative(narrative.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No narrative nodes defined in the archive.
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
        title={editingNarrative ? "Sync Narrative Data" : "Initialize New Section"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingNarrative ? "Commit Sync" : "Deploy Section"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Section Key (Slug)"
              value={formData.section_name} 
              onChange={(e) => setFormData({...formData, section_name: e.target.value})} 
              placeholder="e.g. mission_statement" 
            />
            <Input 
              label="Display Title"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Our Core Mission" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Narrative Content</label>
            <textarea 
              className="w-full min-h-[150px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="The story content goes here..."
            />
          </div>
          <Input 
            label="Visual Asset URL"
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
            placeholder="https://..." 
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
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the brand story</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
