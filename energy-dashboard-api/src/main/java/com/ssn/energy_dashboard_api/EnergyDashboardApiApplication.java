package com.ssn.energy_dashboard_api;

import com.ssn.energy_dashboard_api.security.PasswordEncoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EnergyDashboardApiApplication {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new PasswordEncoder();
	};

	public static void main(String[] args) {
		SpringApplication.run(EnergyDashboardApiApplication.class, args);
	}

}
