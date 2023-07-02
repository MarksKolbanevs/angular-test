import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list-page.component.html',
  styleUrls: ['./patients-list-page.component.scss']
})
export class PatientsListPageComponent {
  patientsWithDoctors:any[] = [];

  constructor(
    private patientService:PatientService,
    private toastr: ToastrService) {}

  searchByDoctorName(event : any) : void{
    const searchedDoctor = event.target.value;
    this.patientService.getPatientsByDoctorName(searchedDoctor).subscribe((result:any[]) => (this.patientsWithDoctors = result));
  }

  ngOnInit() : void{
    this.patientService.getPatientsWithDoctors().subscribe((result:any[]) => (this.patientsWithDoctors = result));
  }

  deletePatient(patient:Patient) : void{
    this.patientService.deletePatient(patient).subscribe({
      next: (response: Patient[]) => {
        this.toastr.success('Success!', 'Patient deleted');
      },
      error: (error: any) => {
        this.toastr.warning('Error!', 'Patient deletion failed');
      }
    });
  }
}
