package com.rajtymmoney.api.repository;

import com.rajtymmoney.api.model.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    UserSettings findFirstByOrderByIdDesc();
} 