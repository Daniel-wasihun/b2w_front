import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminKpiCardProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  trend?: { value: number; label: string; isPositive?: boolean };
}

export function AdminKpiCard({
  label,
  value,
  icon,
  color,
  bg,
  trend,
}: AdminKpiCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all">
      <div className="flex items-center justify-between relative z-10">
        <div className={`p-2.5 rounded-md ${bg}`}>
          <icon className={`w-5 h-5 ${color}`} />
        </div>
        {trend && (
          <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
            <span className={`w-3 h-3 ${trend.isPositive !== false ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="ml-1">{trend.label}</span>
          </div>
        )}
      </div>
      <div className="mt-5 relative z-10">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-bold text-foreground mt-1 tabular-nums">{value}</h3>
      </div>
      {/* Subtle background decoration */}
      <div className="absolute -right-4 -bottom-4 text-muted/20 opacity-50 group-hover:text-primary/5 transition-colors">
        <icon className="w-24 h-24 rotate-12" />
      </div>
    </div>
  );
}