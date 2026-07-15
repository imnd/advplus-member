import objectPath from "object-path";
import ConfigService from "@/services/config/config.service";
import { BodyStore } from '@/store/body';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
class LayoutService {
  private body = inject(BodyStore);
  private configService = inject(ConfigService);
  private layoutConfig;

  public constructor() {
    this.layoutConfig = this.configService.layoutConfig()
  }

  /**
   * @description initialize default layout
   */
  public init(): void {
    this.initLayout();
    this.initHeader();
    this.initToolbar();
    this.initAside();
    this.initFooter();
  }

  /**
   * @description init layout
   */
  public initLayout(): void {
    this.body.addBodyAttribute({
      qualifiedName: "id",
      value: "kt_body",
    });

    if (objectPath.get(this.layoutConfig as object, "loader.display")) {
      this.body.addBodyClassName("page-loading-enabled");
    }

    this.body.addBodyAttribute({
      qualifiedName: "style",
      value: "background-image: url(media/patterns/header-bg.jpg)",
    });
  }

  /**
   * @description init header
   */
  public initHeader(): void {
    if (objectPath.get(this.layoutConfig as object, "header.fixed.desktop")) {
      this.body.addBodyClassName("header-fixed");
    }

    if (objectPath.get(this.layoutConfig as object, "header.fixed.tabletAndMobile")) {
      this.body.addBodyClassName("header-tablet-and-mobile-fixed");
    }
  }

  /**
   * @description init toolbar
   */
  public initToolbar(): void {
    if (!objectPath.get(this.layoutConfig as object, "toolbar.display")) {
      return;
    }

    this.body.addBodyClassName("toolbar-enabled");

    if (objectPath.get(this.layoutConfig as object, "toolbar.fixed")) {
      this.body.addBodyClassName("toolbar-fixed");
    }

    this.body.addBodyClassName("toolbar-tablet-and-mobile-fixed");
  }

  /**
   * @description init aside
   */
  public initAside(): void {
    if (!objectPath.get(this.layoutConfig as object, "aside.display")) {
      return;
    }

    // Enable Aside
    this.body.addBodyClassName("aside-enabled");
  }

  /**
   * @description init footer
   */
  public initFooter(): void {
    // Fixed header
    if (objectPath.get(this.layoutConfig as object, "footer.width") === "fixed") {
      this.body.addBodyClassName("footer-fixed");
    }
  }
}

export default LayoutService;
