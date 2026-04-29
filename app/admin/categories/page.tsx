"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Edit2, Trash2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "blog",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch taxonomies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingCategory) {
        await apiClient.put(`/v1/admin/categories/${editingCategory.id}`, formData);
        toast.success("Category updated");
      } else {
        await apiClient.post("/v1/admin/categories", formData);
        toast.success("New category initialized");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Permanently purge this category?")) return;
    try {
      await apiClient.delete(`/v1/admin/categories/${id}`);
      toast.success("Category purged");
      fetchCategories();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredCategories = categories.filter((c: any) => {
    const nameString = typeof c.name === 'string' ? c.name : (c.name ? JSON.stringify(c.name) : "");
    return nameString.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (c.type || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Global Categories</h1>
            <p className="text-sm text-muted-foreground">Organize content across blog posts, competitions, and events.</p>
          </div>
          <Button onClick={() => {
            setEditingCategory(null);
            setFormData({ name: "", slug: "", type: "blog" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            New Category
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search taxonomies..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Category Label</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">System Type</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">System Slug</TableHead>
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
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat: any) => (
                  <TableRow key={cat.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                       <span className="font-bold text-sm text-foreground">{localize(cat.name)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded font-black text-[10px] px-2 py-0.5 border-none bg-blue-500/10 text-blue-500 uppercase tracking-widest">
                        {cat.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <code className="text-[11px] font-bold text-muted-foreground">/{cat.slug}</code>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingCategory(cat);
                          setFormData({ name: localize(cat.name), slug: cat.slug, type: cat.type });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteCategory(cat.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No categories indexed in the taxonomy.
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
        title={editingCategory ? "Sync Category Data" : "Initialize New Taxonomy"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingCategory ? "Commit Sync" : "Deploy Category"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Category Name"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            placeholder="e.g. Technology" 
          />
          <Input 
            label="System Slug"
            value={formData.slug} 
            onChange={(e) => setFormData({...formData, slug: e.target.value})} 
            placeholder="e.g. technology" 
          />
          <div className="space-y-2">
             <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Operational Type</label>
             <select 
               className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
               value={formData.type}
               onChange={(e) => setFormData({...formData, type: e.target.value})}
             >
                <option value="blog">Blog / News</option>
                <option value="competition">Competition / Race</option>
                <option value="event">Platform Event</option>
             </select>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
