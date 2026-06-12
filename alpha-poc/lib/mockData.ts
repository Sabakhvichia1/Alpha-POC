export interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'on-leave' | 'terminated';
  salary: number;
  paymentMethod: 'bank-transfer' | 'check' | 'direct-deposit';
  email: string;
  joinDate: string;
  employmentType: 'hourly' | 'daily' | 'monthly';
  hourlyRate?: number;
  hoursWorked?: number;
  dailyRate?: number;
  daysWorked?: number;
  monthlyBaseline?: number;
  manualOverride?: number;
  pensionScheme: boolean;
  taxStatus: 'standard' | 'small-business';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paymentDate?: string;
  grossSalary: number;
  incomeTax: number;
  pensionContribution: number;
  netSalary: number;
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

export interface MonthlyFinancials {
  id: string;
  month: string;
  year: number;
  grossRevenue: number;
  totalExpenses: number;
  rsGeTaxes: number;
  totalTaxesPaid: number;
  netProfit: number;
  isPlanned: boolean;
}

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'გიორგი მელაძე',
    role: 'უფროსი ინჟინერი',
    status: 'active',
    salary: 3000,
    paymentMethod: 'direct-deposit',
    email: 'giorgi@company.ge',
    joinDate: '2023-01-15',
    employmentType: 'monthly',
    monthlyBaseline: 3000,
    pensionScheme: true,
    taxStatus: 'standard',
  },
  {
    id: '2',
    name: 'ნინო ბერიძე',
    role: 'პროდუქტის მენეჯერი',
    status: 'active',
    salary: 2800,
    paymentMethod: 'direct-deposit',
    email: 'nino@company.ge',
    joinDate: '2023-03-20',
    employmentType: 'monthly',
    monthlyBaseline: 2800,
    pensionScheme: true,
    taxStatus: 'standard',
  },
  {
    id: '3',
    name: 'დავით ქავთარაძე',
    role: 'დიზაინერი',
    status: 'active',
    salary: 2400,
    paymentMethod: 'direct-deposit',
    email: 'davit@company.ge',
    joinDate: '2023-06-10',
    employmentType: 'hourly',
    hourlyRate: 15,
    hoursWorked: 160,
    pensionScheme: false,
    taxStatus: 'small-business',
  },
  {
    id: '4',
    name: 'ანა გელაშვილი',
    role: 'მარკეტინგის მენეჯერი',
    status: 'active',
    salary: 2200,
    paymentMethod: 'direct-deposit',
    email: 'ana@company.ge',
    joinDate: '2024-01-05',
    employmentType: 'daily',
    dailyRate: 110,
    daysWorked: 20,
    pensionScheme: true,
    taxStatus: 'standard',
  },
  {
    id: '5',
    name: 'ლევან წულუკიძე',
    role: 'თანამშრომელი',
    status: 'on-leave',
    salary: 2000,
    paymentMethod: 'check',
    email: 'levan@company.ge',
    joinDate: '2023-09-01',
    employmentType: 'monthly',
    monthlyBaseline: 2000,
    pensionScheme: true,
    taxStatus: 'standard',
  },
];

export const calculateGeorgianTaxes = (
  grossSalary: number,
  taxStatus: 'standard' | 'small-business',
  pensionScheme: boolean
): {
  incomeTax: number;
  pensionEmployee: number;
  pensionEmployer: number;
  netSalary: number;
} => {
  let incomeTax = 0;
  let pensionEmployee = 0;
  let pensionEmployer = 0;

  if (taxStatus === 'standard') {
    incomeTax = grossSalary * 0.2;
    
    if (pensionScheme) {
      pensionEmployee = grossSalary * 0.02;
      pensionEmployer = grossSalary * 0.02;
    }
  } else {
    incomeTax = grossSalary * 0.01;
  }

  const netSalary = grossSalary - incomeTax - pensionEmployee;

  return {
    incomeTax,
    pensionEmployee,
    pensionEmployer,
    netSalary,
  };
};

export const calculateEmployeeSalary = (employee: Employee): number => {
  if (employee.manualOverride !== undefined) {
    return employee.manualOverride;
  }

  switch (employee.employmentType) {
    case 'hourly':
      return (employee.hourlyRate || 0) * (employee.hoursWorked || 0);
    case 'daily':
      return (employee.dailyRate || 0) * (employee.daysWorked || 0);
    case 'monthly':
    default:
      return employee.monthlyBaseline || employee.salary;
  }
};

export const generatePayrollRecords = (): PayrollRecord[] => {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 7);

  return mockEmployees.map((emp) => {
    const grossSalary = calculateEmployeeSalary(emp);
    const taxes = calculateGeorgianTaxes(grossSalary, emp.taxStatus, emp.pensionScheme);

    return {
      id: `payroll-${emp.id}`,
      employeeId: emp.id,
      employeeName: emp.name,
      amount: taxes.netSalary,
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'pending' as const,
      grossSalary,
      incomeTax: taxes.incomeTax,
      pensionContribution: taxes.pensionEmployee,
      netSalary: taxes.netSalary,
    };
  });
};

export const mockActivityLog: ActivityLog[] = [
  {
    id: '1',
    type: 'payroll-run',
    description: 'ხელფასის გაანგარიშება დასრულდა 5 თანამშრომლისთვის',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'payment-processed',
    description: '₾3,000-ის გადახდა დამუშავდა გიორგი მელაძისთვის',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'employee-added',
    description: 'ახალი თანამშრომელი ანა გელაშვილი დაემატა',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'settings-updated',
    description: 'გადახდის განრიგი შეიცვალა ორ-კვირეულზე',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'payment-processed',
    description: '₾2,800-ის გადახდა დამუშავდა ნინო ბერიძისთვის',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const defaultPaymentSettings: PaymentSettings = {
  automatedPayments: true,
  paymentSchedule: 'bi-weekly',
  bankAccount: {
    accountNumber: '****1234',
    routingNumber: '****5678',
    accountHolder: 'კომპანია ლტდ',
  },
  emailNotifications: true,
};

export const generateMockMonthlyFinancials = (isPlanned: boolean): MonthlyFinancials[] => {
  const currentYear = 2026;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return months.map((month, index) => {
    const baseRevenue = 15000 + Math.random() * 5000;
    const multiplier = isPlanned ? 1.35 : 1;
    const grossRevenue = baseRevenue * multiplier;
    
    const rsGeTaxes = grossRevenue * 0.20; // 20% income tax
    const salariesExpense = 12400;
    const otherExpenses = 2000;
    const totalExpenses = rsGeTaxes + salariesExpense + otherExpenses;
    
    const taxableIncome = grossRevenue - totalExpenses;
    const totalTaxesPaid = isPlanned 
      ? taxableIncome * 0.01
      : taxableIncome * 0.15;
    
    const netProfit = taxableIncome - totalTaxesPaid;

    return {
      id: `month-${index + 1}`,
      month,
      year: currentYear,
      grossRevenue,
      totalExpenses,
      rsGeTaxes,
      totalTaxesPaid,
      netProfit,
      isPlanned,
    };
  });
};

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
  // Format with USD to get proper number formatting, then replace $ with ₾
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount).replace('$', '₾');
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
