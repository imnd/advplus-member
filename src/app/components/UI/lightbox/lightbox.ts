import { Component, input, output, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  templateUrl: './lightbox.html',
})
export class LightboxComponent {
  images = input.required<string[]>();
  visible = input(false);
  index = input(0);
  hide = output<void>();

  currentIndex = signal(0);
  zoom = signal(1);

  constructor() {
    effect(() => {
      this.currentIndex.set(this.index());
      this.zoom.set(1); // сброс зума при открытии нового изображения
    });
  }

  currentImage = computed(() => this.images()[this.currentIndex()]);

  close(): void {
    this.hide.emit();
  }

  zoomIn(): void {
    this.zoom.update(z => Math.min(z + 0.2, 3));
  }

  zoomOut(): void {
    this.zoom.update(z => Math.max(z - 0.2, 0.5));
  }
}
