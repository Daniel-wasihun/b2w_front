"use client";

import React from "react";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  return (
    <div className="lg:col-span-2">
       <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-card">
          <CardContent className="p-12 md:p-20 space-y-12">
             <div className="space-y-4">
                <h2 className="text-4xl font-serif font-bold text-primary">Send a <span className="italic text-secondary">Message</span></h2>
                <p className="text-muted-foreground text-lg">Tell us about your goals or how we can help you succeed.</p>
             </div>

             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-xs font-bold capitalize text-muted-foreground ml-1">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full h-14 bg-muted/50 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 border border-border transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold capitalize text-muted-foreground ml-1">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full h-14 bg-muted/50 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 border border-border transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold capitalize text-muted-foreground ml-1">Subject</label>
                   <select className="w-full h-14 bg-muted/50 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 border border-border transition-all appearance-none">
                      <option>General Inquiry</option>
                      <option>Partnership Proposal</option>
                      <option>Race Coordination</option>
                      <option>Technical Support</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold capitalize text-muted-foreground ml-1">Your Message</label>
                   <textarea placeholder="How can we help you win?" className="w-full h-48 bg-muted/50 rounded-[2rem] p-8 outline-none focus:ring-2 focus:ring-primary/20 border border-border transition-all resize-none"></textarea>
                </div>
                <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-bold shadow-glow-primary w-full md:w-auto">
                   Send Message <Send className="ml-3 w-5 h-5" />
                </Button>
             </form>
          </CardContent>
       </Card>
    </div>
  );
};
