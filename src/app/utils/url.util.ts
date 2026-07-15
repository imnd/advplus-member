import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const hasActiveChildren = (match: string) => {
  const router = inject(Router);
  return router.url.indexOf(match) !== -1;
};
