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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Monthly Analytics</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Detailed analysis of financial metrics - 
          <span className="font-semibold text-blue-600 ml-2">
            {isPlanned ? 'Planned Scenario' : 'Actual Scenario'}
          </span>
        </p>
      </div>

      {isPlanned && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Planned Scenario:</strong> Calculations reflect optimized tax strategy with small business status (1% tax on turnover) and increased revenue.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 hover:scale-105">
          <p className="text-gray-600 text-sm font-medium">Gross Revenue</p>
          <p className="font-bold text-gray-900 mt-2 break-words" style={{ fontSize: '19px' }}>{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-gray-500 mt-1">Yearly</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 hover:scale-105">
          <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
          <p className="font-bold text-gray-900 mt-2 break-words" style={{ fontSize: '19px' }}>{formatCurrency(totalExpenses)}</p>
          <p className="text-sm text-gray-500 mt-1">RS.ge Taxes + Salaries</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 hover:scale-105">
          <p className="text-gray-600 text-sm font-medium">Taxes Paid</p>
          <p className={`font-bold mt-2 break-words ${totalTaxes < 0 ? 'text-red-600' : 'text-gray-900'}`} style={{ fontSize: '19px' }}>{formatCurrency(totalTaxes)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {isPlanned ? '~1% on turnover' : '15% on dividends'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 hover:scale-105">
          <p className="text-gray-600 text-sm font-medium">Net Profit</p>
          <p className="font-bold text-green-600 mt-2 break-words" style={{ fontSize: '19px' }}>{formatCurrency(totalProfit)}</p>
          <p className="text-sm text-gray-500 mt-1">Take Home</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Net Profit Dynamics</h2>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="relative min-w-[600px] sm:min-w-0" style={{ height: `${chartHeight}px` }}>
            <div className="absolute inset-0 flex items-end justify-between gap-1">
              {data.map((month) => (
                <div
                  key={month.id}
                  className="flex-1 flex flex-col items-center group cursor-pointer"
                  style={{ minWidth: '40px' }}
                  onMouseEnter={() => setSelectedMonth(month.id)}
                  onMouseLeave={() => setSelectedMonth(null)}
                >
                  <div
                    className="w-full bg-blue-500 hover:bg-blue-600 transition rounded-t relative"
                    style={{ height: `${(month.netProfit / maxProfit) * chartHeight}px`, minHeight: '4px' }}
                  >
                    {selectedMonth === month.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        {formatCurrency(month.netProfit)}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 mt-2 whitespace-nowrap sm:hidden">
                    {month.month.substring(0, 3)}
                  </span>
                  <span className="text-xs text-gray-600 mt-2 whitespace-nowrap hidden sm:block">
                    {month.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Monthly Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-purple-100">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Month</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 hidden lg:table-cell">Gross Revenue</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 hidden md:table-cell">Total Expenses</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 hidden lg:table-cell">RS.ge Taxes</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900 hidden sm:table-cell">Taxes Paid</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-900">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((month) => (
                <tr key={month.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-900">{month.month} {month.year}</td>
                  <td className="py-4 px-4 text-right text-gray-900 hidden lg:table-cell">{formatCurrency(month.grossRevenue)}</td>
                  <td className="py-4 px-4 text-right text-gray-900 hidden md:table-cell">{formatCurrency(month.totalExpenses)}</td>
                  <td className="py-4 px-4 text-right text-gray-600 hidden lg:table-cell">{formatCurrency(month.rsGeTaxes)}</td>
                  <td className="py-4 px-4 text-right text-gray-900 hidden sm:table-cell">{formatCurrency(month.totalTaxesPaid)}</td>
                  <td className="py-4 px-4 text-right font-semibold text-green-600">
                    {formatCurrency(month.netProfit)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold text-gray-500">
                <td className="py-4 px-4">Total</td>
                <td className="py-4 px-4 text-right hidden lg:table-cell">{formatCurrency(totalRevenue)}</td>
                <td className="py-4 px-4 text-right hidden md:table-cell">{formatCurrency(totalExpenses)}</td>
                <td className="py-4 px-4 text-right hidden lg:table-cell">{formatCurrency(data.reduce((sum, d) => sum + d.rsGeTaxes, 0))}</td>
                <td className="py-4 px-4 text-right hidden sm:table-cell">{formatCurrency(totalTaxes)}</td>
                <td className="py-4 px-4 text-right text-green-600">{formatCurrency(totalProfit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tax Strategy</h3>
          <div className="space-y-3">
            {isPlanned ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-blue-600">Small Business</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Rate:</span>
                  <span className="font-semibold">1% on turnover</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yearly Limit:</span>
                  <span className="font-semibold">₾500,000</span>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                  Optimized strategy with individual entrepreneurship
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-gray-500">Standard Employment</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Income Tax:</span>
                  <span className="font-semibold text-gray-500">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pension Contribution:</span>
                  <span className="font-semibold text-gray-500">2-4%</span>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                  Standard employment model
                </p>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Monthly Revenue:</span>
              <span className="font-semibold text-gray-500">{formatCurrency(totalRevenue / 12)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Monthly Expenses:</span>
              <span className="font-semibold text-gray-500">{formatCurrency(totalExpenses / 12)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Monthly Profit:</span>
              <span className="font-semibold text-green-600">{formatCurrency(totalProfit / 12)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-gray-600">Profit Margin:</span>
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
