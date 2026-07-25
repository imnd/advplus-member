import { Component, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessage } from '@/components/UI/error-message/error-message';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-field',
  templateUrl: './field.html',
  imports: [
    ReactiveFormsModule,
    ErrorMessage
  ]
})
export class Field {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) name!: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type: 'password' | 'email' | 'text' | 'select' = 'text';
  @Input() wrapperClass: string = 'mb-1';
  @Input() autocomplete: 'off' | 'on' = 'on';
  @Input() options?: Option[];

  showPassword = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }
}
