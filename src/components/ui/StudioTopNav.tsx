"use client";

import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { ArrowUpRight } from 'lucide-react';
import { resumeData } from '@/data/resumeData';
import { GithubIcon, LinkedinIcon } from '@/components/ui/StudioIcons';

interface NavItem {
  id: string;
  label: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Overview', number: '00' },
  { id: 'about', label: 'Profile', number: '01' },
  { id: 'skills', label: 'Skills', number: '02' },
  { id: 'projects', label: 'Work', number: '03' },
  { id: 'contact', label: 'Contact', number: '04' },
];

export const StudioTopNav = memo(function StudioTopNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const lenis = useLenis();

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + 180;
      for (let index = NAV_ITEMS.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(NAV_ITEMS[index].id);
        if (section && section.offsetTop <= marker) {
          setActiveSection(NAV_ITEMS[index].id);
          return;
        }
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (lenis) {
      lenis.scrollTo(id === 'hero' ? 0 : element, { offset: id === 'hero' ? 0 : -72, duration: 0.8 });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [lenis]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[var(--background)] px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="shrink-0 text-left text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
        >
          {resumeData.personalInfo.name}
        </button>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`group flex items-center gap-2 border-b pb-1 font-mono text-[0.68rem] tracking-[0.08em] transition-colors ${
                  active
                    ? 'border-[var(--accent)] text-[var(--foreground)]'
                    : 'border-transparent text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--foreground)]'
                }`}
              >
                <span className="text-[0.6rem] text-[var(--subtle)]">{item.number}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="accent-button inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[0.68rem] font-bold tracking-[0.08em]"
          >
            Contact
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <nav aria-label="Mobile navigation" className="horizontal-scroll mx-auto mt-4 flex max-w-[1320px] gap-4 overflow-x-auto border-t border-[var(--line)] pt-3 md:hidden">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`shrink-0 font-mono text-[0.66rem] tracking-[0.08em] transition-colors ${
              activeSection === item.id ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            }`}
          >
            {item.number} {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
});

export default StudioTopNav;
