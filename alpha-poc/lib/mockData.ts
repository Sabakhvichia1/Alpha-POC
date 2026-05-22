export interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'on-leave' | 'terminated';
  salary: number;
  paymentMethod: 'bank-transfer' | 'check' | 'direct-deposit';
  email: string;
  joinDate: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paymentDate?: string;
}

export interface ActivityLog {
  id: string;
  type: 'payroll-run' | 'payment-processed' | 'employee-added' | 'settings-updated';
  description: string;
  timestamp: string;
}

export interface PaymentSettings {
  automatedPayments: boolean;
  paymentSchedule: 'weekly' | 'bi-weekly' | 'monthly';
  bankAccount: {
    accountNumber: string;
    routingNumber: string;
    accountHolder: string;
  };
  emailNotifications: boolean;
}

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Senior Engineer',
    status: 'active',
    salary: 120000,
    paymentMethod: 'direct-deposit',
    email: 'alice@company.com',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Product Manager',
    status: 'active',
    salary: 110000,
    paymentMethod: 'direct-deposit',
    email: 'bob@company.com',
    joinDate: '2023-03-20',
  },
  {
    id: '3',
    name: 'Carol Davis',
    role: 'Designer',
    status: 'active',
    salary: 95000,
    paymentMethod: 'direct-deposit',
    email: 'carol@company.com',
    joinDate: '2023-06-10',
  },
  {
    id: '4',
    name: 'David Wilson',
    role: 'Junior Developer',
    status: 'active',
    salary: 75000,
    paymentMethod: 'direct-deposit',
    email: 'david@company.com',
    joinDate: '2024-01-05',
  },
  {
    id: '5',
    name: 'Emma Brown',
    role: 'Marketing Manager',
    status: 'on-leave',
    salary: 85000,
    paymentMethod: 'check',
    email: 'emma@company.com',
    joinDate: '2023-09-01',
  },
];

// Mock Payroll Records
export const generatePayrollRecords = (): PayrollRecord[] => {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 7);

  return mockEmployees.map((emp) => ({
    id: `payroll-${emp.id}`,
    employeeId: emp.id,
    employeeName: emp.name,
    amount: emp.salary / 26, // Bi-weekly
    dueDate: dueDate.toISOString().split('T')[0],
    status: 'pending' as const,
  }));
};

// Mock Activity Log
export const mockActivityLog: ActivityLog[] = [
  {
    id: '1',
    type: 'payroll-run',
    description: 'Payroll run completed for 5 employees',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'payment-processed',
    description: 'Payment of $23,077 processed to Alice Johnson',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'employee-added',
    description: 'New employee David Wilson added to payroll',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'settings-updated',
    description: 'Payment schedule changed to bi-weekly',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'payment-processed',
    description: 'Payment of $21,154 processed to Bob Smith',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Default Payment Settings
export const defaultPaymentSettings: PaymentSettings = {
  automatedPayments: true,
  paymentSchedule: 'bi-weekly',
  bankAccount: {
    accountNumber: '****1234',
    routingNumber: '****5678',
    accountHolder: 'Company Inc.',
  },
  emailNotifications: true,
};

// Helper functions
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'on-leave':
      return 'bg-yellow-100 text-yellow-800';
    case 'terminated':
      return 'bg-red-100 text-red-800';
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
