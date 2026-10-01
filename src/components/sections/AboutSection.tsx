"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { resumeData, credentials } from '@/data/resumeData';
import { cardVariants, containerVariants, headingVariants } from './shared';

export const AboutSection = memo(function AboutSection() {
  return (
    <section id="about" className="portfolio-section scroll-mt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-10"
      >
        <motion.div variants={headingVariants} className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-3">01 / Profile</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)] sm:text-6xl">About and focus</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[var(--muted)] md:text-right">Saint Louis University / B.S. Computer Science / Class of 2027</p>
        </motion.div>

        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] lg:grid-cols-[1.25fr_0.75fr]">
          <motion.article variants={cardVariants} className="bg-[var(--surface)] p-6 sm:p-10">
            <p className="max-w-2xl font-display text-3xl leading-[1.12] text-[var(--foreground)] sm:text-4xl">
              I like software that makes complex systems easier to understand and easier to use.
            </p>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[var(--muted)]">
              <p>
                I am a Computer Science student in Baguio City, focused on software engineering, backend systems, and interactive game mechanics.
              </p>
              <p>
                My work moves between remote server tools, algorithm-backed services, GIS applications, desktop automation, and responsive Unity prototypes. I care about clear boundaries, useful feedback, and software that feels deliberate.
              </p>
            </div>
          </motion.article>

          <motion.aside variants={cardVariants} className="bg-[var(--surface-raised)] p-6 sm:p-10">
            <p className="section-kicker mb-6">Current focus</p>
            <ul className="divide-y divide-[var(--line)]">
              {[
                ['Systems', 'Go services, Docker, Linux, and reliable data flow.'],
                ['Game development', 'Unity gameplay, physics, C#, and player feedback.'],
                ['Tooling', 'Python automation, PyQt6, GIS, and practical interfaces.'],
              ].map(([title, description]) => (
                <li key={title} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-base font-semibold text-[var(--foreground)]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{description}</p>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <motion.div variants={cardVariants} className="surface-panel p-6 sm:p-8">
            <p className="section-kicker mb-6">Education</p>
            <dl className="space-y-4 text-sm">
              <div className="flex items-start justify-between gap-6 border-b border-[var(--line)] pb-4">
                <dt className="text-[var(--muted)]">University</dt>
                <dd className="text-right font-semibold text-[var(--foreground)]">{resumeData.education.university}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-[var(--line)] pb-4">
                <dt className="text-[var(--muted)]">Degree</dt>
                <dd className="max-w-[15rem] text-right font-semibold text-[var(--foreground)]">{resumeData.education.degree}</dd>
              </div>
              <div className="flex items-start justify-between gap-6">
                <dt className="text-[var(--muted)]">Location</dt>
                <dd className="text-right font-semibold text-[var(--foreground)]">{resumeData.personalInfo.location}</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div variants={cardVariants} className="surface-panel p-6 sm:p-8">
            <p className="section-kicker mb-6">Credentials</p>
            <ul className="space-y-4">
              {credentials.map((credential) => (
                <li key={credential.title} className="border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{credential.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{credential.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

export default AboutSection;
