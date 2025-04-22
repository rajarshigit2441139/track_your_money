package com.rajtymmoney.repository;

import com.rajtymmoney.entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    // Since we'll have only one settings record per user for now
    UserSettings findFirstByOrderByIdDesc();
} 