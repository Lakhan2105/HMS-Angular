import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicAdminRoutingModule } from './clinic-admin-routing.module';
import { ClinicAdminComponent } from './components/clinic-admin/clinic-admin.component';


@NgModule({
  declarations: [
    ClinicAdminComponent
  ],
  imports: [
    CommonModule,
    ClinicAdminRoutingModule
  ]
})
export class ClinicAdminModule { }
