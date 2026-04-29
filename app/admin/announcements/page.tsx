"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Megaphone, Plus, Edit2, Trash2, Search, Save, Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
    expires_at: "",
  });

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/announcements");
      setAnnouncements(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch broadcast stream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingAnnouncement) {
        await apiClient.put(`/v1/admin/announcements/${editingAnnouncement.id}`, formData);
        toast.success("Broadcast intelligence updated");
      } else {
        await apiClient.post("/v1/admin/announcements", formData);
        toast.success("New broadcast initialized");
      }
      setIsModalOpen(false);
      fetchAnnouncements();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAnnouncement = async (id: number) => {
    if (!confirm("Permanently purge this broadcast?")) return;
    try {
      await apiClient.delete(`/v1/admin/announcements/${id}`);
      toast.success("Broadcast purged");
      fetchAnnouncements();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredAnnouncements = announcements.filter((a: any) => {
    const titleString = typeof a.title === 'string' ? a.title : (a.title ? JSON.stringify(a.title) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Badge variant="destructive" className="rounded font-black text-[9px] uppercase tracking-widest">URGENT</Badge>;
      case 'high': return <Badge variant="warning" className="rounded font-black text-[9px] uppercase tracking-widest">HIGH</Badge>;
      case 'normal': return <Badge variant="default" className="rounded font-black text-[9px] uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border-none">NORMAL</Badge>;
      default: return <Badge variant="secondary" className="rounded font-black text-[9px] uppercase tracking-widest">LOW</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Broadcast Stream</h1>
            <p className="text-sm text-muted-foreground">Manage platform-wide announcements and urgent communications.</p>
          </div>
          <Button onClick={() => {
            setEditingAnnouncement(null);
            setFormData({ title: "", content: "", priority: "normal", expires_at: "" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Broadcast
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search broadcast archives..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Broadcast Intelligence</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Priority Level</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Expiry Status</TableHead>
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
              ) : filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((ann: any) => (
                  <TableRow key={ann.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                            <Bell className="w-4 h-4 text-muted-foreground" />
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground line-clamp-1 max-w-[300px]">{localize(ann.title)}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{new Date(ann.created_at).toLocaleDateString()}</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       {getPriorityBadge(ann.priority)}
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {ann.expires_at ? new Date(ann.expires_at).toLocaleDateString() : 'PERMANENT'}
                       </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingAnnouncement(ann);
                          setFormData({ 
                            title: localize(ann.title), 
                            content: ann.content, 
                            priority: ann.priority, 
                            expires_at: ann.expires_at?.split('T')[0] || "" 
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteAnnouncement(ann.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No active broadcasts found.
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
        title={editingAnnouncement ? "Sync Broadcast Intelligence" : "Initialize New Broadcast"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingAnnouncement ? "Commit Sync" : "Deploy Broadcast"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Broadcast Title"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. Critical System Maintenance" 
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Broadcast Content</label>
            <textarea 
              className="w-full min-h-[150px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Synthesize broadcast message..."
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Priority Level</label>
               <select 
                 className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                 value={formData.priority}
                 onChange={(e) => setFormData({...formData, priority: e.target.value})}
               >
                  <option value="low">Low Priority</option>
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent / Critical</option>
               </select>
            </div>
            <Input 
              label="Expiry Date"
              type="date"
              value={formData.expires_at} 
              onChange={(e) => setFormData({...formData, expires_at: e.target.value})} 
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
