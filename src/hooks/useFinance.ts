'use client';

import { useState, useEffect } from 'react';
import { Expense, CATEGORIES } from '@/lib/types';
import { storage } from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function useFinance() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setExpenses(storage.getExpenses());
    setBudgets(storage.getBudgets());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      storage.setExpenses(expenses);
    }
  }, [expenses, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      storage.setBudgets(budgets);
    }
  }, [budgets, isLoading]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const updateBudget = (category: string, limit: number) => {
    setBudgets((prev) => ({ ...prev, [category]: limit }));
  };

  const deleteBudget = (category: string) => {
    setBudgets((prev) => {
      const newBudgets = { ...prev };
      delete newBudgets[category];
      return newBudgets;
    });
  };

  return {
    expenses,
    budgets,
    isLoading,
    addExpense,
    deleteExpense,
    updateBudget,
    deleteBudget,
  };
}
