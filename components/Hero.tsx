'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative texture-paper overflow-hidden">
      <Image
        src="/images/lotus/lotus-pink.png"
        alt=""
        width={400}
        height={400}
        className="absolute top-20 -right-10 w-72 opacity-[0.06] pointer-events-none hidden md:block"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-32 pb-24 md:pb-40 relative z-10">
        <div className="flex items-center gap-3 text-[11px] font-tech-mono text-[var(--color-gray)] mb-16" style={{ animation: 'rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
          <span className="w-6 h-px bg-[var(--color-gold)]" />
          <span className="tracking-[0.25em] uppercase">{t('meta')}</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <h1
              className="font-display text-[clamp(2.8rem,7.5vw,6.5rem)] leading-[0.95] text-[var(--color-ink)]"
              style={{ animation: 'gentleBloom 1.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}
            >
              {t.rich('title', {
                italic: (chunks) => (
                  <span className="font-italic-serif text-[var(--color-gold-deep)]">{chunks}</span>
                ),
                br: () => <br />,
              })}
            </h1>

            <p
              className="mt-10 text-[17px] md:text-[19px] leading-[1.6] text-[var(--color-gray)] max-w-xl"
              style={{ animation: 'rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}
            >
              {t('description')}
            </p>

            <div
              className="mt-12 flex flex-col sm:flex-row gap-3"
              style={{ animation: 'rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}
            >
              
             <a   href="#"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] text-[14px] font-medium hover:bg-[var(--color-ink-soft)] transition-all duration-500"
              >
                {t('buyButton')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              
            <a    href="#"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[var(--color-line)] bg-[var(--color-paper-warm)] text-[var(--color-ink)] text-[14px] font-medium hover:border-[var(--color-ink)] transition-all duration-500"
              >
                {t('whitepaperButton')}
              </a>
            </div>

            <div className="mt-14" style={{ animation: 'rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--color-paper-warm)] border border-[var(--color-line)] text-[12px] font-tech-mono text-[var(--color-ink-soft)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span className="opacity-60 tracking-wider">{t('contractLabel')}</span>
                <span className="select-all">{t('contractValue')}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 order-1 md:order-2 relative flex justify-center" style={{ animation: 'gentleBloom 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}>
            <div
              className="relative"
              style={{ animation: 'gentleFloat 6s ease-in-out infinite' }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212, 160, 23, 0.22) 0%, rgba(212, 160, 23, 0.08) 35%, transparent 65%)',
                  animation: 'softGlow 6s ease-in-out infinite',
                }}
              />
              <Image
                src="/images/lotus/logo-transparent.png"
                alt="The $LOTUS"
                width={460}
                height={460}
                className="relative z-10 w-[280px] md:w-[460px] max-w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />
    </section>
  );
}