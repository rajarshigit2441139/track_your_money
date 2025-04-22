package com.rajtymmoney.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "user_settings")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserSettings extends BaseEntity {
    
    private String currency;
    private String language;
    private String theme;
    private String timezone;
    private Boolean emailNotifications;
    private Boolean pushNotifications;
    private String budgetingFrequency; // MONTHLY, YEARLY
    private String defaultView; // DASHBOARD, TRANSACTIONS, etc.
} 