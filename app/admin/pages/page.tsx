"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileText, Plus, Edit2, Trash2, Search, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminStaticPagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metadata: "",
  });

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/pages");
      setPages(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch static content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingPage) {
        await apiClient.put(`/v1/admin/pages/${editingPage.id}`, formData);
        toast.success("Page configuration updated");
      } else {
        await apiClient.post("/v1/admin/pages", formData);
        toast.success("New static page initialized");
      }
      setIsModalOpen(false);
      fetchPages();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deletePage = async (id: number) => {
    if (!confirm("Permanently purge this static page?")) return;
    try {
      await apiClient.delete(`/v1/admin/pages/${id}`);
      toast.success("Page purged");
      fetchPages();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredPages = pages.filter((p: any) => {
    const titleString = typeof p.title === 'string' ? p.title : (p.title ? JSON.stringify(p.title) : "");
    return titleString.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (p.slug || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Static Content</h1>
            <p className="text-sm text-muted-foreground">Manage global static pages (Privacy, Terms, About, etc.) and SEO metadata.</p>
          </div>
          <Button onClick={() => {
            setEditingPage(null);
            setFormData({ title: "", slug: "", content: "", metadata: "" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Page
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search static pages..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Page Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">System Route</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Synchronization</TableHead>
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
              ) : filteredPages.length > 0 ? (
                filteredPages.map((page: any) => (
                  <TableRow key={page.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                       <span className="font-bold text-sm text-foreground">{localize(page.title)}</span>
                    </TableCell>
                    <TableCell>
                       <code className="text-[11px] font-black text-muted-foreground bg-muted px-2 py-1 rounded">/{page.slug}</code>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground">
                       {new Date(page.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingPage(page);
                          setFormData({ title: localize(page.title), slug: page.slug, content: page.content, metadata: page.metadata || "" });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deletePage(page.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No static pages indexed in the archive.
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
        title={editingPage ? "Sync Page Intelligence" : "Initialize New Static Layer"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingPage ? "Commit Sync" : "Deploy Page"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Page Title"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Privacy Policy" 
            />
            <Input 
              label="Route Slug"
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
              placeholder="e.g. privacy-policy" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Page Architecture (Content)</label>
            <textarea 
              className="w-full min-h-[200px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Synthesize page content here..."
            />
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">SEO Metadata (JSON Cluster)</label>
             <textarea 
               className="w-full min-h-[80px] rounded-xl border border-input bg-muted/30 px-4 py-3 text-[11px] font-mono text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
               value={formData.metadata}
               onChange={(e) => setFormData({...formData, metadata: e.target.value})}
               placeholder='{ "description": "...", "keywords": "..." }'
             />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
