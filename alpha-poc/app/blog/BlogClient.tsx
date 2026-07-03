'use client';

import { useAppContext } from "@/contexts/AppContext";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

export default function BlogClient() {
  const { language } = useAppContext();
  const t = getMarketingTranslation(language);

  const posts = [
    { title: t.blgPost1Title, category: t.blgPost1Cat, image: "bg-blue-500" },
    { title: t.blgPost2Title, category: t.blgPost2Cat, image: "bg-emerald-500" },
    { title: t.blgPost3Title, category: t.blgPost3Cat, image: "bg-purple-500" },
    { title: t.blgPost4Title, category: t.blgPost4Cat, image: "bg-rose-500" },
    { title: t.blgPost5Title, category: t.blgPost5Cat, image: "bg-indigo-500" },
    { title: t.blgPost6Title, category: t.blgPost6Cat, image: "bg-cyan-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold text-slate-900 mb-6"
            >
              {t.blgHeroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 mb-10"
            >
              {t.blgHeroSub}
            </motion.p>
          </div>

          {/* Featured Post */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16 rounded-3xl overflow-hidden bg-white shadow-xl flex flex-col md:flex-row group cursor-pointer"
          >
            <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
            </div>
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <div className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-4">{t.blgFeatured}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">
                {t.blgFeaturedTitle}
              </h2>
              <p className="text-slate-600 mb-8 text-lg">{t.blgFeaturedDesc}</p>
              <div className="flex items-center text-slate-500 text-sm font-medium">
                <span>{t.blgDate}</span>
                <span className="mx-3">•</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {t.blgReadTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {posts.map((post, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer border border-slate-100"
              >
                <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="p-6">
                  <div className="text-blue-600 font-bold text-xs tracking-wider uppercase mb-3">{post.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <div className="flex items-center text-slate-500 text-xs font-medium mt-6">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {t.blgReadTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">{t.blgNewsletter}</h2>
              <p className="text-blue-100 mb-8 text-lg">{t.blgNewsletterDesc}</p>
              
              <form className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder={t.blgEmailPlaceholder} 
                  className="px-6 py-4 rounded-xl text-slate-900 w-full sm:w-96 focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
                <button type="button" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center">
                  {t.blgSubscribe} <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
