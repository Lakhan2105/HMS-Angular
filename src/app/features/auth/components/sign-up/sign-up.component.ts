import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  availableRoles: string[] = ['clinicAdmin', 'practitioner', 'patient'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, 
    private snackBar: MatSnackBar 
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: [[], Validators.required],
      clinicId: [1, Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = {
        email: this.signUpForm.value.email,
        role: this.signUpForm.value.role,
        password: this.signUpForm.value.password,
        clinicId: this.signUpForm.value.clinicId
      };
      
      this.authService.signUp(formData).subscribe(
        (response: any) => {
          this.snackBar.open('Sign-up successful!', 'Close', {
            duration: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 3000); 
        },
        (error: HttpErrorResponse) => {
          console.error('Sign-up error:', error);

          this.snackBar.open('Sign-up failed. Please try again.', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
