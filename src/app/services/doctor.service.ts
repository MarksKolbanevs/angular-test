import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private url = "Doctor";
  constructor(private http:HttpClient) { }

  public getDoctors() : Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${enviroment.apiUrl}/${this.url}`);
  }

  public getDoctorByName(searchValue:string) : Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${enviroment.apiUrl}/${this.url}/SearchDoctorByName`, {params: { searchValue: searchValue }});
  }
}
