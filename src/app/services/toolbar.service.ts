import { ToolbarComponents } from '@/store/toolbar-components';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class ToolbarService {
  store = inject(ToolbarComponents);
  /**
   * Set toolbar to loading mode
   */
  startToolbarLoading = (): void => {
    this.store.setToolbarLoading(true);
  };

  /**
   * Set toolbar to loaded mode
   */
  stopToolbarLoading = (): void => {
    this.store.setToolbarLoading(false);
  };
}
