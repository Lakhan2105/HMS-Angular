import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PractitionerRoutingModule } from './practitioner-routing.module';
import { PractitionerComponent } from './components/practitioner/practitioner.component';


@NgModule({
  declarations: [
    PractitionerComponent
  ],
  imports: [
    CommonModule,
    PractitionerRoutingModule
  ]
})
export class PractitionerModule { }
