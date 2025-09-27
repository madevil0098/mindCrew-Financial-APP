import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, Goal, Budget, FinancialHealth, AIInsight, UserProfile } from '@/types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'transactions',
  GOALS: 'goals',
  BUDGETS: 'budgets',
  PROFILE: 'profile',
  FINANCIAL_HEALTH: 'financial_health',
};

// Mock data for initial setup
const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Starbucks Coffee',
    category: 'Food & Dining',
    amount: -4.95,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'expense',
    icon: '☕',
    color: '#f59e0b',
  },
  {
    id: '2',
    name: 'Shell Gas Station',
    category: 'Transportation',
    amount: -45.20,
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    type: 'expense',
    icon: '⛽',
    color: '#ef4444',
  },
  {
    id: '3',
    name: 'Salary Deposit',
    category: 'Income',
    amount: 3500.00,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'income',
    icon: '💰',
    color: '#22c55e',
  },
  {
    id: '4',
    name: 'Amazon Purchase',
    category: 'Shopping',
    amount: -89.99,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'expense',
    icon: '📦',
    color: '#6366f1',
  },
];

const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    current: 7500,
    target: 10000,
    deadline: 'Dec 2025',
    color: ['#22c55e', '#16a34a'],
    icon: '🛡️',
    category: 'emergency',
  },
  {
    id: '2',
    name: 'Dream Vacation',
    current: 1350,
    target: 3000,
    deadline: 'Jun 2025',
    color: ['#f59e0b', '#d97706'],
    icon: '✈️',
    category: 'vacation',
  },
  {
    id: '3',
    name: 'New Car Down Payment',
    current: 6000,
    target: 10000,
    deadline: 'Mar 2026',
    color: ['#6366f1', '#4f46e5'],
    icon: '🚗',
    category: 'purchase',
  },
];

export function useFinancialData() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [financialHealth, setFinancialHealth] = useState<FinancialHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load or initialize data
      const storedTransactions = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      const storedGoals = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);
      const storedProfile = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);

      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        setTransactions(mockTransactions);
        await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(mockTransactions));
      }

      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      } else {
        setGoals(mockGoals);
        await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(mockGoals));
      }

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        const defaultProfile: UserProfile = {
          name: 'John Smith',
          email: 'john.smith@example.com',
          avatar: 'JS',
          joinDate: new Date().toISOString(),
          preferences: {
            currency: 'USD',
            notifications: true,
            darkMode: true,
            language: 'en',
          },
        };
        setProfile(defaultProfile);
        await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultProfile));
      }

      // Calculate financial health
      calculateFinancialHealth();
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateFinancialHealth = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    const emergencyFund = goals.find(g => g.category === 'emergency')?.current || 0;
    
    const health: FinancialHealth = {
      score: Math.min(850, Math.max(300, Math.round(savingsRate * 8 + emergencyFund / 100))),
      savingsRate: Math.round(savingsRate),
      emergencyFund: emergencyFund,
      debtRatio: 15, // Mock value
      trend: savingsRate > 20 ? 'up' : savingsRate < 10 ? 'down' : 'stable',
      change: 25,
    };

    setFinancialHealth(health);
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions));
    calculateFinancialHealth();
  };

  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
  };

  const updateGoal = async (goalId: string, amount: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(goal.target, goal.current + amount) }
        : goal
    );
    
    setGoals(updatedGoals);
    await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
    calculateFinancialHealth();
  };

  const deleteGoal = async (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
  };

  return {
    transactions,
    goals,
    budgets,
    profile,
    financialHealth,
    loading,
    addTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    updateProfile,
    refreshData: loadData,
  };
}