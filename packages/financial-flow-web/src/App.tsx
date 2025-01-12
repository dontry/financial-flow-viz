import { useMachine } from '@xstate/react';
import { financialMachine } from '@financial-flow-viz/core';
import { FinancialControls } from './components/FinancialControls';
import { FinancialStatement } from './components/FinancialStatement';
import { FinancialActivity } from '@financial-flow-viz/core';
import { TransactionList } from './components/TransactionList';

function App() {
  const [state, send] = useMachine(financialMachine);
  const { 
    cashBalance, 
    assets, 
    liabilities, 
    equity,
    revenue,
    expenses,
    transactions 
  } = state.context;

  const handleTransaction = (activity: FinancialActivity, amount: number) => {
    send('PROCESS_TRANSACTION', { activity, amount });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        <div className="flex-1 space-y-8">
          <FinancialControls onSubmit={handleTransaction} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FinancialStatement
              title="Cash Flow Statement"
              rows={[
                { label: 'Cash Balance', value: cashBalance },
              ]}
            />
            <FinancialStatement
              title="Income Statement"
              rows={[
                { label: 'Revenue', value: revenue },
                { label: 'Expenses', value: expenses },
                { label: 'Net Income', value: revenue - expenses },
              ]}
            />
            <FinancialStatement
              title="Balance Sheet"
              rows={[
                { label: 'Assets', value: assets },
                { label: 'Liabilities', value: liabilities },
                { label: 'Equity', value: equity },
              ]}
            />
          </div>
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default App; 