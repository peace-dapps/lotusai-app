'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const PILLARS = [
  { num: 'I.', key: 'pillar1' },
  { num: 'II.', key: 'pillar2' },
  { num: 'III.', key: 'pillar3' },
  { num: 'IV.', key: 'pillar4' },
] as const;

const PLATFORMS = ['web', 'discord', 'extension', 'voice', 'api'] as const;

export default function LotusAI() {
  const t = useTranslations('lotusAi');

  return (
    <section id="ai" className="py-28 md:py-40 bg-[var(--color-ink)] text-[var(--color-paper)] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden md:block pointer-events-none">
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212, 160, 23, 0.18) 0%, transparent 60%)',
              animation: 'softGlow 5s ease-in-out infinite',
            }}
          />
          <Image
            src="/images/lotus/logo-transparent.png"
            alt=""
            fill
            className="object-contain opacity-[0.08]"
            aria-hidden
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="text-[11px] font-tech-mono text-[var(--color-gold)] tracking-[0.25em] uppercase mb-6">
              {t('sectionLabel')}
            </div>
            <h2 className="font-display text-[48px] md:text-[80px] leading-[0.95] text-[var(--color-paper)]">
              {t.rich('heading', {
                italic: (chunks) => (
                  <span className="font-italic-serif text-[var(--color-gold-light)]">{chunks}</span>
                ),
              })}
            </h2>
            <p className="mt-10 text-[17px] md:text-[21px] text-[var(--color-gray-soft)] leading-[1.55]">
              {t.rich('intro', {
                italic: (chunks) => (
                  <span className="font-italic-serif text-[var(--color-paper)]">{chunks}</span>
                ),
                br: () => <br />,
              })}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-px bg-[var(--color-ink-soft)] rounded-3xl overflow-hidden border border-[var(--color-ink-soft)]">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={i * 100}>
              <div className="bg-[var(--color-ink)] p-8 md:p-10 h-full">
                <div className="text-[var(--color-gold)] font-display text-[36px] mb-6 font-light leading-none">
                  {p.num}
                </div>
                <div className="text-[10px] font-tech-mono text-[var(--color-gray-soft)] tracking-[0.25em] uppercase mb-4">
                  {t(`${p.key}.label` as 'pillar1.label')}
                </div>
                <h4 className="font-display text-[22px] text-[var(--color-paper)] mb-4 leading-[1.2]">
                  {t.rich(`${p.key}.title` as 'pillar1.title', {
                    br: () => <br />,
                  })}
                </h4>
                <p className="text-[13px] text-[var(--color-gray-soft)] leading-[1.6]">
                  {t(`${p.key}.text` as 'pillar1.text')}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-14 border-t border-[var(--color-ink-soft)]">
            <div>
              <div className="text-[10px] font-tech-mono text-[var(--color-gray-soft)] tracking-[0.25em] uppercase mb-4">
                {t('launchingOn')}
              </div>
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="px-4 py-2 rounded-full border border-[var(--color-gold)] text-[var(--color-gold-light)] text-[12px] font-tech-mono">
                  {t('telegram')}
                </span>
                <span className="opacity-30 mx-1 text-[12px]">{t('then')}</span>
                {PLATFORMS.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--color-paper)]/[0.06] border border-[var(--color-paper)]/[0.15] text-[var(--color-paper)] text-[12px] font-tech-mono"
                  >
                    {t(`platforms.${p}` as 'platforms.web')}
                  </span>
                ))}
              </div>
            </div>
            
           <a   href="#"
              className="inline-flex items-center gap-2 text-[var(--color-gold-light)] text-[13px] font-tech-mono hover:text-[var(--color-paper)] transition group"
            >
              <span>{t('waitlist')}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}