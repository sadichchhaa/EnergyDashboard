import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8090/api/stats';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getEnergyStatsByUserId(): Observable<any> {
    if(this.authService.isLoggedIn === false) {
      console.error ("User is not logged in");
      return;
    }
    else {
      let userId = JSON.parse(sessionStorage.getItem('userid'));
      return this.http.get(`${this.baseUrl}/${userId}`);
    }
  }

  getEnergyStatsByUserIdAndMonth(month: number): Observable<any> {
    if (this.authService.isLoggedIn === false) {
      console.error("User is not logged in");
      return;
    }
    else {
      let userId = JSON.parse(sessionStorage.getItem('userid'));
      return this.http.get(`${this.baseUrl}/${userId}/month/${month}`);
    }
  }

  getEnergyStatsByUserIdAndYear(year: number): Observable<any> {
    if (this.authService.isLoggedIn === false) {
      console.error("User is not logged in");
      return;
    }
    else {
      let userId = JSON.parse(sessionStorage.getItem('userid'));
      return this.http.get(`${this.baseUrl}/${userId}/year/${year}`);
    }
  }

  getEnergyStatsByUserIdAndWeek(week: number): Observable<any> {
    if (this.authService.isLoggedIn === false) {
      console.error("User is not logged in");
      return;
    }
    else {
      let userId = JSON.parse(sessionStorage.getItem('userid'));
      return this.http.get(`${this.baseUrl}/${userId}/week/${week}`);
    }
  }


}