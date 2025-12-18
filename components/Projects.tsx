import React from 'react';
import { Project } from '../types';

const ProjectCard: React.FC<Project> = (project) => (
  <div className="glass rounded-3xl overflow-hidden group flex flex-col h-full border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
    {/* Project Header with Icon */}
    <div 
      className={`h-48 flex items-center justify-center text-white text-5xl`}
      style={{ background: project.gradient }}
    >
      <i className={project.icon}></i>
    </div>
    
    <div className="p-8 flex flex-col flex-grow">
      {/* Title and Subtitle */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        {project.subtitle && (
          <p className="text-blue-400 font-semibold text-sm flex items-center gap-2">
            <i className={project.subtitleIcon}></i> {project.subtitle}
          </p>
        )}
      </div>
      
      {/* Description */}
      <p className="text-slate-400 leading-relaxed mb-6 flex-grow">{project.description}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map(tag => (
          <span 
            key={tag} 
            className="px-3 py-1 rounded-full bg-blue-500/5 text-blue-400 text-xs font-bold border border-blue-500/10 hover:bg-blue-500/10 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4 mt-auto">
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-center font-bold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-external-link-alt"></i> Live Demo
          </a>
        )}
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-slate-800 border border-white/5 text-center font-bold text-sm hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <i className="fab fa-github"></i> View Code
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Telawat - Quran Recitation App',
      description: 'A production-ready Android application featuring 200+ Quran reciters with online streaming and offline download capabilities. Implemented user following system, intelligent caching, and a polished Material Design UI.',
      tags: ['Java', 'Android Studio', 'Firebase', 'Material Design', 'API Integration'],
      link: 'https://play.google.com/store/apps/details?id=com.aap.quraankareem',
      github: 'https://github.com/mohamed-faisal-salem/Telawat.git',
      icon: 'fas fa-mobile-alt',
      gradient: 'linear-gradient(135deg, #10b981, #3b82f6)'
    },
    {
      id: '2',
      title: 'Baby Photoshop',
      description: 'A comprehensive C++ image processing application implementing 12+ advanced filters including edge detection, blur, and merging. Features modular architecture, professional UI design, and robust file handling for multiple image formats.',
      tags: ['C++', 'Object-Oriented Design', 'Image Processing', 'Git Collaboration', 'Algorithms'],
      github: 'https://github.com/mohamed-faisal-salem/CS213-OOP-Programming-Assignment1.git',
      icon: 'fas fa-image',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
    },
    {
      id: '3',
      title: 'Tic-Tac-Toe Game Framework',
      description: 'An extensible Tic-Tac-Toe game framework featuring 13 variants with computer opponents. Implemented the Minimax algorithm for intelligent AI moves.',
      tags: ['C++', 'Artificial Intelligence', 'Game Development', 'Minimax Algorithm', 'Design Patterns'],
      github: 'https://github.com/mohamed-faisal-salem/CS213-OOP-Programming-Assignment3.git',
      icon: 'fas fa-gamepad',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
    },
    {
      id: '4',
      title: 'Audio Player',
      description: 'A feature-rich audio player built with JUCE framework. Includes playlist management, real-time waveform visualization, A-B looping, and audio effects processing. Demonstrates advanced OOP principles and professional UI/UX design.',
      tags: ['C++', 'JUCE Framework', 'Audio Processing', 'GUI Development', 'Multithreading'],
      github: 'https://github.com/mohamed-faisal-salem/CS213-OOP-Programming-Assignment2.git',
      icon: 'fas fa-music',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    }
  ];

  // تقسيم المشاريع إلى صفين: الأول يحتوي على 3 مشاريع والثاني يحتوي على 1 مشروع
  const firstRowProjects = projects.slice(0, 3); // أول 3 مشاريع
  const secondRowProjects = projects.slice(3); // المشروع الرابع

  return (
    <section id="projects" className="scroll-mt-24 pt-[0rem] pb-[12rem]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 relative inline-block">
          Featured Projects
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
        </h2>
        
        
        {/* الصف الأول: 3 مشاريع جنب بعض */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {firstRowProjects.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
        
        {/* الصف الثاني: مشروع واحد فقط في المنتصف */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
  {secondRowProjects.map(p => <ProjectCard key={p.id} {...p} />)}
</div>

      </div>
    </section>
  );
};

export default Projects;