'use client';

import { useAppContext } from "@/contexts/AppContext";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ContactClient() {
  const { language } = useAppContext();
  const t = getMarketingTranslation(language);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Col: Info */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-extrabold text-slate-900 mb-6"
              >
                {t.cntHeroTitle}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 mb-12"
              >
                {t.cntHeroSub}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900">{t.cntAddressTitle}</h3>
                    <p className="mt-2 text-slate-600">{t.cntAddressDesc}<br/>{t.cntAddress}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900">{t.cntPhoneTitle}</h3>
                    <p className="mt-2 text-slate-600">{t.cntPhone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900">{t.cntEmailTitle}</h3>
                    <p className="mt-2 text-slate-600">{t.cntEmail}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Col: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.cntFormName}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                      placeholder={t.cntNamePlaceholder} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.cntFormEmail}</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
                      placeholder={t.cntEmailPlaceholder} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.cntFormMessage}</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" 
                    placeholder={t.cntMessagePlaceholder}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center border border-red-100">
                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    <p className="text-sm">Something went wrong. Please try again.</p>
                  </div>
                )}
                
                {status === 'success' && (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
                    <p className="text-sm">Your message has been sent successfully!</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>Sending... <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>
                  ) : (
                    <>{t.cntFormSubmit} <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
