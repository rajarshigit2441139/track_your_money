
export type Transaction = {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  description: string;
  date: string;
};

export type FixedExpense = {
  id: string;
  name: string;
  amount: number;
  dueDate: number;
};

export type FinancialGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentSavings: number;
  iconName?: string;
};

// Generate three months of demo data (Jan-Mar)
const generateMonthlyData = (month: number): Transaction[] => {
  const transactions: Transaction[] = [];
  
  // Generate income for the 1st of each month
  transactions.push({
    id: `income-salary-${month}`,
    amount: 5000,
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    date: `2024-0${month}-01`,
  });
  
  if (month === 3) { // March bonus
    transactions.push({
      id: `income-bonus-${month}`,
      amount: 1200,
      type: 'income',
      category: 'Bonus',
      description: 'Performance Bonus',
      date: `2024-0${month}-05`,
    });
  }
  
  // Generate some fixed monthly expenses
  const fixedExpenses = [
    { amount: 1500, category: 'Housing', description: 'Rent Payment', day: 3 },
    { amount: 200, category: 'Utilities', description: 'Electricity Bill', day: 7 },
    { amount: 100, category: 'Utilities', description: 'Water Bill', day: 10 },
    { amount: 80, category: 'Subscription', description: 'Internet Service', day: 12 },
    { amount: 60, category: 'Subscription', description: 'Streaming Services', day: 15 },
    { amount: 800, category: 'Housing', description: 'Home Insurance', day: month === 1 ? 20 : 100 }, // Only in January
    { amount: 400, category: 'Insurance', description: 'Car Insurance', day: month === 3 ? 25 : 100 }, // Only in March
  ];
  
  fixedExpenses.forEach(expense => {
    if (expense.day <= 31) {
      transactions.push({
        id: `expense-${expense.category}-${expense.day}-${month}`,
        amount: expense.amount,
        type: 'expense',
        category: expense.category,
        description: expense.description,
        date: `2024-0${month}-${expense.day.toString().padStart(2, '0')}`,
      });
    }
  });
  
  // Generate some variable expenses
  const variableExpenses = [
    { min: 30, max: 100, category: 'Food', description: 'Grocery Shopping' },
    { min: 20, max: 50, category: 'Transportation', description: 'Fuel' },
    { min: 10, max: 40, category: 'Entertainment', description: 'Movie Night' },
    { min: 15, max: 60, category: 'Health', description: 'Pharmacy' },
  ];
  
  // Add 5-8 variable expenses per month
  const numberOfExpenses = 5 + Math.floor(Math.random() * 4);
  for (let i = 0; i < numberOfExpenses; i++) {
    const expense = variableExpenses[Math.floor(Math.random() * variableExpenses.length)];
    const amount = Math.floor(Math.random() * (expense.max - expense.min + 1)) + expense.min;
    const day = Math.floor(Math.random() * 28) + 1; // Avoid date issues with shorter months
    
    transactions.push({
      id: `expense-variable-${i}-${month}`,
      amount: amount,
      type: 'expense',
      category: expense.category,
      description: expense.description,
      date: `2024-0${month}-${day.toString().padStart(2, '0')}`,
    });
  }
  
  return transactions;
};

export const demoTransactions = [
  ...generateMonthlyData(1), // January
  ...generateMonthlyData(2), // February
  ...generateMonthlyData(3), // March
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const fixedExpenses: FixedExpense[] = [
  { id: '1', name: 'Rent', amount: 1500, dueDate: 3 },
  { id: '2', name: 'Internet', amount: 80, dueDate: 12 },
  { id: '3', name: 'Phone Bill', amount: 60, dueDate: 15 },
  { id: '4', name: 'Electricity', amount: 200, dueDate: 7 },
  { id: '5', name: 'Water', amount: 100, dueDate: 10 },
];

export const financialGoals: FinancialGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentSavings: 6500,
    iconName: 'shield',
  },
  {
    id: '2',
    name: 'New Car',
    targetAmount: 30000,
    currentSavings: 12000,
    iconName: 'car',
  },
  {
    id: '3',
    name: 'House Down Payment',
    targetAmount: 50000,
    currentSavings: 15000,
    iconName: 'home',
  },
];

export const getMonthlyTotals = () => {
  const monthlyData = {
    1: { income: 0, expenses: 0 },
    2: { income: 0, expenses: 0 },
    3: { income: 0, expenses: 0 },
  };

  demoTransactions.forEach(transaction => {
    const month = parseInt(transaction.date.split('-')[1]);
    if (transaction.type === 'income') {
      monthlyData[month].income += transaction.amount;
    } else {
      monthlyData[month].expenses += transaction.amount;
    }
  });

  return monthlyData;
};

export const categoryColors = {
  Salary: '#2E7D32',
  Bonus: '#1B5E20',
  Housing: '#FF5722',
  Utilities: '#FF9800',
  Food: '#8BC34A',
  Transportation: '#03A9F4',
  Entertainment: '#9C27B0',
  Health: '#E91E63',
  Insurance: '#F44336',
  Subscription: '#795548',
};
