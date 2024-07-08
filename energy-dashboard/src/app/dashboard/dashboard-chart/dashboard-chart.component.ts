import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from 'src/app/services/api.service';
import { SelectPeriodService } from 'src/app/services/select-period.service';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {

  energyStats: EnergyStatResponse[];
  selectedPeriod: string = 'month';

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
    { data: [], label: 'Series B' }
  ];
  public lineChartLabels: Label[] = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 123, 255, 0.1)'
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255, 99, 132, 0.1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private http: HttpClient, private apiService: ApiService, private selectPeriodService: SelectPeriodService) {
    this.selectPeriodService.data.subscribe(data => {
      if(data != null) {
        this.selectedPeriod = data;
        this.fetchData();
        // console.log("Selected period is " + this.selectedPeriod);
      }      
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    if(this.selectedPeriod === 'month') {
      this.initializeDataForMonth();      
    } 
    else if(this.selectedPeriod === 'year') {
      this.initializeDataForYear();
    }
    else if(this.selectedPeriod === 'week') {
      this.initializeDataForWeek();
    }
  }

  initializeDataForMonth() {
    let currentMonth = new Date().getMonth() + 1;
    this.apiService.getEnergyStatsByUserIdAndMonth(currentMonth).subscribe(response => {
      this.energyStats = response;
      let weeklyEnergyGenerated = [];
      let weeklyEnergyConsumed = [];
      const indices = [6, 13, 20, 26];
      for (let i = 0; i < indices.length; i++) {
        weeklyEnergyGenerated[i] = this.energyStats[indices[i]].energyGenerated;
        weeklyEnergyConsumed[i] = this.energyStats[indices[i]].energyConsumed;
      }
      this.lineChartData = [
        { data: weeklyEnergyGenerated, label: 'Energy Generated' },
        { data: weeklyEnergyConsumed, label: 'Energy Consumed' }
      ];
      this.lineChartLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    },
      error => {
        console.error(error);
      });
  }

  initializeDataForYear() {
    let currentYear = new Date().getFullYear();
    this.apiService.getEnergyStatsByUserIdAndYear(currentYear).subscribe(response => {
      this.energyStats = response;
      let monthlyEnergyGenerated = Array(12).fill(0);
      let monthlyEnergyConsumed = Array(12).fill(0);

      this.energyStats.forEach(stat => {
        let date = new Date(stat.date);
        if (date.getDate() === 1) {
          let month = date.getMonth();
          monthlyEnergyGenerated[month] = stat.energyGenerated || 0;
          monthlyEnergyConsumed[month] = stat.energyConsumed || 0;
        }
      });

      this.lineChartData = [
        { data: monthlyEnergyGenerated, label: 'Energy Generated' },
        { data: monthlyEnergyConsumed, label: 'Energy Consumed' }
      ];
      this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    },
      error => {
        console.error(error);
      });
  }

  initializeDataForWeek() {
    let currentWeek = this.getWeek(new Date());
    this.apiService.getEnergyStatsByUserIdAndWeek(currentWeek).subscribe(response => {
      this.energyStats = response;
      let dailyEnergyGenerated = Array(7).fill(0);
      let dailyEnergyConsumed = Array(7).fill(0);

      this.energyStats.forEach(stat => {
        let date = new Date(stat.date);
        let day = date.getDay();
        dailyEnergyGenerated[day] = stat.energyGenerated || 0;
        dailyEnergyConsumed[day] = stat.energyConsumed || 0;
      });

      this.lineChartData = [
        { data: dailyEnergyGenerated, label: 'Energy Generated' },
        { data: dailyEnergyConsumed, label: 'Energy Consumed' }
      ];
      this.lineChartLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    },
      error => {
        console.error(error);
      });
  }

  getWeek(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  }

}
