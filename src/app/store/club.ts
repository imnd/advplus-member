import { inject, Injectable, signal } from '@angular/core';
import ApiService from "@/services/api.service";
import { AxiosRequestConfig } from 'axios';

interface ClubFilter {
  name: string
}

@Injectable({ providedIn: 'root' })
export class Club {
  private state = signal<{
    displayGrid: boolean;
  }>({
    displayGrid: true
  });

  private api = inject(ApiService);

  getClub(slug: string) {
    return this.api.get("my-clubs", slug);
  }

  getClubs(queryParams: ClubFilter) {
    return this.api.query("my-clubs", this.api.prepareParams(queryParams));
  }

  getAllClubs(queryParams: ClubFilter) {
    return this.api.query("all-clubs", this.api.prepareParams(queryParams));
  }

  addToFavorites(queryParams: { id: number }) {
    return this.api.post("add-to-favorites", queryParams);
  }

  removeFromFavorites(queryParams: { id: number }) {
    return this.api.post("remove-from-favorites", queryParams);
  }
}
