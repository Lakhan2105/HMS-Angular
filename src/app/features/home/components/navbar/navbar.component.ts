import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import * as UserActions from 'src/app/core/state/user/actions/user.actions';
import { User } from 'src/app/core/state/user/models/user.model';
import { selectUser } from 'src/app/core/state/user/selectors/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userEmail: string | undefined;
  userRole: string | undefined;
  userId: number | undefined;
  user$?: Observable<User | null>;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const userClaims = this.tokenStorage.getUserClaims();
    if (userClaims) {
      this.userEmail = userClaims.email;
      this.userId = userClaims.userId;

      const selectedRole = this.tokenStorage.getUserRole();

      if (selectedRole && selectedRole.length > 0) {
        this.userRole = selectedRole[0];
      }

      if (this.userId) {
        this.store.dispatch(UserActions.loadUserById({ userId: this.userId }));
        this.user$ = this.store.select(selectUser);
      }
    }
  }

  onLogout(): void {
    this.tokenStorage.clearStorage();
    this.router.navigate(['/auth/login']);
  }
}
