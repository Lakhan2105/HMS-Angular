// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { RefreshTokenResponse } from 'src/app/core/models/refresh-token-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7298/api/Auth';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  signUp(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SignUp`, formData);
  }

login(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/SignIn`, credentials).pipe(
    tap((response) => {
      if (response?.token) {
        this.tokenStorage.saveAuthToken(response.token.accessToken);
        this.tokenStorage.saveRefreshToken(response.token.refreshToken);

        const userClaims = this.tokenStorage.getUserClaims();
        if (userClaims) {
          this.tokenStorage.saveUserRole(userClaims.roles); 
          this.tokenStorage.saveUserId(userClaims.userId);
        }
      }
    })
  );
}


  refreshToken(): Observable<string> {
    const refreshToken = this.tokenStorage.getRefreshToken();
    return this.http
      .post<RefreshTokenResponse>(`${this.apiUrl}/RefreshToken`, { refreshToken })
      .pipe(
        tap((response) => {
          if (response?.accessToken) {
            this.tokenStorage.saveAuthToken(response.accessToken);
            if (response.refreshToken) {
              this.tokenStorage.saveRefreshToken(response.refreshToken);
            }
          }
        }),
        map((response) => response.accessToken)
      );
  }


  logout(): void {
    this.tokenStorage.clearStorage();
  }
}
