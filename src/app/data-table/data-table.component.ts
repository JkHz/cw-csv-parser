import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
}
