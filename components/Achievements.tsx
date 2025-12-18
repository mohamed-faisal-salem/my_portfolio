import React, { useEffect, useRef } from 'react';
import { Achievement } from '../types';

const AchievementCard: React.FC<Achievement> = (achievement) => (
  <div className={`glass p-8 rounded-2xl border-l-4 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col h-full`} style={{ borderLeftColor: achievement.gradient.split(' ')[1] }}>
    <div className="flex justify-between items-start mb-6">
      <div className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-yellow-500 to-orange-600">
        {achievement.rank}
      </div>
      <div className="text-blue-400 text-sm flex items-center gap-1">
        <i className="fab fa-kaggle"></i> Kaggle
      </div>
    </div>
    <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-2xl mb-4">
      <i className={achievement.icon}></i>
    </div>
    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
    <p className="text-slate-400 text-sm mb-6 flex-grow">{achievement.description}</p>
    <div className="flex flex-wrap gap-2 mb-6">
      {achievement.skills.map(skill => (
        <span key={skill} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-medium text-slate-300 border border-white/5">
          {skill}
        </span>
      ))}
    </div>
    <a href={achievement.link} target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2">
      View Competition <i className="fas fa-arrow-right"></i>
    </a>
  </div>
);

const Achievements: React.FC = () => {
  const statsSectionRef = useRef<HTMLDivElement>(null);
  
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'House Prices Competition',
      badge: 'Expert',
      rank: 'Top 4% Globally',
      platform: 'Kaggle',
      description: 'Applied advanced regression and feature engineering to predict residential home prices with exceptional accuracy.',
      skills: ['Regression', 'XGBoost', 'Feature Engineering'],
      link: 'https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques',
      icon: 'fas fa-home',
      gradient: 'linear-gradient(to right, #f59e0b, #d97706)'
    },
    {
      id: '2',
      title: 'Titanic ML Competition',
      badge: 'Contributor',
      rank: 'Top 25% Globally',
      platform: 'Kaggle',
      description: 'Implemented classification algorithms to predict passenger survival, developing strong preprocessing skills.',
      skills: ['Classification', 'Random Forest', 'Data Preprocessing'],
      link: 'https://www.kaggle.com/competitions/titanic',
      icon: 'fas fa-ship',
      gradient: 'linear-gradient(to right, #8b5cf6, #7c3aed)'
    }
  ];

  // Animation for counter stats
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 1800;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toString();
            clearInterval(timer);

            // حفظ الـ fontSize و fontWeight
            const currentColor = window.getComputedStyle(counter).color;
            const fontSize = window.getComputedStyle(counter).fontSize;
            const fontWeight = window.getComputedStyle(counter).fontWeight;

            counter.setAttribute(
              'style',
              `color: ${currentColor}; font-size: ${fontSize}; font-weight: ${fontWeight}; text-shadow: 0 0 20px ${currentColor};`
            );

            setTimeout(() => {
              counter.setAttribute(
                'style',
                `color: ${currentColor}; font-size: ${fontSize}; font-weight: ${fontWeight}; text-shadow: none;`
              );
            }, 200);
          }
          else {
            counter.textContent = Math.floor(current).toString();
          }
        }, 16);
      });
    };

    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Hover effects
  useEffect(() => {
    const statCards = document.querySelectorAll('.stat-card');
    const profileLinks = document.querySelectorAll('.profile-link');
    
    const handleCardMouseEnter = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    };
    
    const handleCardMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    };
    
    const handleLinkMouseEnter = (e: Event) => {
      const link = e.currentTarget as HTMLElement;
      const color = window.getComputedStyle(link).color;
      link.style.background = color.replace(')', ', 0.2)').replace('rgb', 'rgba');
      link.style.transform = 'translateY(-2px)';
    };
    
    const handleLinkMouseLeave = (e: Event) => {
      const link = e.currentTarget as HTMLElement;
      link.style.background = '';
      link.style.transform = 'translateY(0)';
    };
    
    statCards.forEach(card => {
      card.addEventListener('mouseenter', handleCardMouseEnter);
      card.addEventListener('mouseleave', handleCardMouseLeave);
    });
    
    profileLinks.forEach(link => {
      link.addEventListener('mouseenter', handleLinkMouseEnter);
      link.addEventListener('mouseleave', handleLinkMouseLeave);
    });
    
    return () => {
      statCards.forEach(card => {
        card.removeEventListener('mouseenter', handleCardMouseEnter);
        card.removeEventListener('mouseleave', handleCardMouseLeave);
      });
      
      profileLinks.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkMouseEnter);
        link.removeEventListener('mouseleave', handleLinkMouseLeave);
      });
    };
  }, []);

  return (
    <section id="achievements" className="scroll-mt-24 pt-[0rem] pb-[12rem] relative">
      <style jsx>{`
        #achievements {
          position: relative;
        }
        
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .achievement-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          border-radius: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        
        .achievement-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary, #3b82f6), var(--secondary, #8b5cf6));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .achievement-card:hover::before {
          opacity: 1;
        }
        
        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .achievement-featured {
          border: 2px solid transparent;
          background: linear-gradient(var(--glass, rgba(15, 23, 42, 0.7)), var(--glass, rgba(15, 23, 42, 0.7))), 
                      linear-gradient(135deg, var(--primary, #3b82f6), var(--secondary, #8b5cf6));
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }
        
        .achievement-badge {
          position: relative;
          overflow: hidden;
        }
        
        .achievement-badge::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        .stat-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .profile-link {
          margin-top: auto;
        }
        
        .stat-card:hover {
          transform: translateY(-3px);
          background: rgba(59, 130, 246, 0.05);
        }
        
        .stat-icon {
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover .stat-icon {
          transform: scale(1.1);
        }
        
        .ranking-progress {
          margin: 1.5rem 0;
        }
        
        .progress-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease-in-out;
        }
        
        .progress-bar.house-prices {
          background: linear-gradient(90deg, #f59e0b, #d97706);
        }
        
        .progress-bar.titanic {
          background: linear-gradient(90deg, #8b5cf6, #7c3aed);
        }
        
        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }
        
        @media (max-width: 768px) {
          .achievements-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            align-items: stretch;
          }
          
          .achievement-card {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .achievement-card {
            padding: 1rem;
          }
          
          .achievement-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="achievements-container">
        <h2 className="text-4xl font-bold mb-12 relative inline-block">
          Achievements
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
        </h2>
        
        {/* Achievement Stats Section */}
        <div 
          ref={statsSectionRef}
          className="achievement-stats glass mb-12"
          style={{
            padding: '2rem',
            borderRadius: '18px',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}
        >
          <div className="stats-header text-center mb-10">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Technical Skills Overview
            </h3>
          </div>
          
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Codeforces Card */}
            <div className="stat-card" style={{
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '1.8rem',
              borderRadius: '14px',
              border: '1px solid rgba(31, 138, 203, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-header flex items-center gap-4 mb-6">
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #1F8ACB, #0D6EFD)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-chart-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Codeforces</h4>
                  <p className="text-sm opacity-70 text-blue-400">Competitive Programming</p>
                </div>
              </div>
              
              <div className="main-stat text-center mb-6">
                <div className="stat-number" data-target="913" style={{
                  fontSize: '2.8rem',
                  fontWeight: '800',
                  color: '#1F8ACB',
                  marginBottom: '0.5rem'
                }}>0</div>
                <div className="stat-label text-lg opacity-90">Contest Rating</div>
              </div>
              
              <div className="stat-details mb-6">
                <div className="flex justify-between mb-3">
                  <span className="opacity-70">Progress Level:</span>
                  <span className="text-yellow-400 font-semibold">Newbie</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="opacity-70">Contests Participated:</span>
                  <span className="text-green-400 font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Problems Solved:</span>
                  <span className="text-blue-400 font-semibold">63</span>
                </div>
              </div>
              
              <a 
                href="https://codeforces.com/profile/mohamedfaisal1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all"
                style={{
                  background: 'rgba(31, 138, 203, 0.1)',
                  border: '1px solid rgba(31, 138, 203, 0.3)',
                  color: '#1F8ACB',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                <i className="fas fa-external-link-alt"></i>
                Verify Profile
              </a>
            </div>
            
            {/* LeetCode Card */}
            <div className="stat-card" style={{
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '1.8rem',
              borderRadius: '14px',
              border: '1px solid rgba(255, 161, 22, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-header flex items-center gap-4 mb-6">
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #FFA116, #F59E0B)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-code text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">LeetCode</h4>
                  <p className="text-sm opacity-70 text-yellow-400">Active Problem Solver</p>
                </div>
              </div>
              
              <div className="main-stat text-center mb-6">
                <div className="stat-number" data-target="8" style={{
                  fontSize: '2.8rem',
                  fontWeight: '800',
                  color: '#FFA116',
                  marginBottom: '0.5rem',
                  minWidth: '3ch',     // <--- ده مهم عشان مساحة الرقم ثابتة
                  textAlign: 'center'
                }}>0</div>
                <div className="stat-label text-lg opacity-90">Problems Solved</div>
              </div>
              
              <div className="difficulty-breakdown mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-teal-400">Easy</span>
                  <span className="text-teal-400 font-semibold">5</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-yellow-400">Medium</span>
                  <span className="text-yellow-400 font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-red-400">Hard</span>
                  <span className="text-red-400 font-semibold">1</span>
                </div>
              </div>
              
              <a 
                href="https://leetcode.com/u/mohamedfaisal06/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all"
                style={{
                  background: 'rgba(255, 161, 22, 0.1)',
                  border: '1px solid rgba(255, 161, 22, 0.3)',
                  color: '#FFA116',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                <i className="fas fa-external-link-alt"></i>
                Verify Profile
              </a>
            </div>
            
            {/* GitHub Card */}
            <div className="stat-card" style={{
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '1.8rem',
              borderRadius: '14px',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div className="card-header flex items-center gap-4 mb-6">
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #EC4899, #DB2777)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fab fa-github text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">GitHub</h4>
                  <p className="text-sm opacity-70 text-pink-400">Active Contributor</p>
                </div>
              </div>
              
              <div className="stats-grid-mini grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                  <div className="text-2xl font-bold text-purple-400 mb-1">105</div>
                  <div className="text-sm opacity-80">Total Commits</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <div className="text-2xl font-bold text-green-400 mb-1">7</div>
                  <div className="text-sm opacity-80">Repositories</div>
                </div>
              </div>
              
              <div className="project-details mb-6">
                <div className="flex justify-between mb-3">
                  <span className="opacity-70">Primary Language:</span>
                  <span className="text-blue-400 font-semibold">C++, Python, Java</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Project Types:</span>
                  <span className="text-green-400 font-semibold">AI & Android Apps</span>
                </div>
              </div>
              
              <a 
                href="https://github.com/mohamed-faisal-salem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all"
                style={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  color: '#EC4899',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                <i className="fas fa-external-link-alt"></i>
                View Portfolio
              </a>
            </div>
          </div>
        </div>
        
        {/* Detailed Achievement Cards */}
        <div className="achievements-grid mt-8">
          {/* House Prices Achievement */}
          <div className="achievement-card glass achievement-featured">
            <div className="achievement-header flex justify-between items-center mb-6">
              <div className="achievement-badge px-4 py-2 rounded-full text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                <i className="fas fa-crown mr-2"></i>Top 4%
              </div>
              <div className="achievement-platform flex items-center gap-2 text-blue-300">
                <i className="fab fa-kaggle"></i>
                <span>Kaggle</span>
              </div>
            </div>
            
            <div className="achievement-icon w-16 h-16 rounded-xl flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <i className="fas fa-home text-white text-2xl"></i>
            </div>
            
            <h3 className="achievement-title text-2xl font-semibold mb-4 text-white">
              House Prices Competition
            </h3>
            
            <p className="achievement-description opacity-90 mb-6 leading-relaxed">
              Ranked in the <strong>top 4% globally</strong> in Kaggle's House Prices competition. 
              Applied advanced regression techniques and feature engineering to predict 
              residential home prices with high accuracy.
            </p>
            
            <div className="achievement-skills mb-6">
              <div className="skill-tags flex flex-wrap gap-2">
                <span className="skill-tag px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                  Regression
                </span>
                <span className="skill-tag px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                  Feature Engineering
                </span>
                <span className="skill-tag px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                  Data Analysis
                </span>
              </div>
            </div>
            
            <div className="achievement-footer flex justify-between items-center">
              <div className="achievement-date text-gray-400 text-sm">
                <i className="far fa-calendar mr-2"></i>2025
              </div>
              <a 
                href="https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques" 
                target="_blank" 
                rel="noopener noreferrer"
                className="achievement-link text-blue-300 hover:text-blue-200 no-underline flex items-center gap-2 font-medium transition-colors"
              >
                View Competition <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Titanic Achievement */}
          <div className="achievement-card glass">
            <div className="achievement-header flex justify-between items-center mb-6">
              <div className="achievement-badge px-4 py-2 rounded-full text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                <i className="fas fa-star mr-2"></i>Top 25%
              </div>
              <div className="achievement-platform flex items-center gap-2 text-blue-300">
                <i className="fab fa-kaggle"></i>
                <span>Kaggle</span>
              </div>
            </div>
            
            <div className="achievement-icon w-16 h-16 rounded-xl flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              <i className="fas fa-ship text-white text-2xl"></i>
            </div>
            
            <h3 className="achievement-title text-2xl font-semibold mb-4 text-white">
              Titanic Competition
            </h3>
            
            <p className="achievement-description opacity-90 mb-6 leading-relaxed">
              Achieved <strong>top 25% global ranking</strong> in the Titanic ML competition. 
              Implemented classification algorithms to predict passenger survival with 
              precision and developed strong data preprocessing skills.
            </p>
            
            <div className="achievement-skills mb-6">
              <div className="skill-tags flex flex-wrap gap-2">
                <span className="skill-tag px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                  Classification
                </span>
                <span className="skill-tag px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                  Data Preprocessing
                </span>
                <span className="skill-tag px-3 py-1 rounded-full text-sm"
                  style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
                  Machine Learning
                </span>
              </div>
            </div>
            
            <div className="achievement-footer flex justify-between items-center">
              <div className="achievement-date text-gray-400 text-sm">
                <i className="far fa-calendar mr-2"></i>2025
              </div>
              <a 
                href="https://www.kaggle.com/competitions/titanic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="achievement-link text-blue-300 hover:text-blue-200 no-underline flex items-center gap-2 font-medium transition-colors"
              >
                View Competition <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;