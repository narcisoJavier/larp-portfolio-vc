"use client";

import React, { memo, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { resumeData } from '@/data/resumeData';

export const FooterSection = memo(function FooterSection() {
  const lenis = useLenis();

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lenis]);

  return (
    <footer className="flex flex-col gap-6 py-10 font-mono text-xs text-[var(--muted)] sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">{resumeData.personalInfo.name}</p>
        <p className="mt-2 font-sans text-sm leading-6">Computer Science student / Baguio City, Philippines</p>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent)]">GitHub</a>
        <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent)]">LinkedIn</a>
        <a href={`mailto:${resumeData.personalInfo.email}`} className="transition-colors hover:text-[var(--accent)]">Email</a>
        <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)]">
          Top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
});

export default FooterSection;
