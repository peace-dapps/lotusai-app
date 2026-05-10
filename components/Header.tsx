'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'es' | 'pt' | 'vi' | 'zh' });
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/80 backdrop-blur-xl border-b border-[var(--color-line-soft)]">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="w-9 h-9 flex items-center justify-center">
            <Image
              src="/images/lotus/logo-transparent.png"
              alt="Lotus"
              width={36}
              height={36}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-[22px] tracking-tight text-[var(--color-ink)]">lotus</span>
            <span className="text-[var(--color-gold)] font-italic-serif text-[22px]">ai</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-[13px]">
          <a href="#philosophy" className="text-[var(--color-ink-soft)] font-medium hover:text-[var(--color-ink)] transition">{t('philosophy')}</a>
          <a href="#token" className="text-[var(--color-ink-soft)] font-medium hover:text-[var(--color-ink)] transition">{t('token')}</a>
          <a href="#utilities" className="text-[var(--color-ink-soft)] font-medium hover:text-[var(--color-ink)] transition">{t('utilities')}</a>
          <a href="#ai" className="text-[var(--color-ink-soft)] font-medium hover:text-[var(--color-ink)] transition">{t('ai')}</a>
          <a href="#roadmap" className="text-[var(--color-ink-soft)] font-medium hover:text-[var(--color-ink)] transition">{t('roadmap')}</a>
          <a href="#team" className="text-[var(--color-ink-soft)] font-medium hover:text-[var(--color-ink)] transition">{t('team')}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div ref={dropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--color-paper-warm)] border border-[var(--color-line-soft)] hover:border-[var(--color-line)] transition text-[13px]"
            >
              <span className="text-[16px] leading-none">{currentLang.flag}</span>
              <span className="font-medium text-[var(--color-ink-soft)]">{currentLang.code.toUpperCase()}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[var(--color-gray)] transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-[var(--color-paper-warm)] border border-[var(--color-line)] rounded-2xl shadow-lg overflow-hidden">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLocale(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] transition hover:bg-[var(--color-cream)] ${
                      lang.code === locale ? 'bg-[var(--color-cream)]' : ''
                    }`}
                  >
                    <span className="text-[16px] leading-none">{lang.flag}</span>
                    <span className="text-[var(--color-ink-soft)] font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          
         <a   href="https://pump.fun/coin/8vwmkLFgZpSFZsqEG5XUzQxZKk1vuxwUFMHUX6PVpump"
"
            className="px-6 py-2.5 text-[13px] font-medium rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-ink-soft)] transition tracking-tight"
          >
            {t('buy')}
          </a>
        </div>
      </div>
    </header>
  );
}
