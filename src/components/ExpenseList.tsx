'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Expense } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <p className="text-center text-gray-500">
            No expenses yet. Add your first expense to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {expense.description || expense.category}
                </div>
                <div className="text-sm text-gray-500">
                  {expense.category} • {formatDate(expense.date)}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(expense.amount)}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(expense.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
