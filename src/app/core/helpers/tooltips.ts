import { Tooltip } from "bootstrap";
import { isBrowser } from '@/utils/browser.util';

export default function setTooltips() {
  const tooltips: Record<string, Tooltip> = {};
  if (!isBrowser()) {
    return tooltips;
  }
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl: Element) {
    tooltips[tooltipTriggerEl.id] = new Tooltip(tooltipTriggerEl);
  });
  return tooltips;
}
