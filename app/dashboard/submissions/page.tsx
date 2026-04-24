"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, Search, Filter, ExternalLink, MoreVertical, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import apiClient from "@/lib/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await apiClient.get("/v1/my/submissions");
        setSubmissions(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
            <p className="text-muted-foreground">Review and track the status of your competition entries.</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Input placeholder="Search submissions..." className="pl-10" />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <FileText className="w-10 h-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-bold">No submissions yet</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                  You haven't submitted any work for your active competitions. Choose a race and start creating!
                </p>
                <Button variant="premium" className="mt-8 rounded-xl">View Active Races</Button>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="font-bold py-4">Project / Race</TableHead>
                    <TableHead className="font-bold py-4">Submitted Date</TableHead>
                    <TableHead className="font-bold py-4">Score</TableHead>
                    <TableHead className="font-bold py-4">Status</TableHead>
                    <TableHead className="text-right font-bold py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub: any) => (
                    <TableRow key={sub.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-base">{sub.race?.title || 'Competition Entry'}</span>
                          <span className="text-xs text-muted-foreground">ID: SUB-{sub.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 mr-2" />
                          {new Date(sub.submitted_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono font-bold text-primary">
                          {sub.score !== null ? `${sub.score}/100` : '--'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={sub.status === 'approved' ? 'success' : sub.status === 'pending' ? 'secondary' : 'destructive'}
                          className="capitalize font-bold"
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="rounded-xl hover:text-primary">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-xl">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
