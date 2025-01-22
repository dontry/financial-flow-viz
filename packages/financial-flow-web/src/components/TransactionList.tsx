import React from "react";
import { isIncome, Transaction } from "@financial-flow-viz/core";
import { FINANCIAL_ACTIVITIY_DICT } from "@financial-flow-viz/core";
import { Icon } from "@iconify/react";

interface Props {
  transactions: Transaction[];
  onRemoveTransaction: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<Props> = ({
  transactions,
  onRemoveTransaction,
}) => {
  return (
    <div className="w-96 bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Transaction History
      </h3>
      <div className="space-y-4">
        {transactions.map((tx) => {
          const color = isIncome(tx.activity)
            ? "text-green-600"
            : "text-red-600";
          const desc = FINANCIAL_ACTIVITIY_DICT[tx.activity];
          return (
            <div
              key={tx.timestamp}
              className="border-b border-gray-100 last:border-0 pb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 flex items-center gap-1">
                  {tx.activity.replace("_", " ")}
                  {desc && (
                    <span className="group relative">
                      <Icon
                        icon="material-symbols:info"
                        className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
                      />
                      <span className="pointer-events-none max-w-[200px] absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white text-sm rounded-lg p-2">
                        {desc}
                      </span>
                    </span>
                  )}
                </span>
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${color}`}>
                    ${Math.abs(tx.amount).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveTransaction(tx)}
                    className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                    title="Remove transaction"
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      className="h-5 w-5"
                    />
                  </button>
                </div>
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
