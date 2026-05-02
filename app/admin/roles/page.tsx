"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Shield, Plus, Edit2, Trash2, Search, Save, ShieldAlert, AlignLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminRolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    hierarchy_level: 10,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/roles");
      setRoles(res.data.data || []);
    } catch (err) {
      toast.error("Failed to synchronize authority tiers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingRole) {
        await apiClient.put(`/v1/admin/roles/${editingRole.id}`, formData);
        toast.success("Role hierarchy updated");
      } else {
        await apiClient.post("/v1/admin/roles", formData);
        toast.success("New role tier initialized");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error("Security sync failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRole = async (id: number) => {
    if (!confirm("Permanently purge this role? System roles are protected and cannot be removed.")) return;
    try {
      await apiClient.delete(`/v1/admin/roles/${id}`);
      toast.success("Role purged");
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Purge failed");
    }
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((r: any) => {
      const nameString = typeof r.name === 'string' ? r.name : (r.name ? JSON.stringify(r.name) : "");
      const slugString = typeof r.slug === 'string' ? r.slug : (r.slug ? JSON.stringify(r.slug) : "");
      return nameString.toLowerCase().includes(searchTerm.toLowerCase()) ||
             slugString.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [roles, searchTerm]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Role Hierarchy</h1>
            <p className="text-sm text-muted-foreground">Manage organizational authority tiers and access levels.</p>
          </div>
          <Button onClick={() => {
            setEditingRole(null);
            setFormData({ name: "", slug: "", description: "", hierarchy_level: 10 });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Tier
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search tiers by name or slug..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Tier Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Hierarchy Level</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Description</TableHead>
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
              ) : filteredRoles.length > 0 ? (
                filteredRoles.map((role: any) => (
                  <TableRow key={role.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shadow-sm">
                             <Shield className="w-4 h-4 text-primary/60" />
                          </div>
                          <div className="flex flex-col">
                             <span className="font-bold text-sm text-foreground">{localize(role.name)}</span>
                             <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{role.slug}</span>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded font-mono text-[10px] px-2 py-0.5 border-none bg-primary/10 text-primary tracking-widest uppercase">
                        LEVEL {role.hierarchy_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-[11px] text-muted-foreground max-w-md line-clamp-1">{role.description || "No narrative defined for this tier."}</p>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingRole(role);
                          setFormData({ 
                            name: localize(role.name), 
                            slug: role.slug, 
                            description: role.description || "",
                            hierarchy_level: role.hierarchy_level || 10
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        {!role.is_system_level && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteRole(role.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No authority tiers detected.
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
        title={editingRole ? "Synchronize Tier Parameters" : "Initialize New Authority Tier"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">
              <Save className="w-4 h-4 mr-2" />
              {editingRole ? "Commit Sync" : "Deploy Tier"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Tier Identity Name"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="e.g. Executive" 
            />
            <Input 
              label="System Intelligence Slug"
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
              placeholder="e.g. executive" 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-1">
                <Layers className="w-3 h-3 text-primary" />
                Hierarchy Weight
              </label>
              <Input 
                type="number"
                value={formData.hierarchy_level} 
                onChange={(e) => setFormData({...formData, hierarchy_level: parseInt(e.target.value)})} 
                placeholder="10 - 100" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-1">
                <AlignLeft className="w-3 h-3 text-primary" />
                Tier Description
              </label>
              <Input 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Operational scope..." 
              />
            </div>
          </div>

          <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/10 flex gap-4">
             <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0" />
             <p className="text-[10px] text-rose-600/80 font-black leading-relaxed uppercase tracking-widest">
                Warning: Modifying authority nodes may disrupt active user sessions and security middleware enforcement. Proceed with extreme caution.
             </p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
