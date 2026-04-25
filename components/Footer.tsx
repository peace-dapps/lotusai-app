'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const LANGUAGES = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'pt', flag: '🇧🇷' },
  { code: 'vi', flag: '🇻🇳' },
  { code: 'zh', flag: '🇨🇳' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'es' | 'pt' | 'vi' | 'zh' });
  };

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] pt-24 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <Image
          src="/images/lotus/lotus-atmospheric.webp"
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 pb-16 border-b border-[var(--color-ink-soft)]">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/images/lotus/logo-transparent.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-[22px] text-[var(--color-paper)]">lotus</span>
                <span className="text-[var(--color-gold)] font-italic-serif text-[22px]">ai</span>
              </div>
            </div>
            <p className="text-[var(--color-gray-soft)] text-[14px] max-w-sm leading-[1.7]">
              {t('tagline')}
            </p>

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--color-paper)]/[0.06] border border-[var(--color-paper)]/[0.15] text-[12px] font-tech-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span className="opacity-60 tracking-wider">{t('contractLabel')}</span>
                <span className="select-all">{t('contractValue')}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10px] font-tech-mono text-[var(--color-gray-soft)] tracking-[0.25em] uppercase mb-5">
              {t('explore')}
            </div>
            <ul className="space-y-3 text-[13px]">
              <li><a href="#philosophy" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">{t('links.philosophy')}</a></li>
              <li><a href="#token" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">{t('links.token')}</a></li>
              <li><a href="#utilities" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">{t('links.utilities')}</a></li>
              <li><a href="#ai" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">{t('links.ai')}</a></li>
              <li><a href="#roadmap" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">{t('links.roadmap')}</a></li>
              <li><a href="#team" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">{t('links.team')}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
  <div className="text-[10px] font-tech-mono text-[var(--color-gray-soft)] tracking-[0.25em] uppercase mb-5">
    {t('documents')}
  </div>
  <ul className="space-y-3 text-[13px]">
    <li>
      
      <a  href="/docs/lotus-whitepaper.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition"
      >
        {t('links.whitepaper')}
      </a>
    </li>
    <li>
      <span className="text-[var(--color-paper)]/35 cursor-not-allowed inline-flex items-center gap-2">
        {t('links.brandKit')}
        <span className="text-[9px] font-tech-mono uppercase tracking-wider opacity-70">
          {t('comingSoon')}
        </span>
      </span>
    </li>
    <li>
      <span className="text-[var(--color-paper)]/35 cursor-not-allowed inline-flex items-center gap-2">
        {t('links.treasury')}
        <span className="text-[9px] font-tech-mono uppercase tracking-wider opacity-70">
          {t('comingSoon')}
        </span>
      </span>
    </li>
    <li>
      
      <a  href={`/disclosures`}
        className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition"
      >
        {t('links.disclosures')}
      </a>
    </li>
  </ul>
</div>

          <div className="md:col-span-3">
            <div className="text-[10px] font-tech-mono text-[var(--color-gray-soft)] tracking-[0.25em] uppercase mb-5">
              {t('community')}
            </div>
            <ul className="space-y-3 text-[13px]">
              <li><a href="https://x.com/lotusai_app" target="_blank" rel="noopener noreferrer" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">X · @lotusai_app</a></li>
              <li><a href="https://t.me/lotusai_app" target="_blank" rel="noopener noreferrer" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">Telegram · t.me/lotusai_app</a></li>
              <li><a href="https://discord.gg/Z43wGz6yT" target="_blank" rel="noopener noreferrer" className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-light)] transition">Discord · {t('links.joinGarden')}</a></li>
            </ul>

            <div className="mt-8">
              <div className="text-[10px] font-tech-mono text-[var(--color-gray-soft)] tracking-[0.25em] uppercase mb-3">
                {t('language')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => changeLocale(l.code)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition text-[16px] leading-none ${
                      l.code === locale ? 'bg-[var(--color-paper)]' : 'bg-[var(--color-ink-soft)] hover:bg-[var(--color-paper)]'
                    }`}
                  >
                    {l.flag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-tech-mono text-[var(--color-gray-soft)]">
          <div className="tracking-wider">{t('copyright')}</div>
          <div className="font-italic-serif text-[var(--color-gold-light)] text-[14px]" style={{ fontStyle: 'italic' }}>
            {t('mantra')}
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[var(--color-paper)] transition">{t('legal.terms')}</a>
            <a href="#" className="hover:text-[var(--color-paper)] transition">{t('legal.privacy')}</a>
            <a href="#" className="hover:text-[var(--color-paper)] transition">{t('legal.risks')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}