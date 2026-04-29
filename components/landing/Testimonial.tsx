"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialProps {
  data?: any[];
}

export const Testimonial = ({ data }: TestimonialProps) => {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold italic">Success Stories</h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Hear from the champions who transformed their potential into victory through our elite programs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((testimonial: any, i: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
              <div className="space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-white/90">"{testimonial.content}"</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 overflow-hidden shrink-0">
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-lg">{testimonial.name[0]}</div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-white/50 uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
