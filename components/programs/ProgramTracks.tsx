"use client";

import React from "react";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/premium-card";

const programs = [
  {
    title: "Strategic Internships",
    badge: "Careers",
    desc: "Gain hands-on experience in top environments. Our stipend-based internships value your dedication while building your professional path.",
    image: "https://images.unsplash.com/photo-1521737706042-5341cd287042?q=80&w=800",
    badgeVariant: "success" as const,
  },
  {
    title: "Hackathons & Challenges",
    badge: "Competition",
    desc: "Elite challenges in Web Dev, Machine Learning, and AI. Compete with the best and earn rank-based rewards and recognition.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
    badgeVariant: "default" as const,
  },
  {
    title: "Mastery Bootcamps",
    badge: "Training",
    desc: "Intensive training in Mobile Dev, AI, and Programming. Master world-class tools and real-world impact strategies.",
    image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800",
    badgeVariant: "secondary" as const,
  },
  {
    title: "Leadership & Management",
    badge: "Soft Skills",
    desc: "Cultivate the next generation of global leaders. Focus on project management, team synergy, and strategic vision.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
    badgeVariant: "warning" as const,
  },
  {
    title: "Law & Social Impact",
    badge: "Specialized",
    desc: "A program focused on legal frameworks and social innovation for real-world impact and civic engagement.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800",
    badgeVariant: "default" as const,
  },
  {
    title: "Webinars & Skill-based Workshops",
    badge: "Community",
    desc: "Weekly sessions with experts covering the latest digital trends, from Cloud Computing to Financial Intelligence.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
    badgeVariant: "secondary" as const,
  }
];

export const ProgramTracks = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PremiumCard
                title={program.title}
                description={program.desc}
                image={program.image}
                badge={program.badge}
                badgeVariant={program.badgeVariant}
                onClick={() => console.log(`Enrolling in ${program.title}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
