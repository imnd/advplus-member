import { inject, Injectable } from '@angular/core';
import ApiService from "@/services/api.service";

@Injectable({ providedIn: 'root' })
export class ReferralStore {
  private api = inject(ApiService);

  getReferrals() {
    return this.api.query("referrals");
  }

  addReferee(data: {
    name: string,
    email: string,
    mobile: string,
  }) {
    return this.api.post("referrals", data);
  }

  getReferralRewardOptions() {
    return this.api.query(`referrals/rewards/options`);
  }

  referralChooseReward(data: { uuid: string }) {
    this.api.put(`referrals/rewards/${data.uuid}`, data);
  }

  getReferralRewardClubs() {
    return this.api.query(`referrals/rewards/clubs`);
  }
}
