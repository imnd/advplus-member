import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LayoutService from '@/services/layout.service';
import { Aside } from '@/layout/aside/aside';
import { Header } from '@/layout/header/header';
import { Footer } from '@/layout/footer/footer';
import { Toolbar } from '@/layout/toolbar/toolbar';
import { MenuComponent } from '@/components/UI/menu';
import { reinitializeComponents } from '@/core/plugins/keenthemes';
import { removeModalBackdrop } from '@/core/helpers/dom';
import ConfigService from '@/services/config/config.service';
import { ChangePasswordModal } from '@/components/modals/change-password/change-password';
import { RenewalReminderModal } from '@/components/modals/renewal/renewal';
import { AuthStore } from '@/store/auth';
import { Breadcrumbs } from '@/store/breadcrumbs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  imports: [
    Aside,
    Header,
    Footer,
    Toolbar,
    RenewalReminderModal,
    ChangePasswordModal,
    RouterOutlet
  ],
  templateUrl: './main.html'
})
export class MainLayoutComponent implements OnInit {
  private configService = inject(ConfigService);
  protected readonly contentWidthFluid = this.configService.contentWidthFluid;
  protected readonly asideEnabled = this.configService.asideEnabled;
  protected readonly subheaderDisplay = this.configService.subheaderDisplay;
  protected readonly themeLightLogo = this.configService.themeLightLogo;
  protected readonly themeDarkLogo = this.configService.themeDarkLogo;

  private layoutService = inject(LayoutService);
  private authStore = inject(AuthStore);
  private breadcrumbsStore = inject(Breadcrumbs);

  isMembershipExpired = this.authStore.isMembershipExpired;

  currentUser = this.authStore.currentUser;

  pageTitle = this.breadcrumbsStore.pageTitle;

  breadcrumbs = this.breadcrumbsStore.pageBreadcrumbPath;

  ngOnInit() {
    // initialize html element classes
    this.layoutService.init();
    setTimeout(reinitializeComponents);
  }

  constructor(private router: Router) {
    this.router
      .events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        MenuComponent.hideDropdowns(undefined);
        removeModalBackdrop();
        setTimeout(reinitializeComponents);
      });
  }
}
