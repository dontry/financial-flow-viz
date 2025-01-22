import React from "react";
import {
  FinancialActivity,
  FINANCIAL_ACTIVITIES,
  Transaction,
} from "@financial-flow-viz/core";
import { Icon } from "@iconify/react";
interface Props {
  onSubmit: (transaction: Transaction) => void;
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export const FinancialControls: React.FC<Props> = ({ onSubmit, onReset, onUndo, canUndo }) => {
  const [activity, setActivity] = React.useState<FinancialActivity | "">("");
  const [amount, setAmount] = React.useState("");

  const handleSubmit = () => {
    if (activity && amount) {
      onSubmit({
        activity: activity as FinancialActivity,
        amount: Number(amount),
        timestamp: new Date().toISOString(),
      });
      setAmount("");
      setActivity("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">New Transaction</h2>
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title={canUndo ? "Undo last removal" : "Nothing to undo"}
          >
            <Icon icon="material-symbols:undo" className="h-5 w-5" />
            Undo
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Reset All
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as FinancialActivity)}
          className="flex-1 rounded-md border-gray-300 shadow-sm text-gray-800 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Activity</option>
          {FINANCIAL_ACTIVITIES.map((act) => (
            <option key={act} value={act}>
              {act.replace("_", " ")}
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
