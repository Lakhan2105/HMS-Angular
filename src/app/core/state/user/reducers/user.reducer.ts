import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { UserState } from '../models/user.state';


export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.loadUserByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);