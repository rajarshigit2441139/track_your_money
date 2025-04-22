package com.rajtymmoney.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reports")
@Data
@EqualsAndHashCode(callSuper = true)
public class Report extends BaseEntity {
    
    private String name;
    private String type; // EXPENSE, INCOME, CATEGORY_WISE, etc.
    private LocalDate startDate;
    private LocalDate endDate;
    private String timeframe; // DAILY, WEEKLY, MONTHLY, YEARLY
    private String categories; // Comma-separated categories
    private BigDecimal totalAmount;
    private String status; // GENERATED, PENDING, etc.
} 