import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = this.headers;
  displayedColumns = [];

  constructor() { }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: any): void {
    if (changes.headers || changes.tableData) {
      console.log(`Headers from data table: ${this.headers}`)
      console.dir(`TableData from data table: ${this.tableData}`)
      this.displayedColumns = this.headers;
    }
  }

  getSortedData(sort: Sort) {
    const data = this.tableData.slice();
    console.log('hello from getSortedData');
    console.log(`sort:`, sort);
    if (!sort || !sort.active || sort.direction === '') {
      return data;
    }

    this.tableData = data.sort((a: any, b: any) => {
      console.log(`inside sorter`);
      const isAsc = sort?.direction === 'asc';
      switch (sort?.active) {
        case 'Camper Make ':
          console.log('inside camper make');
          console.log(`result:`, compare(a['Camper Make '], b['Camper Make '], isAsc))
          return compare(a['Camper Make '], b['Camper Make '], isAsc);
        case 'Camper Brand':
          return compare(a['Camper Brand'], b['Camper Brand'], isAsc);
        case 'Sleep Number':
          return compare(+a['Sleep Number'], +b['Sleep Number'], isAsc);
        case 'Price':
          return compare(+a['Price'], +b['Price'], isAsc);

        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
