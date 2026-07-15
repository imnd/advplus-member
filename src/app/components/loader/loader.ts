import { Component, inject, Input } from '@angular/core';
import { ConfigStore } from '@/store/config';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
})
export class Loader {
  @Input() logo: string = "";

  private config = inject(ConfigStore);

  get loaderType(): string {
    return this.config.layoutConfig("loader.type") || '';
  }
}
