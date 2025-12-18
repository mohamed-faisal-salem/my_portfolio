
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

const App: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    // Fix: Access VANTA through window as any to resolve property not found error on Window type
    if (!vantaEffect && (window as any).VANTA) {
      setVantaEffect(
        (window as any).VANTA.NET({
          el: vantaRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3b82f6,
          backgroundColor: 0x020617,
          points: 15.0,
          maxDistance: 15.0,
          spacing: 16.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative min-h-screen">
      {/* Vanta Background Layer */}
      <div 
        ref={vantaRef} 
        className="fixed inset-0 -z-10 opacity-40 pointer-events-none"
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-0 space-y-32 py-20 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
