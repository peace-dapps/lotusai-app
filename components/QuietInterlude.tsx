'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function QuietInterlude() {
  const t = useTranslations('interlude');
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
    <section className="py-32 md:py-48 relative overflow-hidden">
      <Image
        src="/images/lotus/lotus-soft.png"
        alt=""
        width={500}
        height={500}
        className="absolute -left-40 top-20 w-96 opacity-[0.07] pointer-events-none hidden md:block"
        aria-hidden
      />

      <div
        ref={ref}
        className="max-w-4xl mx-auto px-6 relative z-10 transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="text-center mb-14 text-[var(--color-gold)] tracking-[1.2em] text-[9px]">
          ◆ ◆ ◆
        </div>

        <p className="font-display text-[28px] md:text-[42px] leading-[1.3] text-[var(--color-ink-soft)] text-center">
          {t.rich('passage', {
            italic: (chunks) => (
              <span className="font-italic-serif text-[var(--color-gold-deep)]">{chunks}</span>
            ),
            italicPlain: (chunks) => (
              <span className="font-italic-serif">{chunks}</span>
            ),
            br: () => <br />,
          })}
        </p>

        <div className="mt-14 text-center text-[11px] font-tech-mono text-[var(--color-gray)] tracking-[0.25em] uppercase">
          {t('attribution')}
        </div>
      </div>
    </section>
  );
}