import { createMachine, assign } from 'xstate';

// Define categorized financial activities
export const OPERATING_EXPENSES = [
  // Payroll related
  'WAGES_EXPENSE',
  'EMPLOYEE_BENEFITS',
  'SALES_COMMISSION',
  
  // Marketing related
  'ADVERTISING_EXPENSE',
  'PROMOTION_EXPENSE',
  'EVENT_EXPENSE',
  'DIGITAL_MARKETING',
  
  // Office related
  'OFFICE_RENT',
  'UTILITIES_EXPENSE',
  'OFFICE_SUPPLIES',
  'MAINTENANCE_EXPENSE',
  
  // Professional services
  'LEGAL_FEES',
  'ACCOUNTING_FEES',
  'CONSULTING_FEES',
  
  // Technology
  'SOFTWARE_EXPENSE',
  'HARDWARE_EXPENSE',
  'HOSTING_EXPENSE',
  
  // Other operating
  'TRAVEL_EXPENSE',
  'ENTERTAINMENT_EXPENSE',
  'INSURANCE_EXPENSE',
  'TRAINING_EXPENSE',
] as const;

export const REVENUE_STREAMS = [
  // Product sales
  'RETAIL_SALES',
  'WHOLESALE_SALES',
  'ONLINE_SALES',
  
  // Service revenue
  'CONSULTING_REVENUE',
  'MAINTENANCE_REVENUE',
  'TRAINING_REVENUE',
  
  // Subscription revenue
  'MONTHLY_SUBSCRIPTION',
  'ANNUAL_SUBSCRIPTION',
  'ENTERPRISE_SUBSCRIPTION',
  
  // Other revenue
  'LICENSING_FEES',
  'COMMISSION_INCOME',
  'RENTAL_INCOME',
] as const;

export const INVESTMENT_ACTIVITIES = [
  // Property & Equipment
  'LAND_PURCHASE',
  'BUILDING_PURCHASE',
  'BUILDING_IMPROVEMENT',
  'MANUFACTURING_EQUIPMENT',
  'OFFICE_EQUIPMENT',
  'VEHICLE_PURCHASE',
  
  // Technology & IP
  'IT_INFRASTRUCTURE',
  'PATENT_PURCHASE',
  'SOFTWARE_DEVELOPMENT',
  
  // Financial investments
  'MARKETABLE_SECURITIES',
  'LONG_TERM_INVESTMENT',
  'BUSINESS_ACQUISITION',
  'RESEARCH_DEVELOPMENT',
] as const;

export const FINANCING_ACTIVITIES = [
  // Debt related
  'BANK_LOAN_RECEIPT',
  'BANK_LOAN_PAYMENT',
  'BOND_ISSUANCE',
  'BOND_PAYMENT',
  'CREDIT_LINE_DRAW',
  'CREDIT_LINE_PAYMENT',
  'LEASE_PAYMENT',
  
  // Equity related
  'COMMON_STOCK_ISSUANCE',
  'PREFERRED_STOCK_ISSUANCE',
  'STOCK_BUYBACK',
  'DIVIDEND_PAYMENT',
] as const;

// Combine all activities into a single array
export const FINANCIAL_ACTIVITIES = [
  ...OPERATING_EXPENSES,
  ...REVENUE_STREAMS,
  ...INVESTMENT_ACTIVITIES,
  ...FINANCING_ACTIVITIES,
] as const;

// Define type from the const array
export type FinancialActivity = typeof FINANCIAL_ACTIVITIES[number];

export interface Transaction {
  activity: FinancialActivity;
  amount: number;
  timestamp: string;
}

export type FinancialEvent = 
  | { type: 'PROCESS_TRANSACTION'; transaction: Transaction }
  | { type: 'REMOVE_TRANSACTION'; transaction: Transaction }
  | { type: 'UNDO' }
  | { type: 'RESET' };

export interface FinancialContext {
  selectedActivity: FinancialActivity | null;
  lastRemovedTransaction: Transaction | null;
  cashBalance: {
    checkingAccounts: number;
    savingsAccounts: number;
    pettyCash: number;
    restrictedCash: number;
  };
  assets: {
    currentAssets: {
      inventory: number;
      accountsReceivable: number;
      shortTermInvestments: number;
      prepaidExpenses: number;
    };
    nonCurrentAssets: {
      property: number;
      equipment: number;
      accumulatedDepreciation: number;
      longTermInvestments: number;
      intangibleAssets: number;
    };
  };
  liabilities: {
    currentLiabilities: {
      accountsPayable: number;
      shortTermLoans: number;
      accruedExpenses: number;
      deferredRevenue: number;
      taxesPayable: number;
    };
    longTermLiabilities: {
      longTermDebt: number;
      bondPayable: number;
      leaseLiabilities: number;
      pensionLiabilities: number;
    };
  };
  equity: {
    ownershipEquity: {
      commonStock: number;
      preferredStock: number;
      treasuryStock: number;
    };
    retainedEarnings: number;
    additionalPaidInCapital: number;
    accumulatedOtherComprehensiveIncome: number;
  };
  revenue: {
    operatingRevenue: {
      productSales: {
        directSales: number;
        channelSales: number;
        onlineSales: number;
      };
      serviceSales: {
        consultingRevenue: number;
        maintenanceRevenue: number;
        subscriptionRevenue: number;
      };
    };
    nonOperatingRevenue: {
      interestIncome: number;
      investmentGains: number;
      otherIncome: number;
    };
  };
  expenses: {
    operatingExpenses: {
      directCosts: {
        materialsCost: number;
        laborCost: number;
        manufacturingOverhead: number;
      };
      sellingExpenses: {
        salesCommission: number;
        advertisingCost: number;
        marketingExpense: number;
      };
      administrativeExpenses: {
        salariesAndWages: number;
        officeRent: number;
        utilities: number;
        officeSupplies: number;
        insurance: number;
      };
    };
    nonOperatingExpenses: {
      interestExpense: number;
      taxExpense: number;
      depreciationExpense: number;
      amortizationExpense: number;
    };
  };
  transactions: Transaction[];
}

const processTransaction = assign<FinancialContext, FinancialEvent>((context, event) => {
  if (event.type !== 'PROCESS_TRANSACTION' && event.type !== 'REMOVE_TRANSACTION') return context;
  
  const { transaction } = event;
  const amount = event.type === 'REMOVE_TRANSACTION' ? -transaction.amount : transaction.amount;

  const baseUpdate = {
    ...context,
    transactions: event.type === 'REMOVE_TRANSACTION' ? context.transactions.filter(tx => tx.timestamp !== transaction.timestamp) : [transaction, ...context.transactions]
  };

  switch (transaction.activity) {
    // Operating Expenses - Payroll Related
    case 'WAGES_EXPENSE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              salariesAndWages: context.expenses.operatingExpenses.administrativeExpenses.salariesAndWages + amount
            }
          }
        }
      };

    case 'EMPLOYEE_BENEFITS':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              salariesAndWages: context.expenses.operatingExpenses.administrativeExpenses.salariesAndWages + amount
            }
          }
        }
      };

    case 'SALES_COMMISSION':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            sellingExpenses: {
              ...context.expenses.operatingExpenses.sellingExpenses,
              salesCommission: context.expenses.operatingExpenses.sellingExpenses.salesCommission + amount
            }
          }
        }
      };

    // Operating Expenses - Marketing Related
    case 'ADVERTISING_EXPENSE':
    case 'PROMOTION_EXPENSE':
    case 'EVENT_EXPENSE':
    case 'DIGITAL_MARKETING':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            sellingExpenses: {
              ...context.expenses.operatingExpenses.sellingExpenses,
              marketingExpense: context.expenses.operatingExpenses.sellingExpenses.marketingExpense + amount
            }
          }
        }
      };

    // Operating Expenses - Office Related
    case 'OFFICE_RENT':
    case 'MAINTENANCE_EXPENSE':
    case 'OFFICE_SUPPLIES':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              officeRent: context.expenses.operatingExpenses.administrativeExpenses.officeRent + amount
            }
          }
        }
      };

    case 'UTILITIES_EXPENSE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              utilities: context.expenses.operatingExpenses.administrativeExpenses.utilities + amount
            }
          }
        }
      };

    // Revenue Streams - Product Sales
    case 'RETAIL_SALES':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount
        },
        revenue: {
          ...context.revenue,
          operatingRevenue: {
            ...context.revenue.operatingRevenue,
            productSales: {
              ...context.revenue.operatingRevenue.productSales,
              directSales: context.revenue.operatingRevenue.productSales.directSales + amount
            }
          }
        }
      };

    case 'ONLINE_SALES':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount * 0.7
        },
        revenue: {
          ...context.revenue,
          operatingRevenue: {
            ...context.revenue.operatingRevenue,
            productSales: {
              ...context.revenue.operatingRevenue.productSales,
              onlineSales: context.revenue.operatingRevenue.productSales.onlineSales + amount
            }
          }
        },
        assets: {
          ...context.assets,
          currentAssets: {
            ...context.assets.currentAssets,
            accountsReceivable: context.assets.currentAssets.accountsReceivable + amount * 0.3
          }
        }
      };

    // Investment Activities - Property & Equipment
    case 'LAND_PURCHASE':
    case 'BUILDING_PURCHASE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount * 0.3
        },
        assets: {
          ...context.assets,
          nonCurrentAssets: {
            ...context.assets.nonCurrentAssets,
            property: context.assets.nonCurrentAssets.property + amount
          }
        },
        liabilities: {
          ...context.liabilities,
          longTermLiabilities: {
            ...context.liabilities.longTermLiabilities,
            longTermDebt: context.liabilities.longTermLiabilities.longTermDebt + amount * 0.7
          }
        }
      };

    case 'MANUFACTURING_EQUIPMENT':
    case 'OFFICE_EQUIPMENT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          nonCurrentAssets: {
            ...context.assets.nonCurrentAssets,
            equipment: context.assets.nonCurrentAssets.equipment + amount
          }
        }
      };

    // Financing Activities - Debt
    case 'BANK_LOAN_RECEIPT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount
        },
        liabilities: {
          ...context.liabilities,
          longTermLiabilities: {
            ...context.liabilities.longTermLiabilities,
            longTermDebt: context.liabilities.longTermLiabilities.longTermDebt + amount
          }
        }
      };

    case 'BANK_LOAN_PAYMENT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        liabilities: {
          ...context.liabilities,
          longTermLiabilities: {
            ...context.liabilities.longTermLiabilities,
            longTermDebt: context.liabilities.longTermLiabilities.longTermDebt - amount * 0.8
          }
        },
        expenses: {
          ...context.expenses,
          nonOperatingExpenses: {
            ...context.expenses.nonOperatingExpenses,
            interestExpense: context.expenses.nonOperatingExpenses.interestExpense + amount * 0.2
          }
        }
      };

    // Financing Activities - Equity
    case 'COMMON_STOCK_ISSUANCE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount
        },
        equity: {
          ...context.equity,
          ownershipEquity: {
            ...context.equity.ownershipEquity,
            commonStock: context.equity.ownershipEquity.commonStock + amount * 0.8
          },
          additionalPaidInCapital: context.equity.additionalPaidInCapital + amount * 0.2
        }
      };

    case 'DIVIDEND_PAYMENT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        equity: {
          ...context.equity,
          retainedEarnings: context.equity.retainedEarnings - amount
        }
      };

    // Professional Services
    case 'LEGAL_FEES':
    case 'ACCOUNTING_FEES':
    case 'CONSULTING_FEES':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              officeSupplies: context.expenses.operatingExpenses.administrativeExpenses.officeSupplies + amount
            }
          }
        }
      };

    // Technology Expenses
    case 'SOFTWARE_EXPENSE':
    case 'HARDWARE_EXPENSE':
    case 'HOSTING_EXPENSE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          currentAssets: {
            ...context.assets.currentAssets,
            prepaidExpenses: context.assets.currentAssets.prepaidExpenses + amount * 0.5
          }
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              officeSupplies: context.expenses.operatingExpenses.administrativeExpenses.officeSupplies + amount * 0.5
            }
          }
        }
      };

    // Other Operating Expenses
    case 'TRAVEL_EXPENSE':
    case 'ENTERTAINMENT_EXPENSE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              officeSupplies: context.expenses.operatingExpenses.administrativeExpenses.officeSupplies + amount
            }
          }
        }
      };

    case 'INSURANCE_EXPENSE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          currentAssets: {
            ...context.assets.currentAssets,
            prepaidExpenses: context.assets.currentAssets.prepaidExpenses + amount * 0.8
          }
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              insurance: context.expenses.operatingExpenses.administrativeExpenses.insurance + amount * 0.2
            }
          }
        }
      };

    case 'TRAINING_EXPENSE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            administrativeExpenses: {
              ...context.expenses.operatingExpenses.administrativeExpenses,
              salariesAndWages: context.expenses.operatingExpenses.administrativeExpenses.salariesAndWages + amount
            }
          }
        }
      };

    // Additional Revenue Streams
    case 'WHOLESALE_SALES':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount * 0.4
        },
        assets: {
          ...context.assets,
          currentAssets: {
            ...context.assets.currentAssets,
            accountsReceivable: context.assets.currentAssets.accountsReceivable + amount * 0.6
          }
        },
        revenue: {
          ...context.revenue,
          operatingRevenue: {
            ...context.revenue.operatingRevenue,
            productSales: {
              ...context.revenue.operatingRevenue.productSales,
              channelSales: context.revenue.operatingRevenue.productSales.channelSales + amount
            }
          }
        }
      };

    case 'CONSULTING_REVENUE':
    case 'MAINTENANCE_REVENUE':
    case 'TRAINING_REVENUE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount * 0.7
        },
        assets: {
          ...context.assets,
          currentAssets: {
            ...context.assets.currentAssets,
            accountsReceivable: context.assets.currentAssets.accountsReceivable + amount * 0.3
          }
        },
        revenue: {
          ...context.revenue,
          operatingRevenue: {
            ...context.revenue.operatingRevenue,
            serviceSales: {
              ...context.revenue.operatingRevenue.serviceSales,
              consultingRevenue: context.revenue.operatingRevenue.serviceSales.consultingRevenue + amount
            }
          }
        }
      };

    case 'MONTHLY_SUBSCRIPTION':
    case 'ANNUAL_SUBSCRIPTION':
    case 'ENTERPRISE_SUBSCRIPTION':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount
        },
        liabilities: {
          ...context.liabilities,
          currentLiabilities: {
            ...context.liabilities.currentLiabilities,
            deferredRevenue: context.liabilities.currentLiabilities.deferredRevenue + amount * 0.9
          }
        },
        revenue: {
          ...context.revenue,
          operatingRevenue: {
            ...context.revenue.operatingRevenue,
            serviceSales: {
              ...context.revenue.operatingRevenue.serviceSales,
              subscriptionRevenue: context.revenue.operatingRevenue.serviceSales.subscriptionRevenue + amount * 0.1
            }
          }
        }
      };

    case 'LICENSING_FEES':
    case 'COMMISSION_INCOME':
    case 'RENTAL_INCOME':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts + amount
        },
        revenue: {
          ...context.revenue,
          nonOperatingRevenue: {
            ...context.revenue.nonOperatingRevenue,
            otherIncome: context.revenue.nonOperatingRevenue.otherIncome + amount
          }
        }
      };

    // Technology & IP Investments
    case 'IT_INFRASTRUCTURE':
    case 'SOFTWARE_DEVELOPMENT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          nonCurrentAssets: {
            ...context.assets.nonCurrentAssets,
            intangibleAssets: context.assets.nonCurrentAssets.intangibleAssets + amount
          }
        }
      };

    case 'PATENT_PURCHASE':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          nonCurrentAssets: {
            ...context.assets.nonCurrentAssets,
            intangibleAssets: context.assets.nonCurrentAssets.intangibleAssets + amount
          }
        }
      };

    // Financial Investments
    case 'MARKETABLE_SECURITIES':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          currentAssets: {
            ...context.assets.currentAssets,
            shortTermInvestments: context.assets.currentAssets.shortTermInvestments + amount
          }
        }
      };

    case 'LONG_TERM_INVESTMENT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        assets: {
          ...context.assets,
          nonCurrentAssets: {
            ...context.assets.nonCurrentAssets,
            longTermInvestments: context.assets.nonCurrentAssets.longTermInvestments + amount
          }
        }
      };

    case 'BUSINESS_ACQUISITION':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount * 0.4
        },
        assets: {
          ...context.assets,
          nonCurrentAssets: {
            ...context.assets.nonCurrentAssets,
            intangibleAssets: context.assets.nonCurrentAssets.intangibleAssets + amount
          }
        },
        liabilities: {
          ...context.liabilities,
          longTermLiabilities: {
            ...context.liabilities.longTermLiabilities,
            longTermDebt: context.liabilities.longTermLiabilities.longTermDebt + amount * 0.6
          }
        }
      };

    case 'RESEARCH_DEVELOPMENT':
      return {
        ...baseUpdate,
        cashBalance: {
          ...context.cashBalance,
          checkingAccounts: context.cashBalance.checkingAccounts - amount
        },
        expenses: {
          ...context.expenses,
          operatingExpenses: {
            ...context.expenses.operatingExpenses,
            directCosts: {
              ...context.expenses.operatingExpenses.directCosts,
              laborCost: context.expenses.operatingExpenses.directCosts.laborCost + amount * 0.7,
              materialsCost: context.expenses.operatingExpenses.directCosts.materialsCost + amount * 0.3
            }
          }
        }
      };

    default:
      return context;
  }
});

export function isIncome(act: FinancialActivity) {
    const incomeActivities: FinancialActivity[] =  [...REVENUE_STREAMS]
    // const spendingActivities= ['PAYROLL_EXPENSE', 'MARKETING_EXPENSE', 'UTILITIES_EXPENSE', 
    //     'SUPPLIES_EXPENSE', 'INSURANCE_EXPENSE', 'RENT_EXPENSE', 'DIVIDEND_PAYMENT','EQUIPMENT_PURCHASE', 'PROPERTY_ACQUISITION', 'RESEARCH_DEVELOPMENT',
    //    'SECURITIES_INVESTMENT']
    if(incomeActivities.includes(act)) {
        return true;
    } else {
        return false;
    }
}

export const STORAGE_KEY = 'financial_flow_state';

export function loadPersistedState(): Partial<FinancialContext> {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error);
  }
  return {};
}

export function persistState(state: FinancialContext) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save state to localStorage:', error);
  }
}

export const initialContext: FinancialContext = {
  selectedActivity: null,
  lastRemovedTransaction: null,
  cashBalance: {
    checkingAccounts: 0,
    savingsAccounts: 0,
    pettyCash: 0,
    restrictedCash: 0,
  },
  assets: {
    currentAssets: {
      inventory: 0,
      accountsReceivable: 0,
      shortTermInvestments: 0,
      prepaidExpenses: 0,
    },
    nonCurrentAssets: {
      property: 0,
      equipment: 0,
      accumulatedDepreciation: 0,
      longTermInvestments: 0,
      intangibleAssets: 0,
    },
  },
  liabilities: {
    currentLiabilities: {
      accountsPayable: 0,
      shortTermLoans: 0,
      accruedExpenses: 0,
      deferredRevenue: 0,
      taxesPayable: 0,
    },
    longTermLiabilities: {
      longTermDebt: 0,
      bondPayable: 0,
      leaseLiabilities: 0,
      pensionLiabilities: 0,
    },
  },
  equity: {
    ownershipEquity: {
      commonStock: 0,
      preferredStock: 0,
      treasuryStock: 0,
    },
    retainedEarnings: 0,
    additionalPaidInCapital: 0,
    accumulatedOtherComprehensiveIncome: 0,
  },
  revenue: {
    operatingRevenue: {
      productSales: {
        directSales: 0,
        channelSales: 0,
        onlineSales: 0,
      },
      serviceSales: {
        consultingRevenue: 0,
        maintenanceRevenue: 0,
        subscriptionRevenue: 0,
      },
    },
    nonOperatingRevenue: {
      interestIncome: 0,
      investmentGains: 0,
      otherIncome: 0,
    },
  },
  expenses: {
    operatingExpenses: {
      directCosts: {
        materialsCost: 0,
        laborCost: 0,
        manufacturingOverhead: 0,
      },
      sellingExpenses: {
        salesCommission: 0,
        advertisingCost: 0,
        marketingExpense: 0,
      },
      administrativeExpenses: {
        salariesAndWages: 0,
        officeRent: 0,
        utilities: 0,
        officeSupplies: 0,
        insurance: 0,
      },
    },
    nonOperatingExpenses: {
      interestExpense: 0,
      taxExpense: 0,
      depreciationExpense: 0,
      amortizationExpense: 0,
    },
  },
  transactions: [],
};

export const financialMachine = createMachine<FinancialContext, FinancialEvent>({
  id: 'financial',
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      on: {
        PROCESS_TRANSACTION: {
          target: 'processing',
          actions: assign({
            selectedActivity: (_, event) => event.transaction.activity,
            lastRemovedTransaction: null
          })
        },
        REMOVE_TRANSACTION: {
          target: 'processing',
          actions: assign({
            selectedActivity: (_, event) => event.transaction.activity,
            lastRemovedTransaction: (_, event) => event.transaction
          })
        },
        UNDO: {
          target: 'processing',
          actions: assign((context) => ({
            selectedActivity: context.lastRemovedTransaction?.activity || null,
          })),
          cond: (context) => context.lastRemovedTransaction !== null
        },
        RESET: {
          actions: assign(() => initialContext)
        }
      }
    },
    processing: {
      entry: [
        processTransaction,
        assign((context, event) => {
          if (event.type === 'UNDO' && context.lastRemovedTransaction) {
            return {
              ...context,
              transactions: [context.lastRemovedTransaction, ...context.transactions],
              lastRemovedTransaction: null
            };
          }
          return context;
        })
      ],
      always: 'idle'
    }
  }
}); 