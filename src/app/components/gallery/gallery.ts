import { Component, input, signal, computed, viewChild, ElementRef, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navigation } from 'swiper/modules';
import type { SwiperContainer } from 'swiper/element';
import { LightboxComponent } from '@/components/UI/lightbox/lightbox';

interface GalleryItem {
  name_url: Record<string, string>; // large, medium, ...
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [LightboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './gallery.html',
})
export class Gallery implements AfterViewInit {
  items = input.required<GalleryItem[]>();
  thumbnailSize = input<string>('medium');

  private swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');

  visible = signal(false);
  index = signal(0);

  modules = [Navigation];
  breakpoints = {
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 },
  };

  images = computed(() => this.items().map(item => item.name_url['large']));

  ngAfterViewInit(): void {
    const el = this.swiperRef()?.nativeElement;
    if (!el) return;

    Object.assign(el, {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: true,
      breakpoints: this.breakpoints,
      modules: this.modules,
    });
    el.initialize();
  }

  showImg(i: number): void {
    this.index.set(i);
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
  }
}
