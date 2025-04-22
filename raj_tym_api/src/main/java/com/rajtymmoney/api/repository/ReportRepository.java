package com.rajtymmoney.api.repository;

import com.rajtymmoney.api.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByType(String type);
    List<Report> findByStatus(String status);
} 