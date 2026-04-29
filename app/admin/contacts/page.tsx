"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MailQuestion, Trash2, Search, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export default function AdminContactInboundPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingMessage, setViewingMessage] = useState<any>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/contact-messages");
      setMessages(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch inbound communication");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await apiClient.put(`/v1/admin/contact-messages/${id}/read`);
      fetchMessages();
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Permanently purge this message?")) return;
    try {
      await apiClient.delete(`/v1/admin/contact-messages/${id}`);
      toast.success("Message purged");
      fetchMessages();
    } catch (err) {
      toast.error("Purge failed");
    }
  };

  const filteredMessages = messages.filter((m: any) => 
    (m.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.subject || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contact Inbound</h1>
            <p className="text-sm text-muted-foreground">Monitor and respond to platform inquiries and user feedback stream.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border flex flex-col items-center">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Unread</span>
                <span className="text-lg font-black text-rose-500 tabular-nums">{messages.filter((m: any) => !m.is_read).length}</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email or subject..."
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
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Inquiry Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Subject</TableHead>
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
              ) : filteredMessages.length > 0 ? (
                filteredMessages.map((msg: any) => (
                  <TableRow 
                    key={msg.id} 
                    className={cn(
                      "border-border/50 transition-colors", 
                      msg.is_read ? "opacity-60 bg-card" : "bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
                            <User className="w-4 h-4 text-muted-foreground" />
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{msg.name}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{msg.email}</span>
                         </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       <span className={cn("text-[13px] font-bold", msg.is_read ? "text-muted-foreground" : "text-foreground")}>{msg.subject || 'No Subject'}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={msg.is_read ? "secondary" : "default"} className="rounded font-black text-[9px] uppercase tracking-widest px-2 py-0.5">
                        {msg.is_read ? "ARCHIVED" : "NEW SIGNAL"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => {
                           setViewingMessage(msg);
                           setIsModalOpen(true);
                           if (!msg.is_read) markAsRead(msg.id);
                        }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-all" onClick={() => deleteMessage(msg.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    Inbound stream is currently clear.
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
        title="Communication Intelligence"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="font-bold text-[10px] uppercase tracking-widest">Close Archive</Button>
            <Button onClick={() => window.location.href = `mailto:${viewingMessage?.email}`} className="font-bold text-[10px] uppercase tracking-widest">
              <MailQuestion className="w-4 h-4 mr-2" />
              Respond Node
            </Button>
          </div>
        }
      >
        {viewingMessage && (
          <div className="space-y-6">
            <div className="p-6 bg-muted/30 rounded-xl border border-border">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Sender Identity</p>
                     <p className="text-sm font-bold text-foreground">{viewingMessage.name}</p>
                     <p className="text-[11px] text-muted-foreground">{viewingMessage.email}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Temporal Stamp</p>
                     <p className="text-sm font-bold text-foreground">{new Date(viewingMessage.created_at).toLocaleString()}</p>
                  </div>
               </div>
            </div>
            
            <div className="space-y-2">
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Signal Payload</p>
               <div className="p-6 bg-background border border-border rounded-xl min-h-[150px] shadow-sm">
                  <h4 className="font-bold text-foreground mb-4 text-lg border-b border-border pb-3">{viewingMessage.subject || 'No Subject'}</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{viewingMessage.message}</p>
               </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
