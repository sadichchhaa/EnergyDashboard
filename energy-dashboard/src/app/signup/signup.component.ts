import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  onSubmit(form) {
    if (form.valid) {
      this.authService.signup(this.email, this.username, this.password);
    }
  }

  ngOnInit() {
  }

}
