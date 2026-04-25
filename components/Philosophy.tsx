'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function useReveal() {
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

  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
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

export default function Philosophy() {
  const t = useTranslations('philosophy');

  const pillars = [
    { num: 'I.', titleKey: 'pillar1Title', textKey: 'pillar1Text' },
    { num: 'II.', titleKey: 'pillar2Title', textKey: 'pillar2Text' },
    { num: 'III.', titleKey: 'pillar3Title', textKey: 'pillar3Text' },
  ] as const;

  return (
    <section id="philosophy" className="py-24 md:py-32 texture-cream border-y border-[var(--color-line)] relative overflow-hidden">
      <Image
        src="/images/lotus/lotus-topdown.png"
        alt=""
        width={400}
        height={400}
        className="absolute -right-20 -top-10 w-80 opacity-[0.06] pointer-events-none hidden md:block"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <Reveal>
              <div className="text-[11px] font-tech-mono text-[var(--color-gray)] tracking-[0.25em] uppercase mb-5">
                {t('sectionLabel')}
              </div>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[40px] md:text-[56px] leading-[1.02] text-[var(--color-ink)]">
                {t.rich('heading', {
                  italic: (chunks) => (
                    <span className="font-italic-serif text-[var(--color-gold-deep)]">{chunks}</span>
                  ),
                  br: () => <br />,
                })}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <Reveal>
              <p className="text-[17px] md:text-[19px] leading-[1.55] text-[var(--color-ink-soft)]">
                {t.rich('intro', {
                  italic: (chunks) => (
                    <span className="font-italic-serif text-[var(--color-gold-deep)] text-[20px]">{chunks}</span>
                  ),
                  br: () => <br className="hidden md:inline" />,
                })}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-t border-[var(--color-line)]">
          {pillars.map((p, i) => (
            <Reveal
              key={p.num}
              delay={i * 150}
              className={`py-14 md:py-16 ${
                i === 0 ? 'md:pr-10 border-b md:border-b-0 md:border-r border-[var(--color-line)]' : ''
              } ${i === 1 ? 'md:px-10 border-b md:border-b-0 md:border-r border-[var(--color-line)]' : ''} ${
                i === 2 ? 'md:pl-10' : ''
              }`}
            >
              <div className="font-display text-[72px] text-[var(--color-gold-deep)] mb-10 font-light leading-none">
                {p.num}
              </div>
              <h3 className="font-display text-[28px] mb-5 leading-[1.15]">{t(p.titleKey)}</h3>
              <p className="text-[var(--color-ink-soft)] leading-[1.7] text-[15px]">{t(p.textKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}