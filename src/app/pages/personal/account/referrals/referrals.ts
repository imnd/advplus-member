import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Referrals, ReferralsData,
  ReferralsFilter, ReferralStore,
  StatusContacted, StatusDeclined,
  StatusJoined, StatusLead
} from '@/store/referral-store';
import { AuthStore } from '@/store/auth';
import { ReferralInfo } from '@/components/account/referral-info/referral-info';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { ChooseRewardModal } from '@/components/modals/referral/choose-reward-modal/choose-reward-modal';
import { SkeletonWrapperComponent } from '@/components/UI/skeleton/skeleton-wrapper';
import { SkeletonComponent } from '@/components/UI/skeleton/skeleton-item';
import { Pagination } from '@/components/UI/pagination/pagination';

const StatusBadges = {
  [StatusLead]: 'badge-light-warning',
  [StatusJoined]: 'badge-light-success',
  [StatusDeclined]: 'badge-light-danger',
  [StatusContacted]: 'badge-light-primary'
} as const;

@Component({
  selector: 'app-referrals',
  imports: [
    ReferralInfo,
    InlineSvgComponent,
    ChooseRewardModal,
    SkeletonWrapperComponent,
    SkeletonComponent,
    Pagination
  ],
  templateUrl: './referrals.html'
})
export class ReferralsPage implements OnInit {
  REWARD_STATUS_PENDING = 'pending';
  REWARD_STATUS_COMPLETE = 'complete';

  referrals: Referrals = [];
  from = 0;
  to = 0;
  total = 0;
  lastPage = 0;
  isLoading = true;
  uuid = '';

  page: number = 1;
  perPage: number = 15;

  private authStore = inject(AuthStore);
  protected currentUser = this.authStore.currentUser;

  route = inject(ActivatedRoute);
  ngOnInit() {
    this.page = parseInt(this.route.snapshot.queryParamMap.get('page') ?? '1');
    this.perPage = parseInt(this.route.snapshot.queryParamMap.get('perPage') ?? '15');
  }

  getStatusBadge = (status: keyof typeof StatusBadges) => (status ? StatusBadges[status] : 'badge-light');

  getQueryParams = computed<ReferralsFilter>(() => {
    return {
      page: this.page,
      perPage: this.perPage
    };
  });

  referralStore = inject(ReferralStore);
  fetchDataReferrals = async () => {
    this.isLoading = true;

    this.referralStore
      .getReferrals(this.getQueryParams())
      .subscribe({
        next: (data: ReferralsData) => {
          const meta = data.meta;
          this.referrals = data.data;
          this.page = meta?.current_page;
          this.total = meta?.total;
          this.from = meta?.from;
          this.to = meta?.to;
          this.lastPage = meta?.last_page;
        },
        complete: () => this.isLoading = false
      });
  };

  updateReferrals = () => {
    this.from = 0;
    this.to = 0;
    this.total = 0;
    this.perPage = 15;
    this.lastPage = 0;
    this.fetchDataReferrals();
  };

  updatePage = () => {
    this.updateReferrals();
    this.authStore.getUser()
  };

  currentPageChange = (page: number) => {
    this.page = page;
    this.fetchDataReferrals();
  };
}
