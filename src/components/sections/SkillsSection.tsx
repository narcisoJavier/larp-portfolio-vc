'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resumeData';
import { cardVariants, containerVariants, headingVariants } from './shared';

const SKILL_GROUPS = [
  { key: 'programming', label: 'Programming languages' },
  { key: 'frameworks', label: 'Frameworks and tools' },
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'coreCompetencies', label: 'Core competencies' },
] as const;

export const SkillsSection = memo(function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section scroll-mt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-10"
      >
        <motion.div variants={headingVariants} className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-3">02 / Practice</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)] sm:text-6xl">Skills with context</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--muted)] md:text-right">A focused toolkit built through projects, coursework, and practical experiments.</p>
        </motion.div>

        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => (
            <motion.article key={group.key} variants={cardVariants} className="bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg font-semibold text-[var(--foreground)]">{group.label}</p>
                <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                {resumeData.skills[group.key].map((skill) => (
                  <span key={skill} className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

export default SkillsSection;
