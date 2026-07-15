import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from "@/components/loader/loader";
import ConfigService from "@/services/config/config.service";
import { ConfigStore } from '@/store/config';
import { initializeComponents } from "@/core/plugins/keenthemes";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Loader ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('advplus-member');
  private configService = inject(ConfigService);
  protected readonly loaderLogo = this.configService.loaderLogo;

  private configStore = inject(ConfigStore);

  ngOnInit() {
    /**
     * it's to override the layout config using saved data from localStorage
     * remove this to use config only from static config (@/core/config/default-layout-config.ts)
     */
    this.configStore.overrideLayoutConfig();
    setTimeout(initializeComponents);
  }
}
