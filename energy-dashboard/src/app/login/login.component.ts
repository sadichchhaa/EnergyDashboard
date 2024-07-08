import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  onSubmit(form) {
    if (form.valid) {
      this.authService.login(this.username, this.password);
    }
    else {
      console.log("Invalid Form");
    }
  }
}