import { Component } from '@angular/core';
import { SkeletonComponent } from '@/components/UI/skeleton/skeleton-item';
import { SkeletonWrapperComponent } from '@/components/UI/skeleton/skeleton-wrapper';

@Component({
  selector: 'app-details-page-loading',
  imports: [
    SkeletonComponent,
    SkeletonWrapperComponent
  ],
  templateUrl: './details-page-loading.html',
})
export class DetailsPageLoading {}
