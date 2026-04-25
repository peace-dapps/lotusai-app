import type { Metadata } from 'next';
import { Fraunces, Instrument_Serif, JetBrains_Mono, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '$LOTUS — The deeper the mud, the higher the lotus blooms',
  description:
    'A Solana memecoin of composed resilience. Built for traders who know that calm is a competitive edge.',
  metadataBase: new URL('https://lotusai.app'),
  openGraph: {
    title: '$LOTUS — The deeper the mud, the higher the lotus blooms',
    description: 'A Solana memecoin of composed resilience.',
    url: 'https://lotusai.app',
    siteName: '$LOTUS',
    images: [
      {
        url: '/images/lotus/logo-transparent.png',
        width: 1200,
        height: 630,
        alt: '$LOTUS',
      },
    ],
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}