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

const PHASES = [
  { num: '1', key: 'seed', image: '/images/lotus/lotus-leaf.png', active: true, finalPhase: false },
  { num: '2', key: 'bud', image: '/images/lotus/lotus-pink.png', active: false, finalPhase: false },
  { num: '3', key: 'bloom', image: '/images/lotus/lotus-hero.png', active: false, finalPhase: false },
  { num: '4', key: 'fullBloom', image: '/images/lotus/logo-transparent.png', active: false, finalPhase: true },
] as const;

export default function Roadmap() {
  const t = useTranslations('roadmap');

  return (
    <section id="roadmap" className="py-24 md:py-32 texture-paper relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
          {PHASES.map((p, i) => (
            <Reveal key={p.num} delay={i * 100}>
              <div className="bg-[var(--color-cream)] rounded-3xl p-7 md:p-8 border border-[var(--color-line)] h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5 group">
                {p.finalPhase && (
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at top right, rgba(212, 160, 23, 0.2) 0%, transparent 60%)',
                    }}
                  />
                )}

                <div className="relative h-48 md:h-52 mb-7 flex items-center justify-center bg-[var(--color-paper)] rounded-2xl overflow-hidden">
                  <Image
                    src={p.image}
                    alt={t(`${p.key}.title` as 'seed.title')}
                    width={300}
                    height={300}
                    className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full relative ${p.active ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-line)]'}`}>
                    {p.active && (
                      <span
                        className="absolute -inset-1 rounded-full border border-[var(--color-gold)]"
                        style={{ animation: 'softGlow 3s ease-in-out infinite' }}
                      />
                    )}
                  </div>
                  <div className="text-[10px] font-tech-mono text-[var(--color-gold-deep)] tracking-[0.25em] uppercase">
                    {t(`${p.key}.phase` as 'seed.phase')}
                  </div>
                </div>

                <h3 className="font-display text-[30px] mb-2 leading-none">
                  {t(`${p.key}.title` as 'seed.title')}
                </h3>
                <div className="text-[12px] font-tech-mono text-[var(--color-gray)] tracking-wider mb-5 uppercase">
                  {t(`${p.key}.timeframe` as 'seed.timeframe')}
                </div>
                <p className="text-[13px] text-[var(--color-ink-soft)] leading-[1.6] mb-5 flex-grow">
                  {t(`${p.key}.description` as 'seed.description')}
                </p>

                <ul className="space-y-1.5 text-[12px] text-[var(--color-gray)]">
                  <li className="flex gap-2"><span className="text-[var(--color-gold)] shrink-0">◆</span><span>{t(`${p.key}.milestone1` as 'seed.milestone1')}</span></li>
                  <li className="flex gap-2"><span className="text-[var(--color-gold)] shrink-0">◆</span><span>{t(`${p.key}.milestone2` as 'seed.milestone2')}</span></li>
                  <li className="flex gap-2"><span className="text-[var(--color-gold)] shrink-0">◆</span><span>{t(`${p.key}.milestone3` as 'seed.milestone3')}</span></li>
                  <li className="flex gap-2"><span className="text-[var(--color-gold)] shrink-0">◆</span><span>{t(`${p.key}.milestone4` as 'seed.milestone4')}</span></li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="text-center">
            <p className="font-italic-serif text-[22px] md:text-[26px] text-[var(--color-gold-deep)]">
              {t('beyondQuote')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}