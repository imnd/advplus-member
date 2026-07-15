import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { isBrowser } from '@/utils/browser.util';

// TODO: перенести в сервисы
export const routerBack = (to: string): void => {
  if (!isBrowser()) {
    return;
  }

  const canGoBack = !!window.history.state?.navigationId && window.history.state.navigationId > 1;

  const location = inject(Location);
  const router = inject(Router);
  canGoBack ? location.back() : router.navigateByUrl(to);
};
