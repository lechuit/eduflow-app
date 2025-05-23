import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { environment } from '@environments/environment';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ResetPasswordRequest,
  ResetPasswordConfirm 
} from '@shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    await this.storage.create();
    const token = await this.storage.get(environment.keys.token);
    const user = await this.storage.get(environment.keys.user);
    
    if (token && user) {
      this.tokenSubject.next(token);
      this.currentUserSubject.next(user);
    }
  }

  /**
   * Login user with credentials
   */
  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(async (response) => {
          await this.setAuthData(response);
        }),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  /**
   * Register new user
   */
  register(userData: RegisterData): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(async (response) => {
          await this.setAuthData(response);
        }),
        map(response => response.user),
        catchError(this.handleError)
      );
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await this.http.post(`${this.apiUrl}/logout`, {}).toPromise();
    } catch (error) {
      console.log('Logout API call failed, continuing with local logout');
    } finally {
      await this.clearAuthData();
    }
  }

  /**
   * Request password reset
   */
  requestPasswordReset(request: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, request)
      .pipe(catchError(this.handleError));
  }

  /**
   * Confirm password reset
   */
  confirmPasswordReset(data: ResetPasswordConfirm): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/confirm`, data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {})
      .pipe(
        tap(async (response) => {
          await this.setAuthData(response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!this.tokenSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  /**
   * Update user profile
   */
  updateProfile(updates: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, updates)
      .pipe(
        tap(async (user) => {
          this.currentUserSubject.next(user);
          await this.storage.set(environment.keys.user, user);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Change password
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword
    }).pipe(catchError(this.handleError));
  }

  /**
   * Delete account
   */
  deleteAccount(password: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/account`, {
      body: { password }
    }).pipe(
      tap(async () => {
        await this.clearAuthData();
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Set authentication data in storage and subjects
   */
  private async setAuthData(authResponse: AuthResponse): Promise<void> {
    await this.storage.set(environment.keys.token, authResponse.token);
    await this.storage.set(environment.keys.user, authResponse.user);
    
    this.tokenSubject.next(authResponse.token);
    this.currentUserSubject.next(authResponse.user);
  }

  /**
   * Clear authentication data
   */
  private async clearAuthData(): Promise<void> {
    await this.storage.remove(environment.keys.token);
    await this.storage.remove(environment.keys.user);
    
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'No se puede conectar al servidor';
    } else if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 403) {
      errorMessage = 'No tienes permisos para esta acción';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor';
    }

    return throwError(() => new Error(errorMessage));
  }
}