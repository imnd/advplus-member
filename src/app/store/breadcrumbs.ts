import { computed, Injectable, signal } from '@angular/core';

interface Breadcrumb {
  title: string;
  pageBreadcrumbPath?: string[];
}

@Injectable({ providedIn: 'root' })
export class Breadcrumbs {
  private state = signal<{
    breadcrumbs: Breadcrumb;
  }>({
    breadcrumbs: {
      title: '',
      pageBreadcrumbPath: []
    } as Breadcrumb
  });

  readonly getBreadcrumbs= computed(() => this.state().breadcrumbs);

  readonly pageBreadcrumbPath= computed(() => this.state().breadcrumbs.pageBreadcrumbPath);

  readonly pageTitle= computed(() => this.state().breadcrumbs.title);

  setBreadcrumbs(payload: Breadcrumb) {
    this.state.update(s => ({
      ...s,
      breadcrumbs: payload
    }));
  }
}
