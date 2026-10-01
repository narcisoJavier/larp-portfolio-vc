"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Sections from '@/components/ui/Sections';
import StudioTopNav from '@/components/ui/StudioTopNav';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-[#091008]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 flex min-h-screen w-full min-w-0 flex-col"
      >
        <StudioTopNav />
        <main id="main-content" className="relative z-20 flex min-w-0 flex-1 flex-col pt-2 sm:pt-4">
          <Sections />
        </main>
      </motion.div>
    </div>
  );
}
