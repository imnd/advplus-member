import { Component, input, effect, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-inline-svg',
  standalone: true,
  template: `<div class="inline-svg-wrapper" [innerHTML]="svgContent()"></div>`,
})
export class InlineSvgComponent {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  src = input.required<string>();
  svgContent = signal<SafeHtml>('');

  constructor() {
    effect(() => {
      const url = this.src();
      if (!url) {
        this.svgContent.set('');
        return;
      }

      this.http
        .get(url, { responseType: 'text' })
        .subscribe({
          next: (svg) => this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(svg)),
          error: () => this.svgContent.set(''),
        });
    });
  }
}
