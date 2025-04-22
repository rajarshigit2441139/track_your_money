import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Overview } from "../components/Overview";
import { RecentTransactions } from "../components/RecentTransactions";
import { transactionApi, fixedExpenseApi } from "../services/api";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import AddTransactionDialog from "../components/transactions/AddTransactionDialog";
import AddFixedExpenseDialog from "../components/expenses/AddFixedExpenseDialog";
import EditFixedExpenseDialog from "../components/expenses/EditFixedExpenseDialog";

interface Transaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: string;
}

interface FixedExpense {
    id: number;
    name: string;
    amount: number;
    dueDate: number;
    category: string;
    status: string;
}

// Demo fixed expenses - In a real app, this would come from your backend
const fixedExpenses = [
    { id: 1, name: "Rent", amount: 1200, dueDate: 1, category: "Housing" },
    { id: 2, name: "Internet", amount: 50, dueDate: 5, category: "Utilities" },
    { id: 3, name: "Phone", amount: 40, dueDate: 15, category: "Utilities" },
    { id: 4, name: "Gym", amount: 30, dueDate: 20, category: "Health" },
    { id: 5, name: "Netflix", amount: 15, dueDate: 25, category: "Entertainment" }
];

export default function Dashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);

    useEffect(() => {
        fetchTransactions();
        fetchFixedExpenses();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await transactionApi.getAll();
            setTransactions(response.data as Transaction[]);
            setError(null);
        } catch (err) {
            setError('Failed to fetch transactions');
            toast.error("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    const fetchFixedExpenses = async () => {
        try {
            const response = await fixedExpenseApi.getActive();
            setFixedExpenses(response.data as FixedExpense[]);
        } catch (err) {
            toast.error("Failed to fetch fixed expenses");
        }
    };

    // Calculate summary statistics
    const calculateSummary = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const monthlyTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() === currentMonth && 
                   transactionDate.getFullYear() === currentYear;
        });

        const income = monthlyTransactions
            .filter(t => t.type === 'INCOME')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = monthlyTransactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((sum, t) => sum + t.amount, 0);

        const expensesByCategory = monthlyTransactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        return {
            totalIncome: income,
            totalExpenses: expenses,
            netIncome: income - expenses,
            expensesByCategory
        };
    };

    const handleTransactionAdded = (newTransaction: Transaction) => {
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const handleAddExpense = async (newExpense: Omit<FixedExpense, 'id' | 'status'>) => {
        try {
            const response = await fixedExpenseApi.create({
                ...newExpense,
                status: 'ACTIVE'
            });
            setFixedExpenses(prev => [...prev, response.data as FixedExpense]);
            toast.success("Fixed expense added successfully");
        } catch (err) {
            toast.error("Failed to add fixed expense");
        }
    };

    const handleUpdateExpense = async (expense: FixedExpense) => {
        try {
            const response = await fixedExpenseApi.update(expense.id.toString(), expense);
            setFixedExpenses(prev => prev.map(exp => 
                exp.id === expense.id ? (response.data as FixedExpense) : exp
            ));
            toast.success("Fixed expense updated successfully");
        } catch (err) {
            toast.error("Failed to update fixed expense");
        }
    };

    const handleDeleteExpense = async (id: number) => {
        try {
            await fixedExpenseApi.delete(id.toString());
            setFixedExpenses(prev => prev.filter(expense => expense.id !== id));
            toast.success("Fixed expense deleted successfully");
        } catch (err) {
            toast.error("Failed to delete fixed expense");
        }
    };

    const summary = calculateSummary();

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
                <Button onClick={fetchTransactions} className="mt-4">Retry</Button>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <AddTransactionDialog onTransactionAdded={handleTransactionAdded} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${summary.totalIncome.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${summary.totalExpenses.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${summary.netIncome.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Expense Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Object.entries(summary.expensesByCategory)
                                .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None'}
                        </div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={transactions} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                            You made {transactions.length} transactions this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentTransactions transactions={transactions} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Fixed Monthly Expenses</CardTitle>
                        <AddFixedExpenseDialog onExpenseAdded={handleAddExpense} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {fixedExpenses.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No fixed expenses added yet.</p>
                            ) : (
                                fixedExpenses.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                        <div>
                                            <p className="font-medium">{expense.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Due: Day {expense.dueDate} • {expense.category}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                ${expense.amount.toFixed(2)}
                                            </span>
                                            <EditFixedExpenseDialog
                                                expense={expense}
                                                onExpenseUpdated={handleUpdateExpense}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
