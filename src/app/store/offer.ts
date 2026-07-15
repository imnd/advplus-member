import { inject, Injectable } from '@angular/core';
import ApiService from "@/services/api.service";

@Injectable({ providedIn: 'root' })
export class Offer {
  private api = inject(ApiService);

  getOffer(id: string) {
    return this.api.get("offers", id);
  }

  getOffers(queryParams: {
    type: string,
    emirate: string,
    name: string,
  }) {
    return this.api.query("offers", this.api.prepareParams(queryParams));
  }

  getOfferTypes() {
    return this.api.query("offer-types");
  }

  getOfferCities() {
    return this.api.query("offer-emirates");
  }
}
