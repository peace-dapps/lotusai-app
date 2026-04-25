import AnnouncementTicker from '@/components/AnnouncementTicker';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuietInterlude from '@/components/QuietInterlude';
import Philosophy from '@/components/Philosophy';
import Token from '@/components/Token';
import Utilities from '@/components/Utilities';
import LotusAI from '@/components/LotusAI';
import Roadmap from '@/components/Roadmap';
import Team from '@/components/Team';
import Closing from '@/components/Closing';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <AnnouncementTicker />
      <Header />
      <Hero />
      <QuietInterlude />
      <Philosophy />
      <Token />
      <Utilities />
      <LotusAI />
      <Roadmap />
      <Team />
      <Closing />
      <Footer />
    </>
  );
}