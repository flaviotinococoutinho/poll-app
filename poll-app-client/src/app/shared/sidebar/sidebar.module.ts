import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../angular-material.module';

@NgModule({
    imports: [ RouterModule, CommonModule, BrowserAnimationsModule, AngularMaterialModule],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ],
    providers: [AuthService]
})

export class SidebarModule {}
