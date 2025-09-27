export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}

export interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
  color: string[];
  icon: string;
  category: 'emergency' | 'vacation' | 'investment' | 'purchase' | 'other';
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  color: string;
}

export interface FinancialHealth {
  score: number;
  savingsRate: number;
  emergencyFund: number;
  debtRatio: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'trend' | 'achievement';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  preferences: {
    currency: string;
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}