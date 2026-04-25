"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { PremiumCard } from "@/components/ui/premium-card";
import { localize } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface NewsListProps {
  posts: any[];
  loading: boolean;
  currentLanguage: string;
}

export const NewsList = ({ posts, loading, currentLanguage }: NewsListProps) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[1, 2, 4, 5].map(i => <div key={i} className="aspect-video bg-muted animate-pulse rounded-[8px]" />)}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-[5px] border-2 border-dashed border-border/50">
         <Bookmark className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
         <h2 className="text-2xl font-serif font-bold">No articles found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {posts.map((post: any, i: number) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <PremiumCard 
            title={localize(post.title, currentLanguage)}
            description={
              <div className="space-y-4">
                <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground/90">
                  {localize(post.summary, currentLanguage) || "Explore the deep insights and latest breakthroughs within the Born To Win ecosystem..."}
                </p>
                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-secondary">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                    Insight
                  </span>
                  <span className="text-muted-foreground/40">|</span>
                  <span>5 Min Read</span>
                </div>
              </div>
            }
            image={post.cover_image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000"}
            badge={new Date(post.created_at).toLocaleDateString()}
            badgeVariant="secondary"
            onClick={() => router.push(`/news/${post.id}`)}
          />
        </motion.div>
      ))}
    </div>
  );
};
