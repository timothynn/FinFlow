'use client';

import React, { useState } from 'react';
import { useFinance } from '@/hooks/useFinance';
import { Dashboard } from '@/components/Dashboard';
import { AddExpense } from '@/components/AddExpense';
import { BudgetManager } from '@/components/BudgetManager';
import { ExpenseList } from '@/components/ExpenseList';

type Tab = 'dashboard' | 'add' | 'budgets' | 'expenses';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { expenses, budgets, isLoading, addExpense, deleteExpense, updateBudget, deleteBudget } =
    useFinance();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            💰 FinFlow
          </h1>
          <p className="text-gray-600">
            Track your expenses and manage your budget effectively
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm border">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Add Expense
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'budgets'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Budgets
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'expenses'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Expenses
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <Dashboard expenses={expenses} budgets={budgets} />
        )}
        {activeTab === 'add' && <AddExpense onAdd={addExpense} />}
        {activeTab === 'budgets' && (
          <BudgetManager
            budgets={budgets}
            expenses={expenses}
            onUpdate={updateBudget}
            onDelete={deleteBudget}
          />
        )}
        {activeTab === 'expenses' && (
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        )}
      </div>
    </div>
  );
}
