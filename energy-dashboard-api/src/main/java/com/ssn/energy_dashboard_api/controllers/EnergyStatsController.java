package com.ssn.energy_dashboard_api.controllers;

import com.ssn.energy_dashboard_api.models.EnergyStats;
import com.ssn.energy_dashboard_api.services.EnergyStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class EnergyStatsController {

    @Autowired
    private EnergyStatsService energyStatsService;

    @CrossOrigin(origins = "*")
    @GetMapping("/{userId}")
    public ResponseEntity<List<EnergyStats>> getEnergyStatsByUserId(@PathVariable Long userId) {
        List<EnergyStats> energyStats = energyStatsService.getEnergyStatsByUserId(userId);
        return ResponseEntity.ok(energyStats);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{userId}/year/{year}")
    public ResponseEntity<List<EnergyStats>> getEnergyStatsByUserIdAndYear(@PathVariable Long userId, @PathVariable int year) {
        List<EnergyStats> energyStats = energyStatsService.getEnergyStatsByUserIdAndYear(userId, year);
        return ResponseEntity.ok(energyStats);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{userId}/month/{month}")
    public ResponseEntity<List<EnergyStats>> getEnergyStatsByUserIdAndMonth(@PathVariable Long userId, @PathVariable int month) {
        List<EnergyStats> energyStats = energyStatsService.getEnergyStatsByUserIdAndMonth(userId, month);
        return ResponseEntity.ok(energyStats);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{userId}/week/{weekNumber}")
    public ResponseEntity<List<EnergyStats>> getEnergyStatsByUserIdAndWeek(@PathVariable Long userId, @PathVariable int weekNumber) {
        List<EnergyStats> energyStats = energyStatsService.getEnergyStatsByUserIdAndWeek(userId, weekNumber);
        return ResponseEntity.ok(energyStats);
    }

}
