"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Megaphone, Plus, Edit2, Trash2, Search, Eye, Globe, Lock, Save, Layers } from "lucide-react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, localize, fuzzySearch, isValidAssetUrl } from "@/lib/utils";
import { useAdminApi } from "@/lib/hooks/useAdminApi";

interface NewsPost {
  id: number;
  title: string;
  content: string;
  cover_image: string;
  is_published: boolean;
  published_at?: string;
  author?: {
    name: string;
  };
}

interface NewsFormData {
  title: string;
  content: string;
  cover_image: string;
  is_published: boolean;
}

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    content: "",
    cover_image: "",
    is_published: true,
  });
  
  const { execute, loading: apiLoading, error } = useAdminApi();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/posts");
      setPosts(res.data.data || []);
    } catch (err) {
      toast.error("Failed to synchronize publication stream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      content: "",
      cover_image: "",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: NewsPost) => {
    setEditingPost(post);
    setFormData({
      title: localize(post.title) || "",
      content: localize(post.content) || "",
      cover_image: post.cover_image || "",
      is_published: !!post.is_published,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        cover_image: formData.cover_image,
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (editingPost) {
        const res = await apiClient.put(`/v1/admin/posts/${editingPost.id}`, payload);
        const updatedItem = res.data.data;
        setPosts(prev => prev.map(item => item.id === editingPost.id ? updatedItem : item));
        toast.success("Publication intelligence updated");
      } else {
        const res = await apiClient.post("/v1/admin/posts", payload);
        setPosts(prev => [res.data.data, ...prev]);
        toast.success("New publication deployed");
      }
      
      setIsModalOpen(false);
      // Reset form
      setFormData({
        title: "",
        content: "",
        cover_image: "",
        is_published: true,
      });
    } catch (err) {
      toast.error("Failed to synchronize publication");
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
      await apiClient.delete(`/v1/admin/posts/${itemToDelete}`);
      setPosts(prev => prev.filter(item => item.id !== itemToDelete));
      toast.success("Publication purged");
      setIsConfirmOpen(false);
    } catch (err) {
      toast.error("Purge operation failed");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const filteredPosts = useMemo(() => 
    fuzzySearch(posts, searchTerm, (post) => post.title || ""), 
    [posts, searchTerm]
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Portal</h1>
            <p className="text-sm text-muted-foreground">Manage platform publications and news intelligence.</p>
          </div>
          <AdminButton onClick={openCreateModal} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Publication
          </AdminButton>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <AdminSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search news archives..."
          />
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Total Articles: <span className="text-foreground">{posts.length}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <AdminTable<NewsPost>
            columns={[
              {
                header: "Publication Detail",
                accessor: (post: NewsPost) => (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden border border-border group-hover:border-primary/20 transition-all shadow-sm">
                      {isValidAssetUrl(post.cover_image) ? (
                         <img src={post.cover_image} alt="" className="w-full h-full object-cover rounded-[7.5px]" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <Layers className="w-4 h-4 text-primary/40" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-foreground line-clamp-1 max-w-[350px]">{localize(post.title)}</span>
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Author: {post.author?.name || 'Admin Unit'}</span>
                    </div>
                  </div>
                ),
              },
              {
                header: "Status",
                accessor: (post: NewsPost) => (
                  <Badge variant={post.is_published ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", post.is_published && "bg-emerald-500/10 text-emerald-500 border-none")}>
                    {post.is_published ? "LIVE" : "DRAFT"}
                  </Badge>
                ),
              },
              {
                header: "Deployment",
                accessor: (post: NewsPost) => (
                  <span className="text-[11px] font-bold text-muted-foreground">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'PENDING SYNC'}
                  </span>
                ),
              },
            ]}
            renderActions={(post: NewsPost) => (
              <div className="flex items-center justify-end gap-1">
                <AdminButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                  <Eye className="w-4 h-4" />
                </AdminButton>
                <AdminButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => openEditModal(post)}>
                  <Edit2 className="w-4 h-4" />
                </AdminButton>
                <AdminButton variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => handleDeleteClick(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </AdminButton>
              </div>
            )}
            data={filteredPosts}
            loading={loading}
            emptyMessage="No articles found in the publication stream."
          />
        </div>

        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFormData({
              title: "",
              content: "",
              cover_image: "",
              is_published: true,
            });
            setEditingPost(null);
          }}
          title={editingPost ? "Sync Publication" : "Initialize New Archive"}
          submitLabel={editingPost ? "Commit Sync" : "Deploy Publication"}
          onSubmit={handleSave}
          isSubmitting={isSaving}
        >
          <div className="space-y-6 py-2">
            <Input 
              label="Publication Title"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Operational Summary 2026..."
            />

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Publication Content</label>
              <textarea 
                className="w-full min-h-[200px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Synthesize publication content here..."
              />
            </div>

            <Input 
              label="Cover Image URL"
              value={formData.cover_image} 
              onChange={(e) => setFormData({...formData, cover_image: e.target.value})}
              placeholder="https://..."
            />

            <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
              <input 
                type="checkbox" 
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                className="w-5 h-5 accent-primary rounded-md"
              />
              <div className="flex flex-col">
                <label htmlFor="is_published" className="text-sm font-black tracking-tight cursor-pointer">Published Deployment</label>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the global news stream</p>
              </div>
            </div>
          </div>
        </AdminModal>

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
          loading={isDeleting}
          title="Purge Publication?"
          description="This action is irreversible. The article and all associated narrative clusters will be permanently purged from the archive."
          confirmLabel="Purge Article"
        />
      </div>
    </DashboardLayout>
  );
}