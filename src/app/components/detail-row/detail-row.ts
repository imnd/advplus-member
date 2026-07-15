import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-row',
  imports: [],
  template: `
    <div class="py-3">
      <div class="fw-bolder text-gray-600">{{ title }}</div>
      <div class="fw-bold text-gray-700">
        <slot></slot>
      </div>
    </div>
  `,
})
export class DetailRow {
  @Input() title: string = "";
}
