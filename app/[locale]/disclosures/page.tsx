import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import AnnouncementTicker from '@/components/AnnouncementTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DisclosuresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <AnnouncementTicker />
      <Header />
      <DisclosuresContent params={params} />
      <Footer />
    </>
  );
}

function DisclosuresContent({ params }: { params: Promise<{ locale: string }> }) {
  // Set locale for this server-rendered section
  params.then(({ locale }) => setRequestLocale(locale));

  return <DisclosuresMain />;
}

function DisclosuresMain() {
  const t = useTranslations('disclosures');

  const sections = [
    'market',
    'regulatory',
    'technical',
    'execution',
    'utility',
    'noAdvice',
    'noReturn',
    'jurisdictional',
    'forwardLooking',
  ] as const;

  return (
    <main className="texture-paper min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <div className="mb-16">
          <div className="text-[11px] font-tech-mono text-[var(--color-gray)] tracking-[0.25em] uppercase mb-5">
            {t('sectionLabel')}
          </div>
          <h1 className="font-display text-[44px] md:text-[64px] leading-[1.02] mb-8">
            {t.rich('heading', {
              italic: (chunks) => (
                <span className="font-italic-serif text-[var(--color-gold-deep)]">{chunks}</span>
              ),
              br: () => <br />,
            })}
          </h1>
          <p className="text-[17px] md:text-[19px] leading-[1.6] text-[var(--color-ink-soft)]">
            {t('intro')}
          </p>
        </div>

        <div className="space-y-12 border-t border-[var(--color-line)] pt-12">
          {sections.map((key) => (
            <div key={key}>
              <h2 className="font-display text-[22px] md:text-[26px] leading-[1.2] mb-4 text-[var(--color-ink)]">
                {t(`${key}.title` as 'market.title')}
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-[var(--color-ink-soft)]">
                {t(`${key}.text` as 'market.text')}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-[var(--color-line)]">
          <p className="font-italic-serif text-[18px] md:text-[20px] text-[var(--color-gold-deep)] text-center">
            {t('footnote')}
          </p>
        </div>
      </div>
    </main>
  );
}