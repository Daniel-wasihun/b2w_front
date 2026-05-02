"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  title?: string;
  description?: React.ReactNode;
  image?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  badge?: string;
  badgeVariant?: string;
  socials?: Array<{
    type: "linkedin" | "twitter" | "facebook" | "instagram";
    url: string;
  }>;
  action?: React.ReactNode;
}

export const PremiumCard = ({
  title,
  description,
  image,
  className,
  onClick,
  children,
  badge,
  badgeVariant,
  socials,
  action,
}: PremiumCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-[20px] border border-border bg-card dark:bg-muted/10 p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children ? (
        children
      ) : (
        <div className="space-y-4">
          {image && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border">
              <Image
                src={image}
                alt={title || ""}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              {badge && (
                <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg">
                  {badge}
                </span>
              )}
            </div>
          )}
          <div className="space-y-2">
            {title && <h3 className="font-bold text-lg text-foreground tracking-tight leading-tight">{title}</h3>}
            {description && <div className="text-sm text-muted-foreground leading-relaxed font-medium">{description}</div>}
          </div>
          {socials && socials.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {social.type === "linkedin" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  )}
                  {social.type === "twitter" && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  )}
                </a>
              ))}
            </div>
          )}
          {action && <div className="pt-4">{action}</div>}
        </div>
      )}
    </div>
  );
};
