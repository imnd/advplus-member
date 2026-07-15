import { Component, computed, inject } from '@angular/core';
import { AuthStore } from '@/store/auth';
import { ReferralInfo } from '@/components/account/referral-info/referral-info';
import AuthService from '@/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ ReferralInfo ],
  templateUrl: './profile.html',
})
export class ProfilePageComponent {
  private authService = inject(AuthService);
  protected hasAccess = this.authService.hasAccess;

  private authStore = inject(AuthStore);
  protected currentUser = this.authStore.currentUser;
  protected currentUserCouponLength = computed(() => {
    const keys = Object.keys(this.currentUser().coupon ?? {});
    return keys.length;
  });
  protected portal = computed(() => this.currentUser().portal);
  protected kids = computed(() => this.currentUser().kids);
  protected visitingFamilyMembership = computed(() => this.currentUser().visiting_family_membership);

  protected isMembershipExpired = this.authStore.isMembershipExpired;
  protected Object = Object;
}
