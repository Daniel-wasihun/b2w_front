"use client";

import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/authStore";

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { label: "Profile Information", icon: User, active: true },
              { label: "Notifications", icon: Bell },
              { label: "Security", icon: Shield },
              { label: "Appearance", icon: Palette },
              { label: "Language", icon: Globe },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  item.active 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Update your personal information and how others see you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                    <Input defaultValue={user?.name} placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                    <Input defaultValue={user?.email} placeholder="Enter your email" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Bio</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t flex justify-end py-4">
                <Button variant="premium" className="rounded-xl px-8 font-bold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-border/50 shadow-sm border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Permanently delete your account and all associated data.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </CardContent>
              <CardFooter className="bg-destructive/5 border-t border-destructive/10 flex justify-end py-4">
                <Button variant="destructive" className="rounded-xl font-bold">
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
