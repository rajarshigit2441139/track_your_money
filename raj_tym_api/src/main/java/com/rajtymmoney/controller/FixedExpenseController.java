package com.rajtymmoney.controller;

import com.rajtymmoney.entity.FixedExpense;
import com.rajtymmoney.service.FixedExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fixed-expenses")
@CrossOrigin(origins = "*")
public class FixedExpenseController {

    @Autowired
    private FixedExpenseService fixedExpenseService;

    @GetMapping
    public ResponseEntity<List<FixedExpense>> getAllFixedExpenses() {
        return ResponseEntity.ok(fixedExpenseService.getAllFixedExpenses());
    }

    @GetMapping("/active")
    public ResponseEntity<List<FixedExpense>> getActiveFixedExpenses() {
        return ResponseEntity.ok(fixedExpenseService.getActiveFixedExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FixedExpense> getFixedExpenseById(@PathVariable Long id) {
        return ResponseEntity.ok(fixedExpenseService.getFixedExpenseById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<FixedExpense>> getFixedExpensesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(fixedExpenseService.getFixedExpensesByCategory(category));
    }

    @PostMapping
    public ResponseEntity<FixedExpense> createFixedExpense(@RequestBody FixedExpense fixedExpense) {
        return ResponseEntity.ok(fixedExpenseService.createFixedExpense(fixedExpense));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FixedExpense> updateFixedExpense(
            @PathVariable Long id,
            @RequestBody FixedExpense fixedExpense) {
        return ResponseEntity.ok(fixedExpenseService.updateFixedExpense(id, fixedExpense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFixedExpense(@PathVariable Long id) {
        fixedExpenseService.deleteFixedExpense(id);
        return ResponseEntity.ok().build();
    }
} 