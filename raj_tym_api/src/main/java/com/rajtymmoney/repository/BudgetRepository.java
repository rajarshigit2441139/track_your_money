package com.rajtymmoney.repository;

import com.rajtymmoney.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByStatus(String status);
    List<Budget> findByStartDateBetween(LocalDate start, LocalDate end);
    List<Budget> findByCategory(String category);
} 