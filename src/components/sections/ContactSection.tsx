"use client";

import React, { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Loader2, Mail, Send, X } from 'lucide-react';
import { resumeData } from '@/data/resumeData';
import { submitInquiry } from '@/lib/inquiryClient';
import { cardVariants, containerVariants, headingVariants } from './shared';
import { LinkedinIcon } from '@/components/ui/StudioIcons';

const INITIAL_FORM = {
  sender_name: '',
  sender_email: '',
  subject: '',
  message: '',
  website: '',
};

export const ContactSection = memo(function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inquiryStatus, setInquiryStatus] = useState<string | null>(null);
  const [inquiryError, setInquiryError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState(INITIAL_FORM);

  const copyToClipboard = useCallback((text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
    setCopiedField(label);
    window.setTimeout(() => setCopiedField(null), 2200);
  }, []);

  const handleInquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!formState.sender_name || !formState.sender_email || !formState.subject || !formState.message) {
      setInquiryError(true);
      setInquiryStatus('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setInquiryError(false);
    setInquiryStatus(null);

    try {
      await submitInquiry(formState);
      setInquiryStatus('Message sent. Thank you.');
      setFormState(INITIAL_FORM);
      window.setTimeout(() => setInquiryStatus(null), 5000);
    } catch (error) {
      setInquiryError(true);
      setInquiryStatus(error instanceof Error ? error.message : 'The message could not be sent.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof typeof INITIAL_FORM, value: string) => {
    setFormState((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <section id="contact" className="portfolio-section scroll-mt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="space-y-10"
      >
        <motion.div variants={headingVariants} className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker mb-3">04 / Contact</p>
            <h2 className="font-display text-5xl leading-none text-[var(--foreground)] sm:text-6xl">Let&apos;s make something useful.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--muted)] md:text-right">Open to software engineering, systems, and technical collaboration opportunities.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.aside variants={cardVariants} className="space-y-8">
            <div>
              <p className="section-kicker mb-4">Direct channels</p>
              <div className="space-y-3">
                <div className="surface-panel flex items-center justify-between gap-4 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <div className="min-w-0">
                      <p className="font-mono text-[0.66rem] text-[var(--muted)]">Email</p>
                      <p className="truncate text-sm text-[var(--foreground)]">{resumeData.personalInfo.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(resumeData.personalInfo.email, 'email')}
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 border border-[var(--line-strong)] px-3 font-mono text-xs text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {copiedField === 'email' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedField === 'email' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <a
                  href={resumeData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-panel flex min-h-[4.5rem] items-center justify-between gap-4 p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <span className="flex items-center gap-3">
                    <LinkedinIcon className="h-4 w-4 text-[var(--accent)]" />
                    <span>
                      <span className="block font-mono text-[0.66rem] text-[var(--muted)]">LinkedIn</span>
                      <span className="block text-sm text-[var(--foreground)]">Connect professionally</span>
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                </a>
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-6">
              <p className="section-kicker mb-4">Based in</p>
              <p className="font-display text-3xl text-[var(--foreground)]">{resumeData.personalInfo.location}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Remote, hybrid, or on-site collaboration considered.</p>
            </div>
          </motion.aside>

          <motion.div variants={cardVariants} className="surface-panel p-6 sm:p-8">
            <div className="mb-7 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-4">
              <div>
                <p className="section-kicker mb-2">Send a message</p>
                <p className="text-sm text-[var(--muted)]">Tell me what you are building and where I can help.</p>
              </div>
              <span className="hidden font-mono text-xs text-[var(--subtle)] sm:block">Reply by email</span>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-5">
              <input
                name="website"
                value={formState.website}
                onChange={(event) => updateField('website', event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Your name / organization
                  <input
                    name="sender_name"
                    value={formState.sender_name}
                    onChange={(event) => updateField('sender_name', event.target.value)}
                    placeholder="Alex Morgan / Tech Co"
                    required
                    className="min-h-12 border border-[var(--line-strong)] bg-[var(--surface-raised)] px-3 text-base text-[var(--foreground)] placeholder:text-[var(--subtle)]"
                  />
                </label>
                <label className="grid gap-2 text-sm text-[var(--muted)]">
                  Email address
                  <input
                    name="sender_email"
                    type="email"
                    value={formState.sender_email}
                    onChange={(event) => updateField('sender_email', event.target.value)}
                    placeholder="alex@tech.co"
                    required
                    className="min-h-12 border border-[var(--line-strong)] bg-[var(--surface-raised)] px-3 text-base text-[var(--foreground)] placeholder:text-[var(--subtle)]"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Subject
                <input
                  name="subject"
                  value={formState.subject}
                  onChange={(event) => updateField('subject', event.target.value)}
                  placeholder="A systems or software opportunity"
                  required
                  className="min-h-12 border border-[var(--line-strong)] bg-[var(--surface-raised)] px-3 text-base text-[var(--foreground)] placeholder:text-[var(--subtle)]"
                />
              </label>

              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Message
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="A few details about the project, team, or opportunity..."
                  rows={6}
                  required
                  className="resize-y border border-[var(--line-strong)] bg-[var(--surface-raised)] px-3 py-3 text-base leading-7 text-[var(--foreground)] placeholder:text-[var(--subtle)]"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="accent-button inline-flex min-h-12 items-center gap-2 px-4 font-mono text-xs font-bold tracking-[0.08em]"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </button>
                {inquiryStatus && (
                  <p role="status" aria-live="polite" className={`flex items-center gap-2 text-sm ${inquiryError ? 'text-[var(--danger)]' : 'text-[var(--accent)]'}`}>
                    {inquiryError ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    {inquiryStatus}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

export default ContactSection;
