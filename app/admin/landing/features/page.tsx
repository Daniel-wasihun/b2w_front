"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LandingDataTable } from "@/components/dashboard/LandingDataTable";
import { Save, ShieldCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminFeaturesPage() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "ShieldCheck",
    order: "0",
    is_active: true,
  });

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/features");
      setFeatures(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load capabilities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData, order: parseInt(formData.order) };
      if (editingFeature) {
        await apiClient.put(`/v1/admin/features/${editingFeature.id}`, payload);
        toast.success("Capability intelligence updated");
      } else {
        await apiClient.post("/v1/admin/features", payload);
        toast.success("New capability node initialized");
      }
      setIsModalOpen(false);
      fetchFeatures();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFeature = async (id: number) => {
    if (!confirm("Permanently purge this capability?")) return;
    try {
      await apiClient.delete(`/v1/admin/features/${id}`);
      toast.success("Feature purged");
      fetchFeatures();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const columns = [
    {
      header: "Platform Capability",
      accessor: "title",
      render: (val: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-primary/60" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-foreground">{localize(val)}</span>
            <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-tight line-clamp-1 max-w-[400px]">{localize(item.description)}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (val: boolean) => (
        <Badge variant={val ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", val && "bg-emerald-500/10 text-emerald-500 border-none")}>
          {val ? "ACTIVE DEPLOYMENT" : "DRAFT ARCHIVE"}
        </Badge>
      )
    },
    {
      header: "Sequence",
      accessor: "order",
      render: (val: number) => <span className="font-black text-[11px] text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded border border-border">Rank #{val}</span>
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Core Feature Architecture</h1>
            <p className="text-sm text-muted-foreground">Manage the core value propositions shown to global visitors.</p>
          </div>
          <Button onClick={() => {
            setEditingFeature(null);
            setFormData({ title: "", description: "", icon: "ShieldCheck", order: "0", is_active: true });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Add Capability
          </Button>
        </div>

        <LandingDataTable 
          title="Capability Matrix"
          columns={columns}
          data={features}
          loading={loading}
          createLabel="Add Capability"
          onCreate={() => {
            setEditingFeature(null);
            setFormData({ title: "", description: "", icon: "ShieldCheck", order: "0", is_active: true });
            setIsModalOpen(true);
          }}
          onEdit={(item) => {
            setEditingFeature(item);
            setFormData({ 
              title: localize(item.title), 
              description: localize(item.description), 
              icon: item.icon || "ShieldCheck", 
              order: item.order.toString(), 
              is_active: !!item.is_active 
            });
            setIsModalOpen(true);
          }}
          onDelete={deleteFeature}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFeature ? "Sync Capability Intelligence" : "Initialize New Feature"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingFeature ? "Commit Sync" : "Deploy Feature"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Feature Identity"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. Real-time Mentorship" 
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Value Proposition Narrative</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Why is this feature important for the platform?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Visual Icon Key"
              value={formData.icon} 
              onChange={(e) => setFormData({...formData, icon: e.target.value})} 
              placeholder="e.g. Zap" 
            />
            <Input 
              label="Stack Priority"
              type="number"
              value={formData.order} 
              onChange={(e) => setFormData({...formData, order: e.target.value})} 
            />
          </div>

          <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
            <input 
              type="checkbox" 
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              className="w-5 h-5 accent-primary rounded-md"
            />
            <div className="flex flex-col">
              <label htmlFor="is_active" className="text-sm font-black tracking-tight cursor-pointer">Live Deployment</label>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the core feature set</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
