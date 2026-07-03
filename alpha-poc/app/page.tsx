'use client';

import Link from "next/link";
import { getTranslation } from "@/lib/translations";
import { useAppContext } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { language } = useAppContext();
  const t = getTranslation(language);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Navbar />

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

      <Footer />
    </div>
  );
}
