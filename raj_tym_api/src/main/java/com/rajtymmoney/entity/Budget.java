package com.rajtymmoney.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "budgets")
@Data
@EqualsAndHashCode(callSuper = true)
public class Budget extends BaseEntity {
    
    private String category;
    private BigDecimal amount;
    private BigDecimal spent;
    private LocalDate startDate;
    private LocalDate endDate;
    private String period; // MONTHLY, YEARLY, etc.
    private String status; // ACTIVE, INACTIVE
} 