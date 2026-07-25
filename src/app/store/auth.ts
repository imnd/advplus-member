import Swal from 'sweetalert2';
import { computed, inject, Injectable, signal } from '@angular/core';
import JwtService from '@/services/jwt.service';
import ApiService from '@/services/api.service';
import { setPortalColor } from '@/core/helpers/portal-color';
import * as Sentry from '@sentry/angular';
import { Router } from '@angular/router';
import { BodyStore } from '@/store/body';

import UserInterface, { UserData } from '@/app/types/UserInterface';
import { UserAuthInfo } from '@/app/types/UserInterface';
import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface UserInfo extends UserAuthInfo {
  isLoading: boolean
}

interface AuthData {
  access_token: string
}

export interface Credentials {
  email: string
  password: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ChangePasswordData {
  old_password: string
  new_password: string
}

export interface ResetPasswordData {
  token: string
  password: string
  password_confirmation: string
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private router = inject(Router);
  private bodyStore = inject(BodyStore);
  private http: HttpClient = inject(HttpClient);
  private api = inject(ApiService);

  private state = signal<UserInfo>({
    errors: {} as Record<string, string>,
    user: {} as UserInterface,
    isAuthenticated: !!JwtService.getAccessToken(),
    isLoading: false
  });

  readonly isUserLoading = computed(() => this.state().isLoading);

  readonly currentUser = computed(() => this.state().user);

  readonly userAvatar = computed(() => this.state().user?.avatar_url?.medium ?? '/media/avatars/blank.png');

  readonly getPrimaryColor = computed(() => this.state().user?.portal?.primary_color ?? '');

  readonly getUserPortalLogo = computed(() => this.state().user?.portal?.logo ?? '');

  readonly isUserAuthenticated = computed(() => this.state().isAuthenticated);

  readonly getErrors = computed(() => this.state().errors);

  readonly isMembershipExpired = computed(() => this.state().user.membership_status === 'expired');

  setUserLoading(isLoading: boolean) {
    this.state.update(s => ({
      ...s,
      isLoading
    }));
  }

  setError(error: UserInfo) {
    this.state.update(s => ({
      ...s,
      error
    }));
  }

  setAuth(data: AuthData) {
    if (data.access_token) {
      this.state.update(s => ({
        ...s,
        isAuthenticated: true,
        errors: {}
      }));
      JwtService.saveTokens(data);
    } else {
      this.purgeAuth();
    }
  }

  setUser(user: UserInterface) {
    setPortalColor(user.portal?.primary_color ?? '#FFEEDD');
    this.state.update(s => ({ ...s, user }));
    Sentry.setUser({
      member_id: String(user.member_id),
      email: user.email
    });
  }

  purgeAuth() {
    this.state.update(s => ({
      ...s,
      isAuthenticated: false,
      user: {} as UserInterface,
      errors: {}
    }));
    JwtService.destroyTokens();
  }

  login(credentials: Credentials): Observable<AuthData> {
    return this.api
      .post<AuthData>('auth/login', credentials)
      .pipe(
        tap(data => this.setAuth(data))
      );
  }

  logout() {
    this.api.post('auth/logout');
    this.purgeAuth();
  }

  forgotPassword(payload: ForgotPasswordData): Observable<AuthData> {
    return this.api
      .post<AuthData>('auth/forgot-password', payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.setError(error.error);
          return throwError(() => error);
        })
      );
  }

  resetPassword(payload: ResetPasswordData): Observable<AuthData> {
    return this.api
      .post<AuthData>('reset-password', payload)
      .pipe(
        tap(data => this.setAuth(data)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422) {
            Swal.fire({
              text: 'Invalid Token',
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: 'Try again!',
              customClass: {
                confirmButton: 'btn fw-bold btn-light-danger'
              }
            }).then(() => {
              this.router.navigate(['/forgot-password']);
            });
          } else {
            this.setError(error.error);
          }
          return throwError(() => error);
        })
      );
  }

  changePassword(payload: ChangePasswordData): Observable<unknown> {
    return this.api
      .post<AuthData>('auth/forgot-password', payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.setError(error.error?.errors ?? error.error);
          return throwError(() => error);
        })
      );
  }

  refreshToken(): Observable<string> {
    const refreshToken = JwtService.getRefreshToken();

    if (!refreshToken) {
      this.purgeAuth();
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<{ access_token: string; errors?: any }>('auth/refresh-token', {
      refresh_token: refreshToken
    }).pipe(
      tap((data: AuthData) => this.setAuth(data)),
      map((data: AuthData) => data.access_token),
      catchError(err => {
        this.setError(err.error?.errors ?? err.error);
        this.purgeAuth();
        return throwError(() => err);
      })
    );
  }

  async verifyAuth() {
    return new Promise((resolve, reject) => {
      if (!JwtService.getAccessToken()) {
        this.purgeAuth();
        return reject();
      }

      if (Object.keys(this.state().user).length) {
        return resolve(true);
      }

      const bodyLoading = setTimeout(() => {
        // if there is no user so it's first load
        this.bodyStore.addBodyClassName('page-loading');
        this.bodyStore.addBodyClassName('page-loading-enabled');
      }, 300);

      this.getUser().subscribe({
        next: () => {
          resolve(true);
        },
        error: (err) => {
          reject(err);
        },
        complete: () => {
          clearTimeout(bodyLoading);
          this.bodyStore.removeBodyClassName('page-loading');
        },
      });
    });
  }

  getUser(): Observable<UserData> {
    this.setUserLoading(true);
    return this.api
      .get<UserData>('auth/user')
      .pipe(
        tap(data => {
          this.setUser(data.data)
        }),

        catchError((err: HttpErrorResponse) => {
          this.setError(err.error?.errors ?? err.error);
          this.purgeAuth();
          return throwError(() => err);
        }),
        finalize(() => {
          this.setUserLoading(false);
        })
      );
  }
}
