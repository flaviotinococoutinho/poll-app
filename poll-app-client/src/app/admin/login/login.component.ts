import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
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
  hidepass = true;

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
        window.sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.authService.fetchAdminRole();
        window.sessionStorage.setItem('username', this.model.username);
        this._snackBar.open('Logged in!', 'X', {
          duration: 1700,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['/dashboard']);
      } else {
        this._snackBar.open('Login/password incorrect!', 'X', {
          duration: 1700,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

}
