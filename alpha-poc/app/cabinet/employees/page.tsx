'use client';

import { useState, useEffect } from 'react';
import { mockEmployees, formatCurrency, getStatusColor, Employee, PayrollRecord, generatePayrollRecords, calculateGeorgianTaxes } from '@/lib/mockData';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(generatePayrollRecords());
  const [paymentHistory, setPaymentHistory] = useState<PayrollRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    status: 'active' as 'active' | 'on-leave' | 'terminated',
    salary: '',
    paymentMethod: 'direct-deposit' as 'direct-deposit' | 'bank-transfer' | 'check',
    email: '',
    employmentType: 'monthly' as 'hourly' | 'daily' | 'monthly',
    pensionScheme: true,
    taxStatus: 'standard' as 'standard' | 'small-business',
    manualMonthlyAdjustment: '' as string, // New field for manual adjustment
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingId(employee.id);
      setFormData({
        name: employee.name,
        role: employee.role,
        status: employee.status,
        salary: employee.salary.toString(),
        paymentMethod: employee.paymentMethod,
        email: employee.email,
        employmentType: employee.employmentType,
        pensionScheme: employee.pensionScheme,
        taxStatus: employee.taxStatus,
        manualMonthlyAdjustment: '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        role: '',
        status: 'active' as 'active' | 'on-leave' | 'terminated',
        salary: '',
        paymentMethod: 'direct-deposit' as 'direct-deposit' | 'bank-transfer' | 'check',
        email: '',
        employmentType: 'monthly' as 'hourly' | 'daily' | 'monthly',
        pensionScheme: true,
        taxStatus: 'standard' as 'standard' | 'small-business',
        manualMonthlyAdjustment: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Edit existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId
            ? {
                ...emp,
                name: formData.name,
                role: formData.role,
                status: formData.status,
                salary: parseFloat(formData.salary),
                paymentMethod: formData.paymentMethod,
                email: formData.email,
              }
            : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: formData.name,
        role: formData.role,
        status: formData.status,
        salary: parseFloat(formData.salary),
        paymentMethod: formData.paymentMethod,
        email: formData.email,
        joinDate: new Date().toISOString().split('T')[0],
        employmentType: formData.employmentType,
        monthlyBaseline: parseFloat(formData.salary),
        pensionScheme: formData.pensionScheme,
        taxStatus: formData.taxStatus,
      };
      setEmployees([...employees, newEmployee]);
      
      // Create payroll record for new employee
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(dueDate.getDate() + 7);
      
      const grossSalary = parseFloat(formData.salary);
      const taxes = calculateGeorgianTaxes(grossSalary, formData.taxStatus, formData.pensionScheme);
      
      const newPayrollRecord: PayrollRecord = {
        id: `payroll-${newEmployee.id}`,
        employeeId: newEmployee.id,
        employeeName: newEmployee.name,
        amount: taxes.netSalary,
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'pending',
        grossSalary: grossSalary,
        incomeTax: taxes.incomeTax,
        pensionContribution: taxes.pensionEmployee,
        netSalary: taxes.netSalary,
      };
      
      setPayrollRecords([...payrollRecords, newPayrollRecord]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
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

  const getEmployeePayrollStatus = (employeeId: string) => {
    const record = payrollRecords.find((r) => r.employeeId === employeeId);
    return record ? record.status : 'paid';
  };

  if (!mounted) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Manage your team and payroll information.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium w-full sm:w-auto"
        >
          + Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden md:table-cell">Role</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden lg:table-cell">Status</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden sm:table-cell">Salary</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden xl:table-cell">Payment Method</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900 hidden lg:table-cell">Payroll Status</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <div>
                      <p className="font-medium text-gray-900">{employee.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{employee.email}</p>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 hidden md:table-cell">{employee.role}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 hidden lg:table-cell">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-900 font-medium hidden sm:table-cell">{formatCurrency(employee.salary)}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600 hidden xl:table-cell">
                    {employee.paymentMethod === 'direct-deposit' && 'Direct Deposit'}
                    {employee.paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                    {employee.paymentMethod === 'check' && 'Check'}
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 hidden lg:table-cell">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getEmployeePayrollStatus(employee.id))}`}>
                      {getEmployeePayrollStatus(employee.id).charAt(0).toUpperCase() + getEmployeePayrollStatus(employee.id).slice(1)}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {getEmployeePayrollStatus(employee.id) === 'pending' && (
                        <button
                          onClick={() => handleRunPayrollForEmployee(employee.id)}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition font-medium whitespace-nowrap"
                        >
                          Run Payroll
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenModal(employee)}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <button 
                onClick={handleCloseModal}
                type="button"
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Engineer"
                />
              </div>

              {/* Employment Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="monthly">Monthly (Fixed Salary)</option>
                  <option value="daily">Daily (Rate × Days Worked)</option>
                  <option value="hourly">Hourly (Rate × Hours Worked)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.employmentType === 'monthly' && 'Fixed monthly payment'}
                  {formData.employmentType === 'daily' && 'Payment based on days worked'}
                  {formData.employmentType === 'hourly' && 'Payment based on hours worked'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.employmentType === 'monthly' && 'Monthly Salary (₾)'}
                  {formData.employmentType === 'daily' && 'Daily Rate (₾)'}
                  {formData.employmentType === 'hourly' && 'Hourly Rate (₾)'}
                </label>
                <input
                  type="number"
                  required
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder={
                    formData.employmentType === 'monthly' ? '3000' :
                    formData.employmentType === 'daily' ? '150' : '20'
                  }
                  step="0.01"
                />
              </div>

              {/* Manual Monthly Adjustment */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manual Monthly Adjustment (Optional)
                </label>
                <input
                  type="number"
                  value={formData.manualMonthlyAdjustment}
                  onChange={(e) => setFormData({ ...formData, manualMonthlyAdjustment: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Override for current month (e.g., 2500)"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use calculated salary. Enter amount to override for this month only (for bonuses, unpaid leave, etc.)
                </p>
              </div>

              {/* Tax Settings */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Status
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="taxStatus"
                      value="standard"
                      checked={formData.taxStatus === 'standard'}
                      onChange={(e) => setFormData({ ...formData, taxStatus: e.target.value as any })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Standard Employment (20% income tax + 2-4% pension)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="taxStatus"
                      value="small-business"
                      checked={formData.taxStatus === 'small-business'}
                      onChange={(e) => setFormData({ ...formData, taxStatus: e.target.value as any })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Small Business (1% on turnover under ₾500,000)</span>
                  </label>
                </div>
              </div>

              {formData.taxStatus === 'standard' && (
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pensionScheme}
                      onChange={(e) => setFormData({ ...formData, pensionScheme: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Enrolled in Pension Scheme (4% total vs 2% total)
                    </span>
                  </label>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="direct-deposit">Direct Deposit</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {editingId ? 'Update' : 'Add'} Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
