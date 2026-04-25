"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillData {
  subject: string;
  value: number;
}

const data: SkillData[] = [
  { subject: "AI/ML", value: 85 },
  { subject: "UI Design", value: 70 },
  { subject: "Business", value: 60 },
  { subject: "DevOps", value: 45 },
  { subject: "Soft Skills", value: 90 },
];

export const SkillRadar = () => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * (d.value / 100) * Math.cos(angle);
    const y = center + radius * (d.value / 100) * Math.sin(angle);
    return `${x},${y}`;
  });

  const gridPoints = [20, 40, 60, 80, 100].map((level) => {
    return data.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + radius * (level / 100) * Math.cos(angle);
        const y = center + radius * (level / 100) * Math.sin(angle);
        return `${x},${y}`;
    }).join(" ");
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid lines */}
        {gridPoints.map((gp, i) => (
          <polygon
            key={i}
            points={gp}
            className="fill-none stroke-border/30 stroke-1"
          />
        ))}

        {/* Axes */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className="stroke-border/20 stroke-1"
            />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + (radius + 25) * Math.cos(angle);
          const y = center + (radius + 15) * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              className="fill-muted-foreground uppercase tracking-widest"
            >
              {d.subject}
            </text>
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          points={points.join(" ")}
          className="fill-primary/20 stroke-primary stroke-2"
        />
      </svg>
    </div>
  );
};
