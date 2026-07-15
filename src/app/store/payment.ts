import { inject, Injectable } from '@angular/core';
import ApiService from '@/services/api.service';
import { AuthStore } from '@/store/auth';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Payment {
  private auth = inject(AuthStore);
  private api = inject(ApiService);

  getPayments() {
    return this.api.query('payments');
  }

  attachPaymentCard(payload: { token: string }) {
    this.api
      .post('payments/attach-card', payload)
      .pipe(tap(() => {
        this.auth.getUser().subscribe();
        this.getPayments().subscribe();
      }));
  }
}
