import objectPath from 'object-path';
import { Injectable, signal } from '@angular/core';
import LayoutConfigTypes from "@/core/helpers/config/layout-config-types";
import layoutConfig from "@/core/helpers/config/default-layout-config";
import merge from "deepmerge";
import { isBrowser } from '@/utils/browser.util';

@Injectable({ providedIn: 'root' })
export class ConfigStore {
  private state = signal<{
    config: LayoutConfigTypes;
    initial: LayoutConfigTypes;
  }>({
    config: layoutConfig,
    initial: layoutConfig,
  });

  layoutConfig<T>(path?: string, defaultValue?: T) {
    return objectPath.get<T>(this.state().config as object, path as string, defaultValue as T);
  }

  setLayoutConfig(payload: LayoutConfigTypes): void {
    this.state().config = payload;
  }

  resetLayoutConfig(): void {
    this.state().config = Object.assign({}, this.state().initial);
  }

  overrideLayoutConfig(): void {
    if (!isBrowser()) {
      return;
    }
    this.state().config = this.state().initial = Object.assign(
      {},
      this.state().initial,
      JSON.parse(window.localStorage.getItem("config") || "{}")
    );
  }

  overridePageLayoutConfig(payload: LayoutConfigTypes): void {
    this.state().config = merge(this.state().config, payload);
  }
}
