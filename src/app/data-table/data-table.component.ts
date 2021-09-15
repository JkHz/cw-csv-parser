import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() headers: any;
  @Input() tableData: any;

  displayedColumns = [];
  dataSource: any = [];
  searchKey: string = '';

  constructor() { }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource = this.tableData;
  }

  ngOnChanges(changes: any): void {
    if (changes.headers || changes.tableData) {
      this.displayedColumns = this.headers;
      this.dataSource = new MatTableDataSource(this.tableData);
    }
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  getSortedData(sort: Sort) {
    console.log('direction', sort.direction);
    const data = this.tableData.slice();
    if (!sort || !sort.active || sort.direction === '') {
      return data;
    }

    this.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort?.direction === 'asc';

      if (a[sort?.active]) {
        switch (typeof a[sort?.active]) {
          case 'string':
            return compare(a[sort?.active], b[sort?.active], isAsc);
          case 'number':
            return compare(+a[sort?.active], +b[sort?.active], isAsc);
          default: return 0;
        }
      } else {
        return 0;
      }

      // switch (sort?.active) {
      //   case 'Camper Make ':
      //     return compare(a['Camper Make '], b['Camper Make '], isAsc);
      //   case 'Camper Brand':
      //     return compare(a['Camper Brand'], b['Camper Brand'], isAsc);
      //   case 'Sleep Number':
      //     return compare(+a['Sleep Number'], +b['Sleep Number'], isAsc);
      //   case 'Price':
      //     return compare(+a['Price'], +b['Price'], isAsc);

      //   default: return 0;
      // }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
