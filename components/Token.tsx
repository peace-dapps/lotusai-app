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

export default function Token() {
  const t = useTranslations('token');

  const stats = [
    { labelKey: 'supplyLabel', value: '1B', subKey: 'supplySub', isPercent: false, smaller: false },
    { labelKey: 'feeLabel', value: '1', subKey: 'feeSub', isPercent: true, smaller: false },
    { labelKey: 'allocationLabel', value: '0', subKey: 'allocationSub', isPercent: true, smaller: false },
    { labelKey: 'launchLabel', value: 'Pump.fun', subKey: 'launchSub', isPercent: false, smaller: true },
  ] as const;

  return (
    <section id="token" className="py-24 md:py-32 relative overflow-hidden">
      <Image
        src="/images/lotus/lotus-soft.png"
        alt=""
        width={500}
        height={500}
        className="absolute -right-40 bottom-40 w-96 opacity-[0.05] pointer-events-none hidden md:block"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <div className="text-[11px] font-tech-mono text-[var(--color-gray)] tracking-[0.25em] uppercase mb-5">
              {t('sectionLabel')}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-[40px] md:text-[56px] leading-[1.02]">
              {t.rich('heading', {
                italic: (chunks) => (
                  <span className="font-italic-serif text-[var(--color-gold-deep)]">{chunks}</span>
                ),
                br: () => <br />,
              })}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-[17px] md:text-[19px] text-[var(--color-ink-soft)] leading-[1.6]">
              {t('intro')}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 border-t border-[var(--color-line)] pt-14">
          {stats.map((s, i) => (
            <Reveal key={s.labelKey} delay={i * 100}>
              <div className="text-[10px] font-tech-mono text-[var(--color-gray)] tracking-[0.25em] uppercase mb-4">
                {t(s.labelKey)}
              </div>
              <div
                className={`font-display ${s.smaller ? 'text-[44px] md:text-[52px] mt-2' : 'text-[56px] md:text-[64px]'} text-[var(--color-ink)] leading-none`}
                style={{ fontVariationSettings: '"opsz" 144', letterSpacing: '-0.035em' }}
              >
                {s.value}
                {s.isPercent && <span className="text-[var(--color-gold-deep)]">%</span>}
              </div>
              <div className="mt-3 text-[13px] text-[var(--color-gray)]">{t(s.subKey)}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28">
          <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: '480px' }}>
            <Image
              src="/images/lotus/lotus-atmospheric.webp"
              alt=""
              fill
              className="object-cover"
              aria-hidden
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(12,11,8,0.92) 0%, rgba(12,11,8,0.78) 50%, rgba(12,11,8,0.42) 100%)' }} />

            <div className="relative z-10 p-10 md:p-16 lg:p-20 text-[var(--color-paper)] max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold-light)] text-[10px] font-tech-mono tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                {t('callout.label')}
              </div>
              <h3 className="font-display text-[32px] md:text-[48px] leading-[1.05] mb-6">
                {t.rich('callout.heading', {
                  italic: (chunks) => (
                    <span className="font-italic-serif text-[var(--color-gold-light)]">{chunks}</span>
                  ),
                  br: () => <br />,
                })}
              </h3>
              <p className="text-[var(--color-gray-soft)] leading-[1.65] text-[16px] md:text-[18px] mb-8">
                {t('callout.text')}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-[14px] font-tech-mono text-[var(--color-gold-light)] hover:text-[var(--color-paper)] transition">
                <span>{t('callout.cta')}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}