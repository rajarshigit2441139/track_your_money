package com.rajtymmoney.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.rajtymmoney.api.model")
@EnableJpaRepositories("com.rajtymmoney.api.repository")
public class RajTymApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(RajTymApiApplication.class, args);
    }
} 