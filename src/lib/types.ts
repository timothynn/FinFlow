export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  receipt?: string;
  createdAt: string;
}

export interface Budget {
  category: string;
  limit: number;
}

export interface BudgetAlert {
  category: string;
  limit: number;
  spent: number;
  percentage: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface MonthlyData {
  month: string;
  amount: number;
}

export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Other',
] as const;

export type Category = typeof CATEGORIES[number];
