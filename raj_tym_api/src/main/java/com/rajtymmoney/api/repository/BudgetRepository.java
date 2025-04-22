package com.rajtymmoney.api.repository;

import com.rajtymmoney.api.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByStatus(String status);
    List<Budget> findByCategory(String category);
} 