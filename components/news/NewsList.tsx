"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Share2, Tag, Bookmark } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { localize } from "@/lib/utils";

interface NewsListProps {
  posts: any[];
  loading: boolean;
  currentLanguage: string;
}

export const NewsList = ({ posts, loading, currentLanguage }: NewsListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[1, 2, 4, 5].map(i => <div key={i} className="h-[400px] bg-muted animate-pulse rounded-3xl" />)}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-[3rem] border-2 border-dashed">
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
        >
          <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-card overflow-hidden group">
            <div className="aspect-[16/10] relative overflow-hidden">
               <img 
                src={post.cover_image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000"} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={localize(post.title, currentLanguage)}
               />
               <div className="absolute top-6 left-6 flex gap-2">
                  <Badge className="bg-white/90 backdrop-blur-md text-primary border-none">Update</Badge>
               </div>
            </div>
            <CardHeader className="p-8">
              <div className="flex items-center text-xs font-bold capitalize text-secondary mb-4">
                 <Calendar size={14} className="mr-2" />
                 {new Date(post.created_at).toLocaleDateString()}
              </div>
              <CardTitle className="text-2xl font-serif font-bold group-hover:text-primary transition-colors leading-tight">
                {localize(post.title, currentLanguage)}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
               <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                 {localize(post.summary, currentLanguage) || "Explore the deep insights and latest breakthroughs within the Born To Win ecosystem. We analyze the strategies that lead to success..."}
               </p>
            </CardContent>
            <CardFooter className="px-8 pb-10 flex items-center justify-between">
               <Button variant="ghost" className="p-0 text-primary font-bold hover:bg-transparent group/btn">
                    Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
               </Button>
               <div className="flex items-center space-x-3">
                  <Share2 size={16} className="text-muted-foreground hover:text-secondary cursor-pointer transition-colors" />
                  <Tag size={16} className="text-muted-foreground hover:text-secondary cursor-pointer transition-colors" />
               </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
