import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  energyStats: EnergyStatResponse[];
  totalEnergyGenerated: number;
  totalEnergyConsumed: number;
  exportToGrid: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let currentMonth = new Date().getMonth() + 1;
    this.apiService.getEnergyStatsByUserIdAndMonth(currentMonth).subscribe(data => {
      this.energyStats = data;
      this.totalEnergyGenerated = this.energyStats.reduce((total, stat) => total + stat.energyGenerated, 0);
      this.totalEnergyConsumed = this.energyStats.reduce((total, stat) => total + stat.energyConsumed, 0);
      this.exportToGrid = this.totalEnergyGenerated - this.totalEnergyConsumed;
    },
      error => {
        console.error(error);
    });
  }

}
