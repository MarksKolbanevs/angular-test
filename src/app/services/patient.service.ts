import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private url = "Patient";
  constructor(private http:HttpClient) { }

  public getPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>(`${enviroment.apiUrl}/${this.url}`);
  }
  
  public createPatient(patient: Patient) : Observable<Patient[]>{
    return this.http.post<Patient[]>(`${enviroment.apiUrl}/${this.url}`,patient);
  }

  public deletePatient(patient: Patient): Observable<Patient[]> {
    return this.http.delete<Patient[]>(`${enviroment.apiUrl}/${this.url}/${patient.id}`);
  }

  public getPatientsWithDoctors() : Observable<any[]>{
    return this.http.get<any[]>(`${enviroment.apiUrl}/${this.url}/Patient-Doctor`);
  }

  public getPatientsByDoctorName(searchValue:string) : Observable<any[]>{
    return this.http.get<any[]>(`${enviroment.apiUrl}/${this.url}/SearchPatientByDoctorName`,{params: { searchValue: searchValue }});
  }
}
