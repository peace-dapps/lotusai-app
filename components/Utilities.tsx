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

const UTILITIES = [
  { num: '01', key: 'lotusAi', status: 'flagship', tagKeys: ['tag1', 'tag2', 'tag3', 'tag4'] },
  { num: '02', key: 'treasury', status: 'live', tagKeys: ['tag1', 'tag2', 'tag3'] },
  { num: '03', key: 'staking', status: 'phase2', tagKeys: ['tag1', 'tag2', 'tag3'] },
  { num: '04', key: 'council', status: 'phase3', tagKeys: ['tag1', 'tag2', 'tag3'] },
  { num: '05', key: 'nfts', status: 'phase2', tagKeys: ['tag1', 'tag2', 'tag3'] },
  { num: '06', key: 'bazaar', status: 'phase23', tagKeys: ['tag1', 'tag2', 'tag3'] },
] as const;

export default function Utilities() {
  const t = useTranslations('utilities');

  const statusClass = (status: string) => {
    if (status === 'live' || status === 'flagship') {
      return 'bg-[var(--color-gold)]/12 text-[var(--color-gold-deep)]';
    }
    return 'bg-[var(--color-ink)]/[0.06] text-[var(--color-ink-soft)]';
  };

  return (
    <section id="utilities" className="py-24 md:py-32 texture-cream border-y border-[var(--color-line)] relative overflow-hidden">
      <Image
        src="/images/lotus/lotus-topdown.png"
        alt=""
        width={400}
        height={400}
        className="absolute -left-32 top-40 w-80 opacity-[0.05] pointer-events-none hidden md:block"
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
              <h2 className="font-display text-[40px] md:text-[56px] leading-[1.02]">
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
              <p className="text-[17px] md:text-[19px] text-[var(--color-ink-soft)] leading-[1.6]">
                {t('intro')}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[var(--color-line)] rounded-3xl overflow-hidden border border-[var(--color-line)]">
          {UTILITIES.map((u, i) => (
            <Reveal key={u.num} delay={i * 100}>
              <div className="bg-[var(--color-paper)] p-10 md:p-12 h-full transition-all duration-500 hover:-translate-y-1 group">
                <div className="flex items-start justify-between mb-8">
                  <div className="font-display text-[56px] text-[var(--color-gray-soft)] leading-none group-hover:text-[var(--color-gold-deep)] transition-colors duration-500">
                    {u.num}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-tech-mono tracking-[0.15em] uppercase ${statusClass(u.status)}`}
                  >
                    {t(`${u.key}.status` as 'lotusAi.status')}
                  </span>
                </div>
                <h3 className="font-display text-[30px] mb-4 leading-[1.1]">
                  {t(`${u.key}.title` as 'lotusAi.title')}
                </h3>
                <p className="text-[var(--color-ink-soft)] leading-[1.65] mb-6 text-[15px]">
                  {t(`${u.key}.text` as 'lotusAi.text')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {u.tagKeys.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="inline-block px-3 py-1.5 rounded-full bg-[var(--color-paper-warm)] border border-[var(--color-line)] text-[11px] text-[var(--color-ink-soft)]"
                    >
                      {t(`${u.key}.${tagKey}` as 'lotusAi.tag1')}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}