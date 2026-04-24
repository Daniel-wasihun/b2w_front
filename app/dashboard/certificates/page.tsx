"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Award, Download, ShieldCheck, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";

export default function DashboardCertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await apiClient.get("/v1/my/certificates");
        setCertificates(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch certificates");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleDownload = (uuid: string) => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/v1/certificates/${uuid}/download`, "_blank");
    toast.success("Downloading certificate...");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
            <p className="text-muted-foreground">Access and download your blockchain-verified achievement certificates.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Input placeholder="Search certificates..." className="pl-10" />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted/50" />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <Card className="p-16 text-center border-dashed flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <Award className="w-10 h-10 text-primary/40" />
            </div>
            <h3 className="text-xl font-bold">No certificates earned yet</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
              Finish competitions in the top ranks to earn verified certificates that boost your career.
            </p>
            <Button variant="outline" className="mt-6 rounded-xl">View Requirements</Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert: any) => (
              <Card key={cert.id} className="group border-border/50 hover:shadow-lg transition-all overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 premium-gradient rounded-lg text-white">
                      <Award className="w-5 h-5" />
                    </div>
                    <Badge variant="success" className="flex items-center">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-lg">{cert.race?.title || 'Achievement Certificate'}</CardTitle>
                  <CardDescription>Issued on {new Date(cert.issued_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs font-bold capitalize text-muted-foreground">Verification Code</p>
                    <code className="text-[11px] bg-muted px-2 py-1 rounded block truncate">{cert.verification_code}</code>
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownload(cert.uuid)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:text-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
