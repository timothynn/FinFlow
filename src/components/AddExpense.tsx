'use client';

import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Input, Select } from './ui/Input';
import { Button } from './ui/Button';

interface AddExpenseProps {
  onAdd: (expense: {
    amount: number;
    category: string;
    description: string;
    date: string;
    receipt?: string;
  }) => void;
}

export function AddExpense({ onAdd }: AddExpenseProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null as string | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onAdd({
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      receipt: formData.receipt || undefined,
    });

    setFormData({
      amount: '',
      category: CATEGORIES[0],
      description: '',
      date: new Date().toISOString().split('T')[0],
      receipt: null,
    });
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, receipt: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="number"
            step="0.01"
            label="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="0.00"
            required
          />

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
            type="text"
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What did you spend on?"
          />

          <Input
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receipt (Optional)
            </label>
            <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
              <Camera className="text-gray-400 mr-2" size={20} />
              <span className="text-sm text-gray-600">
                {formData.receipt ? 'Receipt uploaded ✓' : 'Upload receipt'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
                className="hidden"
              />
            </label>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Add Expense
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
