import { Component, computed, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AddRefereeButton } from '@/components/account/add-referee-button/add-referee-button';
import { AddRefereeModal } from '@/components/modals/referral/add-referee-modal/add-referee-modal';
import { AuthStore } from '@/store/auth';
import { BreadcrumbService } from "@/services/breadcrumb.service";

@Component({
  selector: 'app-referral-info',
  imports: [
    AddRefereeButton,
    AddRefereeModal
  ],
  templateUrl: './referral-info.html',
})
export class ReferralInfo implements OnInit {
  @Input() buttonPosition: string = "";

  private authStore = inject(AuthStore);

  protected currentUser = this.authStore.currentUser;

  protected referralsPageImg = computed(() => {
    return this.authStore.currentUser()?.portal?.referrals_page_img;
  })

  private breadcrumbService = inject(BreadcrumbService);
  ngOnInit() {
    this.breadcrumbService.setCurrentPageBreadcrumbs("Details", ["Referrals"]);
  }

  @Output() updateReferrals = new EventEmitter<void>();
}
