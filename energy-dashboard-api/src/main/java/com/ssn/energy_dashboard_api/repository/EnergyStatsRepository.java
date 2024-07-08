package com.ssn.energy_dashboard_api.repository;

import com.ssn.energy_dashboard_api.models.EnergyStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnergyStatsRepository extends JpaRepository<EnergyStats, Long> {
    List<EnergyStats> findByUserId(Long userId);

    @Query("SELECT e FROM EnergyStats e WHERE e.user.id = :userId AND EXTRACT(MONTH FROM e.date) = :month")
    List<EnergyStats> findByUserIdAndMonth(@Param("userId") Long userId, @Param("month") int month);

    @Query("SELECT e FROM EnergyStats e WHERE e.user.id = :userId AND EXTRACT(WEEK FROM e.date) = :weekNumber")
    List<EnergyStats> findByUserIdAndWeek(@Param("userId") Long userId, @Param("weekNumber") int weekNumber);
    @Query("SELECT e FROM EnergyStats e WHERE e.user.id = :userId AND EXTRACT(YEAR FROM e.date) = :year")
    List<EnergyStats> findByUserIdAndYear(@Param("userId") Long userId, @Param("year") int year);

}
