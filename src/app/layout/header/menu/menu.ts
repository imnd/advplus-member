import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import MenuConfigService from '@/services/config/menu-config.service';
import ConfigService from "@/services/config/config.service";
import { translate } from "@/utils/translate.util";
import { hasActiveChildren } from "@/utils/url.util";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  imports: [
    RouterLink,
    InlineSvgComponent,
    RouterLinkActive
  ]
})
export class Menu {
  protected hasActiveChildren = hasActiveChildren;
  protected translate = translate

  private configService = inject(ConfigService);
  protected headerMenuIcons = this.configService.headerMenuIcons

  private menuConfigService = inject(MenuConfigService);
  protected mainMenuConfig = this.menuConfigService.menuConfig
}
