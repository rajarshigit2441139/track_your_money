package com.rajtymmoney.api.controller;

import com.rajtymmoney.api.model.UserSettings;
import com.rajtymmoney.api.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class UserSettingsController {

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @GetMapping
    public ResponseEntity<UserSettings> getCurrentSettings() {
        UserSettings settings = userSettingsRepository.findFirstByOrderByIdDesc();
        return settings != null ? ResponseEntity.ok(settings) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public UserSettings createSettings(@RequestBody UserSettings settings) {
        return userSettingsRepository.save(settings);
    }

    @PutMapping
    public ResponseEntity<UserSettings> updateSettings(@RequestBody UserSettings settings) {
        UserSettings currentSettings = userSettingsRepository.findFirstByOrderByIdDesc();
        if (currentSettings != null) {
            settings.setId(currentSettings.getId());
            return ResponseEntity.ok(userSettingsRepository.save(settings));
        }
        return ResponseEntity.ok(userSettingsRepository.save(settings));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteSettings() {
        UserSettings settings = userSettingsRepository.findFirstByOrderByIdDesc();
        if (settings != null) {
            userSettingsRepository.delete(settings);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
} 