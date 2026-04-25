"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Link, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Social {
  type: "email" | "linkedin";
  url: string;
}

interface PremiumCardProps {
  title: string;
  description: React.ReactNode;
  image?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning";
  socials?: Social[];
  onClick?: () => void;
  className?: string;
}

export const PremiumCard = ({
  title,
  description,
  image,
  badge,
  badgeVariant = "success",
  socials,
  onClick,
  className,
}: PremiumCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[5px] bg-background border border-border shadow-sm transition-all hover:shadow-2xl hover:border-primary/20 cursor-pointer",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 border-b border-border/50">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10" />
        )}

        {/* Social Icons (Top Right) - Floating Style */}
        {socials && socials.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-md shadow-lg text-primary hover:bg-secondary hover:text-white hover:scale-110 transition-all border border-white/20"
              >
                {social.type === "email" ? <Mail size={18} /> : <Link size={18} />}
              </motion.a>
            ))}
          </div>
        )}

        {/* Status Badge (Bottom Left) */}
        {badge && (
          <div className="absolute bottom-6 left-6 z-10">
            <Badge 
              variant={badgeVariant}
              className={cn(
                "px-4 py-1.5 rounded-[5px] uppercase tracking-wider text-[10px] font-bold shadow-lg border-none",
                badgeVariant === "success" && "bg-emerald-500 text-white",
                badgeVariant === "secondary" && "bg-secondary text-white",
                badgeVariant === "default" && "bg-primary text-white"
              )}
            >
              {badge}
            </Badge>
          </div>
        )}

        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground font-serif tracking-tight leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          {onClick && (
            <div className="p-2 rounded-full bg-muted/30 group-hover:bg-primary/10 transition-colors">
              <ArrowUpRight className="text-muted-foreground w-4 h-4 group-hover:text-primary transition-colors" />
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
