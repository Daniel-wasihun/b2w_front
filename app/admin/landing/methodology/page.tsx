"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Target, Plus, Edit2, Trash2, Search, Save, Layout, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminProgramMethodologyPage() {
  const [methodologies, setMethodologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    program_id: "",
    title: "",
    description: "",
    step_number: "1",
  });

  const fetchMethodologies = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/program-methodologies");
      setMethodologies(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch educational protocols");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethodologies();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData, step_number: parseInt(formData.step_number) };
      if (editingMethod) {
        await apiClient.put(`/v1/admin/program-methodologies/${editingMethod.id}`, payload);
        toast.success("Protocol intelligence updated");
      } else {
        await apiClient.post("/v1/admin/program-methodologies", payload);
        toast.success("New protocol node deployed");
      }
      setIsModalOpen(false);
      fetchMethodologies();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMethod = async (id: number) => {
    if (!confirm("Permanently purge this protocol node?")) return;
    try {
      await apiClient.delete(`/v1/admin/program-methodologies/${id}`);
      toast.success("Node purged");
      fetchMethodologies();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredMethods = methodologies.filter((m: any) => {
    const titleString = typeof m.title === 'string' ? m.title : (m.title ? JSON.stringify(m.title) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Learning Methodology</h1>
            <p className="text-sm text-muted-foreground">Define the step-by-step educational protocols for your tracks.</p>
          </div>
          <Button onClick={() => {
            setEditingMethod(null);
            setFormData({ program_id: "", title: "", description: "", step_number: "1" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Define Step
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search protocols..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Protocol Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Track Association</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Step Sequence</TableHead>
                <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={4} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : filteredMethods.length > 0 ? (
                filteredMethods.map((method: any) => (
                  <TableRow key={method.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shadow-sm">
                            <Target className="w-5 h-5 text-primary/60" />
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{localize(method.title)}</span>
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest line-clamp-1 max-w-[250px]">{localize(method.description)}</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded font-black text-[9px] px-2 py-0.5 border-border text-muted-foreground bg-muted/50 uppercase tracking-widest">
                        {method.program?.title ? localize(method.program.title) : `TRACK_NODE #${method.program_id}`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center text-[11px] font-black shadow-lg shadow-foreground/20">
                            {method.step_number}
                          </span>
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">PHASE_NODE</span>
                       </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingMethod(method);
                          setFormData({ 
                            program_id: method.program_id.toString(), 
                            title: localize(method.title), 
                            description: localize(method.description), 
                            step_number: method.step_number.toString() 
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteMethod(method.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No educational protocols found in the archive.
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
        title={editingMethod ? "Sync Protocol Intelligence" : "Initialize New Phase"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingMethod ? "Commit Sync" : "Deploy Phase"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Track Node Association (ID)"
              value={formData.program_id} 
              onChange={(e) => setFormData({...formData, program_id: e.target.value})} 
              placeholder="e.g. 1" 
            />
            <Input 
              label="Phase Sequence Index"
              type="number"
              value={formData.step_number} 
              onChange={(e) => setFormData({...formData, step_number: e.target.value})} 
            />
          </div>
          <Input 
            label="Phase Operational Label"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. Fundamental Immersion" 
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Protocol Narrative</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What happens in this phase of the methodology?"
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
