import { Component, inject, OnInit } from '@angular/core';
import { PasswordMeter } from "@/services/password-meter.service";
import AuthService from "@/services/auth.service";
import { BodyStore } from '@/store/body';
import { ProcessButton } from "@/components/process-button/process-button";
import { AuthStore, Credentials } from '@/store/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ ProcessButton, ReactiveFormsModule, RouterLink ],
  templateUrl: './sign-in.html',
})
export class SignInPageComponent implements OnInit {
  protected loading = false;
  protected authFailed = false;

  // Form submit function
  form: FormGroup;
  // Create form validation object
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private authStore = inject(AuthStore);
  private authService = inject(AuthService);

  async onSubmitLogin () {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = <Credentials>this.form.value;
    this.loading = true;
    this.authFailed = false;
    this.authStore
      .login(credentials)
      .subscribe({
        next: () => this.authService.redirectToQueryParam(),
        error: ({ response }) => {
          if (response.status === 401 || response.status === 422) {
            this.authFailed = true;
          }
          this.loading = false;
        }
      });
  };

  private bodyStore = inject(BodyStore);
  ngOnInit() {
    PasswordMeter.reinitialization();
    this.bodyStore.removeBodyClassName('page-loading');
  }
}
