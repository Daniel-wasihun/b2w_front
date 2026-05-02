"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LandingDataTable } from "@/components/dashboard/LandingDataTable";
import { Save, Layout, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAdminCrud } from "@/lib/adminCrud";
import { Modal } from "@/components/ui/modal";
import { cn, localize, isValidAssetUrl } from "@/lib/utils";

export default function AdminLandingProgramsPage() {
  const { items, loading, fetchItems, createItem, updateItem, deleteItem } = useAdminCrud("/v1/admin/programs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    badge: "",
    image: "",
    order: "0",
    is_active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { ...formData, order: parseInt(formData.order) };
      if (editingProgram) {
        await updateItem(editingProgram.id, payload);
        toast.success("Track intelligence updated");
      } else {
        await createItem(payload);
        toast.success("New educational pathway initialized");
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      // Error handled by hook
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Permanently decommission this educational track?")) return;
    const success = await deleteItem(id);
    if (success) {
      toast.success("Track node purged");
      fetchItems();
    }
  };

  const columns = [
    {
      header: "Educational Track",
      accessor: "title",
      render: (val: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border shadow-sm group-hover:border-primary/20 transition-all">
            {isValidAssetUrl(item.image) ? (
              <img src={item.image} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <Layers className="w-5 h-5 text-primary/40" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-foreground">{localize(val)}</span>
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{localize(item.badge) || 'Standard Protocol'}</span>
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
      render: (val: number) => <span className="font-black text-[11px] text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded border border-border">Priority #{val}</span>
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Track Architecture</h1>
            <p className="text-sm text-muted-foreground">Configure core learning tracks and educational pathways.</p>
          </div>
        </div>

        <LandingDataTable 
          title="Educational Track Matrix"
          columns={columns}
          data={items}
          loading={loading}
          createLabel="Launch Track"
          onCreate={() => {
            setEditingProgram(null);
            setFormData({ title: "", description: "", badge: "", image: "", order: "0", is_active: true });
            setIsModalOpen(true);
          }}
          onEdit={(item) => {
            setEditingProgram(item);
            setFormData({ 
              title: localize(item.title), 
              description: localize(item.description), 
              badge: localize(item.badge), 
              image: item.image || "", 
              order: item.order.toString(), 
              is_active: !!item.is_active 
            });
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProgram ? "Sync Pathway Intelligence" : "Initialize New Pathway"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingProgram ? "Commit Sync" : "Deploy Track"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Program Track Identity"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. Fullstack Mastery" 
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Track Narrative Overview</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What will students learn in this track?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Track Status Badge"
              value={formData.badge} 
              onChange={(e) => setFormData({...formData, badge: e.target.value})} 
              placeholder="e.g. Beginner Friendly" 
            />
            <Input 
              label="Sequence Priority"
              type="number"
              value={formData.order} 
              onChange={(e) => setFormData({...formData, order: e.target.value})} 
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
              <label htmlFor="is_active" className="text-sm font-black tracking-tight cursor-pointer">Live Deployment</label>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the educational pathway</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}