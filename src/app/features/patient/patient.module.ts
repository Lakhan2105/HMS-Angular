import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './components/patient/patient.component';
import { AddPatientDialogComponent } from './components/add-patient-dialog/add-patient-dialog.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PatientComponent,
    AddPatientDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientRoutingModule,
  ]
})
export class PatientModule { }
