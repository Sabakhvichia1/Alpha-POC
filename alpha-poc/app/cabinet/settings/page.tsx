'use client';

import { useState, useEffect } from 'react';
import { defaultPaymentSettings, PaymentSettings } from '@/lib/mockData';

export default function SettingsPage() {
  const [settings, setSettings] = useState<PaymentSettings>(defaultPaymentSettings);
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage if available
    const stored = localStorage.getItem('paymentSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('paymentSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your payment preferences and bank account.</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ✓ Settings saved successfully!
        </div>
      )}

      {/* Automated Payments Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Automated Payments</h2>

        <div className="space-y-6">
          {/* Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Automated Payroll</p>
              <p className="text-sm text-gray-600 mt-1">
                Automatically run payroll on your selected schedule
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  automatedPayments: !settings.automatedPayments,
                })
              }
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                settings.automatedPayments ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  settings.automatedPayments ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Payment Schedule */}
          {settings.automatedPayments && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Schedule
              </label>
              <div className="space-y-2">
                {(['weekly', 'bi-weekly', 'monthly'] as const).map((schedule) => (
                  <label key={schedule} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="schedule"
                      value={schedule}
                      checked={settings.paymentSchedule === schedule}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          paymentSchedule: e.target.value as any,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-gray-900">
                      {schedule === 'weekly' && 'Weekly'}
                      {schedule === 'bi-weekly' && 'Bi-weekly'}
                      {schedule === 'monthly' && 'Monthly'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bank Account Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bank Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              value={settings.bankAccount.accountHolder}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankAccount: {
                    ...settings.bankAccount,
                    accountHolder: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Company Inc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="password"
              value={settings.bankAccount.accountNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankAccount: {
                    ...settings.bankAccount,
                    accountNumber: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••1234"
            />
            <p className="text-xs text-gray-500 mt-1">Last 4 digits visible for security</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Routing Number
            </label>
            <input
              type="password"
              value={settings.bankAccount.routingNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bankAccount: {
                    ...settings.bankAccount,
                    routingNumber: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••5678"
            />
            <p className="text-xs text-gray-500 mt-1">Last 4 digits visible for security</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-900">
              🔒 Your bank account information is encrypted and stored securely. We never share
              your details with third parties.
            </p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600 mt-1">
                Receive updates about payroll runs, payments, and alerts
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  emailNotifications: !settings.emailNotifications,
                })
              }
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.emailNotifications && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-600">
              <p>✓ Payroll run notifications</p>
              <p>✓ Payment processing alerts</p>
              <p>✓ Failed payment notifications</p>
              <p>✓ Employee status changes</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Save Settings
        </button>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
          Cancel
        </button>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Check our <a href="#" className="text-blue-600 hover:underline">documentation</a> for setup guides</li>
          <li>• Contact <a href="#" className="text-blue-600 hover:underline">support@payflow.com</a> for assistance</li>
          <li>• View our <a href="#" className="text-blue-600 hover:underline">security practices</a></li>
        </ul>
      </div>
    </div>
  );
}
