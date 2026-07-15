import Color from "color";
import { isBrowser } from '@/utils/browser.util';

export const setPortalColor = (colorHex?: string): void => {
  if (!isBrowser()) {
    return;
  }

  colorHex ??= '#FFEEDD';

  document.documentElement.style.setProperty("--portal-main-color", colorHex);
  document.documentElement.style.setProperty("--portal-main-color-dark", Color(colorHex).darken(0.2).hex());
  document.documentElement.style.setProperty("--portal-main-color-active", Color(colorHex).lighten(0.2).hex());
  document.documentElement.style.setProperty("--portal-main-color-light", Color(colorHex).lighten(0.7).hex());
};
