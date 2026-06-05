'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getTranslation } from '@/lib/translations';
import { useAppContext } from '@/contexts/AppContext';

export default function CabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isPlanned, toggleScenario, language, toggleLanguage } = useAppContext();

  const t = getTranslation(language);

  const navItems = [
    { href: '/cabinet', label: t.dashboard },
    { href: '/cabinet/employees', label: t.employees },
    { href: '/cabinet/payroll', label: t.payroll },
    { href: '/cabinet/analytics', label: t.analytics },
    { href: '/cabinet/expenses', label: t.expenses },
    { href: '/cabinet/settings', label: t.settings },
  ];

  const isActive = (href: string) => {
    if (href === '/cabinet') {
      return pathname === '/cabinet';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transition-transform duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <span className="text-xl font-bold">{t.appName}</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-800 rounded"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition"
          >
            <span>{t.home}</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{t.appName}</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <button
                onClick={toggleLanguage}
                className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-xs sm:text-sm shadow-md"
              >
                {language === 'ka' ? 'EN' : 'ქარ'}
              </button>
              <label className="hidden sm:flex items-center gap-2 lg:gap-3 cursor-pointer">
                <span className="text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                  {t.scenarioLabel}: {isPlanned ? t.planned : t.actual}
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isPlanned}
                    onChange={toggleScenario}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
              <span className="hidden md:inline text-sm text-gray-600">{t.user}</span>
            </div>
          </div>
          {/* Mobile scenario toggle */}
          <div className="sm:hidden mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700">
              {t.scenarioLabel}: {isPlanned ? t.planned : t.actual}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isPlanned}
                onChange={toggleScenario}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
