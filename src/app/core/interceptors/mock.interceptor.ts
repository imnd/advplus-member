import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';

interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
}

// mock testing user accounts
const users: User[] = [
  {
    name: 'Name',
    surname: 'Surname',
    email: 'admin@demo.com',
    password: 'demo',
    token: 'mgfi5juf74j',
  },
  {
    name: 'Name',
    surname: 'Surname',
    email: 'admin2@demo.com',
    password: 'demo',
    token: 'fgj8fjdfk43',
  },
];

// небольшая задержка, чтобы имитировать реальную сеть (опционально)
const MOCK_DELAY_MS = 300;

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  // login
  if (req.method === 'POST' && req.url.endsWith('/login')) {
    const credential = req.body as { email: string; password: string };
    const found = users.find(
      (user) => credential.email === user.email && credential.password === user.password
    );

    if (found) {
      return of(new HttpResponse({ status: 200, body: found })).pipe(delay(MOCK_DELAY_MS));
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 404,
          error: { errors: ['The login detail is incorrect'] },
        })
    ).pipe(delay(MOCK_DELAY_MS));
  }

  // registration
  if (req.method === 'POST' && req.url.endsWith('/registration')) {
    const newUser = req.body as User;

    if (newUser.name && newUser.surname && newUser.email && newUser.password) {
      const found = users.find((user) => newUser.email === user.email);

      if (!found) {
        newUser.token = Math.random().toString(36).substring(2, 11);
        users.push(newUser);
        return of(new HttpResponse({ status: 200, body: newUser })).pipe(delay(MOCK_DELAY_MS));
      }

      return throwError(
        () =>
          new HttpErrorResponse({
            status: 409,
            error: { errors: ['User with this email already exists.'] },
          })
      ).pipe(delay(MOCK_DELAY_MS));
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 400,
          error: { errors: ['Please fill all needed fields to continue.'] },
        })
    ).pipe(delay(MOCK_DELAY_MS));
  }

  // forgot password
  if (req.method === 'POST' && req.url.endsWith('/forgot_password')) {
    const { email } = req.body as { email: string };

    if (email) {
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (user) {
        return of(new HttpResponse({ status: 200, body: user })).pipe(delay(MOCK_DELAY_MS));
      }

      return throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            error: { errors: ['Users with this email is not found.'] },
          })
      ).pipe(delay(MOCK_DELAY_MS));
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 400,
          error: { errors: ['Please fill all needed fields to continue.'] },
        })
    ).pipe(delay(MOCK_DELAY_MS));
  }

  // verify auth
  if (req.method === 'GET' && /\/verify\/?/.test(req.url)) {
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.replace('Token ', '');

    if (token !== 'undefined') {
      const found = users.find((user) => token === user.token);
      return of(new HttpResponse({ status: 200, body: found })).pipe(delay(MOCK_DELAY_MS));
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          error: { errors: ['Invalid authentication'] },
        })
    ).pipe(delay(MOCK_DELAY_MS));
  }

  // всё остальное — реальный запрос, интерцептор не вмешивается
  return next(req);
};
