'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';
import { getCategoryTotal } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Input, Select } from './ui/Input';
import { Button } from './ui/Button';
import { formatCurrency } from '@/lib/utils';

interface BudgetManagerProps {
  budgets: Record<string, number>;
  expenses: any[];
  onUpdate: (category: string, limit: number) => void;
  onDelete: (category: string) => void;
}

export function BudgetManager({ budgets, expenses, onUpdate, onDelete }: BudgetManagerProps) {
  const [formData, setFormData] = useState({
    category: CATEGORIES[0],
    limit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.limit || parseFloat(formData.limit) <= 0) {
      alert('Please enter a valid budget limit');
      return;
    }

    onUpdate(formData.category, parseFloat(formData.limit));
    setFormData({ category: CATEGORIES[0], limit: '' });
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Set Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" onSubmit={handleSubmit}>
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>

            <Input
              type="number"
              step="0.01"
              label="Budget Limit"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              placeholder="0.00"
              required
            />

            <Button onClick={handleSubmit} className="w-full" size="lg">
              Set Budget
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(budgets).length === 0 ? (
            <p className="text-center text-gray-500 py-8">No budgets set yet.</p>
          ) : (
            <div className="space-y-4">
              {CATEGORIES.filter((cat) => budgets[cat]).map((category) => {
                const spent = getCategoryTotal(expenses, category);
                const limit = budgets[category];
                const percentage = Math.min((spent / limit) * 100, 100);
                const isWarning = percentage >= 80;

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{category}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm ${
                            isWarning ? 'text-red-600 font-semibold' : 'text-gray-600'
                          }`}
                        >
                          {formatCurrency(spent)} / {formatCurrency(limit)}
                        </span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(category)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isWarning ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
