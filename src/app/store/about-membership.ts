import ApiService from "@/services/api.service";
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AboutMembershipStore {
  private api = inject(ApiService);

  getAboutMembership(id: string) {
    return firstValueFrom(this.api.get("about-membership", id));
  }
  getAboutMemberships() {
    return firstValueFrom(this.api.query("about-membership"));
  }
}
