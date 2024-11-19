import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RoleSelectionDialogComponent } from 'src/app/shared/components/role-selection-dialog/role-selection-dialog.component';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          const roles = this.tokenStorage.getUserRole();
          
          if (roles && roles.length > 1) {
            const dialogRef = this.dialog.open(RoleSelectionDialogComponent, {
              width: '300px',
              data: roles
            });

            dialogRef.afterClosed().subscribe((selectedRole: string) => {
              if (selectedRole) {
                this.tokenStorage.saveUserRole([selectedRole]);
                this.router.navigate(['/home']);
              }
            });
          } else if (roles && roles.length === 1) {
            this.tokenStorage.saveUserRole(roles);
            this.router.navigate(['/home']);
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Invalid email or password';
          console.error('Login error:', error);
        }
      });
    }
  }
}
