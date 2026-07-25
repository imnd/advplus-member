import { Component, inject, OnInit } from '@angular/core';
import { PasswordMeterComponent } from '@/components/password-meter';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordsMatchValidator } from '@/utils/validators.util';
import { ErrorMessage } from '@/components/UI/error-message/error-message';
import { Field } from '@/components/UI/field/field';
import { AuthStore, ResetPasswordData } from '@/store/auth';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ProcessButton } from '@/components/process-button/process-button';

@Component({
  selector: 'app-update-password',
  imports: [
    Field,
    ReactiveFormsModule,
    RouterLink,
    ProcessButton
  ],
  templateUrl: './update-password.html',
})
export class UpdatePasswordPage implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  loading = false;
  titleText = this.route.snapshot.data["name"] === "reset-password" ? "Reset Password" : "Create Password";
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      confirmation: new FormControl("", [Validators.required]),
    }, { validators: passwordsMatchValidator } );
  }

  ngOnInit() {
    if (!this.route.snapshot.queryParamMap.get("token")) {
      this.router.navigate(["sign-in"]);
    }
    PasswordMeterComponent.reinitialization();
  };

  private authStore = inject(AuthStore);
  async onSubmitResetPassword () {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const values = this.form.value;

    try {
      await firstValueFrom(this.authStore.resetPassword(<ResetPasswordData>{
        token: this.route.snapshot.queryParamMap.get("token"),
        password: values.password,
        password_confirmation: values.confirmation,
      }));
    } catch {
      const [error] = Object.keys(this.authStore.getErrors());
      Swal.fire({
        text: this.authStore.getErrors()[error],
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Try again!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-danger",
        },
      });
    } finally {
      if (this.authStore.isUserAuthenticated()) {
        this.authStore.getUser()
        Swal.fire({
          text: "Password successfully accepted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light",
          },
        }).then(() => {
          this.router.navigate(["/"]);
        });
      }
    }

    this.loading = false;
  };
}
