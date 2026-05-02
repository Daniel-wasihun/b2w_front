"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LandingDataTable } from "@/components/dashboard/LandingDataTable";
import { Save, User as UserIcon, Plus, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Modal } from "@/components/ui/modal";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { cn, localize } from "@/lib/utils";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Delete Confirmation State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    content: "",
    role: "",
    avatar: "",
    is_featured: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/testimonials");
      setTestimonials(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingTestimonial) {
        const res = await apiClient.put(`/v1/admin/testimonials/${editingTestimonial.id}`, formData);
        const updatedItem = res.data.data;
        setTestimonials(prev => prev.map(item => item.id === editingTestimonial.id ? updatedItem : item));
        toast.success("Success story updated");
      } else {
        const res = await apiClient.post("/v1/admin/testimonials", formData);
        setTestimonials(prev => [res.data.data, ...prev]);
        toast.success("New success story archived");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await apiClient.delete(`/v1/admin/testimonials/${itemToDelete}`);
      setTestimonials(prev => prev.filter(item => item.id !== itemToDelete));
      toast.success("Entry purged");
      setIsConfirmOpen(false);
    } catch (err) {
      toast.error("Purge failed");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    {
      header: "Student Identity",
      accessor: "name",
      render: (val: string, item: any) => {
        const isValidUrl = item.avatar && (item.avatar.startsWith('http') || item.avatar.startsWith('/'));
        return (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border border-border shadow-sm">
              {isValidUrl ? (
                <img src={item.avatar} className="w-full h-full object-cover" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <UserIcon className="w-5 h-5 text-primary/40" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-foreground">{localize(val)}</span>
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{localize(item.role) || 'Member Node'}</span>
            </div>
          </div>
        );
      }
    },
    {
      header: "Narrative Cluster",
      accessor: "content",
      render: (val: string) => (
        <div className="flex items-start gap-2 max-w-md">
          <Quote className="w-3 h-3 text-primary/40 shrink-0 mt-1" />
          <p className="text-[13px] text-muted-foreground line-clamp-1 italic font-medium">"{localize(val)}"</p>
        </div>
      )
    },
    {
      header: "Placement",
      accessor: "is_featured",
      render: (val: boolean) => (
        <Badge variant={val ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", val && "bg-emerald-500/10 text-emerald-500 border-none")}>
          {val ? "FEATURED NODES" : "STANDARD ARCHIVE"}
        </Badge>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Success Stories</h1>
            <p className="text-sm text-muted-foreground">Manage customer feedback and narrative success stories.</p>
          </div>
        </div>

        <LandingDataTable 
          title="Verified Narrative Matrix"
          columns={columns}
          data={testimonials}
          loading={loading}
          createLabel="New Story"
          onCreate={() => {
            setEditingTestimonial(null);
            setFormData({ name: "", content: "", role: "", avatar: "", is_featured: true });
            setIsModalOpen(true);
          }}
          onEdit={(item) => {
            setEditingTestimonial(item);
            setFormData({ 
              name: localize(item.name), 
              content: localize(item.content), 
              role: localize(item.role), 
              avatar: item.avatar || "", 
              is_featured: !!item.is_featured 
            });
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteClick}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTestimonial ? "Sync Success Narrative" : "Initialize New Story"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingTestimonial ? "Commit Sync" : "Deploy Narrative"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Student Identity"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="Full Name" 
            />
            <Input 
              label="Operational Role / Achievement"
              value={formData.role} 
              onChange={(e) => setFormData({...formData, role: e.target.value})} 
              placeholder="e.g. Software Engineer" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Testimonial Narrative</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Share their experience and outcome..."
            />
          </div>

          <Input 
            label="Avatar Asset URL"
            value={formData.avatar} 
            onChange={(e) => setFormData({...formData, avatar: e.target.value})} 
            placeholder="https://..." 
          />

          <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
            <input 
              type="checkbox" 
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
              className="w-5 h-5 accent-primary rounded-md"
            />
            <div className="flex flex-col">
              <label htmlFor="is_featured" className="text-sm font-black tracking-tight cursor-pointer">Featured Placement</label>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the primary social proof section</p>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Purge Success Narrative?"
        description="This action is irreversible. The student narrative will be permanently purged from the global archives."
        confirmLabel="Purge Archive"
      />
    </DashboardLayout>
  );
}