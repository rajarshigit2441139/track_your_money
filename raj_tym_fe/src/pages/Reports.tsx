import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, FileBarChart2, RefreshCw } from "lucide-react";
import { categoryColors } from "@/data/demoData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { transactionApi } from "@/services/api";

interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  description: string;
  date: string;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Reports() {
  const [reportPeriod, setReportPeriod] = useState("3");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
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

  const getMonthlyTotals = () => {
    const monthlyData: Record<number, { income: number; expenses: number }> = {};
    
    transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth() + 1;
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }
      if (transaction.type === 'income') {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expenses += transaction.amount;
      }
    });
    
    return monthlyData;
  };

  // Generate report data based on selected period
  const generateReport = () => {
    setIsGenerating(true);

    // Simulate report generation with a short delay
    setTimeout(() => {
      const monthlyTotals = getMonthlyTotals();
      
      // Create chart data from monthly totals
      const chartData = Object.entries(monthlyTotals).map(([month, data]) => ({
        name: monthNames[parseInt(month) - 1],
        income: data.income,
        expenses: data.expenses,
        balance: data.income - data.expenses,
      }));

      // Calculate category totals
      const categoryTotals: Record<string, number> = {};
      transactions
        .filter(t => t.type === 'expense')
        .forEach(transaction => {
          if (!categoryTotals[transaction.category]) {
            categoryTotals[transaction.category] = 0;
          }
          categoryTotals[transaction.category] += transaction.amount;
        });

      const categoryData = Object.entries(categoryTotals).map(([category, total]) => ({
        name: category,
        value: total,
        color: categoryColors[category] || "#333333",
      }));

      setReportData({
        chartData,
        categoryData,
        summary: {
          totalIncome: Object.values(monthlyTotals).reduce((acc, { income }) => acc + income, 0),
          totalExpenses: Object.values(monthlyTotals).reduce((acc, { expenses }) => acc + expenses, 0),
          balance: Object.values(monthlyTotals).reduce((acc, { income, expenses }) => acc + income - expenses, 0),
          period: reportPeriod === "3" ? "3 Months" : reportPeriod === "6" ? "6 Months" : "12 Months",
        }
      });

      setIsGenerating(false);
      toast.success(`${reportPeriod} month report generated successfully`);
    }, 1500);
  };

  // Download report as PDF (simulated)
  const downloadReport = () => {
    toast.success("Report download started");
    // In a real app, this would trigger a PDF generation and download
    setTimeout(() => {
      toast.success("Report downloaded successfully");
    }, 1500);
  };

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
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">Analyze your financial data</p>
        </div>
      </div>

      {/* Report Generation Controls */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Generate Financial Report</CardTitle>
          <CardDescription>
            Select a time period and generate a detailed report of your finances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="w-full md:w-auto">
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Last 3 Months</SelectItem>
                  <SelectItem value="6">Last 6 Months</SelectItem>
                  <SelectItem value="12">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={generateReport} 
              className="bg-finance-primary hover:bg-finance-primary-dark"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FileBarChart2 className="mr-2 h-4 w-4" /> Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Results */}
      {reportData && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Financial Summary - {reportData.summary.period}</CardTitle>
                <CardDescription>
                  Overview of your income and expenses
                </CardDescription>
              </div>
              <Button 
                onClick={downloadReport} 
                variant="outline"
                className="bg-white dark:bg-gray-800"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Total Income</h3>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    ${reportData.summary.totalIncome.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
                  <h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">Total Expenses</h3>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    ${reportData.summary.totalExpenses.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Net Balance</h3>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    ${reportData.summary.balance.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#2E7D32" />
                    <Bar dataKey="expenses" name="Expenses" fill="#FF5722" />
                    <Bar dataKey="balance" name="Balance" fill="#2196F3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Categories */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>
                Breakdown of your expenses by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.categoryData.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <span className="font-medium">${category.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-full" 
                        style={{ 
                          width: `${(category.value / reportData.summary.totalExpenses) * 100}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Data shown is based on transactions from the selected period
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Empty state */}
      {!reportData && !isGenerating && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileBarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No reports generated yet</h3>
          <p className="text-muted-foreground mt-1 mb-6 max-w-md">
            Select a time period and generate a report to analyze your financial data
          </p>
        </div>
      )}
    </div>
  );
}
