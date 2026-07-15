import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { environment } from '@/environments/environment';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@/core/interceptors/auth.interceptor';
import { mockInterceptor } from '@/core/interceptors/mock.interceptor';
import { RouterListenerService } from '@/services/router-listener.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([
      authInterceptor,
      ...(environment.useMockApi ? [mockInterceptor] : []),
    ])),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: "disabled" }),
    ),
    provideAppInitializer(() => {
      inject(RouterListenerService).init();
    }),
  ]
};
