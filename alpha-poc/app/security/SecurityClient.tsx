'use client';

import { useAppContext } from "@/contexts/AppContext";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lock, Shield, Server, FileCheck } from "lucide-react";

export default function SecurityClient() {
  const { language } = useAppContext();
  const t = getMarketingTranslation(language);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-24 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-24 h-24 mx-auto mb-8 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20"
          >
            <Lock className="w-12 h-12 text-emerald-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
          >
            {t.secHeroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400"
          >
            {t.secHeroSub}
          </motion.p>
        </section>

        {/* Features Grid */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl"
          >
            <Shield className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">{t.secFeature1}</h3>
            <p className="text-slate-400 text-sm">All data transmitted to and from our servers is encrypted using 256-bit AES encryption.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl"
          >
            <Lock className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">{t.secFeature2}</h3>
            <p className="text-slate-400 text-sm">Add an extra layer of security to your account with time-based OTPs.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl"
          >
            <FileCheck className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">{t.secFeature3}</h3>
            <p className="text-slate-400 text-sm">Independent security experts regularly audit our infrastructure for vulnerabilities.</p>
          </motion.div>
        </section>

        {/* Live Stats */}
        <section className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 border border-slate-700 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium tracking-wider text-sm uppercase">System Status</span>
              </div>
              <h4 className="text-4xl font-bold text-white mb-2">All Systems Operational</h4>
              <p className="text-slate-400">{t.secStats2}</p>
            </div>
            
            <div className="flex flex-col justify-center border-l border-slate-700 pl-12">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
                99.99%
              </span>
              <span className="text-slate-400 font-medium">{t.secStats1}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
