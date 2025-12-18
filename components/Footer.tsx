import React from 'react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: 'fab fa-instagram', label: 'Instagram', url: 'https://instagram.com/mohamed_faisal.06', color: 'bg-gradient-to-br from-rose-700 to-pink-800' },
    { icon: 'fab fa-facebook-f', label: 'Facebook', url: 'https://facebook.com/mohamed.faisal.986182', color: 'bg-gradient-to-br from-blue-700 to-blue-800' },
    { icon: 'fab fa-discord', label: 'Discord', url: 'https://discord.com/users/aixy06', color: 'bg-gradient-to-br from-indigo-700 to-purple-800' },
    { icon: 'fab fa-twitter', label: 'Twitter', url: 'https://twitter.com/MohamedFai72065', color: 'bg-gradient-to-br from-sky-600 to-blue-700' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', url: 'https://linkedin.com/in/mohamed-faisal-748051360', color: 'bg-gradient-to-br from-blue-700 to-indigo-800' },
    { icon: 'fab fa-github', label: 'GitHub', url: 'https://github.com/mohamed-faisal-salem', color: 'bg-gradient-to-br from-slate-600 to-slate-700' },
    { icon: 'fas fa-globe', label: 'Portfolio', url: 'https://mohamed-faisal-salem.github.io/My-Portfilio/', color: 'bg-gradient-to-br from-slate-500 to-gray-600' },
    { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: 'https://wa.me/201063941971', color: 'bg-gradient-to-br from-green-600 to-teal-700' },
  ];

  return (
    <footer className="border-t border-white/10 pt-0 pb-8 mt-0 relative z-10">
      <div className="container mx-auto px-6 text-center">
        
        {/* قسم الأيقونات الاجتماعية */}
        <div className="mt-8 mb-10">


          {/* الأيقونات مرتبة أفقيًا */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
                title={link.label}
              >
                {/* الأيقونة مع تأثيرات */}
                <div className="relative mb-2">
                  {/* تأثير متوهج خلف الأيقونة */}
                  <div className={`absolute inset-0 ${link.color} rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  
                  {/* الأيقونة الرئيسية */}
                  <div className={`relative w-12 h-12 rounded-full ${link.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <i className={`${link.icon} text-white text-base`}></i>
                    
                    {/* تأثير حدود متحركة */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
                  </div>
                </div>

                {/* اسم المنصة */}
                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <div className="mt-1 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mx-auto"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <p className="text-slate-500 pt-0 ">
          © 2025 Mohamed Faisal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;