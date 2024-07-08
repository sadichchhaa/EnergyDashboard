import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SelectPeriodService } from 'src/app/services/select-period.service';

@Component({
  selector: 'app-chart-stat',
  templateUrl: './chart-stat.component.html',
  styleUrls: ['./chart-stat.component.css']
})
export class ChartStatComponent implements OnInit {

  energyStats: EnergyStatResponse[] = [];
  selectedPeriod = 'month';

  energyGeneration: number;
  energyConsumption: number;
  dailyMinGenerated: number;
  dailyMaxGenerated: number;
  dailyMinConsumed: number;
  dailyMaxConsumed: number;

  constructor(private apiService: ApiService, private selectPeriodService: SelectPeriodService) { }

  ngOnInit() {
    this.initializeDataForMonth();
  }

  onPeriodChange() {
    this.passData();
    this.fetchData();
  }

  passData() {
    const data = this.selectedPeriod;
    this.selectPeriodService.setData(data);
  }

  fetchData() {
    if (this.selectedPeriod === 'month') {
      this.initializeDataForMonth();
    }
    else if (this.selectedPeriod === 'year') {
      this.initializeDataForYear();
    }
    else if (this.selectedPeriod === 'week') {
      this.initializeDataForWeek();
    }
  }

  initializeDataForMonth() {
    let currentMonth = new Date().getMonth() + 1;
    this.apiService.getEnergyStatsByUserIdAndMonth(currentMonth).subscribe(data => {
      this.energyStats = data;
      this.computeValues(this.energyStats);
    }, error => {
      console.error(error);
    });
  }

  initializeDataForYear() {
    let currentYear = new Date().getFullYear();
    this.apiService.getEnergyStatsByUserIdAndYear(currentYear).subscribe(data => {
      this.energyStats = data;
      this.computeValues(this.energyStats);
    }, error => {
      console.error(error);
    });
  }

  initializeDataForWeek() {
    let currentWeek = this.getWeekNumber(new Date());
    this.apiService.getEnergyStatsByUserIdAndWeek(currentWeek).subscribe(data => {
      this.energyStats = data;
      this.computeValues(this.energyStats);
    }, error => {
      console.error(error);
    });
  }

  computeValues(energyStatsPassed: EnergyStatResponse[]) {
    let totalPowerGenerated = energyStatsPassed.reduce((total, stat) => total + stat.energyGenerated, 0);
    this.energyGeneration = totalPowerGenerated * energyStatsPassed.length * 2;

    let totalPowerConsumed = energyStatsPassed.reduce((total, stat) => total + stat.energyConsumed, 0);
    this.energyConsumption = totalPowerConsumed * energyStatsPassed.length * 2;

    this.dailyMinGenerated = energyStatsPassed.reduce((min, stat) => Math.min(min, stat.energyGenerated), Infinity);
    this.dailyMaxGenerated = energyStatsPassed.reduce((max, stat) => Math.max(max, stat.energyGenerated), -Infinity);

    this.dailyMinConsumed = energyStatsPassed.reduce((min, stat) => Math.min(min, stat.energyConsumed), Infinity);
    this.dailyMaxConsumed = energyStatsPassed.reduce((max, stat) => Math.max(max, stat.energyConsumed), -Infinity);
  }

  getWeekNumber(date: Date): number {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
  }

}
