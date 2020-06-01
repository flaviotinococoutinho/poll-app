import { Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { PollEditorComponent } from '../../admin/poll-editor/poll-editor.component';
import { PollListComponent } from '../../admin/poll-list/poll-list.component';
import { PollDetailsComponent } from '../../admin/poll-details/poll-details.component';
import { LoginComponent } from '../../admin/login/login.component';
import { PollUsersComponent } from '../../admin/poll-users/poll-users.component';
import { UserRegistrationComponent } from '../../user-registration/user-registration.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'poll', component: PollListComponent },
    { path: 'poll/:id', component: PollDetailsComponent },
    { path: 'poll/editor/:id', component: PollEditorComponent },
    { path: 'signup', component: UserRegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'poll/my/all', component: PollUsersComponent }
];
