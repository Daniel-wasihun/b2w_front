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
}

export const PremiumCard = ({
  title,
  description,
  image,
  className,
  onClick,
  children,
}: PremiumCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children ? (
        children
      ) : (
        <div className="space-y-4">
          {image && (
            <div className="relative aspect-video rounded-md overflow-hidden bg-slate-50 border border-slate-100">
              <Image
                src={image}
                alt={title || ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-1">
            {title && <h3 className="font-bold text-slate-800 tracking-tight">{title}</h3>}
            {description && <div className="text-sm text-slate-500 leading-relaxed">{description}</div>}
          </div>
        </div>
      )}
    </div>
  );
};
