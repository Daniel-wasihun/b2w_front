"use client";

import React, { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Users, Search, Shield, Download, Mail, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, localize } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/v1/admin/users");
      setUsers(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId: number, roleSlug: string) => {
    try {
      await apiClient.post(`/v1/admin/users/${userId}/role`, {
        role_slug: roleSlug
      });
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: any) => {
      const userName = typeof user.name === 'string' ? user.name : (user.name ? JSON.stringify(user.name) : "");
      const userEmail = typeof user.email === 'string' ? user.email : (user.email ? JSON.stringify(user.email) : "");
      return userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
             userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Identity Management</h1>
            <p className="text-sm text-muted-foreground">Oversee platform access and user roles.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-muted transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
            </Button>
            <Button size="sm" className="h-9 font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
                <Users className="w-4 h-4 mr-2" />
                Add User
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative max-w-sm w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
             <span className="font-black text-foreground tabular-nums text-lg">{users.length}</span> Total Members
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors duration-300">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">User Node</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Department</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Operational Role</TableHead>
                <TableHead className="pr-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12">Access Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={4} className="px-6 py-4"><Skeleton className="h-10 w-full rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <TableRow key={user.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-black text-xs text-muted-foreground border border-border uppercase">
                          {user.name?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-foreground">{localize(user.name)}</span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold uppercase tracking-tight">
                            <Mail className="w-3 h-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded font-black text-[10px] px-2 py-0.5 border-border text-muted-foreground bg-muted/50 uppercase tracking-widest">
                        {user.department?.name ? localize(user.department.name) : 'General'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {user.roles?.map((role: any) => (
                          <Badge key={role.id} variant="secondary" className="rounded font-black text-[10px] px-2 py-0.5 border-none bg-blue-500/10 text-blue-500 uppercase tracking-widest">
                            {localize(role.name)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select 
                          className="h-8 rounded-lg border border-input bg-background px-2 text-[10px] font-black outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-foreground uppercase tracking-tighter"
                          onChange={(e) => updateRole(user.id, e.target.value)}
                          value={user.roles?.[0]?.slug || ''}
                        >
                          <option value="user">MEMBER</option>
                          <option value="admin">ADMIN</option>
                          <option value="super_admin">S. ADMIN</option>
                        </select>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted transition-all">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                    No identity nodes found in the registry.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
