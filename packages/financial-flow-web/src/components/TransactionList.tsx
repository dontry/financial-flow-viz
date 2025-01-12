import React from 'react';
import { FinancialActivity, isIncome } from '@financial-flow-viz/core';

interface Transaction {
  activity: FinancialActivity;
  amount: number;
  timestamp: string;
}

interface Props {
  transactions: Transaction[];
}

export const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="w-96 bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
      <div className="space-y-4">
        {transactions.map((tx) => {
            const color = isIncome(tx.activity) ? 'text-green-600' : 'text-red-600';
            return (
                <div key={tx.timestamp} className="border-b border-gray-100 last:border-0 pb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">{tx.activity.replace('_', ' ')}</span>
                        <span className={`font-medium ${color}`}>
                            ${Math.abs(tx.amount).toFixed(2)}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        {new Date(tx.timestamp).toLocaleString()}
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}; 