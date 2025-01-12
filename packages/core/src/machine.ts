import { createMachine, assign } from 'xstate';

// Define categorized financial activities
export const OPERATING_EXPENSES = [
    'PAYROLL_EXPENSE',
    'MARKETING_EXPENSE',
    'UTILITIES_EXPENSE', 
    'SUPPLIES_EXPENSE',
    'INSURANCE_EXPENSE',
    'RENT_EXPENSE',
  ] as const;
  
  export const REVENUE_STREAMS = [
    'PRODUCT_SALES',
    'SERVICE_REVENUE', 
    'SUBSCRIPTION_REVENUE',
    'INTEREST_INCOME',
  ] as const;
  
  export const INVESTMENT_ACTIVITIES = [
    'EQUIPMENT_PURCHASE',
    'PROPERTY_ACQUISITION',
    'RESEARCH_DEVELOPMENT',
    'SECURITIES_INVESTMENT',
  ] as const;
  
  export const FINANCING_ACTIVITIES = [
    'DEBT_PAYMENT',
    'EQUITY_ISSUANCE',
    'DIVIDEND_PAYMENT',
    'LOAN_DISBURSEMENT',
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

type FinancialEvent = 
  | { type: 'PROCESS_TRANSACTION'; activity: FinancialActivity; amount: number }
  | { type: 'RESET' };

interface Transaction {
  activity: FinancialActivity;
  amount: number;
  timestamp: string;
}

interface FinancialContext {
  selectedActivity: FinancialActivity | null;
  amount: number;
  cashBalance: number;
  assets: number;
  liabilities: number;
  equity: number;
  revenue: number;
  expenses: number;
  transactions: Transaction[];
}

const processTransaction = assign<FinancialContext, FinancialEvent>((context, event) => {
  if (event.type !== 'PROCESS_TRANSACTION') return context;
  
  const { activity, amount } = event;
  const newTransaction = {
    activity,
    amount,
    timestamp: new Date().toISOString()
  };
  
  const baseUpdate = {
    ...context,
    transactions: [newTransaction, ...context.transactions]
  };
  
  // Operating Expenses
  if (['PAYROLL_EXPENSE', 'MARKETING_EXPENSE', 'UTILITIES_EXPENSE', 
       'SUPPLIES_EXPENSE', 'INSURANCE_EXPENSE', 'RENT_EXPENSE'].includes(activity)) {
    return {
      ...baseUpdate,
      cashBalance: context.cashBalance - amount,
      expenses: context.expenses + amount,
      equity: context.equity - amount
    };
  }
  
  // Revenue Streams
  if (['PRODUCT_SALES', 'SERVICE_REVENUE', 'SUBSCRIPTION_REVENUE', 
       'INTEREST_INCOME'].includes(activity)) {
    return {
      ...baseUpdate,
      cashBalance: context.cashBalance + amount,
      revenue: context.revenue + amount,
      equity: context.equity + amount
    };
  }
  
  // Investment Activities
  if (['EQUIPMENT_PURCHASE', 'PROPERTY_ACQUISITION', 'RESEARCH_DEVELOPMENT',
       'SECURITIES_INVESTMENT'].includes(activity)) {
    return {
      ...baseUpdate,
      cashBalance: context.cashBalance - amount,
      assets: context.assets + amount
    };
  }
  
  // Financing Activities
  if (activity === 'LOAN_DISBURSEMENT' || activity === 'EQUITY_ISSUANCE') {
    return {
      ...baseUpdate,
      cashBalance: context.cashBalance + amount,
      liabilities: context.liabilities + amount
    };
  }
  
  if (activity === 'DEBT_PAYMENT') {
    return {
      ...baseUpdate,
      cashBalance: context.cashBalance - amount,
      liabilities: context.liabilities - amount
    };
  }
  
  if (activity === 'DIVIDEND_PAYMENT') {
    return {
      ...baseUpdate,
      cashBalance: context.cashBalance - amount,
      equity: context.equity - amount
    };
  }
  
  return context;
});

export function isIncome(act: FinancialActivity) {
    const incomeActivities = ['LOAN_DISBURSEMENT','EQUITY_ISSUANCE','PRODUCT_SALES', 'SERVICE_REVENUE', 'SUBSCRIPTION_REVENUE', 
       'INTEREST_INCOME']
    // const spendingActivities= ['PAYROLL_EXPENSE', 'MARKETING_EXPENSE', 'UTILITIES_EXPENSE', 
    //     'SUPPLIES_EXPENSE', 'INSURANCE_EXPENSE', 'RENT_EXPENSE', 'DIVIDEND_PAYMENT','EQUIPMENT_PURCHASE', 'PROPERTY_ACQUISITION', 'RESEARCH_DEVELOPMENT',
    //    'SECURITIES_INVESTMENT']
    if(incomeActivities.includes(act)) {
        return true;
    } else {
        return false;
    }
}

export const financialMachine = createMachine<FinancialContext, FinancialEvent>({
  id: 'financial',
  initial: 'idle',
  context: {
    selectedActivity: null,
    amount: 0,
    cashBalance: 1000,
    assets: 1000,
    liabilities: 0,
    equity: 1000,
    revenue: 0,
    expenses: 0,
    transactions: []
  },
  states: {
    idle: {
      on: {
        PROCESS_TRANSACTION: {
          target: 'processing',
          actions: assign({
            selectedActivity: (_, event) => event.activity,
            amount: (_, event) => event.amount
          })
        }
      }
    },
    processing: {
      entry: processTransaction,
      always: 'idle'
    }
  }
}); 