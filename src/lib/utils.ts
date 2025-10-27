import { Expense, Budget, CategoryData, MonthlyData, BudgetAlert } from './types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getCategoryTotal = (expenses: Expense[], category: string): number => {
  return expenses
    .filter((exp) => exp.category === category)
    .reduce((sum, exp) => sum + exp.amount, 0);
};

export const getTotalSpending = (expenses: Expense[]): number => {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
};

export const getCategoryData = (expenses: Expense[], categories: readonly string[]): CategoryData[] => {
  return categories
    .map((category) => ({
      name: category,
      value: getCategoryTotal(expenses, category),
    }))
    .filter((item) => item.value > 0);
};

export const getMonthlyData = (expenses: Expense[]): MonthlyData[] => {
  const monthlyMap: Record<string, number> = {};
  
  expenses.forEach((exp) => {
    const month = exp.date.substring(0, 7);
    monthlyMap[month] = (monthlyMap[month] || 0) + exp.amount;
  });

  return Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, amount]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      }),
      amount,
    }));
};

export const getBudgetAlerts = (
  expenses: Expense[],
  budgets: Record<string, number>
): BudgetAlert[] => {
  return Object.entries(budgets)
    .map(([category, limit]) => {
      const spent = getCategoryTotal(expenses, category);
      const percentage = (spent / limit) * 100;
      return { category, limit, spent, percentage };
    })
    .filter((item) => item.percentage >= 80);
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
