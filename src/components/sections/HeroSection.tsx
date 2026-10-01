"use client";

import React, { memo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight, FileText, Mail } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { resumeData } from '@/data/resumeData';

const PathfindingLab = dynamic(() => import('@/components/3d/PathfindingLab'), {
  ssr: false,
  loading: () => (
    <div className="surface-panel flex min-h-[340px] items-center justify-center p-8">
      <span className="font-mono text-xs tracking-[0.1em] text-[var(--muted)]">Loading route demo…</span>
    </div>
  ),
});

export const HeroSection = memo(function HeroSection() {
  const lenis = useLenis();

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (lenis) {
      lenis.scrollTo(element, { offset: -72, duration: 0.8 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis]);

  return (
    <section id="hero" className="scroll-mt-20 border-b border-[var(--line)] pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-24">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4 font-mono text-[0.68rem] tracking-[0.08em] text-[var(--muted)]">
        <span>Baguio City, Philippines</span>
        <span>Computer Science / Systems / Game Development</span>
      </div>

      <div className="grid min-w-0 items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="flex min-w-0 flex-col">
          <p className="section-kicker mb-5">Portfolio / 2026</p>
          <h1 className="max-w-xl font-display text-[clamp(4.4rem,11vw,9.6rem)] leading-[0.78] text-[var(--foreground)]">
            Narciso
            <span className="block pl-[0.18em] italic text-[var(--accent)]">Javier</span>
          </h1>
          <p className="mt-9 max-w-lg text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {resumeData.personalInfo.title} building practical software across systems, backend services, and interactive game mechanics.
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-1 border-y border-[var(--line)] sm:grid-cols-3">
            {[
              ['01', 'Systems', 'Go, Docker, Linux'],
              ['02', 'Game Dev', 'Unity, C#, physics'],
              ['03', 'Tooling', 'Python, GIS, automation'],
            ].map(([number, title, description]) => (
              <div key={number} className="border-b border-[var(--line)] py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                <p className="font-mono text-[0.64rem] text-[var(--accent)]">{number}</p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="accent-button inline-flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold tracking-[0.08em]"
            >
              Explore work
              <ArrowDown className="h-4 w-4" />
            </button>
            <a
              href="/api/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--line-strong)] px-4 py-3 font-mono text-xs tracking-[0.08em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-1 py-3 font-mono text-xs tracking-[0.08em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <Mail className="h-4 w-4" />
              Start a conversation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="min-w-0 lg:pt-8">
          <PathfindingLab />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
