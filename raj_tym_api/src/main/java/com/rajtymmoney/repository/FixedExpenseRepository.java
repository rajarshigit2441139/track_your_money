package com.rajtymmoney.repository;

import com.rajtymmoney.entity.FixedExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FixedExpenseRepository extends JpaRepository<FixedExpense, Long> {
    List<FixedExpense> findByStatus(String status);
    List<FixedExpense> findByCategory(String category);
} 