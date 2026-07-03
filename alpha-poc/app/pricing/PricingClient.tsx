'use client';

import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function PricingClient() {
  const { language } = useAppContext();
  const t = getMarketingTranslation(language);
  const [isAnnual, setIsAnnual] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6">{t.prcHeroTitle}</h1>
            <p className="text-xl text-slate-600 mb-10">{t.prcHeroSub}</p>
            
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>{t.prcMonthly}</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-9' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>{t.prcAnnual}</span>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            {/* Starter */}
            <motion.div variants={cardVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.prcStarter}</h3>
              <p className="text-slate-500 mb-6">{t.prcStarterDesc}</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold">₾{isAnnual ? '39' : '49'}</span>
                <span className="text-slate-500">{t.prcPerMonth}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> {t.prcUpTo5}</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> {t.prcBasicSync}</li>
                <li className="flex items-center gap-3 text-slate-400"><X className="w-5 h-5" /> {t.prcAnalyticsDashboard}</li>
              </ul>
              <Link href="/cabinet" className="block w-full py-3 px-4 bg-slate-100 text-slate-900 text-center font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                {t.prcGetStarted}
              </Link>
            </motion.div>

            {/* Pro */}
            <motion.div variants={cardVariants} className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative transform md:-translate-y-4 border border-slate-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                {t.prcPopular}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t.prcPro}</h3>
              <p className="text-slate-400 mb-6">{t.prcProDesc}</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">₾{isAnnual ? '79' : '99'}</span>
                <span className="text-slate-400">{t.prcPerMonth}</span>
              </div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> {t.prcUpTo50}</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> {t.prcFullSync}</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> {t.prcAnalyticsDashboard}</li>
              </ul>
              <Link href="/cabinet" className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                {t.prcGetStarted}
              </Link>
            </motion.div>

            {/* Enterprise */}
            <motion.div variants={cardVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.prcEnterprise}</h3>
              <p className="text-slate-500 mb-6">{t.prcEnterpriseDesc}</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold">{t.prcCustom}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> {t.prcUnlimited}</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> {t.prcDedicatedManager}</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-blue-500" /> {t.prcCustomAPI}</li>
              </ul>
              <Link href="/contact" className="block w-full py-3 px-4 bg-slate-100 text-slate-900 text-center font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                {t.prcContact}
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
