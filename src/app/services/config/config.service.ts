import { computed, inject, Injectable } from '@angular/core';
import { ConfigStore } from '@/store/config';
import { AuthStore } from '@/store/auth';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export default class ConfigService {
  private configStore = inject(ConfigStore);
  private authStore = inject(AuthStore);

  /**
   * Returns layout config
   * @returns {object}
   */
  public layoutConfig = computed(() => this.configStore.layoutConfig());

  /**
   * Set the sidebar display
   * @returns {boolean}
   */
  public displaySidebar = computed(() => {
    return this.configStore.layoutConfig('sidebar.display');
  });

  /**
   * Check if footer container is fluid
   * @returns {boolean}
   */
  public footerWidthFluid = computed(() => {
    return this.configStore.layoutConfig('footer.width') === 'fluid';
  });

  /**
   * Check if header container is fluid
   * @returns {boolean}
   */
  public headerWidthFluid = computed(() => {
    return this.configStore.layoutConfig('header.width') === 'fluid';
  });

  /**
   * Returns header left part type
   * @returns {string}
   */
  public headerLeft = computed(() => {
    return this.configStore.layoutConfig('header.left');
  });

  /**
   * Returns header fixed on desktop
   * @returns {boolean}
   */
  public headerFixed = computed(() => {
    return this.configStore.layoutConfig('header.fixed.desktop');
  });

  /**
   * Returns header fixed on tablet and mobile
   * @returns {boolean}
   */
  public headerFixedOnMobile = computed(() => {
    return this.configStore.layoutConfig('header.fixed.tabletAndMobile');
  });

  /**
   * Set the aside display
   * @returns {boolean}
   */
  public asideDisplay = computed(() => {
    return this.configStore.layoutConfig<boolean>('aside.display') === true;
  });

  /**
   * Check if toolbar width is fluid
   * @returns {boolean}
   */
  public toolbarWidthFluid = computed<boolean>(() => {
    return this.configStore.layoutConfig('toolbar.width') === 'fluid';
  });

  /**
   * Set the toolbar display
   * @returns {boolean}
   */
  public toolbarDisplay = computed(() => this.configStore.layoutConfig('toolbar.display'));

  /**
   * Check if the page loader is enabled
   * @returns {boolean}
   */
  public loaderEnabled = computed(() => this.configStore.layoutConfig('loader.display'));

  /**
   * Check if container width is fluid
   * @returns {boolean}
   */
  public contentWidthFluid = computed(() => this.configStore.layoutConfig('content.width') === 'fluid');

  /**
   * Page loader logo image
   * @returns {string}
   */
  public loaderLogo = computed(() => environment.baseAppUrl + (this.authStore.getUserPortalLogo() ?? ''));

  /**
   * Check if the aside menu is enabled
   * @returns {boolean}
   */
  public asideEnabled = computed(() => !!this.configStore.layoutConfig('aside.display'));

  /**
   * Set the aside theme
   * @returns {string}
   */
  public asideTheme = computed(() => this.configStore.layoutConfig('aside.theme'));

  /**
   * Set the subheader display
   * @returns {boolean}
   */
  public subheaderDisplay = computed(() => this.configStore.layoutConfig('toolbar.display'));

  /**
   * Set the aside menu icon type
   * @returns {string}
   */
  public asideMenuIcons = computed(() => this.configStore.layoutConfig('aside.menuIcon'));

  /**
   * Light theme logo image
   * @returns {string}
   */
  public themeLightLogo = computed(() => this.authStore.getUserPortalLogo() ?? '');

  /**
   * Dark theme logo image
   * @returns {string}
   */
  public themeDarkLogo = computed(() => this.authStore.getUserPortalLogo() ?? '');

  /**
   * Set the header menu icon type
   * @returns {string}
   */
  public headerMenuIcons = computed(() => this.configStore.layoutConfig('header.menuIcon'));

  /**
   * Illustrations set
   * @returns {string}
   */
  public illustrationsSet = computed(() => this.configStore.layoutConfig('illustrations.set'));
}


