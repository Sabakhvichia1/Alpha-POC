'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/mockData';
import { useAppContext } from '@/contexts/AppContext';
import { getTranslation } from '@/lib/translations';

// Georgian Tax Types based on RS.ge (Revenue Service)
interface TaxDeclaration {
  id: string;
  month: string;
  year: number;
  // Income Tax (საშემოსავლო გადასახადი)
  incomeTax: number;
  incomeTaxPaid: boolean;
  incomeTaxDueDate: string;
  
  // VAT (დამატებული ღირებულების გადასახადი)
  vatAmount: number;
  vatPaid: boolean;
  vatDueDate: string;
  
  // Pension Fund (საპენსიო შენატანი)
  pensionEmployee: number;
  pensionEmployer: number;
  pensionPaid: boolean;
  pensionDueDate: string;
  
  // Property Tax (ქონების გადასახადი)
  propertyTax: number;
  propertyTaxPaid: boolean;
  propertyTaxDueDate: string;
  
  // Total
  totalTaxes: number;
  allPaid: boolean;
}

export default function RSGeExpensesPage() {
  const { language } = useAppContext();
  const t = getTranslation(language);
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'declarations' | 'payments' | 'summary'>('declarations');
  
  // Current month tax data
  const [currentMonth, setCurrentMonth] = useState({
    grossIncome: 0,
    vatBase: 0,
    employeeSalaries: 0,
    propertyValue: 0,
  });

  // Mock tax declarations for the year
  const [declarations, setDeclarations] = useState<TaxDeclaration[]>([]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('rsGeTaxData');
    if (stored) {
      const data = JSON.parse(stored);
      setCurrentMonth(data.currentMonth || currentMonth);
      setDeclarations(data.declarations || generateMockDeclarations());
    } else {
      setDeclarations(generateMockDeclarations());
    }
  }, []);

  const generateMockDeclarations = (): TaxDeclaration[] => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const year = 2026;
    
    return months.slice(0, 6).map((month, index) => {
      const income = 15000 + Math.random() * 5000;
      const incomeTax = income * 0.20; // 20% income tax
      const vat = income * 0.18; // 18% VAT
      const pensionEmp = income * 0.02; // 2% employee
      const pensionEmpr = income * 0.02; // 2% employer
      const property = 500; // Fixed property tax
      
      return {
        id: `dec-${year}-${index + 1}`,
        month,
        year,
        incomeTax: Math.round(incomeTax),
        incomeTaxPaid: index < 4,
        incomeTaxDueDate: `${year}-${(index + 2).toString().padStart(2, '0')}-15`,
        vatAmount: Math.round(vat),
        vatPaid: index < 4,
        vatDueDate: `${year}-${(index + 2).toString().padStart(2, '0')}-15`,
        pensionEmployee: Math.round(pensionEmp),
        pensionEmployer: Math.round(pensionEmpr),
        pensionPaid: index < 4,
        pensionDueDate: `${year}-${(index + 2).toString().padStart(2, '0')}-15`,
        propertyTax: property,
        propertyTaxPaid: index < 3,
        propertyTaxDueDate: `${year}-${(index + 2).toString().padStart(2, '0')}-30`,
        totalTaxes: Math.round(incomeTax + vat + pensionEmp + pensionEmpr + property),
        allPaid: index < 3,
      };
    });
  };

  const calculateCurrentTaxes = () => {
    const incomeTax = currentMonth.grossIncome * 0.20;
    const vat = currentMonth.vatBase * 0.18;
    const pensionEmp = currentMonth.employeeSalaries * 0.02;
    const pensionEmpr = currentMonth.employeeSalaries * 0.02;
    const property = currentMonth.propertyValue * 0.001; // 0.1% of property value
    
    return {
      incomeTax,
      vat,
      pensionEmployee: pensionEmp,
      pensionEmployer: pensionEmpr,
      propertyTax: property,
      total: incomeTax + vat + pensionEmp + pensionEmpr + property,
    };
  };

  const taxes = calculateCurrentTaxes();

  const handleSave = () => {
    localStorage.setItem('rsGeTaxData', JSON.stringify({
      currentMonth,
      declarations,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const markAsPaid = (id: string, type: 'income' | 'vat' | 'pension' | 'property') => {
    setDeclarations(declarations.map(dec => {
      if (dec.id === id) {
        const updated = { ...dec };
        if (type === 'income') updated.incomeTaxPaid = true;
        if (type === 'vat') updated.vatPaid = true;
        if (type === 'pension') updated.pensionPaid = true;
        if (type === 'property') updated.propertyTaxPaid = true;
        updated.allPaid = updated.incomeTaxPaid && updated.vatPaid && updated.pensionPaid && updated.propertyTaxPaid;
        return updated;
      }
      return dec;
    }));
  };

  if (!mounted) return null;

  const totalUnpaid = declarations.reduce((sum, dec) => 
    sum + (dec.allPaid ? 0 : dec.totalTaxes), 0
  );
  
  const totalPaid = declarations.reduce((sum, dec) => 
    sum + (dec.allPaid ? dec.totalTaxes : 0), 0
  );

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {language === 'ka' ? 'RS.ge საგადასახადო დეკლარაციები' : 'RS.ge Tax Declarations'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          {language === 'ka' 
            ? 'საქართველოს შემოსავლების სამსახურის გადასახადების მართვა და გადახდა'
            : 'Manage and pay taxes to Revenue Service of Georgia'}
        </p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          {language === 'ka' ? '✓ მონაცემები წარმატებით შენახულია' : '✓ Data saved successfully'}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4">
          <p className="text-sm font-medium text-gray-600">
            {language === 'ka' ? 'გადასახადი' : 'Unpaid Taxes'}
          </p>
          <p className="font-bold text-red-600 mt-2 break-words" style={{ fontSize: '19px' }}>{formatCurrency(totalUnpaid)}</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4">
          <p className="text-sm font-medium text-gray-600">
            {language === 'ka' ? 'გადახდილი' : 'Paid Taxes'}
          </p>
          <p className="font-bold text-green-600 mt-2 break-words" style={{ fontSize: '19px' }}>{formatCurrency(totalPaid)}</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4">
          <p className="text-sm font-medium text-gray-600">
            {language === 'ka' ? 'მიმდინარე თვის გადასახადები' : 'Current Month Taxes'}
          </p>
          <p className="font-bold text-blue-600 mt-2 break-words" style={{ fontSize: '19px' }}>{formatCurrency(taxes.total)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('declarations')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
              activeTab === 'declarations'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {language === 'ka' ? 'დეკლარაციები' : 'Declarations'}
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
              activeTab === 'payments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {language === 'ka' ? 'გადახდები' : 'Payments'}
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
              activeTab === 'summary'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {language === 'ka' ? 'შეჯამება' : 'Summary'}
          </button>
        </div>
      </div>

      {/* Declarations Tab */}
      {activeTab === 'declarations' && (
        <div className="space-y-4">
          {declarations.map((dec) => (
            <div key={dec.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{dec.month} {dec.year}</h3>
                  <p className="text-sm text-gray-500">
                    {language === 'ka' ? 'ჯამური: ' : 'Total: '}{formatCurrency(dec.totalTaxes)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  dec.allPaid 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {dec.allPaid 
                    ? (language === 'ka' ? 'გადახდილი' : 'Paid')
                    : (language === 'ka' ? 'გადასახდელი' : 'Unpaid')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Income Tax */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {language === 'ka' ? 'საშემოსავლო გადასახადი (20%)' : 'Income Tax (20%)'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'ka' ? 'ვადა: ' : 'Due: '}{dec.incomeTaxDueDate}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(dec.incomeTax)}</p>
                  </div>
                  {!dec.incomeTaxPaid && (
                    <button
                      onClick={() => markAsPaid(dec.id, 'income')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {language === 'ka' ? 'მონიშვნა გადახდილად' : 'Mark as Paid'}
                    </button>
                  )}
                </div>

                {/* VAT */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {language === 'ka' ? 'დღგ (18%)' : 'VAT (18%)'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'ka' ? 'ვადა: ' : 'Due: '}{dec.vatDueDate}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(dec.vatAmount)}</p>
                  </div>
                  {!dec.vatPaid && (
                    <button
                      onClick={() => markAsPaid(dec.id, 'vat')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {language === 'ka' ? 'მონიშვნა გადახდილად' : 'Mark as Paid'}
                    </button>
                  )}
                </div>

                {/* Pension */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {language === 'ka' ? 'საპენსიო შენატანი' : 'Pension Fund'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'ka' ? 'თანამშრომელი: ' : 'Employee: '}{formatCurrency(dec.pensionEmployee)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'ka' ? 'დამსაქმებელი: ' : 'Employer: '}{formatCurrency(dec.pensionEmployer)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      {formatCurrency(dec.pensionEmployee + dec.pensionEmployer)}
                    </p>
                  </div>
                  {!dec.pensionPaid && (
                    <button
                      onClick={() => markAsPaid(dec.id, 'pension')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {language === 'ka' ? 'მონიშვნა გადახდილად' : 'Mark as Paid'}
                    </button>
                  )}
                </div>

                {/* Property Tax */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {language === 'ka' ? 'ქონების გადასახადი' : 'Property Tax'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === 'ka' ? 'ვადა: ' : 'Due: '}{dec.propertyTaxDueDate}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(dec.propertyTax)}</p>
                  </div>
                  {!dec.propertyTaxPaid && (
                    <button
                      onClick={() => markAsPaid(dec.id, 'property')}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {language === 'ka' ? 'მონიშვნა გადახდილად' : 'Mark as Paid'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            {language === 'ka' ? 'გადახდის ისტორია' : 'Payment History'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">
                    {language === 'ka' ? 'თარიღი' : 'Date'}
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">
                    {language === 'ka' ? 'ტიპი' : 'Type'}
                  </th>
                  <th className="text-right py-2 px-3 font-semibold text-gray-900">
                    {language === 'ka' ? 'თანხა' : 'Amount'}
                  </th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">
                    {language === 'ka' ? 'სტატუსი' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {declarations.filter(d => d.allPaid).map((dec) => (
                  <tr key={dec.id} className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-900">{dec.month} {dec.year}</td>
                    <td className="py-2 px-3 text-gray-600">
                      {language === 'ka' ? 'ყველა გადასახადი' : 'All Taxes'}
                    </td>
                    <td className="py-2 px-3 text-right font-medium text-gray-900">
                      {formatCurrency(dec.totalTaxes)}
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {language === 'ka' ? 'გადახდილი' : 'Paid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
            {language === 'ka' ? 'გადასახადების შეჯამება' : 'Tax Summary'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'ka' ? 'საქართველოს გადასახადების ტიპები:' : 'Georgian Tax Types:'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">
                    {language === 'ka' ? 'საშემოსავლო გადასახადი' : 'Income Tax'}
                  </span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">
                    {language === 'ka' ? 'დღგ (დამატებული ღირებულების გადასახადი)' : 'VAT (Value Added Tax)'}
                  </span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">
                    {language === 'ka' ? 'საპენსიო (თანამშრომელი)' : 'Pension (Employee)'}
                  </span>
                  <span className="font-medium">2%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">
                    {language === 'ka' ? 'საპენსიო (დამსაქმებელი)' : 'Pension (Employer)'}
                  </span>
                  <span className="font-medium">2%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">
                    {language === 'ka' ? 'ქონების გადასახადი' : 'Property Tax'}
                  </span>
                  <span className="font-medium">0.1%-1%</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === 'ka' ? 'RS.ge - საქართველოს შემოსავლების სამსახური' : 'RS.ge - Revenue Service of Georgia'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'ka'
                  ? 'ყველა გადასახადი უნდა გადაიხადოს rs.ge პლატფორმაზე თვის 15 რიცხვამდე. გთხოვთ შეინახოთ გადახდის დადასტურება.'
                  : 'All taxes must be paid on rs.ge platform by the 15th of each month. Please keep payment confirmation.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium shadow-md"
        >
          {language === 'ka' ? 'შენახვა' : 'Save'}
        </button>
        <a
          href="https://rs.ge"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-center"
        >
          {language === 'ka' ? 'RS.ge-ზე გადასვლა' : 'Go to RS.ge'}
        </a>
      </div>
    </div>
  );
}
