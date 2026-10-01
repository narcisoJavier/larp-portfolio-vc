"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resumeData';
import { getProjectEvidence } from '@/data/projectEvidence';
import { KineticProjectDeck, type KineticProject } from '@/components/ui/KineticProjectDeck';
import { containerVariants, headingVariants } from './shared';

const PROJECT_DOMAINS: Record<string, string> = {
  tether: 'MOBILE SYSTEMS',
  geocradle: 'GEOSPATIAL',
  'campus-nav': 'ROUTING SERVICE',
  'multitask-contextswitch': 'DESKTOP TOOLING',
  'hand-sign-recognition': 'COMPUTER VISION',
  'opencode-setup': 'DEV ENVIRONMENT',
};

const PROJECTS: KineticProject[] = resumeData.projects.map((project, index) => {
  const evidence = getProjectEvidence(project.id);
  return {
    id: project.id,
    number: String(index + 1).padStart(2, '0'),
    domain: PROJECT_DOMAINS[project.id] ?? 'PROJECT',
    title: project.title,
    description: project.description,
    role: project.role,
    tags: evidence?.technologyTags ?? [],
    proof: evidence?.verifiedClaims[0],
    link: project.link,
  };
});

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
            <p className="section-kicker mb-3">03 / Project shelf</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)] sm:text-6xl">Work you can move through.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--muted)] md:text-right">Six real projects, with tactile movement and evidence kept close to the work.</p>
        </motion.div>

        <KineticProjectDeck projects={PROJECTS} />
      </motion.div>
    </section>
  );
});

export default ProjectsSection;
