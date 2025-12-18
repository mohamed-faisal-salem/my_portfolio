
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-[80vh] flex flex-col justify-center items-start pt-20">
      <div className="max-w-4xl animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Hi, I'm Mohamed Faisal
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl">
          Aspiring AI Engineer crafting intelligent solutions at the intersection of machine learning and software excellence.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="#projects" 
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold flex items-center gap-2 hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-lg shadow-blue-500/20"
          >
            <i className="fas fa-eye"></i> View Projects
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 rounded-full border border-white/20 text-white font-bold flex items-center gap-2 hover:bg-white/10 hover:border-blue-500 transition-all"
          >
            <i className="fas fa-paper-plane"></i> Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
