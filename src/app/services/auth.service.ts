import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from '@/store/auth';
import PortalInterface from '@/app/types/PortalInterface';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  router = inject(Router);
  route = inject(ActivatedRoute);

  redirectToQueryParam = (): Promise<boolean> => {
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    const url = redirect && redirect.charAt(0) === '/' ? redirect : '/';

    return this.router.navigateByUrl(url);
  };

  authStore = inject(AuthStore);
  hasAccess = (access: string): boolean => {
    return !!(
      !this.authStore.isMembershipExpired() &&
      this.authStore.currentUser()?.portal &&
      this.authStore.currentUser()?.portal?.[`has_access_${access}` as keyof PortalInterface]
    );
  }
}
