import { Expense, Budget } from './types';

const STORAGE_KEYS = {
  EXPENSES: 'finflow_expenses',
  BUDGETS: 'finflow_budgets',
};

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  },

  setExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  getBudgets: (): Record<string, number> => {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return data ? JSON.parse(data) : {};
  },

  setBudgets: (budgets: Record<string, number>): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  },

  exportData: (): void => {
    const data = {
      expenses: storage.getExpenses(),
      budgets: storage.getBudgets(),
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflow-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
