import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://localhost:7298/api/Patient';  

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllPatients`);
  }

  getPatientById(patientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetPatientById/${patientId}`);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddPatient`, patient);
  }

  updatePatient(patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdatePatient`, patient);
  }

  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeletePatient/${patientId}`);
  }
}
