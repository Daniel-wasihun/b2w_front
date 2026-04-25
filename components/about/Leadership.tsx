"use client";

import React from "react";
import { PremiumCard } from "@/components/ui/premium-card";
import { motion } from "framer-motion";

const universityLeaders = [
  {
    name: "Dr. Haile G/Eyesus",
    role: "President, Woldia University",
    bio: "Visionary leader dedicated to academic excellence and regional innovation through the Woldia University ecosystem.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "success" as const,
    socials: [{ type: "linkedin" as const, url: "#" }],
  },
  {
    name: "Dr. Solomon Tsegaye",
    role: "Vice President for Academic Affairs",
    bio: "Overseeing educational quality and curriculum development for the university's growing student body.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "secondary" as const,
    socials: [{ type: "linkedin" as const, url: "#" }],
  },
  {
    name: "Dr. Abebech Mulu",
    role: "Vice President for Research",
    bio: "Driving the university's research agenda and community service initiatives forward.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "default" as const,
    socials: [{ type: "email" as const, url: "mailto:research@wu.edu.et" }],
  },
];

const clubLeaders = [
  {
    name: "Elias Belay",
    role: "B2W Club President",
    bio: "Visionary founder of B2W initiative, dedicated to transforming student excellence on a global scale.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "default" as const,
    socials: [
      { type: "linkedin" as const, url: "#" },
      { type: "email" as const, url: "mailto:elias@b2w.org" },
    ],
  },
  {
    name: "Martha Kassa",
    role: "B2W Club Vice President",
    bio: "Expert in educational strategy and student development, overseeing club growth and community impact.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "secondary" as const,
    socials: [{ type: "linkedin" as const, url: "#" }],
  },
  {
    name: "Samuel Tadesse",
    role: "General Secretary",
    bio: "Expert in organizational management and strategic logistics for the B2W club operations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "default" as const,
    socials: [{ type: "linkedin" as const, url: "#" }],
  },
  {
    name: "Sarah Jenkins",
    role: "Academic Coordinator",
    bio: "Visionary leader focused on student empowerment and curriculum innovation for the club members.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "default" as const,
    socials: [{ type: "linkedin" as const, url: "#" }],
  },
];

export const Leadership = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 space-y-32">
        {/* University Sponsors Section */}
        <div>
          <div className="max-w-2xl mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-widest uppercase text-xs"
            >
              Institutional Support
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
            >
              Our <span className="italic">Sponsors</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-6 text-lg"
            >
              The visionary executive leaders of Woldia University who sponsor and guide the B2W initiative.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universityLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard
                  title={leader.name}
                  description={leader.bio}
                  image={leader.image}
                  badge={leader.role}
                  badgeVariant={leader.badgeVariant}
                  socials={leader.socials}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* B2W Club Leaders Section */}
        <div>
          <div className="max-w-2xl mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-widest uppercase text-xs"
            >
              Student Executive Body
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
            >
              B2W Club <span className="italic">Leaders</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-6 text-lg"
            >
              The dedicated student leaders managing the core operations and community impact of the B2W Club.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard
                  title={leader.name}
                  description={leader.bio}
                  image={leader.image}
                  badge={leader.role}
                  badgeVariant={leader.badgeVariant}
                  socials={leader.socials}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
