"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialProps {
  data?: any[];
}

export const Testimonial = ({ data }: TestimonialProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic">Success Stories</h2>
            <p className="text-white/60 mt-4 max-w-2xl">Hear from the champions who transformed their potential into victory through our elite programs.</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all text-white/70 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all text-white/70 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-6 px-6"
        >
          {data?.map((testimonial: any, i: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] snap-center bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
              <div className="space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-white/90 italic font-medium">"{testimonial.content}"</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 overflow-hidden shrink-0 shadow-xl">
                  {testimonial.avatar ? (
                     <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover rounded-[7.5px]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xl">{testimonial.name?.[0] || 'A'}</div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white leading-tight">{testimonial.name}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black mt-1">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
};
