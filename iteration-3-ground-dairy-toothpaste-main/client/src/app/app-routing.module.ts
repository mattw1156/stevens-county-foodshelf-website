import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditRequestComponent } from './requests/edit-request.component';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { RequestDonorComponent } from './requests/request-donor.component';
import { RequestVolunteerComponent } from './requests/request-volunteer.component';
import { DetailedRequestComponent } from './detailed-request/detailed-request.component';
import { ClientFormComponent } from './form/form-client.component';
import { FormVolunteerComponent } from './form/form-volunteer.component';

// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'requests/donor', component: RequestDonorComponent, title: 'Donor View'},
  {path: 'requests/volunteer', component: RequestVolunteerComponent, title: 'Volunteer View'},
  {path: 'requests/client', component: NewRequestComponent, title: 'New Request'},
  {path: 'requests/donor', component: RequestDonorComponent, title: 'Donor View'},
  {path: 'requests/volunteer/:id', component: EditRequestComponent, title: 'Edit Request'},
  {path: 'requests/donor/:id', component: DetailedRequestComponent, title: 'Detailed Request View'},
  {path: 'forms/volunteer', component: FormVolunteerComponent, title: 'Get all Forms'},
  {path: 'form/client', component: ClientFormComponent, title: 'Add form '}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
