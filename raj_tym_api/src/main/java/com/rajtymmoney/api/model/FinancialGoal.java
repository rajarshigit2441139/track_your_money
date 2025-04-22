package com.rajtymmoney.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "financial_goals")
@Data
public class FinancialGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal targetAmount;

    @Column(nullable = false)
    private BigDecimal currentSavings;

    private String iconName;

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, COMPLETED, DELETED

    private String description;
} 