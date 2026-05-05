"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  ImageIcon, 
  Plus, 
  Save, 
  Trash2, 
  Edit2, 
  ArrowLeft,
  Image as ImageIconLucide,
  Layers,
  ArrowUpRight,
  Eye,
  Activity,
  FileVideo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { LandingDataTable } from "@/components/dashboard/LandingDataTable";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { cn, localize, isValidAssetUrl } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PremiumCard } from "@/components/ui/premium-card";

export default function AdminGalleryAlbumItems() {
  const params = useParams();
  const albumId = params.id;

  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<any>(null);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    type: "image",
    order: 0
  });

  const fetchAlbumData = async () => {
    setLoading(true);
    try {
      const [albumRes, itemsRes] = await Promise.all([
        apiClient.get(`/v1/admin/gallery-albums/${albumId}`),
        apiClient.get(`/v1/admin/gallery-albums/${albumId}/items`)
      ]);
      setAlbum(albumRes.data.data);
      setItems(itemsRes.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch album media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (albumId) fetchAlbumData();
  }, [albumId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await apiClient.put(`/v1/admin/gallery-items/${editingItem.id}`, formData);
        toast.success("Media asset configuration updated");
      } else {
        await apiClient.post(`/v1/admin/gallery-albums/${albumId}/items`, formData);
        toast.success("New asset added to visual vault");
      }
      setIsModalOpen(false);
      fetchAlbumData();
    } catch (err) {
      toast.error("Asset synchronization failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Permanently remove this media asset?")) return;
    try {
      await apiClient.delete(`/v1/admin/gallery-items/${id}`);
      toast.success("Asset purged from vault");
      fetchAlbumData();
    } catch (err) {
      toast.error("Removal operation failed");
    }
  };

  const columns = [
    {
      header: "Asset Visualization",
      accessor: "url",
      render: (val: string, item: any) => (
        <div className="flex items-center gap-4">
          <div className="relative aspect-square w-20 h-12 rounded-xl overflow-hidden bg-muted group shadow-lg border border-border">
             {isValidAssetUrl(val) ? (
               <img src={val} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500 rounded-[7.5px]" alt="" />
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-primary/5">
                 <ImageIcon className="w-8 h-8 text-primary/20" />
               </div>
             )}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight">{localize(item.title) || 'Untitled Archive'}</span>
            <span className="text-[10px] text-primary font-mono line-clamp-1 max-w-[250px]">{val}</span>
          </div>
        </div>
      )
    },
    { header: "Type Identifier", accessor: "type", render: (val: string) => (
      <Badge variant="outline" className="rounded-lg text-[9px] font-black tracking-widest px-3 py-1 uppercase border-border/60">
        {val}
      </Badge>
    )},
    { header: "Priority", accessor: "order", render: (val: number) => (
      <span className="text-xs font-black text-muted-foreground">{val || 0}</span>
    )}
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
          <div className="flex items-center gap-6">
            <Link href="/admin/gallery">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border/60 hover:bg-muted group transition-all">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Button>
            </Link>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                    <Layers className="w-3 h-3" />
                    Archive Explorer v1.0
                </div>
                <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                    {album?.title ? localize(album.title) : "Vault"} Content
                </h1>
                <p className="text-muted-foreground text-lg font-medium">Manage the individual media assets within this collection.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Badge variant="outline" className="h-10 px-4 rounded-xl border-border/60 text-muted-foreground font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                VAULT-ID: {albumId}
             </Badge>
          </div>
        </div>

        <LandingDataTable 
          title="Archive Stream"
          columns={columns}
          data={items}
          loading={loading}
          createLabel="Initialize Asset"
          onCreate={() => {
            setEditingItem(null);
            setFormData({ title: "", url: "", type: "image", order: items.length });
            setIsModalOpen(true);
          }}
          onEdit={(item) => {
            setEditingItem(item);
            setFormData({ title: localize(item.title), url: item.url, type: item.type, order: item.order });
            setIsModalOpen(true);
          }}
          onDelete={deleteItem}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Sync Media Intelligence" : "Deploy Asset to Vault"}
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl h-12 px-6 font-bold">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="rounded-xl h-12 px-8 shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-[10px]">
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? "Commit Sync" : "Deploy to Archive"}
            </Button>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Asset Identity</label>
            <Input 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Award Ceremony Shot" 
              className="h-12 rounded-2xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Intelligence Source URL</label>
            <Input 
              value={formData.url} 
              onChange={(e) => setFormData({...formData, url: e.target.value})} 
              placeholder="https://images.unsplash.com/..." 
              className="h-12 rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stack Order</label>
              <Input 
                type="number"
                value={formData.order} 
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} 
                className="h-12 rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Media Classification</label>
              <select 
                className="w-full h-12 rounded-2xl border border-border/50 bg-muted/20 px-4 text-sm outline-none focus:border-primary/50 transition-all font-medium"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="image">Static Asset (Image)</option>
                <option value="video">Motion Asset (Video Link)</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
