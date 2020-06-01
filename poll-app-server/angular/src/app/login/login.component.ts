import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { UserService } from 'app/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  model: any = {};
  loginIncorrect: boolean;
  loading: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    sessionStorage.clear();
  }

  login() {
    this.userService.isLoginCorrect(this.model.username, this.model.password).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.authService.fetchAdminRole();
        sessionStorage.setItem('username', this.model.username);
        alert('You have successfully logged in!');
        this.router.navigate(['/books']);
      } else {
        this._snackBar.open('The login/password you provided is incorrect!', 'X', {
          duration: 1700,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

}
