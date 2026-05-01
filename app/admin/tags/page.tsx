"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminSearchBar } from "@/components/admin/AdminSearchBar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, localize } from "@/lib/utils";
import { useAdminApi } from "@/lib/hooks/useAdminApi";

interface Tag {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

interface TagFormData {
  name: string;
  slug: string;
}

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<TagFormData>({
    name: "",
    slug: "",
  });
  
  const { execute, loading: apiLoading, error } = useAdminApi();

  // Fetch tags using the standardized hook
  const fetchTags = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("/v1/admin/tags");
      setTags(result.data.data || []);
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
      // Reset form
      setFormData({ name: "", slug: "" });
      fetchTags();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTag = async (id: number) => {
    if (!window.confirm("Permanently purge this tag?")) return;
    try {
      await apiClient.delete(`/v1/admin/tags/${id}`);
      toast.success("Tag purged");
      fetchTags();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredTags = tags.filter((tag) => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Metadata Tags</h1>
            <p className="text-sm text-muted-foreground">Manage granular metadata nodes for classification and discovery.</p>
          </div>
          <Button 
            onClick={() => {
              setEditingTag(null);
              setFormData({ name: "", slug: "" });
              setIsModalOpen(true);
            }}
            className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            <Tags className="w-4 h-4 mr-2" />
            New Tag
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <AdminSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search metadata..."
          />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <AdminTable<Tag>
            columns={[
              {
                header: "Tag Identity",
                accessor: (row) => (
                  <div className="flex items-center gap-2">
                    <Tags className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-bold text-sm text-foreground">{localize(row.name)}</span>
                  </div>
                ),
              },
              {
                header: "System Slug",
                accessor: (row) => (
                  <code className="text-[11px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                    #{row.slug}
                  </code>
                ),
              },
              {
                header: "Pop. Density",
                accessor: (row) => (
                  <span className="text-[12px] font-bold text-foreground/70">
                    {row.posts_count || 0} Nodes
                  </span>
                ),
              },
              {
                header: "Control",
                accessor: () => "", // Placeholder for actions
                renderActions: (tag) => (
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                      onClick={() => {
                        setEditingTag(tag);
                        setFormData({ 
                          name: localize(tag.name), 
                          slug: tag.slug 
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      <span className="sr-only">Edit</span>
                      {/* Using Lucide icon for Edit2 */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all"
                      onClick={() => deleteTag(tag.id)}
                    >
                      <span className="sr-only">Delete</span>
                      {/* Using Lucide icon for Trash2 */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10H4a1 1 0 00-1 1v2a1 1 0 001 1h3a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1v2a1 1 0 001 1h3a1 1 0 001-1V7a1 1 0 001-1h3z" />
                      </svg>
                    </Button>
                  </div>
                ),
              },
            ]}
            data={filteredTags}
            loading={loading}
            emptyMessage="No metadata tags indexed."
          />
        </div>

        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFormData({ name: "", slug: "" });
            setEditingTag(null);
          }}
          title={editingTag ? "Sync Metadata Node" : "Initialize New Tag"}
          submitLabel={editingTag ? "Commit Sync" : "Deploy Tag"}
          isSubmitting={isSaving}
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
        </AdminModal>
      </div>
    </DashboardLayout>
  );
}