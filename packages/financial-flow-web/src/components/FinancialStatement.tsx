import React from 'react';

interface StatementRow {
  label: string;
  value: number;
}

interface Props {
  title: string;
  rows: StatementRow[];
}

export const FinancialStatement: React.FC<Props> = ({ title, rows }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <table className="w-full">
        <tbody>
          {rows.map(row => (
            <tr key={row.label} className="border-b border-gray-100 last:border-0">
              <td className="py-3 text-gray-600">{row.label}</td>
              <td className="py-3 text-right font-medium text-gray-900">
                ${row.value.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 