import { api } from '../config/api.config';
import axios from 'axios';

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
});

// Transaction API calls
export const transactionApi = {
    getAll: () => apiInstance.get('/api/transactions'),
    getById: (id: string) => apiInstance.get(`/api/transactions/${id}`),
    create: (data: any) => apiInstance.post('/api/transactions', data),
    update: (id: string, data: any) => apiInstance.put(`/api/transactions/${id}`, data),
    delete: (id: string) => apiInstance.delete(`/api/transactions/${id}`),
    getByDateRange: (startDate: string, endDate: string) => 
        apiInstance.get(`/api/transactions/range?startDate=${startDate}&endDate=${endDate}`),
    getByCategory: (category: string) => apiInstance.get(`/api/transactions/category/${category}`)
};

// Budget API calls
export const budgetApi = {
    getAll: () => apiInstance.get('/api/budgets'),
    getById: (id: string) => apiInstance.get(`/api/budgets/${id}`),
    create: (data: any) => apiInstance.post('/api/budgets', data),
    update: (id: string, data: any) => apiInstance.put(`/api/budgets/${id}`, data),
    delete: (id: string) => apiInstance.delete(`/api/budgets/${id}`),
    getActive: () => apiInstance.get('/api/budgets/active'),
    getByCategory: (category: string) => apiInstance.get(`/api/budgets/category/${category}`)
};

// Report API calls
export const reportApi = {
    getAll: () => apiInstance.get('/api/reports'),
    getById: (id: string) => apiInstance.get(`/api/reports/${id}`),
    create: (data: any) => apiInstance.post('/api/reports', data),
    update: (id: string, data: any) => apiInstance.put(`/api/reports/${id}`, data),
    delete: (id: string) => apiInstance.delete(`/api/reports/${id}`),
    getByType: (type: string) => apiInstance.get(`/api/reports/type/${type}`),
    getByStatus: (status: string) => apiInstance.get(`/api/reports/status/${status}`)
};

// User Settings API calls
export const settingsApi = {
    getCurrent: () => apiInstance.get('/api/settings'),
    create: (data: any) => apiInstance.post('/api/settings', data),
    update: (data: any) => apiInstance.put('/api/settings', data),
    delete: () => apiInstance.delete('/api/settings')
};

// Financial Goals API calls
export const goalApi = {
    getAll: () => apiInstance.get('/api/goals'),
    getById: (id: string) => apiInstance.get(`/api/goals/${id}`),
    create: (data: any) => apiInstance.post('/api/goals', data),
    update: (id: string, data: any) => apiInstance.put(`/api/goals/${id}`, data),
    delete: (id: string) => apiInstance.delete(`/api/goals/${id}`),
    getActive: () => apiInstance.get('/api/goals/active')
};

// Fixed Expense API calls
export const fixedExpenseApi = {
    getAll: () => apiInstance.get('/api/fixed-expenses'),
    getById: (id: string) => apiInstance.get(`/api/fixed-expenses/${id}`),
    create: (data: any) => apiInstance.post('/api/fixed-expenses', data),
    update: (id: string, data: any) => apiInstance.put(`/api/fixed-expenses/${id}`, data),
    delete: (id: string) => apiInstance.delete(`/api/fixed-expenses/${id}`),
    getActive: () => apiInstance.get('/api/fixed-expenses/active'),
    getByCategory: (category: string) => apiInstance.get(`/api/fixed-expenses/category/${category}`)
}; 