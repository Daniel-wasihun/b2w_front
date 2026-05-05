"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Handshake, Plus, Edit2, Trash2, Search, Save, Globe, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { cn, localize, isValidAssetUrl } from "@/lib/utils";

export default function AdminPartnerNetworkPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    type: "partner",
  });

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/partners");
      setPartners(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch partner network");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingPartner) {
        const res = await apiClient.put(`/v1/admin/partners/${editingPartner.id}`, formData);
        const updatedItem = res.data.data;
        setPartners(prev => prev.map(item => item.id === editingPartner.id ? updatedItem : item));
        toast.success("Partner intelligence updated");
      } else {
        const res = await apiClient.post("/v1/admin/partners", formData);
        setPartners(prev => [res.data.data, ...prev]);
        toast.success("New partner node initialized");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Operation failed");
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
      await apiClient.delete(`/v1/admin/partners/${itemToDelete}`);
      setPartners(prev => prev.filter(item => item.id !== itemToDelete));
      toast.success("Partner purged");
      setIsConfirmOpen(false);
    } catch (err) {
      toast.error("Purge failed");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const filteredPartners = partners.filter((p: any) => {
    const nameString = typeof p.name === 'string' ? p.name : (p.name ? JSON.stringify(p.name) : "");
    return nameString.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (p.type || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Partner Network</h1>
            <p className="text-sm text-muted-foreground">Coordinate organizational alliances, sponsors, and strategic donors.</p>
          </div>
          <Button onClick={() => {
            setEditingPartner(null);
            setFormData({ name: "", logo: "", website: "", type: "partner" });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Initialize Partner
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search partner network..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Partner Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">System Classification</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Digital Node</TableHead>
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
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((partner: any) => (
                  <TableRow key={partner.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-16 h-10 rounded-lg bg-muted p-2 flex items-center justify-center border border-border group-hover:border-primary/20 transition-all shadow-sm">
                             {isValidAssetUrl(partner.logo) ? <img src={partner.logo} className="w-full h-full object-contain rounded-[7.5px]" alt="" /> : <ImageIcon className="w-5 h-5 text-muted-foreground/40" />}
                        </div>
                         <span className="font-bold text-sm text-foreground">{localize(partner.name)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded font-black text-[10px] px-2 py-0.5 border-none bg-blue-500/10 text-blue-500 uppercase tracking-widest">
                        {partner.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       {partner.website ? (
                          <a href={partner.website} target="_blank" className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1.5">
                             <Globe className="w-3 h-3" /> Digital Portal
                          </a>
                       ) : <span className="text-[11px] font-bold text-muted-foreground italic">No URL linked</span>}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingPartner(partner);
                          setFormData({ name: localize(partner.name), logo: partner.logo || "", website: partner.website || "", type: partner.type });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => handleDeleteClick(partner.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No partners defined in the network.
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
        title={editingPartner ? "Sync Partner Intelligence" : "Initialize New Alliance"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingPartner ? "Commit Sync" : "Deploy Partner"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <Input 
            label="Partner Identity"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            placeholder="e.g. Global Tech Solutions" 
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Strategic Type</label>
               <select 
                 className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                 value={formData.type}
                 onChange={(e) => setFormData({...formData, type: e.target.value})}
               >
                  <option value="partner">Strategic Partner</option>
                  <option value="sponsor">Corporate Sponsor</option>
                  <option value="donor">Individual Donor</option>
                  <option value="other">Other Alliance</option>
               </select>
            </div>
            <Input 
              label="Digital Portal URL"
              value={formData.website} 
              onChange={(e) => setFormData({...formData, website: e.target.value})} 
              placeholder="https://..." 
            />
          </div>
          <Input 
            label="Visual Identity URL (Logo)"
            value={formData.logo} 
            onChange={(e) => setFormData({...formData, logo: e.target.value})} 
            placeholder="https://..." 
          />
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Purge Partner Profile?"
        description="This action is irreversible. The partner profile and all associated alliance intelligence will be permanently purged from the network."
        confirmLabel="Purge Partner"
      />
    </DashboardLayout>
  );
}
