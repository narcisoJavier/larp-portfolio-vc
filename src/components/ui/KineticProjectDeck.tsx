"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectMotionPreview } from '@/components/ui/ProjectMotionPreview';
import { useStableReducedMotion } from '@/hooks/useStableReducedMotion';

export interface KineticProject {
  id: string;
  number: string;
  domain: string;
  title: string;
  description: string;
  role: string;
  tags: string[];
  proof?: string;
  link?: string;
}

interface KineticProjectDeckProps {
  projects: KineticProject[];
}

const CARD_STEP = 390;

export const KineticProjectDeck = memo(function KineticProjectDeck({ projects }: KineticProjectDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(projects[0]?.id ?? '');
  const [limit, setLimit] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const prefersReducedMotion = useStableReducedMotion();
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  const softenedVelocity = useSpring(velocity, { stiffness: 230, damping: 28 });
  const skewX = useTransform(softenedVelocity, [-1600, 0, 1600], [-2.5, 0, 2.5]);
  const rotateY = useTransform(softenedVelocity, [-1600, 0, 1600], [-3, 0, 3]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const nextLimit = Math.max(0, track.scrollWidth - container.clientWidth);
    setLimit(nextLimit);
    if (x.get() < -nextLimit) x.set(-nextLimit);
  }, [x]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [measure, projects]);

  useEffect(() => x.on('change', (value) => {
    setCanGoBack(value < -8);
    setCanGoForward(value > -limit + 8);
  }), [limit, x]);

  useEffect(() => {
    setCanGoForward(limit > 0);
  }, [limit]);

  const move = useCallback((direction: 'back' | 'forward') => {
    const current = x.get();
    const target = direction === 'back'
      ? Math.min(0, current + CARD_STEP)
      : Math.max(-limit, current - CARD_STEP);

    animate(x, target, prefersReducedMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 280, damping: 32, mass: 0.85 });
  }, [limit, prefersReducedMotion, x]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (limit === 0 || (!event.shiftKey && Math.abs(event.deltaX) < Math.abs(event.deltaY))) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > 0 ? event.deltaX : event.deltaY;
    x.set(Math.min(0, Math.max(-limit, x.get() - delta * 0.88)));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move('back');
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move('forward');
    }
  };

  return (
    <section aria-label="Interactive project deck" className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
          A tactile project shelf. Drag, swipe, use arrow keys, or select a card to reveal its evidence.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move('back')}
            disabled={!canGoBack}
            aria-label="Previous projects"
            className="deck-control"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => move('forward')}
            disabled={!canGoForward}
            aria-label="Next projects"
            className="deck-control"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        tabIndex={0}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        className="kinetic-deck overflow-hidden py-3 outline-none"
      >
        <motion.div
          ref={trackRef}
          drag={prefersReducedMotion ? false : 'x'}
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.07}
          dragTransition={{ bounceStiffness: 310, bounceDamping: 32 }}
          style={{ x, skewX: prefersReducedMotion ? 0 : skewX, rotateY: prefersReducedMotion ? 0 : rotateY }}
          className="flex w-max gap-4 px-0 sm:gap-6"
        >
          {projects.map((project) => {
            const isActive = project.id === activeId;
            return (
              <motion.article
                key={project.id}
                layout
                data-active={isActive}
                className="kinetic-card flex w-[min(20rem,calc(100vw-3.5rem))] flex-none flex-col sm:w-[23rem]"
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
                  event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  aria-pressed={isActive}
                  className="block w-full p-5 text-left focus-visible:outline-none sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] tracking-[0.1em]">
                    <span className="text-[var(--accent)]">{project.number}</span>
                    <span className="text-[var(--subtle)]">{project.domain}</span>
                  </div>
                  <ProjectMotionPreview projectId={project.id} />
                  <h3 className="mt-5 font-display text-3xl leading-[0.95] text-[var(--foreground)]">{project.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 font-mono text-[0.67rem] text-[var(--muted)]">
                    {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--line)] px-5 py-5 sm:px-6">
                    {project.proof && <p className="text-sm leading-6 text-[var(--foreground)]">{project.proof}</p>}
                    <div className="mt-4 flex items-center justify-between gap-3 font-mono text-xs">
                      <span className="text-[var(--muted)]">{project.role}</span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex shrink-0 items-center gap-1.5 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                        >
                          Source <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

export default KineticProjectDeck;
