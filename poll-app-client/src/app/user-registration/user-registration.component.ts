import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/user.service';
import { User } from '../models/user.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

user: User;
hidepass = true;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.user = new User();
  }

  showNotification(text: string, color: string) {
    this._snackBar.open(text, 'X', {
      duration: 1700,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', color]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(result => this.showNotification('Thank you for registering', 'mat-primary'));
    this.user = new User();
    this.router.navigate(['/dashboard']);
  }

}
