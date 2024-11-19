import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('../patient/patient.module').then(m => m.PatientModule),
      },

      {
        path: 'practitioner',
        loadChildren: () =>
          import('../practitioner/practitioner.module').then(m => m.PractitionerModule),
      },

      {
        path: 'clinic-admin',
        loadChildren: () =>
          import('../clinic-admin/clinic-admin.module').then(m => m.ClinicAdminModule),
      },
      
      {
        path: 'clinic',
        loadChildren: () =>
          import('../clinic/clinic.module').then(m => m.ClinicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
