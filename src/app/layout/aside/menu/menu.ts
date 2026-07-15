import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import ConfigService from "@/services/config/config.service";
import MenuConfigService from '@/services/config/menu-config.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { translate } from "@/utils/translate.util";
import { hasActiveChildren } from "@/utils/url.util";

@Component({
  selector: 'app-aside-menu',
  templateUrl: './menu.html',
  imports: [
    RouterLink,
    InlineSvgComponent,
    RouterLinkActive
  ]
})
export class AsideMenu implements OnInit {
  scrollElRef = viewChild<ElementRef<HTMLElement>>('scrollEl');

  ngOnInit() {
    this.scrollElRef()?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected translate = translate
  protected hasActiveChildren = hasActiveChildren;

  private configService = inject(ConfigService);
  protected asideMenuIcons = this.configService.asideMenuIcons;
  private menuConfigService = inject(MenuConfigService);
  protected mainMenuConfig = this.menuConfigService.menuConfig
}
