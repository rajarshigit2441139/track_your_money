import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Pencil, Plus, Trash2, Home, Car, Shield, Briefcase, Plane } from "lucide-react";
import { toast } from "sonner";
import { goalApi } from "../services/api";

interface FinancialGoal {
    id: string;
    name: string;
    targetAmount: number;
    currentSavings: number;
    iconName?: string;
    status: string;
    description?: string;
}

export default function Budgets() {
    const [goals, setGoals] = useState<FinancialGoal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
        name: "",
        targetAmount: 0,
        currentSavings: 0,
        status: "ACTIVE"
    });
    const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
    const [isAddingGoal, setIsAddingGoal] = useState(false);
    const [isEditingGoal, setIsEditingGoal] = useState(false);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const response = await goalApi.getAll();
            setGoals(response.data as FinancialGoal[]);
            setError(null);
        } catch (err) {
            setError('Failed to fetch financial goals');
            toast.error("Failed to fetch financial goals");
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async () => {
        try {
            const response = await goalApi.create(newGoal);
            setGoals(prev => [...prev, response.data as FinancialGoal]);
            setIsAddingGoal(false);
            setNewGoal({
                name: "",
                targetAmount: 0,
                currentSavings: 0,
                status: "ACTIVE"
            });
            toast.success("Financial goal added successfully");
        } catch (err) {
            toast.error("Failed to add financial goal");
        }
    };

    const handleUpdateGoal = async () => {
        if (!editingGoal) return;
        try {
            const response = await goalApi.update(editingGoal.id, editingGoal);
            setGoals(prev => prev.map(goal => goal.id === editingGoal.id ? response.data as FinancialGoal : goal));
            setIsEditingGoal(false);
            setEditingGoal(null);
            toast.success("Financial goal updated successfully");
        } catch (err) {
            toast.error("Failed to update financial goal");
        }
    };

    const handleDeleteGoal = async (id: string) => {
        try {
            await goalApi.delete(id);
            setGoals(prev => prev.filter(goal => goal.id !== id));
            toast.success("Financial goal deleted successfully");
        } catch (err) {
            toast.error("Failed to delete financial goal");
        }
    };

    const calculateProgress = (current: number, target: number): number => {
        if (target <= 0) return 0;
        const progress = (current / target) * 100;
        return Math.min(Math.max(progress, 0), 100);
    };

    const iconOptions = [
        { name: "home", icon: Home, label: "Home" },
        { name: "car", icon: Car, label: "Car" },
        { name: "shield", icon: Shield, label: "Emergency" },
        { name: "briefcase", icon: Briefcase, label: "Investment" },
        { name: "plane", icon: Plane, label: "Travel" },
    ];

    const getIconComponent = (iconName: string) => {
        const found = iconOptions.find(option => option.name === iconName);
        return found ? found.icon : Shield;
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500">{error}</p>
                <Button onClick={fetchGoals} className="mt-4">Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">Financial Goals</h1>
                    <p className="text-muted-foreground mt-1">Track your financial goals</p>
                </div>
                <Sheet open={isAddingGoal} onOpenChange={setIsAddingGoal}>
                    <SheetTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Goal
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add New Financial Goal</SheetTitle>
                            <SheetDescription>
                                Create a new financial goal to track your progress towards a purchase or savings target.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Goal Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., New House, Car, Vacation"
                                    value={newGoal.name}
                                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="target">Target Amount ($)</Label>
                                <Input
                                    id="target"
                                    type="number"
                                    placeholder="0.00"
                                    value={newGoal.targetAmount || ''}
                                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="current">Current Savings ($)</Label>
                                <Input
                                    id="current"
                                    type="number"
                                    placeholder="0.00"
                                    value={newGoal.currentSavings || ''}
                                    onChange={(e) => setNewGoal({ ...newGoal, currentSavings: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon</Label>
                                <div className="flex gap-2 flex-wrap">
                                    {iconOptions.map((option) => (
                                        <Button
                                            key={option.name}
                                            type="button"
                                            variant={newGoal.iconName === option.name ? "default" : "outline"}
                                            className="flex flex-col items-center p-2 h-auto w-[80px]"
                                            onClick={() => setNewGoal({ ...newGoal, iconName: option.name })}
                                        >
                                            <option.icon className="h-6 w-6 mb-1" />
                                            <span className="text-xs">{option.label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <SheetFooter>
                            <Button onClick={handleAddGoal}>Save Goal</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Edit Goal Sheet */}
            <Sheet open={isEditingGoal} onOpenChange={setIsEditingGoal}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit Financial Goal</SheetTitle>
                        <SheetDescription>
                            Update your financial goal details.
                        </SheetDescription>
                    </SheetHeader>
                    {editingGoal && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Goal Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editingGoal.name}
                                    onChange={(e) => setEditingGoal({ ...editingGoal, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-target">Target Amount ($)</Label>
                                <Input
                                    id="edit-target"
                                    type="number"
                                    value={editingGoal.targetAmount}
                                    onChange={(e) => setEditingGoal({ ...editingGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-current">Current Savings ($)</Label>
                                <Input
                                    id="edit-current"
                                    type="number"
                                    value={editingGoal.currentSavings}
                                    onChange={(e) => setEditingGoal({ ...editingGoal, currentSavings: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon</Label>
                                <div className="flex gap-2 flex-wrap">
                                    {iconOptions.map((option) => (
                                        <Button
                                            key={option.name}
                                            type="button"
                                            variant={editingGoal.iconName === option.name ? "default" : "outline"}
                                            className="flex flex-col items-center p-2 h-auto w-[80px]"
                                            onClick={() => setEditingGoal({ ...editingGoal, iconName: option.name })}
                                        >
                                            <option.icon className="h-6 w-6 mb-1" />
                                            <span className="text-xs">{option.label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <SheetFooter>
                        <Button onClick={handleUpdateGoal}>Save Changes</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* Goals List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => {
                    const IconComponent = getIconComponent(goal.iconName || "shield");
                    const progressPercentage = calculateProgress(goal.currentSavings, goal.targetAmount);

                    return (
                        <Card key={goal.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-muted">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <CardTitle>{goal.name}</CardTitle>
                                    </div>
                                    <div className="flex space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setEditingGoal(goal);
                                                setIsEditingGoal(true);
                                            }}
                                            className="h-8 w-8"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteGoal(goal.id)}
                                            className="h-8 w-8 text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <span className="text-sm text-muted-foreground">Current</span>
                                            <p className="font-semibold">${goal.currentSavings.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm text-muted-foreground">Target</span>
                                            <p className="font-semibold">${goal.targetAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/50 py-2">
                                <p className="text-sm text-muted-foreground">
                                    {goal.targetAmount - goal.currentSavings > 0
                                        ? `$${(goal.targetAmount - goal.currentSavings).toLocaleString()} more to reach your goal`
                                        : "Goal reached! Congratulations!"}
                                </p>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
