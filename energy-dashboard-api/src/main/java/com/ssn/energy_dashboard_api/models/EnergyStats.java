package com.ssn.energy_dashboard_api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "energy_stats")
public class EnergyStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Double energyGenerated;

    @Column(nullable = false)
    private Double energyConsumed;

    public EnergyStats() {
    }

    public EnergyStats(User user, Date date, Double energyGenerated, Double energyConsumed) {
        this.user = user;
        this.date = date;
        this.energyGenerated = energyGenerated;
        this.energyConsumed = energyConsumed;
    }
}
