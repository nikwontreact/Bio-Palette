'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BackToTop } from '@/components/BackToTop';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CustomCursor } from '@/components/CustomCursor';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  return (
    <>
      <LoadingScreen />
      {isDesktop && <CustomCursor />}
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <FloatingActionButton />
        <BackToTop />
      </div>
    </>
  );
}
