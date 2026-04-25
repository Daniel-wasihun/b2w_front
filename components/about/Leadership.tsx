"use client";

import React from "react";
import { PremiumCard } from "@/components/ui/premium-card";
import { motion } from "framer-motion";

const leaders = [
  {
    name: "Dr. Abebe Haile",
    role: "Board Chair",
    bio: "Former educator with 25 years of experience in international development and educational reform.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop", // High-quality placeholder
    badgeVariant: "success" as const,
    socials: [
      { type: "email" as const, url: "mailto:abebe@b2w.org" },
      { type: "linkedin" as const, url: "#" },
    ],
  },
  {
    name: "Sarah Jenkins",
    role: "Program Director",
    bio: "Visionary leader focused on student empowerment and curriculum innovation for the digital age.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "secondary" as const,
    socials: [
      { type: "linkedin" as const, url: "#" },
    ],
  },
  {
    name: "Marcus Thorne",
    role: "Chief Strategist",
    bio: "Expert in organizational growth and strategic partnerships for high-impact social initiatives.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    badgeVariant: "default" as const,
    socials: [
      { type: "linkedin" as const, url: "#" },
    ],
  },
];

export const Leadership = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-widest uppercase text-xs"
          >
            Our Leadership
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
          >
            Guided by <span className="italic">Visionaries</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 text-lg"
          >
            Meet the dedicated professionals driving the B2W initiative forward with expertise and passion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
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
    </section>
  );
};
