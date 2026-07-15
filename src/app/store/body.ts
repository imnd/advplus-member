import { Injectable, signal } from '@angular/core';
import { isBrowser } from '@/utils/browser.util';

interface Classes {
  header?: Array<string>;
  headerContainer?: Array<string>;
  headerMobile?: Array<string>;
  headerMenu?: Array<string>;
  aside?: Array<string>;
  asideMenu?: Array<string>;
  asideToggle?: Array<string>;
  toolbar?: Array<string>;
  toolbarContainer?: Array<string>;
  content?: Array<string>;
  contentContainer?: Array<string>;
  footerContainer?: Array<string>;
  sidebar?: Array<string>;
  pageTitle?: Array<string>;
}

interface MutateClass {
  position: keyof Classes
  className: string
}

interface MutateAttribute {
  qualifiedName: string
  value: string
}

@Injectable({ providedIn: 'root' })
export class BodyStore {
  private state = signal<{
    classes: Classes;
  }>({
    classes: {} as Classes,
  });

  getClasses() {
    return (position: keyof Classes) => {
      if (typeof position !== "undefined") {
        return this.state().classes[position];
      }
      return this.state().classes;
    };
  }

  appendBreadcrumb(payload: MutateClass) {
    const { position, className } = payload;
    let classNames = this.state().classes[position] ?? [];
    classNames.push(className);
    this.state.update(s => ({
      ...s,
      classes: {
        ...s.classes,
        [position]: classNames
      }
    }));
  }

  addBodyClassName(className: string) {
    isBrowser() && document.body.classList.add(className);
  }

  removeBodyClassName(className: string) {
    isBrowser() && document.body.classList.remove(className);
  }

  addBodyAttribute(payload: MutateAttribute) {
    const { qualifiedName: qualifiedName, value } = payload;
    isBrowser() && document.body.setAttribute(qualifiedName, value);
  }

  removeBodyAttribute(payload: MutateAttribute) {
    const { qualifiedName: qualifiedName } = payload;
    isBrowser() && document.body.removeAttribute(qualifiedName);
  }

  addClassName(payload: MutateClass) {
    this.appendBreadcrumb(payload);
  }
}
