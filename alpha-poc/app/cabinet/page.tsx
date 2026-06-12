'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  mockEmployees,
  generatePayrollRecords,
  mockActivityLog,
  formatCurrency,
  formatDate,
  getStatusColor,
} from '@/lib/mockData';
import { useAppContext } from '@/contexts/AppContext';
import { getTranslation } from '@/lib/translations';

export default function Dashboard() {
  const router = useRouter();
  const { language } = useAppContext();
  const t = getTranslation(language);
  const [payrollRecords, setPayrollRecords] = useState(generatePayrollRecords());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.amount, 0);
  const pendingPayments = payrollRecords.filter((r) => r.status === 'pending').length;
  const activeEmployees = mockEmployees.filter((e) => e.status === 'active').length;

  const nextRun = new Date();
  nextRun.setDate(nextRun.getDate() + 7);

  const getActivityDescription = (activity: typeof mockActivityLog[0]) => {
    if (language === 'en') {
      switch (activity.type) {
        case 'payroll-run':
          return `${t.payrollRunCompleted} ${activeEmployees} ${t.forEmployees}`;
        case 'payment-processed':
          const name = activity.description.split('-ის')[0].split('₾')[1]?.trim() || 'employee';
          return `${t.paymentProcessed} ${name}`;
        case 'employee-added':
          return `${t.employeeAdded}`;
        case 'settings-updated':
          return `${t.settingsUpdated}`;
        default:
          return activity.description;
      }
    }
    return activity.description;
  };

  const handleRunPayroll = () => {
    router.push('/cabinet/payroll');
  };

  const handleAddEmployee = () => {
    router.push('/cabinet/employees');
  };

  const handleViewReports = () => {
    router.push('/cabinet/analytics');
  };

  const handlePaymentSettings = () => {
    router.push('/cabinet/settings');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.dashboardTitle}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">{t.dashboardSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2">{t.totalPayrollThisMonth}</p>
            <p className="font-bold text-gray-900 break-words" style={{ fontSize: '19px' }}>
              {formatCurrency(totalPayroll)}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2">{t.pendingPayments}</p>
            <p className="font-bold text-gray-900" style={{ fontSize: '19px' }}>{pendingPayments}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2">{t.activeEmployees}</p>
            <p className="font-bold text-gray-900" style={{ fontSize: '19px' }}>{activeEmployees}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 hover:scale-105">
            <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2">{t.nextScheduledRun}</p>
            <p className="font-bold text-gray-900 break-words" style={{ fontSize: '14px' }}>{formatDate(nextRun.toISOString())}</p>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t.recentActivity}</h2>
          <div className="space-y-3 sm:space-y-4">
            {mockActivityLog.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-900 font-medium truncate">{getActivityDescription(activity)}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-xl shadow-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{t.quickActions}</h2>
          <div className="space-y-2 sm:space-y-3">
            <button 
              onClick={handleRunPayroll}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white text-gray-900 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105"
            >
              {t.runPayrollNow}
            </button>
            <button 
              onClick={handleAddEmployee}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-medium text-sm sm:text-base border border-white/30"
            >
              {t.addEmployee}
            </button>
            <button 
              onClick={handleViewReports}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-medium text-sm sm:text-base border border-white/30"
            >
              {t.viewReports}
            </button>
            <button 
              onClick={handlePaymentSettings}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 font-medium text-sm sm:text-base border border-white/30"
            >
              {t.paymentSettings}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t.upcomingPayroll}</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-purple-100">
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-gray-900 text-xs sm:text-sm">{t.employee}</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-gray-900 text-xs sm:text-sm">{t.amount}</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">{t.dueDate}</th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-gray-900 text-xs sm:text-sm">{t.status}</th>
                </tr>
              </thead>
              <tbody>
                {payrollRecords.slice(0, 5).map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors">
                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-900 text-xs sm:text-sm">{record.employeeName}</td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-900 font-medium text-xs sm:text-sm whitespace-nowrap">{formatCurrency(record.amount)}</td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">{formatDate(record.dueDate)}</td>
                    <td className="py-2 sm:py-3 px-3 sm:px-4">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
