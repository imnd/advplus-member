import { Component, computed, inject, Input } from '@angular/core';
import { Topbar } from "@/layout/header/topbar/topbar";
import { Menu } from "@/layout/header/menu/menu";
import { RouterLink } from '@angular/router';
import ConfigService from "@/services/config/config.service";
import { AuthStore } from '@/store/auth';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';
import { isBrowser } from '@/utils/browser.util';

@Component({
  selector: 'app-header',
  imports: [ Topbar, Menu, RouterLink, InlineSvgComponent ],
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string = "";

  private configService = inject(ConfigService);

  private auth = inject(AuthStore);
  isMembershipExpired = this.auth.isMembershipExpired;

  isHeaderSticky = computed(() => {
    if (isBrowser() && window.innerWidth > 768) {
      return this.configService.headerFixed();
    } else {
      return this.configService.headerFixedOnMobile();
    }
  });

  protected headerWidthFluid = this.configService.headerWidthFluid
  protected themeLightLogo = this.configService.themeLightLogo
}
