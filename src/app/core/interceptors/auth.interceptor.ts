import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { AuthStore } from '@/store/auth';

let isRefreshing = false;
const accessTokenSubject = new Subject<string | null>();

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  const isAuthRoute = ['auth/refresh-token', 'auth/login'].some(url =>
    req.url.includes(url)
  );

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthRoute) {
        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        return auth.refreshToken().pipe(
          switchMap((accessToken: string) => {
            isRefreshing = false;
            accessTokenSubject.next(accessToken);
            return next(req); // повторяем исходный запрос с новым токеном
          }),
          catchError(err => {
            isRefreshing = false;
            accessTokenSubject.next(null);
            router.navigate(['/sign-in'], {
              queryParams: { redirect: location.pathname + location.search },
            });
            return throwError(() => err);
          })
        );
      }

      // refresh уже идёт — ждём его результата и повторяем запрос, не запуская второй refresh
      return accessTokenSubject.pipe(
        filter(token => token !== undefined),
        take(1),
        switchMap(token => {
          if (!token) {
            return throwError(() => error);
          }
          return next(req);
        })
      );
    })
  );
};
