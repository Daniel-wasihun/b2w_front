"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Calendar, Plus, Edit2, Trash2, Search, Eye, Save, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
    is_active: true,
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/events");
      setEvents(res.data.data || []);
    } catch (err) {
      toast.error("Failed to synchronize event stream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      image: "",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      image: event.image || "",
      is_active: !!event.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingEvent) {
        await apiClient.put(`/v1/admin/events/${editingEvent.id}`, formData);
        toast.success("Event intelligence updated");
      } else {
        await apiClient.post("/v1/admin/events", formData);
        toast.success("New event deployed");
      }
      
      setIsModalOpen(false);
      fetchEvents();
    } catch (err) {
      toast.error("Failed to synchronize event");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEvent = async (id: number) => {
    if (!confirm("Permanently purge this event?")) return;
    try {
      await apiClient.delete(`/v1/admin/events/${id}`);
      toast.success("Event purged");
      fetchEvents();
    } catch (err) {
      toast.error("Purge operation failed");
    }
  };

  const filteredEvents = events.filter((ev: any) => 
    (ev.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Elite Events Calendar</h1>
            <p className="text-sm text-muted-foreground">Manage platform-wide conferences, summits, and meetups.</p>
          </div>
          <Button onClick={openCreateModal} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Event
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search event archives..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Scheduled Events: <span className="text-foreground">{events.length}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Event Detail</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Deployment</TableHead>
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
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((ev: any) => (
                  <TableRow key={ev.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden border border-border group-hover:border-primary/20 transition-all">
                          {ev.image ? (
                            <img src={ev.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                <Calendar className="w-4 h-4 text-primary/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">{ev.title}</span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-black uppercase tracking-widest">
                            <MapPin className="w-3 h-3 text-primary/60" /> {ev.location || 'Remote Node'}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex flex-col text-[11px] font-bold text-muted-foreground space-y-0.5">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {ev.date || 'TBD'}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {ev.time || 'TBD'}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={ev.is_active ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", ev.is_active && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {ev.is_active ? "ACTIVE" : "DRAFT"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => openEditModal(ev)}>
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteEvent(ev.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No events scheduled in the archive.
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
        title={editingEvent ? "Sync Event Data" : "Initialize New Event Cluster"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingEvent ? "Commit Sync" : "Deploy Event"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Event Title"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g. Global Tech Summit 2026"
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Event Briefing</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the objective and itinerary..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Event Date"
              type="date"
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            <Input 
              label="Event Time"
              type="time"
              value={formData.time} 
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>

          <Input 
            label="Location / Virtual Node"
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="e.g. London, UK or Zoom Link"
          />

          <Input 
            label="Banner Asset URL"
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
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the event calendar</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
