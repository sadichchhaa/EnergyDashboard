import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    sessionStorage.clear();
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['/login']);
  }
}