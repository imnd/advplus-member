import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Field } from '@/components/UI/field/field';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AuthStore, ChangePasswordData } from '@/store/auth';
import { firstValueFrom } from 'rxjs';
import { passwordsMatchValidator } from '@/utils/validators.util';
import { ProcessButton } from '@/components/process-button/process-button';

@Component({
  selector: 'app-change-password-modal',
  imports: [
    ReactiveFormsModule,
    Field,
    InlineSvgComponent,
    ProcessButton
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePasswordModal {
  changePasswordModal = viewChild<ElementRef<HTMLInputElement>>("changePasswordModal")

  cancel = () => hideModal(this.changePasswordModal()?.nativeElement ?? null);

  loading = false;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      current_password: new FormControl("", [Validators.required, Validators.minLength(1)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      confirmation: new FormControl("", [Validators.required]),
    }, { validators: passwordsMatchValidator } );
  }

  private authStore = inject(AuthStore);
  async onSubmitChangePassword () {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const values = this.form.value;
    try {
      await firstValueFrom(this.authStore.changePassword(<ChangePasswordData>{
        old_password: values.current_password,
        new_password: values.password,
      }));

      await Swal.fire({
        text: "Password successfully changed!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light",
        },
      });

      this.cancel();
    } catch {
      const errors = this.authStore.getErrors();
      const [firstError] = Object.keys(errors);

      await Swal.fire({
        text: errors[firstError],
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Try again!",
        customClass: {
          confirmButton: "btn btn-portal",
        },
      });
    } finally {
      this.form.reset();
    }

    this.loading = false;
  };
}
