import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreatePaymentSessionRequest {
  amount: number; // в минимальных единицах валюты (копейки/центы)
  currency: string; // ISO 4217, напр. 'USD'
  reference: string;
}

// Ответ Checkout.com Payment Sessions API — пробрасывается на клиент как есть
export interface PaymentSession {
  id: string;
  payment_session_token: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class PaymentSessionService {
  constructor(private readonly http: HttpClient) {}

  // Вызывает НАШ backend, а не Checkout.com напрямую — секретный ключ
  // используется только на сервере, на клиенте его быть не должно.
  create(request: CreatePaymentSessionRequest): Observable<PaymentSession> {
    return this.http.post<PaymentSession>('/api/payment-sessions', request);
  }
}
