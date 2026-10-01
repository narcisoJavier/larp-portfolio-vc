"use client";
import React, { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Terminal, Cpu, Layers } from 'lucide-react';
import { ProjectPhysicsDeck, type DeckProjectItem } from '@/components/ui/ProjectPhysicsDeck';
import { resumeData } from '@/data/resumeData';
import { getProjectEvidence } from '@/data/projectEvidence';
import {
  containerVariants,
  headingVariants,
} from './shared';

const PROJECT_PRESENTATION: Record<string, Omit<DeckProjectItem, 'id' | 'title' | 'tech' | 'description' | 'highlights' | 'link' | 'demoLink'>> = {
  tether: {
    rank: '01',
    tagline: 'Mobile Server Admin & SSH Client',
    category: 'SWE',
    icon: <Shield className="w-4 h-4 text-white" />,
    badge: 'MOBILE & INFRASTRUCTURE',
  },
  geocradle: {
    rank: '02',
    tagline: 'Cordillera Watershed Web GIS Map',
    category: 'SWE',
    icon: <Globe className="w-4 h-4 text-white" />,
    badge: 'GEOSPATIAL & GIS',
  },
  'campus-nav': {
    rank: '03',
    tagline: 'Go Shortest-Path Routing Service',
    category: 'SYSTEMS',
    icon: <Terminal className="w-4 h-4 text-white" />,
    badge: 'MICROSERVICES & GRAPH',
  },
  'multitask-contextswitch': {
    rank: '04',
    tagline: 'Desktop Task Monitor & Window Switcher',
    category: 'SYSTEMS',
    icon: <Cpu className="w-4 h-4 text-white" />,
    badge: 'DESKTOP AUTOMATION',
  },
  'hand-sign-recognition': {
    rank: '05',
    tagline: 'Computer Vision Gesture Prototype',
    category: 'SYSTEMS',
    icon: <Layers className="w-4 h-4 text-white" />,
    badge: 'COMPUTER VISION',
  },
  'opencode-setup': {
    rank: '06',
    tagline: 'Isolated Docker Development Sandbox',
    category: 'SYSTEMS',
    icon: <Terminal className="w-4 h-4 text-white" />,
    badge: 'CONTAINERIZATION',
  },
};

const ALL_STUDIO_PROJECTS: DeckProjectItem[] = resumeData.projects.map((project) => {
  const presentation = PROJECT_PRESENTATION[project.id];
  const evidence = getProjectEvidence(project.id);

  return {
    ...presentation,
    id: project.id,
    title: project.title,
    tech: evidence?.technologyTags || [],
    description: project.description,
    highlights: evidence?.verifiedClaims.slice(0, 3) || [project.description],
    link: project.link,
    demoLink: project.id === 'hand-sign-recognition' ? project.link : undefined,
  };
});

interface ProjectsSectionProps {
  className?: string;
}

export const ProjectsSection = memo(function ProjectsSection({
  className = '',
}: ProjectsSectionProps = {}) {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const toggleExpand = useCallback((id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="projects" className={`scroll-mt-20 w-full py-12 border-b border-white/10 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="w-full space-y-8"
      >
        {/* Studio section header */}
        <motion.div
          variants={headingVariants}
          className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 pb-5 gap-4"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span>02 // SELECTED WORK</span>
              <span className="text-zinc-600">/</span>
              <span>PROJECTS &amp; SOURCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase font-display tracking-tight">
              Featured Projects &amp; Code
            </h2>
          </div>

        </motion.div>

        {/* Sole Dedicated Horizontal Momentum Physics Deck */}
        <ProjectPhysicsDeck
          projects={ALL_STUDIO_PROJECTS}
          expandedProjectId={expandedProjectId}
          onToggleExpand={toggleExpand}
        />
      </motion.div>
    </section>
  );
});

export default ProjectsSection;
