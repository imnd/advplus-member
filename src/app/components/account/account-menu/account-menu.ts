import { Component, inject } from '@angular/core';
import { AuthStore } from '@/store/auth';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { Router, RouterLink } from '@angular/router';
import AuthService from '@/services/auth.service';

@Component({
  selector: 'app-account-menu',
  imports: [
    InlineSvgComponent,
    RouterLink
  ],
  templateUrl: './account-menu.html',
})
export class AccountMenu {
  protected router = inject(Router);

  private authStore = inject(AuthStore);
  currentUser = this.authStore.currentUser;

  private authService = inject(AuthService);
  protected hasAccess = this.authService.hasAccess;

  protected avatarDotClassMap = <Record<string, string>>{
    active: "bg-success",
    payment_defaulted_on_hold: "bg-primary",
    processing: "bg-primary",
    expired: "bg-danger",
  }
}
