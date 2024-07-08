import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
// import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardWelcomeComponent } from './dashboard/dashboard-welcome/dashboard-welcome.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { ChartStatComponent } from './dashboard/chart-stat/chart-stat.component';
import { DashboardChartComponent } from './dashboard/dashboard-chart/dashboard-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    // ProfileSettingsComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    DashboardWelcomeComponent,
    DashboardOverviewComponent,
    ChartStatComponent,
    DashboardChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }