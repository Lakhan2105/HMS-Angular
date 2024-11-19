import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './user/reducers/user.reducer';
import { UserEffects } from './user/effects/user.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
 
  ]
})
export class StateModule { }
