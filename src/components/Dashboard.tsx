'use client';

import React from 'react';
import { Wallet, TrendingUp, DollarSign, AlertCircle, Download } from 'lucide-react';
import { Expense } from '@/lib/types';
import {
  getTotalSpending,
  getCategoryData,
  getMonthlyData,
  getBudgetAlerts,
  formatCurrency,
  formatDate,
} from '@/lib/utils';
import { CATEGORIES } from '@/lib/types';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { SpendingPieChart } from './Charts/SpendingPieChart';
import { MonthlyBarChart } from './Charts/MonthlyBarChart';
import { storage } from '@/lib/storage';

interface DashboardProps {
  expenses: Expense[];
  budgets: Record<string, number>;
}

export function Dashboard({ expenses, budgets }: DashboardProps) {
  const totalSpending = getTotalSpending(expenses);
  const totalBudget = Object.values(budgets).reduce((sum, val) => sum + val, 0);
  const categoryData = getCategoryData(expenses, CATEGORIES);
  const monthlyData = getMonthlyData(expenses);
  const alerts = getBudgetAlerts(expenses, budgets);

  return (
    <div className="space-y-6">
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-2">Budget Alerts</h3>
              {alerts.map((alert) => (
                <div key={alert.category} className="text-sm text-red-800 mb-1">
                  {alert.category}: {formatCurrency(alert.spent)} of{' '}
                  {formatCurrency(alert.limit)} ({alert.percentage.toFixed(0)}%)
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-600 text-sm font-medium">Total Spending</span>
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-blue-900">
              {formatCurrency(totalSpending)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 text-sm font-medium">Total Budget</span>
              <Wallet className="text-green-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-green-900">
              {formatCurrency(totalBudget)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-600 text-sm font-medium">Transactions</span>
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-purple-900">{expenses.length}</div>
          </CardContent>
        </Card>
      </div>

      {categoryData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingPieChart data={categoryData} />
            </CardContent>
          </Card>

          {monthlyData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyBarChart data={monthlyData} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => storage.exportData()}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No expenses yet. Add your first expense to get started!
            </p>
          ) : (
            <div className="space-y-3">
              {expenses.slice(0, 5).map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {expense.description || expense.category}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expense.category} • {formatDate(expense.date)}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
