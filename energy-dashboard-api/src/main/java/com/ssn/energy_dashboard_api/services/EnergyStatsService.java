package com.ssn.energy_dashboard_api.services;

import com.ssn.energy_dashboard_api.models.EnergyStats;
import com.ssn.energy_dashboard_api.repository.EnergyStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnergyStatsService {

    @Autowired
    public EnergyStatsRepository energyStatsRepository;

    public EnergyStatsService(EnergyStatsRepository energyStatsRepository) {
        this.energyStatsRepository = energyStatsRepository;
    }

    public List<EnergyStats> getEnergyStatsByUserId(Long userId) {
        return energyStatsRepository.findByUserId(userId);
    }

    public List<EnergyStats> getEnergyStatsByUserIdAndYear(Long userId, int year) {
        return energyStatsRepository.findByUserIdAndYear(userId, year);
    }

    public List<EnergyStats> getEnergyStatsByUserIdAndMonth(Long userId, int month) {
        return energyStatsRepository.findByUserIdAndMonth(userId, month);
    }

    public List<EnergyStats> getEnergyStatsByUserIdAndWeek(Long userId, int weekNumber) {
        return energyStatsRepository.findByUserIdAndWeek(userId, weekNumber);
    }
}
