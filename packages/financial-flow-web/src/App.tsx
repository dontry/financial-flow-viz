import { financialMachine, Transaction } from "@financial-flow-viz/core";
import { FinancialControls } from "./components/FinancialControls";
import { FinancialStatement } from "./components/FinancialStatement";
import { TransactionList } from "./components/TransactionList";
import { sum } from "./utils/sum";
import { usePersistentMachine } from "./hooks/usePersistentMachine";
import { useMachine } from "@xstate/react";

function App({ usePersistence = false }) {
  const [state, send] = usePersistence 
    ? usePersistentMachine(financialMachine)
    : useMachine(financialMachine);

  const {
    cashBalance,
    assets,
    liabilities,
    equity,
    revenue,
    expenses,
    transactions,
    lastRemovedTransaction
  } = state.context;

  const handleTransaction = (transaction: Transaction) => {
    send({ type: "PROCESS_TRANSACTION", transaction });
  };

  const handleReset = () => {
    send({ type: "RESET" });
  };

  const handleRemoveTransaction = (transaction: Transaction) => {
    send({ type: "REMOVE_TRANSACTION", transaction });
  };

  const handleUndo = () => {
    send({ type: "UNDO" });
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-8">
      <div className="mx-auto flex gap-4">
        <div className="flex-1 space-y-8">
          <FinancialControls 
            onSubmit={handleTransaction} 
            onReset={handleReset}
            onUndo={handleUndo}
            canUndo={lastRemovedTransaction !== null}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FinancialStatement
              title="Cash Flow Statement"
              sections={[
                {
                  id: "cashBalance",
                  label: "Cash Balance",
                  children: [
                    {
                      id: "checkingAccounts",
                      label: "Checking Accounts",
                      value: cashBalance.checkingAccounts,
                    },
                    {
                      id: "savingsAccounts",
                      label: "Savings Accounts",
                      value: cashBalance.savingsAccounts,
                    },
                    {
                      id: "pettyCash",
                      label: "Investments",
                      value: cashBalance.pettyCash,
                    },
                    {
                      id: "restrictedCash",
                      label: "Cash on Hand",
                      value: cashBalance.restrictedCash,
                    },
                  ],
                },
              ]}
            />
            <FinancialStatement
              title="Income Statement"
              sections={[
                {
                  id: "revenue",
                  label: "Revenue",
                  children: [
                    {
                      id: "productSales",
                      label: "Product Sales",
                      value: sum(revenue.operatingRevenue.productSales),
                      children: [
                        {
                          id: "directSales",
                          label: "Direct Sales",
                          value:
                            revenue.operatingRevenue.productSales.directSales,
                        },
                        {
                          id: "channelSales",
                          label: "Channel Sales",
                          value:
                            revenue.operatingRevenue.productSales.channelSales,
                        },
                        {
                          id: "onlineSales",
                          label: "Online Sales",
                          value:
                            revenue.operatingRevenue.productSales.onlineSales,
                        },
                      ],
                    },
                    {
                      id: "serviceSales",
                      label: "Service Sales",
                      value: sum(revenue.operatingRevenue.serviceSales),
                      children: [
                        {
                          id: "consultingRevenue",
                          label: "Consulting Revenue",
                          value:
                            revenue.operatingRevenue.serviceSales
                              .consultingRevenue,
                        },
                        {
                          id: "maintenanceRevenue",
                          label: "Maintenance Revenue",
                          value:
                            revenue.operatingRevenue.serviceSales
                              .maintenanceRevenue,
                        },
                        {
                          id: "subscriptionRevenue",
                          label: "Subscription Revenue",
                          value:
                            revenue.operatingRevenue.serviceSales
                              .subscriptionRevenue,
                        },
                      ],
                    },
                    {
                      id: "nonOperatingRevenue",
                      label: "Non-Operating Revenue",
                      value: sum(revenue.nonOperatingRevenue),
                      children: [
                        {
                          id: "interestIncome",
                          label: "Interest Income",
                          value: revenue.nonOperatingRevenue.interestIncome,
                        },
                        {
                          id: "investmentGains",
                          label: "Investment Gains",
                          value: revenue.nonOperatingRevenue.investmentGains,
                        },
                        {
                          id: "otherIncome",
                          label: "Other Income",
                          value: revenue.nonOperatingRevenue.otherIncome,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "expenses",
                  label: "Expenses",
                  children: [
                    {
                      id: "operatingExpenses",
                      label: "Operating Expenses",
                      value: sum(expenses.operatingExpenses),
                      children: [
                        {
                          id: "directCosts",
                          label: "Direct Costs",
                          value: sum(expenses.operatingExpenses.directCosts),
                          children: [
                            {
                              id: "materialsCost",
                              label: "Materials Cost",
                              value:
                                expenses.operatingExpenses.directCosts
                                  .materialsCost,
                            },
                            {
                              id: "laborCost",
                              label: "Labor Cost",
                              value:
                                expenses.operatingExpenses.directCosts
                                  .laborCost,
                            },
                            {
                              id: "manufacturingOverhead",
                              label: "Manufacturing Overhead",
                              value:
                                expenses.operatingExpenses.directCosts
                                  .manufacturingOverhead,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "sellingExpenses",
                      label: "Selling Expenses",
                      value: sum(expenses.operatingExpenses.sellingExpenses),
                      children: [
                        {
                          id: "salesCommission",
                          label: "Sales Commission",
                          value:
                            expenses.operatingExpenses.sellingExpenses
                              .salesCommission,
                        },
                        {
                          id: "advertisingCost",
                          label: "Advertising Cost",
                          value:
                            expenses.operatingExpenses.sellingExpenses
                              .advertisingCost,
                        },
                        {
                          id: "marketingExpense",
                          label: "Marketing Expense",
                          value:
                            expenses.operatingExpenses.sellingExpenses
                              .marketingExpense,
                        },
                      ],
                    },
                    {
                      id: "administrativeExpenses",
                      label: "Administrative Expenses",
                      value: sum(
                        expenses.operatingExpenses.administrativeExpenses
                      ),
                      children: [
                        {
                          id: "salariesAndWages",
                          label: "Salaries and Wages",
                          value:
                            expenses.operatingExpenses.administrativeExpenses
                              .salariesAndWages,
                        },
                        {
                          id: "officeRent",
                          label: "Office Rent",
                          value:
                            expenses.operatingExpenses.administrativeExpenses
                              .officeRent,
                        },
                        {
                          id: "utilities",
                          label: "Utilities",
                          value:
                            expenses.operatingExpenses.administrativeExpenses
                              .utilities,
                        },
                        {
                          id: "officeSupplies",
                          label: "Office Supplies",
                          value:
                            expenses.operatingExpenses.administrativeExpenses
                              .officeSupplies,
                        },
                        {
                          id: "insurance",
                          label: "Insurance",
                          value:
                            expenses.operatingExpenses.administrativeExpenses
                              .insurance,
                        },
                      ],
                    },
                    {
                      id: "nonOperatingExpenses",
                      label: "Non-Operating Expenses",
                      value: sum(expenses.nonOperatingExpenses),
                      children: [
                        {
                          id: "interestExpense",
                          label: "Interest Expense",
                          value: expenses.nonOperatingExpenses.interestExpense,
                        },
                        {
                          id: "taxExpense",
                          label: "Tax Expense",
                          value: expenses.nonOperatingExpenses.taxExpense,
                        },
                        {
                          id: "depreciationExpense",
                          label: "Depreciation Expense",
                          value:
                            expenses.nonOperatingExpenses.depreciationExpense,
                        },
                        {
                          id: "amortizationExpense",
                          label: "Amortization Expense",
                          value:
                            expenses.nonOperatingExpenses.amortizationExpense,
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
            <FinancialStatement
              title="Balance Sheet"
              sections={[
                {
                  id: "assets",
                  label: "Assets",
                  children: [
                    {
                      id: "currentAssets",
                      label: "Current Assets",
                      value: sum(assets.currentAssets),
                      children: [
                        {
                          id: "inventory",
                          label: "Inventory",
                          value: assets.currentAssets.inventory,
                        },
                        {
                          id: "accountsReceivable",
                          label: "Accounts Receivable",
                          value: assets.currentAssets.accountsReceivable,
                        },
                        {
                          id: "shortTermInvestments",
                          label: "Short-Term Investments",
                          value: assets.currentAssets.shortTermInvestments,
                        },
                        {
                          id: "prepaidExpenses",
                          label: "Prepaid Expenses",
                          value: assets.currentAssets.prepaidExpenses,
                        },
                      ],
                    },
                    {
                      id: "nonCurrentAssets",
                      label: "Non-Current Assets",
                      value: sum(assets.nonCurrentAssets),
                      children: [
                        {
                          id: "property",
                          label: "Property",
                          value: assets.nonCurrentAssets.property,
                        },
                        {
                          id: "equipment",
                          label: "Equipment",
                          value: assets.nonCurrentAssets.equipment,
                        },
                        {
                          id: "accumulatedDepreciation",
                          label: "Accumulated Depreciation",
                          value:
                            assets.nonCurrentAssets.accumulatedDepreciation,
                        },
                        {
                          id: "longTermInvestments",
                          label: "Long-Term Investments",
                          value: assets.nonCurrentAssets.longTermInvestments,
                        },
                        {
                          id: "intangibleAssets",
                          label: "Intangible Assets",
                          value: assets.nonCurrentAssets.intangibleAssets,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "liabilities",
                  label: "Liabilities",
                  children: [
                    {
                      id: "currentLiabilities",
                      label: "Current Liabilities",
                      value: sum(liabilities.currentLiabilities),
                      children: [
                        {
                          id: "accountsPayable",
                          label: "Accounts Payable",
                          value: liabilities.currentLiabilities.accountsPayable,
                        },
                        {
                          id: "shortTermLoans",
                          label: "Short-Term Loans",
                          value: liabilities.currentLiabilities.shortTermLoans,
                        },
                        {
                          id: "accruedExpenses",
                          label: "Accrued Expenses",
                          value: liabilities.currentLiabilities.accruedExpenses,
                        },
                      ],
                    },
                    {
                      id: "longTermLiabilities",
                      label: "Non-Current Liabilities",
                      value: sum(liabilities.longTermLiabilities),
                      children: [
                        {
                          id: "longTermDebt",
                          label: "Long-Term Debt",
                          value: liabilities.longTermLiabilities.longTermDebt,
                        },
                        {
                          id: "bondPayable",
                          label: "Bond Payable",
                          value: liabilities.longTermLiabilities.bondPayable,
                        },
                        {
                          id: "leaseLiabilities",
                          label: "Lease Liabilities",
                          value: liabilities.longTermLiabilities.leaseLiabilities,
                        },
                        {
                          id: "pensionLiabilities",
                          label: "Pension Liabilities",
                          value:
                            liabilities.longTermLiabilities.pensionLiabilities,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "revenue",
                  label: "Revenue ",
                  children: [
                    {
                      id: "operatingRevenue",
                      label: "Operating Revenue",
                      value:
                        revenue.operatingRevenue.productSales.directSales +
                        revenue.operatingRevenue.serviceSales.consultingRevenue,
                    },
                    {
                      id: "nonOperatingRevenue",
                      label: "Non-Operating Revenue",
                      value:
                        revenue.nonOperatingRevenue.interestIncome +
                        revenue.nonOperatingRevenue.investmentGains +
                        revenue.nonOperatingRevenue.otherIncome,
                    },
                  ],
                },
                {
                  id: "equity",
                  label: "Equity",
                  children: [
                    {
                      id: "ownershipEquity",
                      label: "Ownership Equity",
                      value: sum(equity.ownershipEquity),
                      children: [
                        {
                          id: "commonStock",
                          label: "Common Stock",
                          value: equity.ownershipEquity.commonStock,
                        },
                        {
                          id: "preferredStock",
                          label: "Preferred Stock",
                          value: equity.ownershipEquity.preferredStock,
                        },
                        {
                          id: "treasuryStock",
                          label: "Treasury Stock",
                          value: equity.ownershipEquity.treasuryStock,
                        },
                      ],
                    },
                    {
                      id: "retainedEarnings",
                      label: "Retained Earnings",
                      value: equity.retainedEarnings,
                    },
                    {
                      id: "additionalPaidInCapital",
                      label: "Additional Paid-In Capital",
                      value: equity.additionalPaidInCapital,
                    },
                    {
                      id: "accumulatedOtherComprehensiveIncome",
                      label: "Accumulated Other Comprehensive Income",
                      value: equity.accumulatedOtherComprehensiveIncome,
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
        <TransactionList transactions={transactions} onRemoveTransaction={handleRemoveTransaction} />
      </div>
    </div>
  );
}

export default App;
