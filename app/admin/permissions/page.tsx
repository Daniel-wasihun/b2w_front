"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Edit2, Trash2, Search, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export default function AdminPermissionsPage() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerm, setEditingPerm] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/permissions");
      setPermissions(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch permission matrix");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingPerm) {
        await apiClient.put(`/v1/admin/permissions/${editingPerm.id}`, formData);
        toast.success("Permission node updated");
      } else {
        await apiClient.post("/v1/admin/permissions", formData);
        toast.success("New permission node initialized");
      }
      setIsModalOpen(false);
      fetchPermissions();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deletePerm = async (id: number) => {
    if (!confirm("Permanently purge this permission node? This may disrupt role stability.")) return;
    try {
      await apiClient.delete(`/v1/admin/permissions/${id}`);
      toast.success("Node purged");
      fetchPermissions();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredPerms = permissions.filter((p: any) => 
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.slug || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Permission Matrix</h1>
            <p className="text-sm text-muted-foreground">Define granular access control nodes for the platform security layer.</p>
          </div>
          <Button onClick={() => {
            setEditingPerm(null);
            setFormData({ name: "", slug: "", description: "" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Node
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search permissions by name or slug..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Permission Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">identifier</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Cluster</TableHead>
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
              ) : filteredPerms.length > 0 ? (
                filteredPerms.map((perm: any) => (
                  <TableRow key={perm.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground">{perm.name}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{perm.description || 'No operational briefing'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded font-mono text-[10px] px-2 py-0.5 border-border text-muted-foreground bg-muted/50 uppercase tracking-tighter">
                        {perm.slug}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-[13px] font-bold text-foreground/70">
                        {perm.roles_count || 0} Roles
                      </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingPerm(perm);
                          setFormData({ name: perm.name, slug: perm.slug, description: perm.description });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deletePerm(perm.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No permission nodes indexed in the matrix.
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
        title={editingPerm ? "Sync Permission Node" : "Initialize New Security Node"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingPerm ? "Commit Sync" : "Deploy Node"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Node Label"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="e.g. Delete Submissions" 
            />
            <Input 
              label="System Identifier (Slug)"
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
              placeholder="e.g. delete_submissions" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Operational Briefing</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What does this permission node enable?"
            />
          </div>
          <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20 flex gap-4">
             <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
             <p className="text-[11px] text-amber-600/90 font-bold leading-relaxed uppercase tracking-tight">
                Caution: Modifying system identifiers (slugs) may require corresponding code updates in the API middleware to maintain security enforcement.
             </p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
