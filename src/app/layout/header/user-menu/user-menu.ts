import { Component, computed, inject } from '@angular/core';
import { AuthStore } from '@/store/auth';
import { Router, RouterLink } from '@angular/router';
import { isBrowser } from '@/utils/browser.util';
import AuthService from '@/services/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [ RouterLink ],
  templateUrl: './user-menu.html',
})
export class UserMenu {
  private auth = inject(AuthStore);
  private router = inject(Router);

  fullName = computed(() => {
    return `${this.auth.currentUser().first_name} ${this.auth.currentUser().last_name}`;
  });
  email = computed(() => {
    return this.auth.currentUser().email;
  });
  avatar = this.auth.userAvatar;

  private authService = inject(AuthService);
  protected hasAccess = this.authService.hasAccess;
  signOut () {
    if (!isBrowser()) {
      return;
    }
    const hasAccessLogout = this.authService.hasAccess("logout");
    this.auth.logout()
    this.router.navigate(['/sign-in']).then(() => hasAccessLogout && window.close());
  };
}
