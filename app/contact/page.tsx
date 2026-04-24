"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";

// Contact Page Components
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Get in Touch with Champions"
        italicWord="Champions"
        badge="Contact"
        subtitle="Have a question or want to propose a partnership? Our team is ready to help you navigate your path to victory."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactMap />
    </main>
  );
}
