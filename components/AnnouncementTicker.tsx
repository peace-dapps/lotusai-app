'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AnnouncementTicker() {
  const t = useTranslations('ticker');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const launchDate = new Date('2026-05-10T00:00:00Z').getTime();

    const update = () => {
      const now = Date.now();
      const diff = launchDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="bg-[var(--color-ink)] text-[var(--color-paper)] text-xs border-b border-[var(--color-ink-soft)]">
        <div className="max-w-7xl mx-auto px-6 py-3 h-[42px]" />
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-ink)] text-[var(--color-paper)] text-xs border-b border-[var(--color-ink-soft)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between font-tech-mono">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse shrink-0" />
          <span className="opacity-60 tracking-wider shrink-0">{t('launchLabel')}</span>
          <span className="opacity-30 mx-1.5 shrink-0">·</span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <TimeUnit value={timeLeft.days} label={t('days')} />
            <span className="opacity-30">:</span>
            <TimeUnit value={timeLeft.hours} label={t('hours')} />
            <span className="opacity-30">:</span>
            <TimeUnit value={timeLeft.minutes} label={t('minutes')} />
            <span className="opacity-30 hidden sm:inline">:</span>
            <TimeUnit value={timeLeft.seconds} label={t('seconds')} hideOnMobile />
          </div>
        </div>
        <a href="#" className="opacity-60 hover:opacity-100 hover:text-[var(--color-gold-light)] transition hidden sm:flex items-center gap-1.5">
          <span>{t('whitepaper')}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function TimeUnit({
  value,
  label,
  hideOnMobile = false,
}: {
  value: number;
  label: string;
  hideOnMobile?: boolean;
}) {
  return (
    <span className={`flex items-baseline gap-1 ${hideOnMobile ? 'hidden sm:flex' : ''}`}>
      <span className="font-medium tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="opacity-50 text-[10px] uppercase">{label}</span>
    </span>
  );
}
