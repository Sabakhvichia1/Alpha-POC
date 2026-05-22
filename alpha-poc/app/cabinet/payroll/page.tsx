'use client';

import { useState, useEffect } from 'react';
import {
  generatePayrollRecords,
  formatCurrency,
  formatDate,
  getStatusColor,
  PayrollRecord,
} from '@/lib/mockData';

export default function PayrollPage() {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(generatePayrollRecords());
  const [paymentHistory, setPaymentHistory] = useState<PayrollRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRunPayroll = () => {
    // Simulate payroll run: mark all pending as processing, then paid
    const updated = payrollRecords.map((record) => {
      if (record.status === 'pending') {
        return {
          ...record,
          status: 'paid' as const,
          paymentDate: new Date().toISOString().split('T')[0],
        };
      }
      return record;
    });

    // Move paid records to history
    const paidRecords = updated.filter((r) => r.status === 'paid');
    const pendingRecords = updated.filter((r) => r.status !== 'paid');

    setPaymentHistory([...paidRecords, ...paymentHistory]);
    setPayrollRecords(pendingRecords);
  };

  const totalPending = payrollRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paymentHistory.reduce((sum, r) => sum + r.amount, 0);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll & Payments</h1>
          <p className="text-gray-600 mt-2">Manage payroll runs and payment history.</p>
        </div>
        <button
          onClick={handleRunPayroll}
          disabled={payrollRecords.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          ▶ Run Payroll
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Pending Payroll</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalPending)}</p>
          <p className="text-gray-500 text-sm mt-2">{payrollRecords.length} employees</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Total Paid (This Period)</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalPaid)}</p>
          <p className="text-gray-500 text-sm mt-2">{paymentHistory.length} payments</p>
        </div>
      </div>

      {/* Pending Payroll */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Pending Payroll</h2>
        </div>
        {payrollRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Employee</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Due Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {payrollRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900">{record.employeeName}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{formatCurrency(record.amount)}</td>
                    <td className="py-4 px-6 text-gray-600">{formatDate(record.dueDate)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No pending payroll. All employees have been paid!
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
        </div>
        {paymentHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Employee</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Payment Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.slice(0, 10).map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-medium text-gray-900">{record.employeeName}</td>
                    <td className="py-4 px-6 text-gray-900 font-medium">{formatCurrency(record.amount)}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {record.paymentDate ? formatDate(record.paymentDate) : 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No payment history yet. Run payroll to get started!
          </div>
        )}
      </div>
    </div>
  );
}
