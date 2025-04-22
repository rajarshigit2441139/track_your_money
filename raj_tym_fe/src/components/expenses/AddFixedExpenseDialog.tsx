import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface FixedExpense {
    id: number;
    name: string;
    amount: number;
    dueDate: number;
    category: string;
}

interface AddFixedExpenseDialogProps {
    onExpenseAdded: (newExpense: FixedExpense) => void;
}

export default function AddFixedExpenseDialog({ onExpenseAdded }: AddFixedExpenseDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<FixedExpense, 'id'>>({
        name: '',
        amount: 0,
        dueDate: 1,
        category: ''
    });

    const categories = [
        "Housing",
        "Utilities",
        "Transportation",
        "Insurance",
        "Health",
        "Entertainment",
        "Subscriptions",
        "Other"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // In a real app, you would make an API call here
            const newExpense: FixedExpense = {
                ...formData,
                id: Date.now() // This should come from the backend in a real app
            };
            onExpenseAdded(newExpense);
            toast.success("Fixed expense added successfully");
            setOpen(false);
            setFormData({
                name: '',
                amount: 0,
                dueDate: 1,
                category: ''
            });
        } catch (error) {
            toast.error("Failed to add fixed expense");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Fixed Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Fixed Expense</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date (Day of Month)</Label>
                        <Input
                            id="dueDate"
                            type="number"
                            min="1"
                            max="31"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: parseInt(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full">
                        Add Fixed Expense
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 