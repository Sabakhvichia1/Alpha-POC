'use client';

import { useAppContext } from "@/contexts/AppContext";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Building2, Users, Target } from "lucide-react";

export default function AboutClient() {
  const { language } = useAppContext();
  const t = getMarketingTranslation(language);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6"
            >
              {t.abtHeroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 mb-10"
            >
              {t.abtHeroSub}
            </motion.p>
          </div>
        </section>

        {/* Mission / Vision Split */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">{t.abtMission}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.abtMissionDesc} {t.abtMissionLong}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-96 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col justify-end text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Building2 className="w-48 h-48" />
              </div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">{t.abtHQ}</h3>
              <p className="text-blue-100 relative z-10">{t.abtHQDesc}</p>
            </motion.div>
          </div>
        </section>

        {/* Team Section Placeholder */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.abtTeam}</h2>
            <p className="text-xl text-slate-600 mb-16">{t.abtTeamSub}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                  <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                    {/* Placeholder Avatar */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 to-slate-200"></div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{t.abtTeamMember}</h4>
                  <p className="text-sm text-slate-500">{t.abtPosition}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
