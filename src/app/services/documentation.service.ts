import ClipboardJS from "clipboard";
import { computed, inject } from '@angular/core';
import { ConfigStore } from '@/store/config';
import { isBrowser } from '@/utils/browser.util';

/**
 * Return name of the theme
 * @returns {string}
 */
export const themeName = computed(() => {
  const configStore = inject(ConfigStore);
  return configStore.layoutConfig("themeName");
});

/**
 * Return version of the theme
 * @returns {string}
 */
export const version = computed(() => {
  const configStore = inject(ConfigStore);
  return configStore.layoutConfig("themeVersion");
});

/**
 * Return demo name
 * @returns {string}
 */
export const demo = computed(() => {
  const configStore = inject(ConfigStore);
  return configStore.layoutConfig("demo");
});

//code copy button initialization
export const useCopyClipboard = () => {
  const _init = (element?: NodeListOf<Element>) => {
    if (!isBrowser()) {
      return;
    }

    let elements = element;

    if (typeof elements === "undefined") {
      elements = document.querySelectorAll(".highlight");
    }

    if (elements && elements.length > 0) {
      for (let i = 0; i < elements.length; ++i) {
        const highlight = elements[i];
        const copy = highlight.querySelector(".highlight-copy");

        if (copy) {
          const clipboard = new ClipboardJS(copy, {
            target: (trigger: Element): Element => {
              const highlight = trigger.closest(".highlight");

              if (highlight) {
                let el: Element | null = highlight.querySelector(".tab-pane.active");

                if (el == null) {
                  el = highlight.querySelector(".highlight-code");
                }

                return el as Element;
              }

              return trigger;
            },
          });

          clipboard.on("success", (e: ClipboardJS.Event) => {
            const caption = e.trigger.innerHTML;

            e.trigger.innerHTML = "copied";
            e.clearSelection();

            setTimeout(function () {
              e.trigger.innerHTML = caption;
            }, 2000);
          });
        }
      }
    }
  };

  return {
    init: (element?: NodeListOf<Element>) => {
      _init(element);
    },
  };
};
