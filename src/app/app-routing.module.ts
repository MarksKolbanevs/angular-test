import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewPatientPageComponent } from './new-patient-page/new-patient-page.component';
import { PatientsListPageComponent } from './patients-list-page/patients-list-page.component';

const routes: Routes = [
  { component: PatientsListPageComponent, path:'' }, // Existing route
  { component: NewPatientPageComponent, path: 'new-patient'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
