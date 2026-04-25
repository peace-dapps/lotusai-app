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

const TEAM = [
  { key: 'andrew', name: 'Andrew Tran', handle: '@XcryptoAndrew', url: 'https://x.com/XcryptoAndrew' },
  { key: 'peace', name: 'Peace Onchain', handle: '@peace_onchain', url: 'https://x.com/peace_onchain' },
  { key: 'rabb', name: 'Rabb.sol', handle: '@rabb_dot_sol', url: 'https://x.com/rabb_dot_sol' },
] as const;

export default function Team() {
  const t = useTranslations('team');

  return (
    <section id="team" className="py-24 md:py-32 texture-cream border-y border-[var(--color-line)] relative overflow-hidden">
      <Image
        src="/images/lotus/lotus-topdown.png"
        alt=""
        width={400}
        height={400}
        className="absolute -right-32 bottom-20 w-96 opacity-[0.05] pointer-events-none hidden md:block"
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
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-5">
          {TEAM.map((m, i) => (
            <Reveal key={m.key} delay={i * 100}>
              <div className="bg-[var(--color-paper)] rounded-3xl p-8 md:p-10 border border-[var(--color-line)] hover:border-[var(--color-gold)] transition-all duration-500 h-full group relative overflow-hidden">
                <div className="absolute top-6 right-6 w-10 h-10 opacity-10 group-hover:opacity-20 transition">
                  <Image
                    src="/images/lotus/logo-transparent.png"
                    alt=""
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    aria-hidden
                  />
                </div>
                <div className="text-[10px] font-tech-mono text-[var(--color-gold-deep)] tracking-[0.25em] uppercase mb-8">
                  {t(`${m.key}.role` as 'andrew.role')}
                </div>
                <h3 className="font-display text-[26px] mb-1">{m.name}</h3>
                
                <a  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[13px] font-tech-mono text-[var(--color-gray)] hover:text-[var(--color-ink)] transition mb-6"
                >
                  {m.handle}
                </a>
                <p className="text-[14px] text-[var(--color-ink-soft)] leading-[1.6]">
                  {t(`${m.key}.bio` as 'andrew.bio')}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}