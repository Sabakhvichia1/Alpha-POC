'use client';

import { useState, useEffect } from 'react';
import { defaultSSGeExpenses, SSGeExpenses, calculateSSGeExpenses, formatCurrency, SS_GE_PRICING } from '@/lib/mockData';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<SSGeExpenses>(defaultSSGeExpenses);
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('ssGeExpenses');
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('ssGeExpenses', JSON.stringify(expenses));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalExpenses = calculateSSGeExpenses(expenses);

  if (!mounted) return null;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ss.ge პლატფორმის ხარჯები</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">განცხადებების განთავსების და რეკლამის ხარჯების მართვა</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ხარჯები წარმატებით შენახულია
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">განცხადებების ტარიფები</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              სტანდარტული განცხადებები ({formatCurrency(SS_GE_PRICING.standardListing)} თითო)
            </label>
            <input
              type="number"
              min="0"
              value={expenses.standardListings}
              onChange={(e) => setExpenses({ ...expenses, standardListings: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VIP განცხადებები ({formatCurrency(SS_GE_PRICING.vipListing)} თითო)
            </label>
            <input
              type="number"
              min="0"
              value={expenses.vipListings}
              onChange={(e) => setExpenses({ ...expenses, vipListings: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VIP+ განცხადებები ({formatCurrency(SS_GE_PRICING.vipPlusListing)} თითო)
            </label>
            <input
              type="number"
              min="0"
              value={expenses.vipPlusListings}
              onChange={(e) => setExpenses({ ...expenses, vipPlusListings: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Super VIP განცხადებები ({formatCurrency(SS_GE_PRICING.superVipListing)} თითო)
            </label>
            <input
              type="number"
              min="0"
              value={expenses.superVipListings}
              onChange={(e) => setExpenses({ ...expenses, superVipListings: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              რეკლამის ბიუჯეტი (ყოველთვიური)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={expenses.adBoostBudget}
              onChange={(e) => setExpenses({ ...expenses, adBoostBudget: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-gray-900">ჯამური ss.ge ხარჯები:</span>
            <span className="text-blue-600">{formatCurrency(totalExpenses)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ეს თანხა ავტომატურად გამოიკლება ჯამური შემოსავლიდან სუფთა მოგების გამოანგარიშებისას
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">ტარიფების დეტალები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">სტანდარტული</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(SS_GE_PRICING.standardListing)}</p>
            <p className="text-xs text-gray-500 mt-1">{expenses.standardListings} განცხადება</p>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              {formatCurrency(expenses.standardListings * SS_GE_PRICING.standardListing)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">VIP</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(SS_GE_PRICING.vipListing)}</p>
            <p className="text-xs text-gray-500 mt-1">{expenses.vipListings} განცხადება</p>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              {formatCurrency(expenses.vipListings * SS_GE_PRICING.vipListing)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">VIP+</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(SS_GE_PRICING.vipPlusListing)}</p>
            <p className="text-xs text-gray-500 mt-1">{expenses.vipPlusListings} განცხადება</p>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              {formatCurrency(expenses.vipPlusListings * SS_GE_PRICING.vipPlusListing)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Super VIP</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(SS_GE_PRICING.superVipListing)}</p>
            <p className="text-xs text-gray-500 mt-1">{expenses.superVipListings} განცხადება</p>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              {formatCurrency(expenses.superVipListings * SS_GE_PRICING.superVipListing)}
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">რეკლამის ბიუჯეტი</p>
          <p className="text-xl font-bold text-blue-600">{formatCurrency(expenses.adBoostBudget)}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          შენახვა
        </button>
        <button 
          onClick={() => setExpenses(defaultSSGeExpenses)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          საწყისი მნიშვნელობები
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 sm:p-6">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">ss.ge-ს პლატფორმის ხარჯების გამოკლება</h3>
        <p className="text-xs sm:text-sm text-gray-600">
          ყველა აქ მითითებული ხარჯი ავტომატურად გამოიკლება თქვენი ჯამური შემოსავლიდან სუფთა მოგების (ხელზე ასაღები) გამოანგარიშებისას. 
          ეს უზრუნველყოფს ზუსტ ფინანსურ ანგარიშგებას და დაგეგმვას.
        </p>
      </div>
    </div>
  );
}
