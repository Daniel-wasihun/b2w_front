"use client";

import React from "react";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/premium-card";

interface ProgramTracksProps {
  programs: any[];
}

export const ProgramTracks = ({ programs }: ProgramTracksProps) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, i) => (
            <motion.div
              key={program.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PremiumCard
                title={program.title}
                description={program.description}
                image={program.image}
                badge={program.badge}
                badgeVariant={program.badge_variant as any || "default"}
                onClick={() => console.log(`Enrolling in ${program.title}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
