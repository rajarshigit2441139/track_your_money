package com.rajtymmoney.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_settings")
@Data
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String theme;

    @Column(nullable = false)
    private String timezone;

    private String notificationPreferences;
} 