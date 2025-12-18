import React from 'react';

const SkillCard: React.FC<{ 
  title: string; 
  icon: string; 
  skills: string[];
  index: number;
}> = ({ title, icon, skills, index }) => {
  
  const gradientColors = [
    'linear-gradient(135deg, #1F8ACB, #0D6EFD)', // Codeforces blue
    'linear-gradient(135deg, #FFA116, #F59E0B)', // LeetCode orange
    'linear-gradient(135deg, #EC4899, #DB2777)', // GitHub pink
    'linear-gradient(135deg, #10B981, #059669)'  // Green for soft skills
  ];

  const bgColors = [
    'rgba(31, 138, 203, 0.1)',
    'rgba(255, 161, 22, 0.1)',
    'rgba(236, 72, 153, 0.1)',
    'rgba(16, 185, 129, 0.1)'
  ];

  const textColors = [
    '#1F8ACB',
    '#FFA116',
    '#EC4899',
    '#10B981'
  ];

  const currentColor = textColors[index % textColors.length];
  const currentBg = bgColors[index % bgColors.length];
  const currentGradient = gradientColors[index % gradientColors.length];

  return (
    <div 
      className="skill-card glass p-6 rounded-xl transition-all duration-300 flex flex-col h-full"
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: `1px solid ${currentColor.replace(')', ', 0.2)').replace('rgb', 'rgba')}`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header with icon and title */}
      <div className="card-header flex items-center gap-4 mb-6">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ background: currentGradient }}
        >
          <i className={`${icon} text-white text-lg`}></i>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-1" style={{ color: currentColor }}>
            {title}
          </h4>
          <p className="text-sm opacity-70" style={{ color: currentColor }}>
            {index === 0 ? 'Core Languages' : 
             index === 1 ? 'AI Development' :
             index === 2 ? 'Development Tools' : 
             'Essential Skills'}
          </p>
        </div>
      </div>
      
      {/* Skills list */}
      <div className="skills-list flex-grow mb-6">
        <ul className="space-y-3">
          {skills.map((skill, idx) => (
            <li 
              key={idx} 
              className="flex items-center gap-3 p-2 rounded-lg transition-all hover:scale-[1.02]"
              style={{ background: currentBg }}
            >
              <span 
                className="text-xs font-bold"
                style={{ color: currentColor }}
              >
                ▹
              </span>
              <span className="text-slate-300 font-medium">{skill}</span>
              {index === 0 && idx === 0 && ( // Python - highlight
                <span className="ml-auto text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-400 font-bold">
                  Advanced
                </span>
              )}
              {index === 0 && idx === 1 && ( // C++ - highlight
                <span className="ml-auto text-xs px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 font-bold">
                  Advanced
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      

      {/* Hover effect border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-300"
        style={{ background: currentGradient }}
      ></div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillSets = [
    {
      title: 'Programming',
      icon: 'fas fa-code',
      skills: ['Python', 'C++', 'Java', 'Data Structures', 'Algorithms', 'OOP']
    },
    {
      title: 'AI & Data Science',
      icon: 'fas fa-brain',
      skills: ['Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow', 'Scikit-learn']
    },
    {
      title: 'Tools & Dev',
      icon: 'fas fa-tools',
      skills: ['Android Studio', 'Git / GitHub', 'Firebase', 'VS Code', 'JUCE Framework']
    },
    {
      title: 'Soft Skills',
      icon: 'fas fa-user-check',
      skills: ['Technical Writing', 'Problem Solving', 'Teamwork', 'Critical Thinking']
    }
  ];

  return (
    <section id="skills" className="scroll-mt-24 pt-[0rem] pb-[12rem] relative">
      <style jsx="true">{`
        .skill-card {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .skill-card:hover .absolute {
          opacity: 1;
        }
        
        .skills-list li {
          transition: all 0.2s ease;
        }
        
        .skills-list li:hover {
          transform: translateX(5px);
        }
        
        @media (max-width: 768px) {
          #skills .grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .skill-card {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .skill-card {
            padding: 1.2rem;
          }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 relative inline-block">
          Technical Skills
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
        </h2>
        
        <div className="stats-header text-center mb-10">
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillSets.map((set, idx) => (
            <SkillCard key={idx} {...set} index={idx} />
          ))}
        </div>
        

      </div>
    </section>
  );
};

export default Skills;