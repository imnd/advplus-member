import { Component, inject, Input } from '@angular/core';
import { ToolbarComponents } from '@/store/toolbar-components';
import { SkeletonComponent } from '@/components/UI/skeleton/skeleton';
import ConfigService from "@/services/config/config.service";
import { SkeletonWrapperComponent } from '@/components/UI/skeleton/skeleton-wrapper';
import { RouterLink } from '@angular/router';
import { InlineSvgComponent } from '@/components/UI/inline-svg/inline-svg';

@Component({
  selector: 'app-toolbar',
  imports: [SkeletonComponent, SkeletonWrapperComponent, RouterLink, InlineSvgComponent],
  templateUrl: './toolbar.html',
})
export class Toolbar {
  @Input() title: string = "";
  @Input() breadcrumbs?: string[] = [];

  private toolbarStore = inject(ToolbarComponents);
  setListTableFormat(index: number, event: Event) {
    event.preventDefault();
    this.toolbarStore.setListTableFormat(!!index);
  }

  protected toolbarWidthFluid: boolean;

  public constructor() {
    const configService = inject(ConfigService);
    this.toolbarWidthFluid = configService.toolbarWidthFluid()
  }

  listTableFormat = this.toolbarStore.listTableFormat;
  showListFormatButtons = this.toolbarStore.showListFormatButtons;
  toolbarButtonLinks = this.toolbarStore.toolbarButtonLinks;
  isToolbarLoading = this.toolbarStore.isLoading;
}
