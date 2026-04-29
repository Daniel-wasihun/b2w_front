"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Trophy, Plus, Edit2, Trash2, Search, Filter, Eye, Save, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminRacesPage() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRace, setEditingRace] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    max_participants: "",
    start_date: "",
    end_date: "",
    category: "General",
  });

  const fetchRaces = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/races");
      setRaces(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch races");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  const openCreateModal = () => {
    setEditingRace(null);
    setFormData({
      title: "",
      description: "",
      status: "open",
      max_participants: "",
      start_date: "",
      end_date: "",
      category: "General",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (race: any) => {
    setEditingRace(race);
    setFormData({
      title: localize(race.title) || "",
      description: localize(race.description) || "",
      status: race.status || "open",
      max_participants: race.max_participants?.toString() || "",
      start_date: race.start_date ? race.start_date.split('T')[0] : "",
      end_date: race.end_date ? race.end_date.split('T')[0] : "",
      category: race.category || "General",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        start_date: formData.start_date,
        end_date: formData.end_date,
        category: formData.category,
      };

      if (editingRace) {
        await apiClient.put(`/v1/admin/races/${editingRace.id}`, payload);
        toast.success("Race updated successfully");
      } else {
        await apiClient.post("/v1/admin/races", payload);
        toast.success("Race created successfully");
      }
      
      setIsModalOpen(false);
      fetchRaces();
    } catch (err) {
      toast.error("Failed to save race");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRace = async (id: number) => {
    if (!confirm("Are you sure you want to delete this race?")) return;
    try {
      await apiClient.delete(`/v1/admin/races/${id}`);
      toast.success("Race deleted successfully");
      fetchRaces();
    } catch (err) {
      toast.error("Failed to delete race");
    }
  };

  const filteredRaces = races.filter((race: any) => {
    const titleString = typeof race.title === 'string' ? race.title : (race.title ? JSON.stringify(race.title) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Race Management</h1>
            <p className="text-sm text-muted-foreground">Manage all platform competitions and global challenges.</p>
          </div>
          <Button onClick={openCreateModal} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Create Race
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search races by title..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Total Races: <span className="text-foreground">{races.length}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Race Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Capacity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Timeline</TableHead>
                <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={5} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : filteredRaces.length > 0 ? (
                filteredRaces.map((race: any) => (
                  <TableRow key={race.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{localize(race.title)}</span>
                        <span className="text-[11px] text-muted-foreground line-clamp-1 max-w-[250px] font-bold uppercase tracking-tighter">
                          {localize(race.description)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={race.status === 'open' ? 'default' : race.status === 'closed' ? 'destructive' : 'secondary'} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", race.status === 'open' && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {race.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-[13px] font-black text-foreground">
                        <span>{race.participants_count ?? 0}</span>
                        <span className="text-muted-foreground">/ {race.max_participants || '∞'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-[11px] font-bold text-muted-foreground space-y-0.5">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> S: {race.start_date ? new Date(race.start_date).toLocaleDateString() : 'N/A'}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> E: {race.end_date ? new Date(race.end_date).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => openEditModal(race)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteRace(race.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No races found in the database.
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
        title={editingRace ? "Edit Race Data" : "Initialize New Race"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Cancel</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingRace ? "Save Changes" : "Create Race"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Race Title"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g. Winter Challenge 2026"
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Description</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Provide a detailed race briefing..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Category"
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Operational Status</label>
              <select 
                className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="open">OPEN (LIVE)</option>
                <option value="closed">CLOSED</option>
                <option value="draft">DRAFT</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input 
              label="Capacity"
              type="number"
              value={formData.max_participants} 
              onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
            />
            <Input 
              label="Start Date"
              type="date"
              value={formData.start_date} 
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
            />
            <Input 
              label="End Date"
              type="date"
              value={formData.end_date} 
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
