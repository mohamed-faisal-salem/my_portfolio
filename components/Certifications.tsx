import React, { useState } from 'react';
import { Certificate } from '../types';

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Machine Learning with Python',
      provider: 'IBM',
      duration: '17 Hours',
      date: '07/2025',
      skills: ['Scikit-learn', 'Regression', 'Clustering'],
      pdfUrl: '/machine-learning-python-certificate.pdf',
      icon: 'fas fa-brain'
    },
    {
      id: '2',
      title: 'Neural Networks & Deep Learning',
      provider: 'DeepLearning.ai',
      duration: '22 Hours',
      date: '09/2025',
      skills: ['Tensors', 'Backpropagation', 'Optimizers'],
      pdfUrl: '/neural-networks-certificate.pdf',
      icon: 'fas fa-network-wired'
    },
    {
      id: '3',
      title: 'AI for Everyone',
      provider: 'ITI',
      duration: '1.5 Hours',
      date: '09/2025',
      skills: ['AI Strategy', 'Machine Learning Basics'],
      pdfUrl: '/ai-for-everyone-certificate.pdf',
      icon: 'fas fa-robot'
    }
  ];

  return (
    <section id="certifications" className="scroll-mt-24 pt-[0rem] pb-[12rem]">
      <h2 className="text-4xl font-bold mb-12 relative inline-block">
        Certifications
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="glass p-6 rounded-2xl border border-white/5 flex flex-col group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 text-2xl group-hover:scale-110 transition-transform">
                <i className={cert.icon}></i>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 text-sm tracking-wide uppercase">{cert.provider}</h4>
                <h3 className="font-bold text-lg leading-tight">{cert.title}</h3>
              </div>
            </div>
            <div className="space-y-2 mb-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <i className="far fa-clock w-4"></i> {cert.duration}
              </div>
              <div className="flex items-center gap-2">
                <i className="far fa-calendar-alt w-4"></i> {cert.date}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {cert.skills.map(s => (
                <span key={s} className="px-2 py-1 rounded bg-blue-500/10 text-blue-300 text-[10px] font-semibold border border-blue-500/20">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto flex gap-3">
              <a 
                href={cert.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Backdrop */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-4xl h-[85vh] rounded-3xl overflow-hidden flex flex-col relative shadow-2xl border border-white/10">
            <div className="p-6 bg-slate-950 flex justify-between items-center border-b border-white/10">
              <h3 className="text-xl font-bold">{selectedCert.title}</h3>
              <button onClick={() => setSelectedCert(null)} className="text-slate-400 hover:text-white text-2xl">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex-grow bg-slate-800 flex items-center justify-center text-slate-500">
               <div className="text-center p-12">
                 <i className="fas fa-file-pdf text-6xl mb-4"></i>
                 <p className="text-xl">Certificate Preview</p>
                 <p className="text-sm opacity-60">PDF: {selectedCert.pdfUrl.split('/').pop()}</p>
                 <p className="mt-4 text-slate-400">To view the actual certificate, click the download button</p>
               </div>
            </div>
            <div className="p-4 bg-slate-950 flex justify-between items-center border-t border-white/10">
              <a 
                href={selectedCert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Download PDF
              </a>
              <button onClick={() => setSelectedCert(null)} className="px-6 py-2 rounded-xl bg-slate-800 font-bold hover:bg-slate-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;