export const FINANCIAL_ACTIVITIY_DICT = {
    // Operating Expenses - Payroll Related
    'WAGES_EXPENSE': 'Regular salary and wage payments to employees',
    'EMPLOYEE_BENEFITS': 'Health insurance, retirement plans, and other employee benefits',
    'SALES_COMMISSION': 'Commission payments to sales staff based on their sales performance',

    // Operating Expenses - Marketing Related
    'ADVERTISING_EXPENSE': 'Costs for promoting products/services through paid advertising channels',
    'PROMOTION_EXPENSE': 'Costs for sales promotions, discounts, and special offers',
    'EVENT_EXPENSE': 'Costs for organizing and participating in business events',
    'DIGITAL_MARKETING': 'Online marketing costs including social media and SEO',

    // Operating Expenses - Office Related
    'OFFICE_RENT': 'Monthly or annual office space rental payments',
    'UTILITIES_EXPENSE': 'Electricity, water, heating, and other utility costs',
    'OFFICE_SUPPLIES': 'General office supplies and materials',
    'MAINTENANCE_EXPENSE': 'Building and equipment maintenance costs',

    // Operating Expenses - Professional Services
    'LEGAL_FEES': 'Payments for legal services and consultation',
    'ACCOUNTING_FEES': 'Payments for accounting and auditing services',
    'CONSULTING_FEES': 'Payments for business consulting services',

    // Operating Expenses - Technology
    'SOFTWARE_EXPENSE': 'Software licenses and subscription fees',
    'HARDWARE_EXPENSE': 'Computer hardware and equipment purchases',
    'HOSTING_EXPENSE': 'Server hosting and cloud service fees',

    // Operating Expenses - Other
    'TRAVEL_EXPENSE': 'Business travel costs including transportation and accommodation',
    'ENTERTAINMENT_EXPENSE': 'Client entertainment and business relationship building costs',
    'INSURANCE_EXPENSE': 'Business insurance premiums and related costs',
    'TRAINING_EXPENSE': 'Employee training and development costs',

    // Revenue Streams - Product Sales
    'RETAIL_SALES': 'Direct sales to consumers through retail channels',
    'WHOLESALE_SALES': 'Bulk sales to retailers or distributors',
    'ONLINE_SALES': 'Sales through e-commerce platforms',

    // Revenue Streams - Service Revenue
    'CONSULTING_REVENUE': 'Income from providing consulting services',
    'MAINTENANCE_REVENUE': 'Income from maintenance and support services',
    'TRAINING_REVENUE': 'Income from providing training services',

    // Revenue Streams - Subscription Revenue
    'MONTHLY_SUBSCRIPTION': 'Revenue from monthly subscription plans',
    'ANNUAL_SUBSCRIPTION': 'Revenue from annual subscription plans',
    'ENTERPRISE_SUBSCRIPTION': 'Revenue from enterprise-level subscription plans',

    // Revenue Streams - Other
    'LICENSING_FEES': 'Income from licensing intellectual property',
    'COMMISSION_INCOME': 'Income earned from commission-based activities',
    'RENTAL_INCOME': 'Income from renting out property or equipment',

    // Investment Activities - Property & Equipment
    'LAND_PURCHASE': 'Investment in land acquisition',
    'BUILDING_PURCHASE': 'Investment in building acquisition',
    'BUILDING_IMPROVEMENT': 'Costs for building upgrades and improvements',
    'MANUFACTURING_EQUIPMENT': 'Investment in manufacturing machinery and equipment',
    'OFFICE_EQUIPMENT': 'Investment in office furniture and equipment',
    'VEHICLE_PURCHASE': 'Investment in company vehicles',

    // Investment Activities - Technology & IP
    'IT_INFRASTRUCTURE': 'Investment in IT systems and infrastructure',
    'PATENT_PURCHASE': 'Acquisition of patents and intellectual property',
    'SOFTWARE_DEVELOPMENT': 'Investment in custom software development',

    // Investment Activities - Financial
    'MARKETABLE_SECURITIES': 'Investment in short-term marketable securities',
    'LONG_TERM_INVESTMENT': 'Investment in long-term financial instruments',
    'BUSINESS_ACQUISITION': 'Investment in acquiring other businesses',
    'RESEARCH_DEVELOPMENT': 'Investment in research and development activities',

    // Financing Activities - Debt Related
    'BANK_LOAN_RECEIPT': 'Funds received from bank loans',
    'BANK_LOAN_PAYMENT': 'Repayment of bank loan principal and interest',
    'BOND_ISSUANCE': 'Funds received from issuing corporate bonds',
    'BOND_PAYMENT': 'Repayment of bond principal and interest',
    'CREDIT_LINE_DRAW': 'Funds drawn from credit line facility',
    'CREDIT_LINE_PAYMENT': 'Repayment of credit line balance',
    'LEASE_PAYMENT': 'Payment for leased assets',

    // Financing Activities - Equity Related
    'COMMON_STOCK_ISSUANCE': 'Funds received from issuing common stock',
    'PREFERRED_STOCK_ISSUANCE': 'Funds received from issuing preferred stock',
    'STOCK_BUYBACK': 'Repurchase of company stock from shareholders',
    'DIVIDEND_PAYMENT': 'Distribution of profits to shareholders'
} as const;

export const FINANCIAL_CONTEXT_DICT = {
    // Cash Balance
    'cashBalance': 'Immediately available funds in business checking accounts',
    'checkingAccounts': 'Immediately available funds in business checking accounts',
    'savingsAccounts': 'Cash reserves held in interest-bearing savings accounts',
    'pettyCash': 'Small amount of cash kept on hand for minor expenses',
    'restrictedCash': 'Cash that is reserved for specific purposes or cannot be immediately accessed',

    // Current Assets
    'currentAssets': 'Assets that are expected to be converted to cash within one year',
    'inventory': 'Value of goods available for sale or materials for production',
    'accountsReceivable': 'Money owed to the business by customers for goods or services',
    'shortTermInvestments': 'Investments expected to be converted to cash within one year',
    'prepaidExpenses': 'Expenses paid in advance that have not yet been used or expired',

    // Non-Current Assets
    'nonCurrentAssets': 'Assets that are not expected to be converted to cash within one year',
    'property': 'Value of land and buildings owned by the business',
    'equipment': 'Value of machinery, vehicles, and other business equipment',
    'accumulatedDepreciation': 'Total depreciation recorded for long-term assets over time',
    'longTermInvestments': 'Investments held for more than one year',
    'intangibleAssets': 'Non-physical assets like patents, trademarks, and goodwill',

    // Current Liabilities
    'currentLiabilities': 'Liabilities that are expected to be paid within one year',
    'accountsPayable': 'Money owed to suppliers for goods or services received',
    'shortTermLoans': 'Debt that must be repaid within one year',
    'accruedExpenses': 'Expenses that have been incurred but not yet paid',
    'deferredRevenue': 'Payments received for goods or services that have not yet been delivered',
    'taxesPayable': 'Taxes owed but not yet paid to government authorities',

    // Long-Term Liabilities
    'longTermLiabilities': 'Liabilities that are not expected to be paid within one year',
    'longTermDebt': 'Loans and other debt obligations due after one year',
    'bondPayable': 'Money owed to bondholders',
    'leaseLiabilities': 'Long-term obligations under lease agreements',
    'pensionLiabilities': 'Future obligations to pay employee retirement benefits',

    // Ownership Equity
    'ownershipEquity': 'Total value of the company\'s assets minus its liabilities',
    'commonStock': 'Value of issued common shares representing basic ownership in the company',
    'preferredStock': 'Value of issued preferred shares with priority dividend rights',
    'treasuryStock': 'Company shares that have been repurchased from shareholders',
    'retainedEarnings': 'Accumulated profits that have been reinvested in the business',
    'additionalPaidInCapital': 'Amount paid by investors above the par value of issued shares',
    'accumulatedOtherComprehensiveIncome': 'Gains and losses not shown in the main income statement',

    // Operating Revenue
    'operatingRevenue': 'Revenue generated from the company\'s primary operations',
    'directSales': 'Revenue from products sold directly to customers',
    'channelSales': 'Revenue from products sold through distributors or retailers',
    'onlineSales': 'Revenue from products sold through e-commerce platforms',
    'consultingRevenue': 'Income from providing professional advice and expertise',
    'maintenanceRevenue': 'Income from maintaining or servicing products',
    'subscriptionRevenue': 'Recurring revenue from subscription-based services',

    // Non-Operating Revenue
    'nonOperatingRevenue': 'Revenue from sources not part of normal business operations',
    'interestIncome': 'Income earned from investments and bank deposits',
    'investmentGains': 'Profits from the sale of investments',
    'otherIncome': 'Revenue from sources not part of normal business operations',

    // Operating Expenses
    'operatingExpenses': 'Expenses incurred in the normal course of business operations',
    'materialsCost': 'Cost of raw materials used in production',
    'laborCost': 'Wages and benefits paid to production workers',
    'manufacturingOverhead': 'Indirect costs of production like utilities and maintenance',
    'salesCommission': 'Payments to sales staff based on their sales performance',
    'advertisingCost': 'Expenses for promoting products and services',
    'marketingExpense': 'Costs related to marketing campaigns and brand development',
    'salariesAndWages': 'Regular pay for non-production employees',
    'officeRent': 'Cost of leasing office space',
    'utilities': 'Expenses for electricity, water, and other utilities',
    'officeSupplies': 'Cost of consumable office materials',
    'insurance': 'Premiums paid for business insurance coverage',

    // Non-Operating Expenses
    'nonOperatingExpenses': 'Expenses incurred in non-operating activities',
    'interestExpense': 'Cost of borrowing money',
    'taxExpense': 'Income taxes and other tax obligations',
    'depreciationExpense': 'Allocation of asset costs over their useful life',
    'amortizationExpense': 'Gradual write-off of intangible asset costs'
} as const;
