"use client";

import React from "react";
import { PremiumCard } from "@/components/ui/premium-card";
import { motion } from "framer-motion";

interface LeadershipProps {
  leaders: any[];
}

export const Leadership = ({ leaders }: LeadershipProps) => {
  if (!leaders || leaders.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 space-y-32">
        <div>
          <div className="max-w-2xl mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-widest uppercase text-xs"
            >
              Our Visionary Team
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 text-primary"
            >
              The Minds Behind <span className="italic">Excellence</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-6 text-lg"
            >
              Meet the dedicated professionals and student leaders driving the B2W mission forward.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PremiumCard
                  title={leader.name}
                  description={leader.role} // Using role as description for simplicity or add bio field
                  image={leader.avatar}
                  badge={leader.role}
                  badgeVariant="default"
                  socials={[
                    ...(leader.linkedin ? [{ type: "linkedin" as const, url: leader.linkedin }] : []),
                    ...(leader.twitter ? [{ type: "twitter" as const, url: leader.twitter }] : []),
                  ]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
