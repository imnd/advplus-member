import { inject, Injectable } from "@angular/core";
import { Router, NavigationEnd, ActivatedRouteSnapshot, NavigationError, Scroll } from '@angular/router';
import { filter } from "rxjs";
import { ConfigStore } from '@/store/config';
import { AuthStore } from '@/store/auth';
import ToolbarService from "@/services/toolbar.service";
import { setPortalColor } from "@/core/helpers/portal-color";
import { ViewportScroller } from '@angular/common';

@Injectable({ providedIn: "root" })
export class RouterListenerService {
  private router = inject(Router);
  private configStore = inject(ConfigStore);
  private authStore = inject(AuthStore);
  private toolbarService = inject(ToolbarService);
  private viewportScroller = inject(ViewportScroller);

  init(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        const to = this.getLeafSnapshot();

        // reset config to initial state
        this.configStore.resetLayoutConfig();
        this.toolbarService.stopToolbarLoading();

        const source = to.queryParams["source"];
        if (source == "entertainer") {
          setPortalColor("#f98a75");
        }

        if (this.authStore.isMembershipExpired() && to?.data?.['name'] !== "account-profile") {
          this.router.navigate(["/account-profile"]);
        }

        document.title = (to?.data?.['title'] ?? "Member Portal") + " | adv+";

        // Scroll page to top on every route change
        setTimeout(() => window.scrollTo(0, 0), 100);
      });

    this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe((event) => {
        setTimeout(() => {
          if (event.position) {
            this.viewportScroller.scrollToPosition(event.position);
          } else if (event.anchor) {
            this.viewportScroller.scrollToAnchor(event.anchor);
          } else {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        }, 100);
      });

    this.router.events
      .pipe(filter((e): e is NavigationError => e instanceof NavigationError))
      .subscribe((event) => {
        if (/ChunkLoadError:.*failed./i.test(event.error.message)) {
          window.location.reload();
        } else if (/Loading.*chunk.*failed./i.test(event.error.message)) {
          window.location.reload();
        }
      });
  }

  private getLeafSnapshot(): ActivatedRouteSnapshot {
    let snapshot = this.router.routerState.snapshot.root;
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    return snapshot;
  }
}
