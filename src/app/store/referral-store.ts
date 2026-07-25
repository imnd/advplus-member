import { inject, Injectable } from '@angular/core';
import ApiService from "@/services/api.service";
import { Observable } from 'rxjs';

export const StatusLead = 'lead';
export const StatusJoined = 'joined';
export const StatusDeclined = 'declined';
export const StatusContacted = 'contacted';
export type ReferralStatus = typeof StatusLead | typeof StatusJoined | typeof StatusDeclined | typeof StatusContacted;

export interface Referral {
  uuid: string;
  status: ReferralStatus;
  status_title: string;
  name: string;
  email: string;
  mobile: string;
  reward: string;
  reward_status: string;
  reward_available: boolean;
}

export interface Club {
  uuid: string
  title: string
}

export type Referrals = Referral[];

export interface ReferralsData {
  data: Referrals
  meta: {
    total: number
    current_page: number
    from: number
    to: number
    last_page: number
  }
}

export interface ReferralsFilter {
  page: number
  perPage: number
}

export interface Rewards {
  cashback: boolean
  additional_month: boolean
  additional_club: boolean
}

export interface RewardsOptions {
  rewards: Rewards
  additional_club_available: boolean
}

export interface RewardsOptionsData {
  data: RewardsOptions
}

@Injectable({ providedIn: 'root' })
export class ReferralStore {
  private api = inject(ApiService);

  getReferrals(queryParams: {}): Observable<ReferralsData> {
    return this.api.query("referrals", this.api.prepareParams(queryParams));
  }

  addReferee(data: {
    name: string,
    email: string,
    mobile: string,
  }) {
    return this.api.post("referrals", data);
  }

  getReferralRewardOptions(): Observable<RewardsOptionsData> {
    return this.api.query(`referrals/rewards/options`);
  }

  referralChooseReward(data: { uuid: string }) {
    return this.api.put(`referrals/rewards/${data.uuid}`, data);
  }

  getReferralRewardClubs(): Observable<{ data: Club[] }> {
    return this.api.query(`referrals/rewards/clubs`);
  }
}
