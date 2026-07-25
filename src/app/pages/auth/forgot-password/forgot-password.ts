import { Component, inject } from '@angular/core';
import { Field } from '@/components/UI/field/field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore, ForgotPasswordData } from '@/store/auth';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { ProcessButton } from '@/components/process-button/process-button';

@Component({
  selector: 'app-forgot-password',
  imports: [
    Field,
    ReactiveFormsModule,
    RouterLink,
    ProcessButton
  ],
  templateUrl: './forgot-password.html',
})
export class ForgotPasswordPage {
  loading = false;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private authStore = inject(AuthStore);
  async onSubmitForgotPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const values = this.form.value;
    try {
      await firstValueFrom(this.authStore.forgotPassword(<ForgotPasswordData>values));

      this.form.get("email")?.setValue("");
      Swal.fire({
        text: "Password reset email have been successfully sent!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-portal",
        },
      });
    } catch {
      const errors = this.authStore.getErrors();
      const [firstError] = Object.keys(errors);
      await Swal.fire({
        text: errors[firstError],
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-danger",
        },
      });
    }

    this.loading = false;
  };
}
