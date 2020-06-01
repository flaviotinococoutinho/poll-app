import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../../home/home.component';
import { MomentModule } from 'angular2-moment';
import { PollListComponent } from '../../admin/poll-list/poll-list.component';
import { PollEditorComponent } from '../../admin/poll-editor/poll-editor.component';
import { PollDetailsComponent } from '../../admin/poll-details/poll-details.component';
import { UserRegistrationComponent } from '../../user-registration/user-registration.component';
import { LoginComponent } from '../../admin/login/login.component';
import { PollUsersComponent } from '../../admin/poll-users/poll-users.component';
import { PollService } from '../../admin/poll-list/poll.service';
import { AngularMaterialModule } from '../../angular-material.module';
import { AuthService } from '../../auth.service';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    AngularMaterialModule,
  ],
  declarations: [
    HomeComponent,
    PollListComponent,
    PollDetailsComponent,
    PollEditorComponent,
    UserRegistrationComponent,
    LoginComponent,
    PollUsersComponent
  ],
  providers: [PollService, AuthService],
})

export class AdminLayoutModule {}
