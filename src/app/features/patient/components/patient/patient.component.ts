import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient.service';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
 // Import the Patient interface

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientList = new MatTableDataSource<Patient>([]);

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'phone', 'email', 'actions'];

  constructor(
    public dialog: MatDialog,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients: Patient[]) => {
        this.patientList.data = patients;  
      },
      (error) => {
        console.error('Error fetching patients:', error);  
      }
    );
  }

  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '500px',
      data: {} 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.addPatient(result).subscribe(
          () => {
            this.loadPatients(); 
          },
          error => {
            console.error('Error adding patient:', error);
          }
        );
      }
    });
  }
  

  editPatient(patient: Patient): void {
    
  }

  deletePatient(patient: Patient): void {
    
  }
}
