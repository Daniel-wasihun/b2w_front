"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { useLanguageStore } from "@/lib/languageStore";
import apiClient from "@/lib/apiClient";

// News Page Components
import { NewsSidebar } from "@/components/news/NewsSidebar";
import { NewsList } from "@/components/news/NewsList";

const staticPosts = [
  {
    id: 'news-1',
    title: { en: "B2W Strategic Partnership with Silicon Valley Hubs", am: "B2W ከሲሊኮን ቫሊ ማዕከላት ጋር ስትራቴጂካዊ አጋርነት ፈጠረ" },
    summary: { en: "We are thrilled to announce a new partnership that will provide our top-performing students with direct internship placements at leading tech firms in Silicon Valley.", am: "ከፍተኛ ውጤት ላስመዘገቡ ተማሪዎቻችን በሲሊኮን ቫሊ ውስጥ በሚገኙ መሪ የቴክኖሎጂ ኩባንያዎች ውስጥ ቀጥተኛ የልምምድ እድል የሚሰጥ አዲስ አጋርነት መፈጠሩን ስናበስር በታላቅ ደስታ ነው።" },
    cover_image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
    created_at: "2026-04-15"
  },
  {
    id: 'news-2',
    title: { en: "Student Innovation Lab Reaches New Milestone", am: "የተማሪዎች ፈጠራ ላብራቶሪ አዲስ ምዕራፍ ላይ ደረሰ" },
    summary: { en: "Last month's innovation cycle saw a record-breaking 40% increase in patent-ready student projects, marking a new era of academic excellence.", am: "ባለፈው ወር የተካሄደው የፈጠራ ዑደት ለፓተንት ዝግጁ በሆኑ የተማሪዎች ፕሮጀክቶች ላይ የ 40% ጭማሪ የታየበት ሲሆን ይህም የአካዳሚክ የላቀ ውጤት አዲስ ምዕራፍ መሆኑን የሚያሳይ ነው።" },
    cover_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    created_at: "2026-04-10"
  },
  {
    id: 'news-3',
    title: { en: "Register for the Elite Leadership Sprint", am: "ለሊቆች አመራር ስፕሪንት ይመዝገቡ" },
    summary: { en: "Registration is now open for the upcoming leadership intensive. Learn the core principles of strategic management and global leadership.", am: "ለሚቀጥለው ጥልቅ የአመራር ስልጠና ምዝገባ አሁን ተከፍቷል። የስትራቴጂካዊ አስተዳደር እና የዓለም አቀፍ አመራር ዋና መርሆዎችን ይማሩ።" },
    cover_image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    created_at: "2026-04-05"
  }
];

export default function NewsPage() {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const [posts, setPosts] = useState<any[]>(staticPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiClient.get('/v1/news');
        const apiPosts = res.data.data?.data || res.data.data || res.data || [];
        setPosts([...staticPosts, ...(Array.isArray(apiPosts) ? apiPosts : [])]);
      } catch (err) {
        console.error("Failed to fetch news posts");
        setPosts(staticPosts);
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
