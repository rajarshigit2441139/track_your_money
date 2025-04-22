package com.rajtymmoney.service;

import com.rajtymmoney.entity.FixedExpense;
import com.rajtymmoney.repository.FixedExpenseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FixedExpenseService {

    @Autowired
    private FixedExpenseRepository fixedExpenseRepository;

    public List<FixedExpense> getAllFixedExpenses() {
        return fixedExpenseRepository.findAll();
    }

    public List<FixedExpense> getActiveFixedExpenses() {
        return fixedExpenseRepository.findByStatus("ACTIVE");
    }

    public FixedExpense getFixedExpenseById(Long id) {
        return fixedExpenseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fixed Expense not found with id: " + id));
    }

    public FixedExpense createFixedExpense(FixedExpense fixedExpense) {
        return fixedExpenseRepository.save(fixedExpense);
    }

    public FixedExpense updateFixedExpense(Long id, FixedExpense updatedExpense) {
        FixedExpense existingExpense = getFixedExpenseById(id);
        
        existingExpense.setName(updatedExpense.getName());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDueDate(updatedExpense.getDueDate());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setStatus(updatedExpense.getStatus());

        return fixedExpenseRepository.save(existingExpense);
    }

    public void deleteFixedExpense(Long id) {
        FixedExpense expense = getFixedExpenseById(id);
        expense.setStatus("INACTIVE");
        fixedExpenseRepository.save(expense);
    }

    public List<FixedExpense> getFixedExpensesByCategory(String category) {
        return fixedExpenseRepository.findByCategory(category);
    }
} 