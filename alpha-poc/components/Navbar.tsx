'use client';

import Link from "next/link";
import { getTranslation } from "@/lib/translations";
import { useAppContext } from "@/contexts/AppContext";

export default function Navbar() {
  const { language, toggleLanguage } = useAppContext();
  const t = getTranslation(language);

  return (
    <nav className="border-b border-white/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">{t.appName}</Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-md"
          >
            {language === 'ka' ? 'EN' : 'ქარ'}
          </button>
          <Link
            href="/cabinet"
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg"
          >
            {t.getStarted}
          </Link>
        </div>
      </div>
    </nav>
  );
}
