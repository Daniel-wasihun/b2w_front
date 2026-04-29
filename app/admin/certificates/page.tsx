"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Award, Plus, Edit2, Trash2, Search, Save, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    user_id: "",
    race_id: "",
    certificate_number: "",
    issued_at: "",
  });

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/certificates");
      setCertificates(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch merit records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingCert) {
        await apiClient.put(`/v1/admin/certificates/${editingCert.id}`, formData);
        toast.success("Merit record updated");
      } else {
        await apiClient.post("/v1/admin/certificates", formData);
        toast.success("New certificate issued");
      }
      setIsModalOpen(false);
      fetchCertificates();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCert = async (id: number) => {
    if (!confirm("Permanently revoke this certificate?")) return;
    try {
      await apiClient.delete(`/v1/admin/certificates/${id}`);
      toast.success("Record revoked");
      fetchCertificates();
    } catch (err) {
      toast.error("Revocation failed");
    }
  };

  const filteredCerts = certificates.filter((c: any) => 
    (c.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.certificate_number || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Merit Certificates</h1>
            <p className="text-sm text-muted-foreground">Manage issued credentials and platform achievement verification.</p>
          </div>
          <Button onClick={() => {
            setEditingCert(null);
            setFormData({ user_id: "", race_id: "", certificate_number: "", issued_at: new Date().toISOString().split('T')[0] });
            setIsModalOpen(true);
          }} className="font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Issue Certificate
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name or cert number..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Recipient Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Serial Identity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Issue Date</TableHead>
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
              ) : filteredCerts.length > 0 ? (
                filteredCerts.map((cert: any) => (
                  <TableRow key={cert.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border uppercase font-black text-[10px] text-muted-foreground">
                            {cert.user?.name?.[0] || 'U'}
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{cert.user?.name}</span>
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{cert.race?.title || 'General Achievement'}</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded font-mono text-[10px] px-2 py-0.5 border-border text-muted-foreground bg-muted/50 uppercase tracking-tighter">
                        {cert.certificate_number}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[11px] font-bold text-muted-foreground">
                      {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                          setEditingCert(cert);
                          setFormData({ 
                            user_id: cert.user_id, 
                            race_id: cert.race_id, 
                            certificate_number: cert.certificate_number, 
                            issued_at: cert.issued_at?.split('T')[0] || "" 
                          });
                          setIsModalOpen(true);
                        }}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteCert(cert.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No merit records found in the archive.
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
        title={editingCert ? "Sync Merit Record" : "Issue New Credential"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Discard</Button>
            <Button onClick={handleSave} isLoading={isSaving} className="font-bold text-[10px] uppercase tracking-widest">
              <Save className="w-4 h-4 mr-2" />
              {editingCert ? "Commit Sync" : "Deploy Certificate"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 py-2">
          <div className="grid grid-cols-2 gap-6">
            <Input 
              label="Recipient User ID"
              value={formData.user_id} 
              onChange={(e) => setFormData({...formData, user_id: e.target.value})} 
              placeholder="e.g. 42" 
            />
            <Input 
              label="Race / Origin ID"
              value={formData.race_id} 
              onChange={(e) => setFormData({...formData, race_id: e.target.value})} 
              placeholder="e.g. 5" 
            />
          </div>
          <Input 
            label="Serial Identity (Cert Number)"
            value={formData.certificate_number} 
            onChange={(e) => setFormData({...formData, certificate_number: e.target.value})} 
            placeholder="e.g. B2W-2026-XF92" 
          />
          <Input 
            label="Issue Date"
            type="date"
            value={formData.issued_at} 
            onChange={(e) => setFormData({...formData, issued_at: e.target.value})} 
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
