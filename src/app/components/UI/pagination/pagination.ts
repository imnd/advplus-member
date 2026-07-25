import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
})
export class Pagination {
  currentPage = input.required<number>();
  pageCount = input.required<number>();
  pageSize = input<number>(0);
  total = input<number>(0);
  hideOnSinglePage = input<boolean>(false);
  pagerCount = input<number>(5);
  background = input<boolean>(false, { transform: (val) => val !== false });

  currentChange = output<number>();

  visiblePages = computed(() => {
    const pagerCount = this.pagerCount();
    const page = this.currentPage();
    const pageCount = this.pageCount();
    const half = Math.floor(pagerCount / 2);

    let start = Math.max(1, page - half);
    let end = Math.min(pageCount, start + pagerCount - 1);
    start = Math.max(1, end - pagerCount + 1);

    return Array.from({ length: Math.max(0, end - start + 1) }, (_, i: number) => start + i);
  });
}
