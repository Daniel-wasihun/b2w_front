"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tags, Plus, Edit2, Trash2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/tags");
      setTags(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch metadata tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingTag) {
        await apiClient.put(`/v1/admin/tags/${editingTag.id}`, formData);
        toast.success("Metadata node updated");
      } else {
        await apiClient.post("/v1/admin/tags", formData);
        toast.success("New metadata node initialized");
      }
      setIsModalOpen(false);
      fetchTags();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTag = async (id: number) => {
    if (!confirm("Permanently purge this tag?")) return;
    try {
      await apiClient.delete(`/v1/admin/tags/${id}`);
      toast.success("Tag purged");
      fetchTags();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredTags = tags.filter((t: any) => {
    const nameString = typeof t.name === 'string' ? t.name : (t.name ? JSON.stringify(t.name) : "");
    return nameString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Metadata Tags</h1>
            <p className="text-sm text-muted-foreground">Manage granular metadata nodes for classification and discovery.</p>
          </div>
          <Button onClick={() => {
            setEditingTag(null);
            setFormData({ name: "", slug: "" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            New Tag
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search metadata..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Tag Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">System Slug</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Pop. Density</TableHead>
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
              ) : filteredTags.length > 0 ? (
                filteredTags.map((tag: any) => (
                  <TableRow key={tag.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                       <div className="flex items-center gap-2">
                          <Tags className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="font-bold text-sm text-foreground">{localize(tag.name)}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <code className="text-[11px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">#{tag.slug}</code>
                    </TableCell>
                    <TableCell>
                       <span className="text-[12px] font-bold text-foreground/70">{tag.posts_count || 0} Nodes</span>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingTag(tag);
                          setFormData({ name: localize(tag.name), slug: tag.slug });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteTag(tag.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No metadata tags indexed.
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
        title={editingTag ? "Sync Metadata Node" : "Initialize New Tag"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingTag ? "Commit Sync" : "Deploy Tag"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Tag Label"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            placeholder="e.g. Innovation" 
          />
          <Input 
            label="System Slug"
            value={formData.slug} 
            onChange={(e) => setFormData({...formData, slug: e.target.value})} 
            placeholder="e.g. innovation" 
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
