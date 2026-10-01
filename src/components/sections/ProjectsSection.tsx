"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { resumeData } from '@/data/resumeData';
import { getProjectEvidence } from '@/data/projectEvidence';
import { cardVariants, containerVariants, headingVariants } from './shared';

const PROJECT_LABELS: Record<string, string> = {
  tether: 'Mobile systems',
  geocradle: 'Geospatial mapping',
  'campus-nav': 'Backend systems',
  'multitask-contextswitch': 'Desktop tooling',
  'hand-sign-recognition': 'Computer vision',
  'opencode-setup': 'Development environments',
};

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <section id="projects" className="portfolio-section scroll-mt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-10"
      >
        <motion.div variants={headingVariants} className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-3">03 / Selected work</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)] sm:text-6xl">Projects with proof</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--muted)] md:text-right">A selection of software, systems, and experiments grounded in public project sources.</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {resumeData.projects.map((project, index) => {
            const evidence = getProjectEvidence(project.id);
            const tags = evidence?.technologyTags.slice(0, 4) ?? [];
            const proof = evidence?.verifiedClaims[0];

            return (
              <motion.article
                key={project.id}
                variants={cardVariants}
                className={`surface-panel group flex min-h-[25rem] flex-col justify-between p-6 transition-colors sm:p-8 ${index === 0 ? 'md:col-span-2 lg:min-h-[22rem]' : ''}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="section-kicker">{PROJECT_LABELS[project.id] ?? 'Project'} / 0{index + 1}</p>
                      <h3 className="mt-4 font-display text-3xl leading-none text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} source`}
                      className="shrink-0 p-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">{project.description}</p>
                </div>

                <div className="mt-10 border-t border-[var(--line)] pt-5">
                  {proof && (
                    <p className="max-w-2xl text-sm leading-6 text-[var(--foreground)]">
                      <span className="mr-2 font-mono text-xs text-[var(--accent)]">Evidence</span>
                      {proof}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[var(--muted)]">
                    <span className="text-[var(--foreground)]">{project.role}</span>
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
});

export default ProjectsSection;
