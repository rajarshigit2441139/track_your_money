package com.rajtymmoney.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "fixed_expenses")
@Data
@EqualsAndHashCode(callSuper = true)
public class FixedExpense extends BaseEntity {
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Column(name = "due_date", nullable = false)
    private Integer dueDate;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, INACTIVE
} 