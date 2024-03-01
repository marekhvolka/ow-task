export class TitlesTableHelper {
  static getFirstColumnHeader() {
    return '[data-testid="table-column-1"]';
  }

  static getSecondColumnHeader() {
    return '[data-testid="table-column-2"]';
  }

  static getSortIcon() {
    return '[data-testid^="sort-icon"]';
  }

  static getSortIconAsc() {
    return '[data-testid="sort-icon-asc"]';
  }

  static getSortIconDesc() {
    return '[data-testid="sort-icon-desc"]';
  }

  static getNthRow(n) {
    return `table tbody tr:nth-child(${n})`;
  }

  static getFirstColumnValues() {
    return `table tbody tr td:nth-child(1)`;
  }

  static getSecondColumnValues() {
    return `table tbody tr td:nth-child(2)`;
  }

  static getPageIndex() {
    return '[data-testid="page-index"]';
  }

  static getPreviousPageButton() {
    return '[data-testid="previous-page-btn"]';
  }

  static getNextPageButton() {
    return '[data-testid="next-page-btn"]';
  }
}