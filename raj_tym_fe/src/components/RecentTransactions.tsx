interface Transaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: string;
}

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
    // Sort transactions by date (most recent first) and take the first 5
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-4">
            {recentTransactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                    <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground capitalize">
                                {transaction.category}
                            </span>
                        </div>
                    </div>
                    <span className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
} 