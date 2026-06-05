'use client';

import { useState, useEffect } from 'react';
import {
  generatePayrollRecords,
  formatCurrency,
  formatDate,
  getStatusColor,
  PayrollRecord,
  mockEmployees,
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

  const handleRunPayrollForEmployee = (employeeId: string) => {
    // Find the payroll record for this employee
    const recordIndex = payrollRecords.findIndex((r) => r.employeeId === employeeId);
    
    if (recordIndex !== -1) {
      const record = payrollRecords[recordIndex];
      
      // Mark as paid and add payment date
      const paidRecord = {
        ...record,
        status: 'paid' as const,
        paymentDate: new Date().toISOString().split('T')[0],
      };
      
      // Remove from pending and add to history
      const updatedRecords = payrollRecords.filter((_, i) => i !== recordIndex);
      setPayrollRecords(updatedRecords);
      setPaymentHistory([paidRecord, ...paymentHistory]);
    }
  };

  const totalPending = payrollRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paymentHistory.reduce((sum, r) => sum + r.amount, 0);

  if (!mounted) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payroll & Payments</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Manage payroll runs and payment history.</p>
        </div>
        <button
          onClick={handleRunPayroll}
          disabled={payrollRecords.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          ▶ Run All Payroll
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">Pending Payroll</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalPending)}</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">{payrollRecords.length} employees</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Paid (This Period)</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalPaid)}</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">{paymentHistory.length} payments</p>
        </div>
      </div>

      {/* Pending Payroll */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Pending Payroll</h2>
        </div>
        {payrollRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Employee</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden sm:table-cell">Due Date</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden md:table-cell">Status</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {payrollRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900">{record.employeeName}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 font-medium">{formatCurrency(record.amount)}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600 hidden sm:table-cell">{formatDate(record.dueDate)}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 hidden md:table-cell">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <button
                        onClick={() => handleRunPayrollForEmployee(record.employeeId)}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition font-medium"
                      >
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 sm:p-6 text-center text-gray-500 text-sm">
            No pending payroll. All employees have been paid!
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Payment History</h2>
        </div>
        {paymentHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Employee</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden sm:table-cell">Payment Date</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.slice(0, 10).map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900">{record.employeeName}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 font-medium">{formatCurrency(record.amount)}</td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600 hidden sm:table-cell">
                      {record.paymentDate ? formatDate(record.paymentDate) : 'N/A'}
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 hidden md:table-cell">
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
          <div className="p-4 sm:p-6 text-center text-gray-500 text-sm">
            No payment history yet. Run payroll to get started!
          </div>
        )}
      </div>
    </div>
  );
}
