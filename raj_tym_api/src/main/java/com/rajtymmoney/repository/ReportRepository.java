package com.rajtymmoney.repository;

import com.rajtymmoney.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByType(String type);
    List<Report> findByStartDateBetween(LocalDate start, LocalDate end);
    List<Report> findByStatus(String status);
} 