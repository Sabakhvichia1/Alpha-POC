'use client';

import Link from "next/link";
import { getTranslation } from "@/lib/translations";
import { useAppContext } from "@/contexts/AppContext";

export default function Footer() {
  const { language } = useAppContext();
  const t = getTranslation(language);

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 mt-auto">
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
              <li><Link href="/features" className="hover:text-white">{t.features}</Link></li>
              <li><Link href="/pricing" className="hover:text-white">{t.pricing}</Link></li>
              <li><Link href="/security" className="hover:text-white">{t.security}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.company}</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              <li><Link href="/about" className="hover:text-white">{t.about}</Link></li>
              <li><Link href="/blog" className="hover:text-white">{t.blog}</Link></li>
              <li><Link href="/contact" className="hover:text-white">{t.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.legal}</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              <li><Link href="/privacy" className="hover:text-white">{t.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-white">{t.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p>&copy; 2026 {t.appName}. {t.copyright}.</p>
        </div>
      </div>
    </footer>
  );
}
