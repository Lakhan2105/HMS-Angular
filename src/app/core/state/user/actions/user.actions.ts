import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUserById = createAction(
  '[User] Load User By Id',
  props<{ userId: number }>()
);

export const loadUserByIdSuccess = createAction(
  '[User] Load User By Id Success',
  props<{ user: User }>()
);

export const loadUserByIdFailure = createAction(
  '[User] Load User By Id Failure',
  props<{ error: any }>()
);
