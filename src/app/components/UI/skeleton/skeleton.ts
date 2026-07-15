import { Component, input } from '@angular/core';

type SkeletonVariant = 'text' | 'image' | 'circle' | 'button' | 'rect' | 'h1';

@Component({
  selector: 'app-skeleton-item',
  standalone: true,
  template: `<div class="skeleton-item" [class]="'skeleton-item--' + variant()"></div>`,
})
export class SkeletonComponent {
  variant = input<SkeletonVariant>('text');
}
