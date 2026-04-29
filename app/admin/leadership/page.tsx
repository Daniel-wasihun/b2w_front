"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Users2, Plus, Edit2, Trash2, Search, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn, localize } from "@/lib/utils";

export default function AdminLeadershipPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    is_active: true,
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/leadership-members");
      setMembers(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch leadership team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingMember) {
        await apiClient.put(`/v1/admin/leadership-members/${editingMember.id}`, formData);
        toast.success("Leadership profile updated");
      } else {
        await apiClient.post("/v1/admin/leadership-members", formData);
        toast.success("New leadership node initialized");
      }
      setIsModalOpen(false);
      fetchMembers();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Permanently purge this leadership profile?")) return;
    try {
      await apiClient.delete(`/v1/admin/leadership-members/${id}`);
      toast.success("Profile purged");
      fetchMembers();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredMembers = members.filter((m: any) => {
    const nameString = typeof m.name === 'string' ? m.name : (m.name ? JSON.stringify(m.name) : "");
    const roleString = typeof m.role === 'string' ? m.role : (m.role ? JSON.stringify(m.role) : "");
    return nameString.toLowerCase().includes(searchTerm.toLowerCase()) ||
           roleString.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leadership Team</h1>
            <p className="text-sm text-muted-foreground">Manage the executive profiles and organizational leadership nodes.</p>
          </div>
          <Button onClick={() => {
            setEditingMember(null);
            setFormData({ name: "", role: "", bio: "", image: "", is_active: true });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Member
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search members by name or role..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Team Member</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Operational Role</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Status</TableHead>
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
              ) : filteredMembers.length > 0 ? (
                filteredMembers.map((member: any) => (
                  <TableRow key={member.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
                            {member.image ? <img src={member.image} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-muted-foreground" />}
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{localize(member.name)}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest line-clamp-1 max-w-[200px]">{localize(member.bio)}</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded font-black text-[10px] px-2 py-0.5 border-none bg-blue-500/10 text-blue-500 uppercase tracking-widest">
                        {localize(member.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.is_active ? "default" : "secondary"} className={cn("rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5", member.is_active && "bg-emerald-500/10 text-emerald-500 border-none")}>
                        {member.is_active ? "ACTIVE" : "HIDDEN"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingMember(member);
                          setFormData({ 
                            name: localize(member.name), 
                            role: localize(member.role), 
                            bio: localize(member.bio), 
                            image: member.image || "", 
                            is_active: !!member.is_active 
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteMember(member.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No team members indexed in the directory.
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
        title={editingMember ? "Sync Profile Intelligence" : "Initialize New Leader"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingMember ? "Commit Sync" : "Deploy Profile"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Full Name"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="e.g. Dr. Sarah Jenkins" 
            />
            <Input 
              label="Operational Role"
              value={formData.role} 
              onChange={(e) => setFormData({...formData, role: e.target.value})} 
              placeholder="e.g. Chief Strategy Officer" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Professional Bio</label>
            <textarea 
              className="w-full min-h-[120px] rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-muted-foreground"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Executive summary of professional history..."
            />
          </div>
          <Input 
            label="Profile Image URL"
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
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
                <label htmlFor="is_active" className="text-sm font-black tracking-tight cursor-pointer">Active Deployment</label>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visibility toggle for the executive track</p>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
