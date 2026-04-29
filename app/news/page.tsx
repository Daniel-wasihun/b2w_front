"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { useLanguageStore } from "@/lib/languageStore";
import apiClient from "@/lib/apiClient";

// News Page Components
import { NewsSidebar } from "@/components/news/NewsSidebar";
import { NewsList } from "@/components/news/NewsList";

export default function NewsPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiClient.get('/v1/news');
        const apiPosts = res.data.data?.data || res.data.data || res.data || [];
        setPosts(Array.isArray(apiPosts) ? apiPosts : []);
      } catch (err) {
        console.error("Failed to fetch news posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <HeroHeader 
        title="Latest News & Insights"
        italicWord="Insights"
        badge="Journal"
        subtitle="Stay ahead with the latest updates from the Born To Win community and the tech world."
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <NewsSidebar />
            <div className="lg:col-span-3">
              <NewsList 
                posts={posts} 
                loading={loading} 
                currentLanguage={currentLanguage} 
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
