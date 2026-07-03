'use client';

import { getTranslation } from "@/lib/translations";
import { useAppContext } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface GenericPageProps {
  pageKey: 'features' | 'pricing' | 'security' | 'about' | 'blog' | 'contact' | 'privacy' | 'terms';
}

export default function GenericPage({ pageKey }: GenericPageProps) {
  const { language } = useAppContext();
  const t = getTranslation(language);

  // Dynamic keys based on pageKey
  const title = t[`${pageKey}PageTitle` as keyof typeof t] as string;
  const subtitle = t[`${pageKey}PageSubtitle` as keyof typeof t] as string;
  const section1Title = t[`${pageKey}Section1Title` as keyof typeof t] as string;
  const section1Desc = t[`${pageKey}Section1Desc` as keyof typeof t] as string;
  const section2Title = t[`${pageKey}Section2Title` as keyof typeof t] as string;
  const section2Desc = t[`${pageKey}Section2Desc` as keyof typeof t] as string;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            {subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {section1Title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {section1Desc}
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {section2Title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {section2Desc}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
