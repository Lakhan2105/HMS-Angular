import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private readonly authTokenKey = 'authToken';
  private readonly refreshTokenKey = 'refreshToken';
  private readonly userRoleKey = 'userRole';
  private readonly userIdKey = 'userId';

  saveAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  saveUserRole(role: string[]): void {
    localStorage.setItem(this.userRoleKey, JSON.stringify(role));
  }

  saveUserId(userId : string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getUserRole(): string[] | null {
    const role = localStorage.getItem(this.userRoleKey);
    return role ? JSON.parse(role) : null;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  getUserClaims() {
    const token = this.getAuthToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      if (userId) {
      this.saveUserId(userId);
      }

      return {
        userId: userId, 
        email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        roles: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] 
        ? (Array.isArray(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) 
            ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] 
            : [decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]]) 
        : []
      };
    }
    return null;
  }

  clearStorage(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.userIdKey);
  }

  hasAuthToken(): boolean {
    return !!this.getAuthToken();
  }

  isTokenExpired(): boolean {
    const token = this.getAuthToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const expiry = decoded.exp;
    const now = Math.floor(new Date().getTime() / 1000);

    return now >= expiry;
  }
}


