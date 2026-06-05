'use client';

import Link from "next/link";
import { getTranslation } from "@/lib/translations";
import { useAppContext } from "@/contexts/AppContext";

export default function Home() {
  const { language, toggleLanguage } = useAppContext();
  const t = getTranslation(language);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <nav className="border-b border-white/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{t.appName}</div>
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

      <section className="flex-1 py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            {t.landingTitle}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            {t.landingSubtitle}
          </p>
          <Link
            href="/cabinet"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {t.getStarted}
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            {t.mainFeatures}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-5 sm:p-6 bg-white border border-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t.feature1Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t.feature1Desc}
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white border border-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t.feature2Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t.feature2Desc}
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white border border-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t.feature3Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t.feature3Desc}
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white border border-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t.feature4Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t.feature4Desc}
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white border border-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t.feature5Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t.feature5Desc}
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white border border-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {t.feature6Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t.feature6Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.appName}</h4>
              <p className="text-xs sm:text-sm">
                {t.footerTagline}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.product}</h4>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:text-white">{t.features}</a></li>
                <li><a href="#" className="hover:text-white">{t.pricing}</a></li>
                <li><a href="#" className="hover:text-white">{t.security}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.company}</h4>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:text-white">{t.about}</a></li>
                <li><a href="#" className="hover:text-white">{t.blog}</a></li>
                <li><a href="#" className="hover:text-white">{t.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.legal}</h4>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:text-white">{t.privacy}</a></li>
                <li><a href="#" className="hover:text-white">{t.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
            <p>&copy; 2026 {t.appName}. {t.copyright}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
