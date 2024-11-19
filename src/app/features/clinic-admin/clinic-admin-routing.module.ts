import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicAdminComponent } from './components/clinic-admin/clinic-admin.component';

const routes: Routes = [
  { path: '', component:ClinicAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicAdminRoutingModule { }
