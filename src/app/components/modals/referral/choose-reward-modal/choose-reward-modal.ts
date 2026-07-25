import { Component, computed, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { hideModal } from "@/core/helpers/dom";
import { ReferralStore, Club, RewardsOptionsData, Rewards } from '@/store/referral-store';
import { ErrorMessage } from '@/components/UI/error-message/error-message';
import { SkeletonWrapperComponent } from '@/components/UI/skeleton/skeleton-wrapper';
import { SkeletonComponent } from '@/components/UI/skeleton/skeleton-item';
import { ProcessButton } from '@/components/process-button/process-button';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-choose-reward-modal',
  imports: [
    InlineSvgComponent,
    ReactiveFormsModule,
    ErrorMessage,
    SkeletonWrapperComponent,
    SkeletonComponent,
    ProcessButton,
    KeyValuePipe
  ],
  templateUrl: './choose-reward-modal.html',
})
export class ChooseRewardModal implements OnInit {
  @Input({ required: true }) uuid!: string;
  @ViewChild('chooseRewardModalRef') chooseRewardModalRef!: ElementRef<HTMLElement>;

  loading = false;
  clubs: Club[] = [];
  rewardOptions: Rewards = {
    cashback: false,
    additional_month: false,
    additional_club: false,
  };
  isRewardOptionsLoading = false;
  isClubsLoading = false;
  additionalClubAvailable = false;
  rewardSelect: string | null = null;

  cancel = () => hideModal(this.chooseRewardModalRef.nativeElement);
  showClubs = computed(() => this.rewardSelect === "additional_club");

  private fb = inject(FormBuilder);
  form = this.fb.group({
    reward: ['', [Validators.required]],
  });

  referralStore = inject(ReferralStore);

  getClubs = async () => {
    this.isClubsLoading = true;
    this.referralStore
      .getReferralRewardClubs()
      .subscribe({
        next: (data: { data: Club[] }) => {
          this.clubs = data.data;
        },
        complete: () => {
          this.isClubsLoading = false;
        },
      })
  };

  @Output() chooseReward = new EventEmitter<void>();

  onSubmitChooseReward () {
    this.loading = true;

    this.referralStore
      .referralChooseReward({
        uuid: this.uuid,
        ...this.form.value,
      })
      .subscribe({
        next: () => {
          Swal.fire({
            text: "Reward successfully chosen!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-light",
            },
          }).then(() => {
            this.chooseReward.emit();
            hideModal(this.chooseRewardModalRef.nativeElement);
          });
        },
        error: (error) => {
          Swal.fire({
            text: error?.response?.data?.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-portal",
            },
          }).then(() => {
            hideModal(this.chooseRewardModalRef.nativeElement);
          });
        },
        complete: () => {
          this.loading = false;
        }
      })
  };

  ngOnInit() {
    const that = this;

    this.chooseRewardModalRef.nativeElement?.addEventListener("show.bs.modal", function () {
      that.isRewardOptionsLoading = true;
      that.rewardSelect = null;
      that.referralStore
        .getReferralRewardOptions()
        .subscribe({
          next: (data: RewardsOptionsData) => {
            that.rewardOptions = data.data.rewards;
            that.additionalClubAvailable = data.data.additional_club_available;
            if (that.additionalClubAvailable) {
              that.getClubs();
            }
          },
          complete: () => {
            that.isRewardOptionsLoading = false;
          },
        })
    });
  }
}
