import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() headers: any;
  @Input() tableData: any;

  displayedColumns = [];
  dataSource: any = new MatTableDataSource([]);
  searchKey: string = '';

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: any): void {
    if (changes.headers || changes.tableData) {
      this.displayedColumns = this.headers;
      this.dataSource = new MatTableDataSource(this.tableData);
    }
  }

  applyFilter() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  getSortedData(sort: Sort) {
    const data = this.dataSource.filteredData.slice();
    if (!sort || !sort.active) {
      return data;
    }
    this.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort?.direction === 'asc';
      if (a[sort?.active]) {
        switch (typeof a[sort?.active]) {
          case 'string':
            return compare(a[sort?.active], b[sort?.active], isAsc);
          case 'number':
            if (typeof a[sort?.active] !== 'number' || typeof b[sort?.active] !== 'number') {
              return -1;
            }
            return compare(+a[sort?.active], +b[sort?.active], isAsc);
          default: return 0;
        }
      } else {
        return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.dataSource);
  }
};

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};

