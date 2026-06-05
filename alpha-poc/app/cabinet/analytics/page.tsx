'use client';

import { useState, useEffect } from 'react';
import { generateMockMonthlyFinancials, MonthlyFinancials, formatCurrency } from '@/lib/mockData';
import { useAppContext } from '@/contexts/AppContext';
import { getTranslation } from '@/lib/translations';

export default function AnalyticsPage() {
  const { isPlanned, language } = useAppContext();
  const t = getTranslation(language);
  const [data, setData] = useState<MonthlyFinancials[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setData(generateMockMonthlyFinancials(isPlanned));
    }
  }, [isPlanned, mounted]);

  if (!mounted) return null;

  const totalRevenue = data.reduce((sum, d) => sum + d.grossRevenue, 0);
  const totalExpenses = data.reduce((sum, d) => sum + d.totalExpenses, 0);
  const totalTaxes = data.reduce((sum, d) => sum + d.totalTaxesPaid, 0);
  const totalProfit = data.reduce((sum, d) => sum + d.netProfit, 0);

  const maxProfit = Math.max(...data.map(d => d.netProfit));
  const chartHeight = 200;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.monthlyAnalytics}</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          {t.financialAnalysisDetails} - 
          <span className="font-semibold text-blue-600 ml-2">
            {isPlanned ? t.plannedScenario : t.actualScenario}
          </span>
        </p>
      </div>

      {isPlanned && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>{t.plannedScenario}:</strong> {t.plannedScenarioDesc}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{t.grossRevenue}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.yearly}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{t.totalExpenses}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalExpenses)}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.ssGeExpenses} + {t.salaries}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{t.taxesPaid}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalTaxes)}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isPlanned ? `~1% ${t.onTurnover}` : `15% ${t.onDividends}`}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{t.netProfit}</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">{formatCurrency(totalProfit)}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.takeHome}</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t.netProfitDynamics}</h2>
        <div className="relative" style={{ height: `${chartHeight}px` }}>
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {data.map((month) => (
              <div
                key={month.id}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setSelectedMonth(month.id)}
                onMouseLeave={() => setSelectedMonth(null)}
              >
                <div
                  className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-t relative"
                  style={{ height: `${(month.netProfit / maxProfit) * chartHeight}px` }}
                >
                  {selectedMonth === month.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                      {formatCurrency(month.netProfit)}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-top-left">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t.monthlyDetails}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-purple-100">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">{t.month}</th>
                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden lg:table-cell">{t.grossRevenue}</th>
                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden md:table-cell">{t.totalExpenses}</th>
                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden lg:table-cell">{t.ssGeExpenses}</th>
                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden sm:table-cell">{t.taxesPaid}</th>
                <th className="text-right py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">{t.netProfit}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((month) => (
                <tr key={month.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors">
                  <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900">{month.month} {month.year}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-right text-gray-900 hidden lg:table-cell">{formatCurrency(month.grossRevenue)}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-right text-gray-900 hidden md:table-cell">{formatCurrency(month.totalExpenses)}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-right text-gray-600 hidden lg:table-cell">{formatCurrency(month.ssGeExpenses)}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-right text-gray-900 hidden sm:table-cell">{formatCurrency(month.totalTaxesPaid)}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-right font-semibold text-green-600">
                    {formatCurrency(month.netProfit)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold text-gray-500">
                <td className="py-3 sm:py-4 px-3 sm:px-6">{t.total}</td>
                <td className="py-3 sm:py-4 px-3 sm:px-6 text-right hidden lg:table-cell">{formatCurrency(totalRevenue)}</td>
                <td className="py-3 sm:py-4 px-3 sm:px-6 text-right hidden md:table-cell">{formatCurrency(totalExpenses)}</td>
                <td className="py-3 sm:py-4 px-3 sm:px-6 text-right hidden lg:table-cell">{formatCurrency(data.reduce((sum, d) => sum + d.ssGeExpenses, 0))}</td>
                <td className="py-3 sm:py-4 px-3 sm:px-6 text-right hidden sm:table-cell">{formatCurrency(totalTaxes)}</td>
                <td className="py-3 sm:py-4 px-3 sm:px-6 text-right text-green-600">{formatCurrency(totalProfit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">{t.taxStrategy}</h3>
          <div className="space-y-3">
            {isPlanned ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.taxStatus}:</span>
                  <span className="font-semibold text-blue-600">{t.smallBusiness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.taxRate}:</span>
                  <span className="font-semibold">1% {t.onTurnover}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.yearlyLimit}:</span>
                  <span className="font-semibold">₾500,000</span>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                  {t.optimizedStrategy}
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.taxStatus}:</span>
                  <span className="font-semibold text-gray-500">{t.standardEmployment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.incomeTax}:</span>
                  <span className="font-semibold text-gray-500">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.pensionContribution}:</span>
                  <span className="font-semibold text-gray-500">2-4%</span>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                  {t.standardEmploymentModel}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">{t.keyMetrics}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t.averageMonthlyRevenue}:</span>
              <span className="font-semibold text-gray-500">{formatCurrency(totalRevenue / 12)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.averageMonthlyExpenses}:</span>
              <span className="font-semibold text-gray-500">{formatCurrency(totalExpenses / 12)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.averageMonthlyProfit}:</span>
              <span className="font-semibold text-green-600">{formatCurrency(totalProfit / 12)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-gray-600">{t.profitMargin}:</span>
              <span className="font-semibold text-blue-600">
                {((totalProfit / totalRevenue) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
