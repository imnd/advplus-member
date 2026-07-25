import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { hideModal } from "@/core/helpers/dom";
import { ReferralStore } from '@/store/referral-store';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { ProcessButton } from '@/components/process-button/process-button';
import { ErrorMessage } from '@/components/UI/error-message/error-message';

@Component({
  selector: 'app-add-referee-modal',
  imports: [
    InlineSvgComponent,
    ReactiveFormsModule,
    ProcessButton,
    ErrorMessage
  ],
  templateUrl: './add-referee-modal.html',
  styleUrl: './add-referee-modal.scss',
})
export class AddRefereeModal {
  @Input() type: string = "";
  @Input() code?: string = "";

  @ViewChild('addRefereeModalRef') addRefereeModalRef!: ElementRef<HTMLElement>;
  cancel = () => hideModal(this.addRefereeModalRef.nativeElement);

  // Form
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
    });
  }

  // Form submit function
  loading = false;
  referralStore = inject(ReferralStore);

  async onSubmitAddReferee () {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.value;
    this.loading = true;
    this.referralStore
      .addReferee(values)
      .subscribe({
        next: () => Swal.fire({
          text: "Referee successfully added!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: { confirmButton: "btn fw-bold btn-light" },
        }).then(() => this.updateReferrals.emit()),
        error: (error) => {
          Swal.fire({
            text: error.error.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            customClass: { confirmButton: "btn btn-portal" },
          });
        },
        complete: () => {
          this.loading = false;
          this.cancel();
          this.form.reset();
        }
      });
  };

  @Output() updateReferrals = new EventEmitter<void>();
}
