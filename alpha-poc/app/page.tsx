import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">PayFlow</div>
          <Link
            href="/cabinet"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Payroll Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Automate your payroll, manage employees, and process payments with
            confidence. Built for modern companies.
          </p>
          <Link
            href="/cabinet"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose PayFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Automated Payroll
              </h3>
              <p className="text-gray-600">
                Set it and forget it. Automate payroll runs on your schedule—weekly,
                bi-weekly, or monthly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Employee Management
              </h3>
              <p className="text-gray-600">
                Easily manage employee records, roles, salaries, and payment methods
                in one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Connect your bank account and process payments securely with full
                audit trails.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Insights
              </h3>
              <p className="text-gray-600">
                Track payroll costs, payment status, and employee metrics at a glance.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-3xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Notifications
              </h3>
              <p className="text-gray-600">
                Get notified about pending payments, failed transactions, and payroll
                runs.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enterprise Ready
              </h3>
              <p className="text-gray-600">
                Built with security and compliance in mind for teams of any size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">PayFlow</h4>
              <p className="text-sm">
                Simple payroll management for modern companies.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 PayFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
