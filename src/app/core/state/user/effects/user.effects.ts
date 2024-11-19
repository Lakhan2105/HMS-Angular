import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { UserService } from 'src/app/core/services/user.service';
import { User } from '../models/user.model';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}
  
  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      mergeMap(action =>
        this.userService.getUserById(action.userId).pipe(
          map((user: User) => UserActions.loadUserByIdSuccess({ user })),
          catchError(error => of(UserActions.loadUserByIdFailure({ error })))
        )
      )
    )
  );

}
