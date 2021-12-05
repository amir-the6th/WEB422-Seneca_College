import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //registerUser: RegisterUser = {} as RegisterUser;
  registerUser: RegisterUser = { userName: '', password: '', password2: '' };
  warning: String = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerUser.userName.length == 0) {
      this.success = false;
      this.loading = false;
      this.warning = 'Username should no be blank';
    } else if (
      this.registerUser.password == '' ||
      this.registerUser.password2 == ''
    ) {
      this.success = false;
      this.loading = false;
      this.warning = 'Password must not be empty';
    } else if (this.registerUser.password !== this.registerUser.password2) {
      this.success = false;
      this.loading = false;
      this.warning = 'Passwords do not match';
    } else {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (msg) => {
          this.success = true;
          this.warning = '';
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}
