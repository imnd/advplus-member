import { Component, inject } from '@angular/core';
import { AuthStore } from '@/store/auth';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-renewal-block',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './renewal-block.html',
})
export class RenewalBlock {
  private auth = inject(AuthStore);

  currentUser = this.auth.currentUser;
  isMembershipExpired = this.auth.isMembershipExpired;
}
