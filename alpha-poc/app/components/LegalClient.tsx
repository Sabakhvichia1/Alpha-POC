'use client';

import { useAppContext } from "@/contexts/AppContext";
import { getTranslation } from "@/lib/translations";
import { getMarketingTranslation } from "@/lib/marketing-translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LegalClientProps {
  pageKey: 'privacy' | 'terms';
}

export default function LegalClient({ pageKey }: LegalClientProps) {
  const { language } = useAppContext();
  // We use the older translations for the bulk text since we put the legal text there
  const t = getTranslation(language);
  const mt = getMarketingTranslation(language);

  const title = t[`${pageKey}PageTitle` as keyof typeof t] as string;
  const subtitle = t[`${pageKey}PageSubtitle` as keyof typeof t] as string;
  const section1Title = t[`${pageKey}Section1Title` as keyof typeof t] as string;
  const section1Desc = t[`${pageKey}Section1Desc` as keyof typeof t] as string;
  const section2Title = t[`${pageKey}Section2Title` as keyof typeof t] as string;
  const section2Desc = t[`${pageKey}Section2Desc` as keyof typeof t] as string;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{title}</h1>
            <p className="text-xl text-slate-600">{subtitle}</p>
            <p className="text-sm text-slate-400 mt-6 font-medium uppercase tracking-wider">Last updated: July 3, 2026</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sidebar / Table of Contents */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-32">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">{mt.lglTableOfContents}</h4>
              <nav className="space-y-3">
                <a href="#section-1" className="block text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  1. {section1Title}
                </a>
                <a href="#section-2" className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  2. {section2Title}
                </a>
                <a href="#" className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  3. User Obligations
                </a>
                <a href="#" className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  4. Governing Law
                </a>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600">
            
            <p className="lead text-xl text-slate-600 mb-12">
              Welcome to the {title} documentation. This agreement outlines the rules and regulations for the use of Financial Monitoring's Website and App.
            </p>

            <div id="section-1" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-6">1. {section1Title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {section1Desc}
              </p>
              <p className="text-slate-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            <hr className="border-slate-200 my-12" />

            <div id="section-2" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-6">2. {section2Title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {section2Desc}
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Important Note</h4>
                <p className="text-sm text-slate-600 mb-0">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
