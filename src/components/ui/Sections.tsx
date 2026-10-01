"use client";
import React, { memo } from 'react';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  FooterSection,
} from '@/components/sections';

export const Sections = memo(function Sections() {
  return (
    <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-[1320px] flex-col space-y-20 px-5 sm:px-8 lg:px-12">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
});

export default Sections;
