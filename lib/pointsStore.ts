"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface PointsState {
  xp: number;
  level: number;
  achievements: Achievement[];
  addXP: (amount: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  reset: () => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set) => ({
      xp: 1250, // Initial mock XP
      level: 12, // Initial mock level
      achievements: [
        { 
          id: "1", 
          title: "First Challenge", 
          description: "Completed your first elite challenge.", 
          icon: "🎯", 
          unlockedAt: new Date().toISOString() 
        }
      ],
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 1000) + 1;
        return { xp: newXP, level: newLevel };
      }),
      unlockAchievement: (achievement) => set((state) => ({
        achievements: [...state.achievements, achievement]
      })),
      reset: () => set({ xp: 0, level: 1, achievements: [] }),
    }),
    {
      name: "b2w-points-storage",
    }
  )
);
