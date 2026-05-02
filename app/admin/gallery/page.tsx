"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Plus, 
  Save, 
  Trash2, 
  Edit2, 
  Eye, 
  Image as ImageIcon,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { cn, localize, isValidAssetUrl } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminGalleryVault() {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover_image: "",
    is_active: true
  });

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/gallery-albums");
      setAlbums(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch gallery vault");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingAlbum) {
        const res = await apiClient.put(`/v1/admin/gallery-albums/${editingAlbum.id}`, formData);
        const updatedItem = res.data.data;
        setAlbums(prev => prev.map(item => item.id === editingAlbum.id ? updatedItem : item));
        toast.success("Collection configuration updated");
      } else {
        const res = await apiClient.post("/v1/admin/gallery-albums", formData);
        setAlbums(prev => [res.data.data, ...prev]);
        toast.success("New visual collection initialized");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to synchronize vault");
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
      await apiClient.delete(`/v1/admin/gallery-albums/${itemToDelete}`);
      setAlbums(prev => prev.filter(item => item.id !== itemToDelete));
      toast.success("Collection purged");
      setIsConfirmOpen(false);
    } catch (err) {
      toast.error("Purge operation failed");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const filteredAlbums = useMemo(() => {
    return albums.filter((album: any) => {
      const titleString = typeof album.title === 'string' ? album.title : (album.title ? JSON.stringify(album.title) : "");
      return titleString.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [albums, searchTerm]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Visual Vault</h1>
            <p className="text-sm text-muted-foreground">Coordinate visual collections and platform media architecture.</p>
          </div>
          <Button onClick={() => {
            setEditingAlbum(null);
            setFormData({ title: "", description: "", cover_image: "", is_active: true });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Album
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search collections..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Collection Cluster</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Visibility</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Asset Control</TableHead>
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
              ) : filteredAlbums.length > 0 ? (
                filteredAlbums.map((album: any) => (
                  <TableRow key={album.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden border border-border group-hover:border-primary/20 transition-all shadow-sm">
                          {isValidAssetUrl(album.cover_image) ? (
                            <img src={album.cover_image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                <ImageIcon className="w-5 h-5 text-primary/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">{localize(album.title)}</span>
                          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest line-clamp-1 max-w-[300px]">
                            {localize(album.description) || 'No narrative provided'}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={album.is_active ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", album.is_active && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {album.is_active ? "PUBLISHED" : "HIDDEN"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/gallery/${album.id}`}>
                        <Button variant="outline" size="sm" className="h-9 text-[10px] font-black uppercase tracking-widest border-border hover:bg-muted transition-all">
                          <Eye className="w-3.5 h-3.5 mr-2" />
                          Manage Assets
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingAlbum(album);
                          setFormData({ title: localize(album.title), description: localize(album.description), cover_image: album.cover_image || "", is_active: !!album.is_active });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => handleDeleteClick(album.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No visual collections found in the vault.
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
        title={editingAlbum ? "Sync Collection Data" : "Initialize New Archive"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingAlbum ? "Commit Sync" : "Deploy Album"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Album Identity"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. Global Summit 2026" 
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Narrative Context</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the context of this collection..."
            />
          </div>

          <Input 
            label="Cover Asset URL"
            value={formData.cover_image} 
            onChange={(e) => setFormData({...formData, cover_image: e.target.value})} 
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
                <label htmlFor="is_active" className="text-sm font-black tracking-tight cursor-pointer">Active Collection</label>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the public gallery</p>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Purge Visual Collection?"
        description="This action is irreversible. The collection and all associated media intelligence will be permanently purged from the vault."
        confirmLabel="Purge Collection"
      />
    </DashboardLayout>
  );
}
