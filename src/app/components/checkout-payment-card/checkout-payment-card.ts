import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// npm install @checkout.com/checkout-web-components --save
// Пакет сам подгружает официальный скрипт с checkout-web-components.checkout.com
// (это требование PCI DSS — сам скрипт нельзя бандлить/хостить у себя)
import {
  loadCheckoutWebComponents,
  type CheckoutWebComponents as CheckoutWebComponentsInstance,
} from '@checkout.com/checkout-web-components';

import { environment } from '@/environments/environment';
import {
  PaymentSession,
  PaymentSessionService,
} from './payment-session.service';

@Component({
  selector: 'app-checkout-payment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-payment-card.html',
  styleUrl: './checkout-payment-card.scss',
})
export class CheckoutPaymentCard implements AfterViewInit, OnDestroy
{
  // Данные заказа — раньше их не было, потому что Frames.js токенизировал
  // карту без привязки к сумме. Flow работает через PaymentSession,
  // которая создаётся под конкретный заказ.
  @Input({ required: true }) amount!: number; // в минимальных единицах валюты
  @Input({ required: true }) currency!: string;
  @Input({ required: true }) reference!: string;

  // аналог displayForm из v-if в родительском шаблоне
  @Input() displayForm = true;

  @Output() paymentCompleted = new EventEmitter<string>(); // paymentId
  @Output() validationChanged = new EventEmitter<boolean>();
  @Output() errorOccurred = new EventEmitter<unknown>();

  @ViewChild('flowContainer') private readonly flowContainer!: ElementRef<HTMLDivElement>;

  isLoading = signal(true);

  private checkout?: CheckoutWebComponentsInstance;
  private flowComponent?: ReturnType<CheckoutWebComponentsInstance['create']>;

  constructor(private readonly paymentSessionService: PaymentSessionService) {}

  ngAfterViewInit(): void {
    if (this.displayForm) {
      this.initializeFlow();
    }
  }

  ngOnDestroy(): void {
    this.flowComponent?.unmount();
  }

  // ужен, только если показываете свою кнопку оплаты и передаёте showPayButton:
  // false при создании компонента
  submitCard(): void {
    this.flowComponent?.submit();
  }

  // аналог reload() — пересоздаёт PaymentSession и перемонтирует форму
  reload(): void {
    this.flowComponent?.unmount();
    this.initializeFlow();
  }

  private initializeFlow(): void {
    this.isLoading.set(true);

    this.paymentSessionService
      .create({
        amount: this.amount,
        currency: this.currency,
        reference: this.reference,
      })
      .subscribe({
        next: (paymentSession) => this.mountFlow(paymentSession),
        error: (error) => this.errorOccurred.emit(error),
      });
  }

  private async mountFlow(paymentSession: PaymentSession): Promise<void> {
    this.checkout = await loadCheckoutWebComponents({
      publicKey: environment.checkoutPublicKey,
      environment: environment.checkoutEnvironment,
      paymentSession,
    });

    this.flowComponent = this.checkout.create('flow', {
      // Оставляем стандартную кнопку Flow. Если нужна своя кнопка —
      // showPayButton: false, и дергать submitCard() самостоятельно.
      showPayButton: true,

      // Колбэки регистрируются не через addEventHandler, как в Frames.js,
      // а передаются прямо сюда, в объект опций create()
      onReady: () => this.isLoading.set(false),
      onChange: (component) => this.validationChanged.emit(component.isValid()),
      onPaymentCompleted: (_component, paymentResponse) =>
        this.paymentCompleted.emit(paymentResponse.id),
      onError: (_component, error) => this.errorOccurred.emit(error),
    });

    this.flowComponent.mount(this.flowContainer.nativeElement);
  }
}
