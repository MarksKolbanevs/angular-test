import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-new-patient-page',
  templateUrl: './new-patient-page.component.html',
  styleUrls: ['./new-patient-page.component.scss']
})
export class NewPatientPageComponent {
  
  patientForm: FormGroup = this.formBuilder.group({
    name: ['',Validators.required],
    surname: ['',Validators.required],
    email: ['',Validators.required],
    phone: [''],
    streetAdress: ['',Validators.required],
    city: [''],
    region: [''],
    year: ['',Validators.required],
    month: ['',Validators.required],
    day: ['',Validators.required]
  }); // Fillable new patient form
  currentStep: number = 1; // Current step of adding new patient
  steps:Number[] = [1,2]; // All steps
  doctors: Doctor[] = []; // Registered doctors
  selectedDoctor:Doctor = new Doctor;
  formIsValid:boolean = true;
  constructor(
    private toastr: ToastrService,
    private doctorService:DoctorService,
    private patientService:PatientService,
    private router: Router,
    private formBuilder: FormBuilder) {}

  createPatient() : void{ // Submit new patient
    if(!this.patientForm.valid){
      this.formIsValid = false;
      this.toastr.warning('Warning!', 'Submit all mandatory inputs');
      return;
    }

    if(this.selectedDoctor.id === undefined ){
      this.toastr.warning('Warning!', 'Please select a doctor');
      return;
    }

    const newPatient:Patient = this.patientForm.value;

    newPatient.doctorId = this.selectedDoctor.id; // Pushing doctor id to the new patient
    newPatient.dateTime = new Date(this.patientForm.value.year, this.patientForm.value.month - 1, this.patientForm.value.day); // Creating date where patient need to visit doctor
    
    this.patientService.createPatient(newPatient).subscribe({
      next: (response: Patient[]) => {
        this.router.navigate(['/']);
        this.toastr.success('Success!', 'Patient created');
      },
      error: (error: any) => {
        console.error('Patient creation failed:', error);
        this.toastr.error('Error!', 'Patient creation failed:');
      }
    });
  }


  ngOnInit() : void { // Get doctors
    this.doctorService.getDoctors().subscribe((result:Doctor[]) => (this.doctors = result));
  }

  searchDoctorByName(event:any) : void {
    const searchValue = event.target.value;
    this.doctorService.getDoctorByName(searchValue).subscribe((result:Doctor[]) => (this.doctors = result));
  }

  navigateToStep(step:number) : void{ // After clicking on proceed bar step, redirect to selected step
    this.currentStep = step;
  }

  selectDoctor(doctor:Doctor) : void{ // Save selected doctor id
    this.selectedDoctor = doctor;
  }

  getDoctorImage(doctor : Doctor) : string {
    return `data:image/png;base64,${doctor.photoBytes}`;
  }
}
