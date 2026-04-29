"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Megaphone, Plus, Edit2, Trash2, Search, Eye, Globe, Lock, Save, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminNewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_image: "",
    is_published: true,
  });

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

  const openEditModal = (post: any) => {
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
        await apiClient.put(`/v1/admin/posts/${editingPost.id}`, payload);
        toast.success("Publication intelligence updated");
      } else {
        await apiClient.post("/v1/admin/posts", payload);
        toast.success("New publication deployed");
      }
      
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      toast.error("Failed to synchronize publication");
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Permanently purge this publication?")) return;
    try {
      await apiClient.delete(`/v1/admin/posts/${id}`);
      toast.success("Publication purged");
      fetchPosts();
    } catch (err) {
      toast.error("Purge operation failed");
    }
  };

  const filteredPosts = posts.filter((post: any) => {
    const titleString = typeof post.title === 'string' ? post.title : (post.title ? JSON.stringify(post.title) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Portal</h1>
            <p className="text-sm text-muted-foreground">Manage platform publications and news intelligence.</p>
          </div>
          <Button onClick={openCreateModal} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Publication
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search news archives..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Total Articles: <span className="text-foreground">{posts.length}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Publication Detail</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Deployment</TableHead>
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
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post: any) => (
                  <TableRow key={post.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden border border-border group-hover:border-primary/20 transition-all shadow-sm">
                          {post.cover_image ? (
                            <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
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
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.is_published ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", post.is_published && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {post.is_published ? "LIVE" : "DRAFT"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'PENDING SYNC'}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => openEditModal(post)}>
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deletePost(post.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No articles found in the publication stream.
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
        title={editingPost ? "Sync Publication" : "Initialize New Archive"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingPost ? "Commit Sync" : "Deploy Publication"}
            </Button>
          </div>
        }
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
      </Modal>
    </DashboardLayout>
  );
}
