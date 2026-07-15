import { Injectable, inject } from '@angular/core';
import { Breadcrumbs } from '@/store/breadcrumbs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private store = inject(Breadcrumbs);

  /**
   * Sets current page breadcrumbs
   */
  setCurrentPageBreadcrumbs(pageTitle: string, breadcrumbs: string[]): void {
    this.store.setBreadcrumbs({
      title: pageTitle,
      pageBreadcrumbPath: breadcrumbs,
    });
  }

  /**
   * Sets current page title
   */
  setCurrentPageTitle(title: string): void {
    this.store.setBreadcrumbs({
      title,
    });
  }
}
