import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact" className="scroll-mt-24 pt-[0rem] pb-[0rem] relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 relative inline-block">
          Contact with me
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
        </h2>

        {/* النموذج فقط - عرض كامل */}
        <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all duration-500 mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* حقول الاسم والإيميل - مع margin 16px */}
            <div className="grid md:grid-cols-2 gap-6 mx-10">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-user text-blue-400 text-xs"></i>
                  Your Name
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition-all hover:bg-white/10 backdrop-blur-sm placeholder:text-slate-500/60"
                  placeholder="Mohamed"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-envelope text-blue-400 text-xs"></i>
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition-all hover:bg-white/10 backdrop-blur-sm placeholder:text-slate-500/60"
                  placeholder="mohamed@example.com"
                  required
                />
              </div>
            </div>
            
            {/* حقل Subject - مع margin 16px */}
            <div className="space-y-3 mx-10">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <i className="fas fa-tag text-blue-400 text-xs"></i>
                Subject
              </label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition-all hover:bg-white/10 backdrop-blur-sm placeholder:text-slate-500/60"
                placeholder="Project Inquiry, Collaboration, Question..."
                required
              />
            </div>
            
            {/* حقل الرسالة - مع margin 16px */}
            <div className="space-y-3 mx-10">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <i className="fas fa-comment text-blue-400 text-xs"></i>
                Your Message
              </label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition-all hover:bg-white/10 backdrop-blur-sm resize-none placeholder:text-slate-500/60"
                placeholder="Tell me about your project, ideas, or anything you'd like to discuss..."
                required
              />
            </div>
            
            {/* زر الإرسال - مع margin 16px */}
            <div className="mx-10">
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-gray-800 text-white font-bold hover:shadow-2xl hover:shadow-indigo-900/50 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <i className="fas fa-paper-plane group-hover:rotate-12 transition-transform"></i>
                  <span className="text-lg">Send Message</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-indigo-950 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            
            {/* رسائل الحالة - مع margin 16px */}
            <div className="mx-10">
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <div className="flex items-center justify-center gap-3">
                    <i className="fas fa-check-circle text-green-400 text-xl"></i>
                    <p className="text-green-400 font-bold">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                </div>
              )}
              
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30">
                  <div className="flex items-center justify-center gap-3">
                    <i className="fas fa-exclamation-circle text-red-400 text-xl"></i>
                    <p className="text-red-400 font-bold">Error sending message. Please try again.</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* تم إزالة قسم الأيقونات تماماً من هنا */}
      </div>

      {/* تأثيرات خلفية */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Contact;