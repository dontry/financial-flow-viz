import React from 'react';
import { FinancialActivity, FINANCIAL_ACTIVITIES } from '@financial-flow-viz/core';

interface Props {
  onSubmit: (activity: FinancialActivity, amount: number) => void;
}

export const FinancialControls: React.FC<Props> = ({ onSubmit }) => {
  const [activity, setActivity] = React.useState<FinancialActivity | ''>('');
  const [amount, setAmount] = React.useState('');

  const handleSubmit = () => {
    if (activity && amount) {
      onSubmit(activity as FinancialActivity, Number(amount));
      setAmount('');
      setActivity('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">New Transaction</h2>
      <div className="flex gap-4">
        <select 
          value={activity}
          onChange={(e) => setActivity(e.target.value as FinancialActivity)}
          className="flex-1 rounded-md border-gray-300 shadow-sm text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Activity</option>
          {FINANCIAL_ACTIVITIES.map(act => (
            <option key={act} value={act}>
              {act.replace('_', ' ')}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="flex-1 rounded-md border-gray-300 shadow-sm text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
        />
        
        <button 
          onClick={handleSubmit}
          disabled={!activity || !amount}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Process Transaction
        </button>
      </div>
    </div>
  );
}; 