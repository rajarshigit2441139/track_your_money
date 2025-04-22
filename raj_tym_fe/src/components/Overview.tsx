import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Transaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: string;
}

interface MonthlyData {
    name: string;
    income: number;
    expenses: number;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function Overview({ data }: { data: Transaction[] }) {
    const getMonthlyData = (): MonthlyData[] => {
        const monthlyTotals: Record<number, { income: number; expenses: number }> = {};
        
        data.forEach(transaction => {
            const date = new Date(transaction.date);
            const month = date.getMonth();
            
            if (!monthlyTotals[month]) {
                monthlyTotals[month] = { income: 0, expenses: 0 };
            }
            
            if (transaction.type === 'INCOME') {
                monthlyTotals[month].income += transaction.amount;
            } else {
                monthlyTotals[month].expenses += transaction.amount;
            }
        });

        return Object.entries(monthlyTotals).map(([month, totals]) => ({
            name: monthNames[parseInt(month)],
            income: totals.income,
            expenses: totals.expenses
        }));
    };

    const chartData = getMonthlyData();

    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5722" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#2E7D32"
                    fillOpacity={1}
                    fill="url(#income)"
                    name="Income"
                />
                <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#FF5722"
                    fillOpacity={1}
                    fill="url(#expenses)"
                    name="Expenses"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
} 