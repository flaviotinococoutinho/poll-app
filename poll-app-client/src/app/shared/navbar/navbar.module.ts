import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../notification.service';
import { AngularMaterialModule } from '../../angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../../app.component';

@NgModule({
    imports: [RouterModule, CommonModule,BrowserModule, FormsModule, BrowserAnimationsModule, AngularMaterialModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: [AuthService,NotificationService]
  })

export class NavbarModule {
}
