import { Component, inject } from '@angular/core';
import { AuthStore } from '@/store/auth';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-processing-block',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './processing-block.html',
})
export class ProcessingBlock {
  private auth = inject(AuthStore);

  currentUser = this.auth.currentUser;
}
