package com.rajtymmoney.repository;

import com.rajtymmoney.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCategory(String category);
    List<Transaction> findByType(String type); // INCOME or EXPENSE
}
