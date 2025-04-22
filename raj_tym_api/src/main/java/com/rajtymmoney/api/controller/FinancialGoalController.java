package com.rajtymmoney.api.controller;

import com.rajtymmoney.api.model.FinancialGoal;
import com.rajtymmoney.api.repository.FinancialGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173")
public class FinancialGoalController {

    @Autowired
    private FinancialGoalRepository goalRepository;

    @GetMapping
    public List<FinancialGoal> getAllGoals() {
        return goalRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinancialGoal> getGoalById(@PathVariable Long id) {
        return goalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active")
    public List<FinancialGoal> getActiveGoals() {
        return goalRepository.findByStatus("ACTIVE");
    }

    @PostMapping
    public FinancialGoal createGoal(@RequestBody FinancialGoal goal) {
        return goalRepository.save(goal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinancialGoal> updateGoal(@PathVariable Long id, @RequestBody FinancialGoal goal) {
        if (!goalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        goal.setId(id);
        return ResponseEntity.ok(goalRepository.save(goal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        if (!goalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        goalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 