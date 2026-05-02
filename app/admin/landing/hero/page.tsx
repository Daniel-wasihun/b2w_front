"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LandingDataTable } from "@/components/dashboard/LandingDataTable";
import { Save, Sparkles, Layout, Plus as PlusIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAdminCrud } from "@/lib/adminCrud";
import { Modal } from "@/components/ui/modal";
import { cn, localize, isValidAssetUrl } from "@/lib/utils";

export default function AdminHeroPage() {
  const { items, loading, fetchItems, createItem, updateItem, deleteItem } = useAdminCrud("/v1/admin/hero");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: "",
    cta_text: "",
    cta_link: "#",
    is_active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingHero) {
        await updateItem(editingHero.id, formData);
        toast.success("Hero architecture updated");
      } else {
        await createItem(formData);
        toast.success("New hero archive initialized");
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
    if (!confirm("Permanently purge this hero version?")) return;
    const success = await deleteItem(id);
    if (success) {
      toast.success("Hero archive purged");
      fetchItems();
    }
  };

  const columns = [
    {
      header: "Hero Identity",
      accessor: "title",
      render: (val: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border shadow-sm group-hover:border-primary/20 transition-all">
            {isValidAssetUrl(item.image) ? (
              <img src={item.image} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <Sparkles className="w-5 h-5 text-primary/40" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-foreground">{localize(val)}</span>
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{item.cta_text || 'No CTA Node'}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "is_active",
      render: (val: boolean) => (
        <Badge variant={val ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", val && "bg-emerald-500/10 text-emerald-500 border-none")}>
          {val ? "LIVE DEPLOYMENT" : "DRAFT ARCHIVE"}
        </Badge>
      )
    },
    {
      header: "CTA Destination",
      accessor: "cta_link",
      render: (val: string) => (
        <code className="text-[11px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
          {val}
        </code>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hero Header Architecture</h1>
            <p className="text-sm text-muted-foreground">Coordinate the global first impression and narrative gateway.</p>
          </div>
        </div>

        <LandingDataTable 
          title="Hero Archive Matrix"
          columns={columns}
          data={items}
          loading={loading}
          createLabel="Initialize Hero"
          onCreate={() => {
            setEditingHero(null);
            setFormData({ title: "", subtitle: "", image: "", cta_text: "", cta_link: "#", is_active: true });
            setIsModalOpen(true);
          }}
          onEdit={(item) => {
            setEditingHero(item);
            setFormData({ 
              title: localize(item.title), 
              subtitle: localize(item.subtitle), 
              image: item.image || "", 
              cta_text: item.cta_text || "", 
              cta_link: item.cta_link || "#", 
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
        title={editingHero ? "Sync Hero Intelligence" : "Initialize New Archive"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingHero ? "Commit Sync" : "Deploy Hero"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Hero Narrative Title"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. Born To Win Arena" 
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Narrative Subtitle</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              placeholder="Synthesize the platform's value proposition..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="CTA Callout Text"
              value={formData.cta_text} 
              onChange={(e) => setFormData({...formData, cta_text: e.target.value})} 
              placeholder="e.g. Join Now" 
            />
            <Input 
              label="Node Destination (Link)"
              value={formData.cta_link} 
              onChange={(e) => setFormData({...formData, cta_link: e.target.value})} 
              placeholder="e.g. /register" 
            />
          </div>

          <Input 
            label="Visual Asset URL (Background)"
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
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the global gateway</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}