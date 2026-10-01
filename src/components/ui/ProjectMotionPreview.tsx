"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useStableReducedMotion } from '@/hooks/useStableReducedMotion';

interface ProjectMotionPreviewProps {
  projectId: string;
}

const COLORS = {
  cyan: '#67d8ff',
  violet: '#a78bfa',
  teal: '#60e3c4',
  gold: '#f3cd7a',
  ink: '#0a0d14',
  line: 'rgba(225, 236, 255, 0.25)',
};

function Frame({ children }: { children?: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="project-motion-preview">
      <svg viewBox="0 0 320 132" className="h-full w-full" fill="none">
        <path d="M0 24H320M0 66H320M0 108H320" stroke="rgba(225,236,255,0.045)" />
        <path d="M40 0V132M120 0V132M200 0V132M280 0V132" stroke="rgba(225,236,255,0.045)" />
        {children}
      </svg>
    </div>
  );
}

function TetherPreview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <Frame>
      <rect x="28" y="43" width="68" height="46" rx="5" fill={COLORS.ink} stroke={COLORS.line} />
      <rect x="224" y="43" width="68" height="46" rx="5" fill={COLORS.ink} stroke={COLORS.line} />
      <path d="M96 66H224" stroke={COLORS.teal} strokeWidth="1.5" strokeDasharray="5 5" />
      <circle cx="62" cy="66" r="9" fill={COLORS.ink} stroke={COLORS.teal} />
      <path d="M58 66H66M62 62V70" stroke={COLORS.teal} strokeWidth="1.4" />
      <path d="M251 57L263 66L251 75" stroke={COLORS.cyan} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <motion.circle
        r="4"
        fill={COLORS.teal}
        initial={reduceMotion ? { cx: 160, cy: 66, opacity: 1 } : { cx: 96, cy: 66, opacity: 0 }}
        animate={reduceMotion ? undefined : { cx: [96, 224], cy: 66, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </Frame>
  );
}

function GeoPreview({ reduceMotion }: { reduceMotion: boolean | null }) {
  const draw = { duration: 2.6, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const };
  return (
    <Frame>
      <path d="M25 100C70 77 96 116 140 91S214 56 290 77" stroke="rgba(225,236,255,0.26)" />
      <path d="M28 84C72 59 101 97 146 72S218 39 292 59" stroke="rgba(225,236,255,0.42)" />
      <motion.path d="M35 66C81 43 108 79 151 55S222 26 281 42" stroke={COLORS.gold} strokeWidth="1.5" initial={{ pathLength: reduceMotion ? 1 : 0 }} animate={reduceMotion ? undefined : { pathLength: 1 }} transition={draw} />
      <motion.path d="M236 21C208 43 191 62 166 107" stroke={COLORS.cyan} strokeWidth="2" strokeLinecap="round" initial={{ pathLength: reduceMotion ? 1 : 0.12 }} animate={reduceMotion ? undefined : { pathLength: 1 }} transition={{ ...draw, delay: 0.25 }} />
      <circle cx="166" cy="107" r="4" fill={COLORS.gold} />
      <motion.circle cx="166" cy="107" r="9" stroke={COLORS.gold} initial={reduceMotion ? { r: 9, opacity: 0.45 } : { r: 7, opacity: 0.7 }} animate={reduceMotion ? undefined : { r: [7, 15], opacity: [0.7, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />
    </Frame>
  );
}

function CampusPreview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <Frame>
      <path d="M43 72L101 34L168 54L249 35L285 74M101 34L108 99L168 54L218 100L285 74" stroke={COLORS.line} strokeWidth="1.2" />
      <motion.path d="M43 72L101 34L168 54L249 35L285 74" stroke={COLORS.cyan} strokeWidth="2.2" strokeLinecap="round" initial={{ pathLength: reduceMotion ? 1 : 0 }} animate={reduceMotion ? undefined : { pathLength: 1 }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }} />
      {[[43, 72], [101, 34], [168, 54], [249, 35], [285, 74]].map(([cx, cy], index) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 0 || index === 4 ? 7 : 5} fill={COLORS.ink} stroke={index === 0 || index === 4 ? COLORS.cyan : COLORS.line} strokeWidth="1.4" />
      ))}
    </Frame>
  );
}

function MultiTaskPreview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <Frame>
      <rect x="42" y="43" width="78" height="49" rx="4" fill={COLORS.ink} stroke={COLORS.line} />
      <rect x="201" y="43" width="78" height="49" rx="4" fill={COLORS.ink} stroke={COLORS.line} />
      <circle cx="160" cy="66" r="24" fill={COLORS.ink} stroke={COLORS.violet} strokeWidth="1.3" />
      <motion.path d="M120 66H137M183 66H201" stroke={COLORS.violet} strokeWidth="1.5" strokeDasharray="4 4" initial={{ strokeDashoffset: 0 }} animate={reduceMotion ? undefined : { strokeDashoffset: [0, -16] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
      <motion.circle cx="160" cy="66" r="12" stroke={COLORS.cyan} strokeWidth="2" strokeDasharray="20 56" initial={{ rotate: 0 }} animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }} />
    </Frame>
  );
}

function VisionPreview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <Frame>
      <rect x="90" y="19" width="140" height="94" rx="4" fill={COLORS.ink} stroke={COLORS.violet} strokeDasharray="5 4" />
      <path d="M128 92L141 67L158 46L176 38L193 54L202 82" stroke="rgba(225,236,255,0.62)" strokeWidth="1.2" />
      {[[128, 92], [141, 67], [158, 46], [176, 38], [193, 54], [202, 82]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill={COLORS.violet} />)}
      <motion.path d="M98 30H222" stroke={COLORS.cyan} strokeWidth="1.3" initial={{ y: reduceMotion ? 44 : 0 }} animate={reduceMotion ? undefined : { y: [0, 70, 0] }} transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }} />
    </Frame>
  );
}

function DockerPreview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <Frame>
      <motion.g initial={{ y: 0 }} animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M160 25L210 51L160 78L110 51L160 25Z" fill="#141a25" stroke={COLORS.cyan} />
        <path d="M110 51L160 78V109L110 81V51Z" fill="#0b1018" stroke={COLORS.line} />
        <path d="M160 78L210 51V81L160 109V78Z" fill="#111827" stroke={COLORS.line} />
        <path d="M136 51L160 63L184 51" stroke={COLORS.teal} strokeWidth="1.4" />
      </motion.g>
      <path d="M55 66H104M216 66H265" stroke={COLORS.line} strokeDasharray="4 4" />
      <circle cx="55" cy="66" r="5" fill={COLORS.ink} stroke={COLORS.teal} />
      <circle cx="265" cy="66" r="5" fill={COLORS.ink} stroke={COLORS.cyan} />
    </Frame>
  );
}

export const ProjectMotionPreview = memo(function ProjectMotionPreview({ projectId }: ProjectMotionPreviewProps) {
  const reduceMotion = useStableReducedMotion();

  switch (projectId) {
    case 'tether': return <TetherPreview reduceMotion={reduceMotion} />;
    case 'geocradle': return <GeoPreview reduceMotion={reduceMotion} />;
    case 'campus-nav': return <CampusPreview reduceMotion={reduceMotion} />;
    case 'multitask-contextswitch': return <MultiTaskPreview reduceMotion={reduceMotion} />;
    case 'hand-sign-recognition': return <VisionPreview reduceMotion={reduceMotion} />;
    case 'opencode-setup': return <DockerPreview reduceMotion={reduceMotion} />;
    default: return <Frame />;
  }
});

export default ProjectMotionPreview;
