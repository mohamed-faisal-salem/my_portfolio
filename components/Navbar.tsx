
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-2">
        <i className="fas fa-code text-blue-500 text-2xl"></i>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Mohamed Faisal
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors relative group"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-slate-300 text-2xl focus:outline-none"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-0 top-16 bg-slate-950/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold text-slate-100 hover:text-blue-400"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
