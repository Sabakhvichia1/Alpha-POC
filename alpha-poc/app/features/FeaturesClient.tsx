'use client';

import { useAppContext } from "@/contexts/AppContext";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart3, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturesClient() {
  const { language } = useAppContext();
  const t = getMarketingTranslation(language);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white"></div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
              {t.featHeroTitle}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              {t.featHeroSub}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/cabinet" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1">
                {t.prcGetStarted}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Card 1 */}
              <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group">
                <BarChart3 className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{t.featBento1Title}</h3>
                <p className="text-lg text-slate-600">{t.featBento1Desc}</p>
                <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <BarChart3 className="w-96 h-96 text-blue-600" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-10 rounded-3xl border border-purple-100 shadow-sm relative overflow-hidden group">
                <Zap className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.featBento2Title}</h3>
                <p className="text-slate-600">{t.featBento2Desc}</p>
              </div>

              {/* Card 3 */}
              <div className="md:col-span-3 bg-gradient-to-r from-emerald-50 to-teal-50 p-10 md:p-16 rounded-3xl border border-emerald-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <ShieldCheck className="w-16 h-16 text-emerald-600 mb-6" />
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.featBento3Title}</h3>
                  <p className="text-xl text-slate-600">{t.featBento3Desc}</p>
                </div>
                <div className="flex-1 w-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
                  <div className="h-40 flex items-center justify-center border-2 border-dashed border-emerald-200 rounded-xl">
                    <span className="text-emerald-500 font-medium">Secure RS.ge API Tunnel</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline / How it works */}
        <section className="py-24 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">{t.featTimelineTitle}</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-900 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-colors">
                  <h4 className="text-xl font-bold mb-2">{t.featStep1}</h4>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-900 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-purple-500 transition-colors">
                  <h4 className="text-xl font-bold mb-2">{t.featStep2}</h4>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-900 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500 transition-colors">
                  <h4 className="text-xl font-bold mb-2">{t.featStep3}</h4>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
