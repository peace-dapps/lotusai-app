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

export default function Closing() {
  const t = useTranslations('closing');

  return (
    <section className="py-32 md:py-48 relative overflow-hidden texture-paper">
      <Image
        src="/images/lotus/lotus-soft.png"
        alt=""
        width={900}
        height={900}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-none pointer-events-none hidden md:block opacity-[0.07]"
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <div className="mb-12 text-[var(--color-gold)] tracking-[1.2em] text-[9px]">
            ◆ ◆ ◆
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-[44px] md:text-[80px] leading-[0.95] mb-12">
            {t.rich('heading', {
              italic: (chunks) => (
                <span className="font-italic-serif text-[var(--color-gold-deep)]">{chunks}</span>
              ),
              br: () => <br />,
            })}
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            
            <a  href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-[14px] font-medium hover:bg-[var(--color-ink-soft)] transition-all duration-500"
            >
              {t('buyButton')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            
            <a  href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[var(--color-line)] bg-[var(--color-paper-warm)] text-[var(--color-ink)] text-[14px] font-medium hover:border-[var(--color-ink)] transition-all duration-500"
            >
              {t('joinButton')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-20 text-[11px] font-tech-mono text-[var(--color-gray)] tracking-[0.3em] uppercase">
            {t('footer')}
          </div>
        </Reveal>
      </div>
    </section>
  );
}