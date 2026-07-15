import { Component, Input, input } from '@angular/core';
import { SkeletonComponent } from './skeleton';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    @if (loading) {
      <div class="skeleton-wrapper" [class.skeleton-wrapper--animated]="animated">
        @for (row of rowsArray(); track $index) {
          <app-skeleton-item variant="text" [style.width]="$index === rowsArray().length - 1 ? '60%' : '100%'" />
        }
      </div>
    } @else {
      <ng-content />
    }
  `,
})
export class SkeletonWrapperComponent {
  @Input() loading: boolean = false;
  @Input() animated: boolean = true;
  @Input() rows: number = 3;

  rowsArray = () => Array.from({ length: this.rows });
}
