import { Injectable, signal } from '@angular/core';

interface ToolbarButtonLink {
  route: string
  title: string
}

interface ToolbarInfo {
  showListFormatButtons: number | null
  toolbarButtonLinks: ToolbarButtonLink[]
  listTableFormat: boolean
  isLoading: boolean
}

@Injectable({ providedIn: 'root' })
export class ToolbarComponents {
  private state = signal<ToolbarInfo>({
    showListFormatButtons: null,
    toolbarButtonLinks: [],
    listTableFormat: false,
    isLoading: false,
  });

  get listTableFormat(): boolean {
    return this.state().listTableFormat;
  }

  get isLoading(): boolean {
    return this.state().isLoading;
  }

  get showListFormatButtons(): number | null {
    return this.state().showListFormatButtons;
  }

  get toolbarButtonLinks(): ToolbarButtonLink[] {
    return this.state().toolbarButtonLinks;
  }

  showListButtonsDisplay() {
    this.state.update(s => ({
      ...s,
      showListFormatButtons: 1,
    }));
  }

  hideListButtonsDisplay() {
    this.state.update(s => ({
      ...s,
      showListFormatButtons: 0,
    }));
  }

  setListTableFormat(payload: boolean) {
    this.state.update(s => ({
      ...s,
      listTableFormat: !!payload,
    }));
  }

  setToolbarLoading(isLoading: boolean) {
    this.state.update(s => ({
      ...s,
      isLoading,
    }));
  }

  showButtonLinksDisplay(toolbarButtonLinks: ToolbarButtonLink[]) {
    this.state.update(s => ({
      ...s,
      toolbarButtonLinks,
    }));
  }

  hideButtonLinksDisplay() {
    this.state.update(s => ({
      ...s,
      toolbarButtonLinks: [],
    }));
  }
}
