'use client';

import { useState, useEffect } from 'react';
import {
  mockEmployees,
  generatePayrollRecords,
  mockActivityLog,
  formatCurrency,
  formatDate,
  getStatusColor,
} from '@/lib/mockData';

export default function Dashboard() {
  const [payrollRecords, setPayrollRecords] = useState(generatePayrollRecords());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.amount, 0);
  const pendingPayments = payrollRecords.filter((r) => r.status === 'pending').length;
  const activeEmployees = mockEmployees.filter((e) => e.status === 'active').length;

  // Calculate next scheduled run (mock: 7 days from now)
  const nextRun = new Date();
  nextRun.setDate(nextRun.getDate() + 7);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your payroll overview.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Payroll */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Payroll This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalPayroll)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Payments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{pendingPayments}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeEmployees}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        {/* Next Scheduled Run */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Next Scheduled Run</p>
              <p className="text-lg font-bold text-gray-900 mt-2">{formatDate(nextRun.toISOString())}</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockActivityLog.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="text-2xl">
                  {activity.type === 'payroll-run' && '🏃'}
                  {activity.type === 'payment-processed' && '✅'}
                  {activity.type === 'employee-added' && '➕'}
                  {activity.type === 'settings-updated' && '⚙️'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.description}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Run Payroll Now
            </button>
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium">
              Add Employee
            </button>
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium">
              View Reports
            </button>
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium">
              Payment Settings
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Payroll */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Payroll</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Employee</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.slice(0, 5).map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{record.employeeName}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{formatCurrency(record.amount)}</td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(record.dueDate)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
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
  );
}
