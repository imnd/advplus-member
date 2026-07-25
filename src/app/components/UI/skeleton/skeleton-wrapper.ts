import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { SkeletonComponent } from './skeleton-item';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [SkeletonComponent, NgTemplateOutlet],
  template: `
    @if (loading) {
      @if (templateTpl) {
        <ng-container [ngTemplateOutlet]="templateTpl" />
      } @else {
        <div class="skeleton-wrapper" [class.skeleton-wrapper--animated]="animated">
          @for (row of rowsArray(); track $index) {
            <app-skeleton-item variant="text" [style.width]="$index === rowsArray().length - 1 ? '60%' : '100%'" />
          }
        </div>
      }
    } @else {
      @if (contentTpl) {
        <ng-container [ngTemplateOutlet]="contentTpl" />
      } @else {
        <ng-content />
      }
    }
  `,
})
export class SkeletonWrapperComponent {
  @Input() loading: boolean = false;
  @Input() animated: boolean = true;
  @Input() rows: number = 3;

  @ContentChild('template') templateTpl?: TemplateRef<any>;
  @ContentChild('content') contentTpl?: TemplateRef<any>;

  rowsArray = () => Array.from({ length: this.rows });
}
