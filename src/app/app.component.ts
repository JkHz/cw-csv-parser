import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private papa: Papa) { }

  title: string = 'csv-parser-cw';
  headers: string[] = [];
  tableData: Array<{}> = [];
  isLoaded: boolean = false;

  csvInputChange(fileInputEvent: any) {
    this.papa.parse(fileInputEvent.target.files[0], {
      complete: ({ data }: any) => {
        this.headers = Object.keys(data[0]);
        this.tableData = data;
        this.isLoaded = true;
      },
      download: true,
      skipEmptyLines: true,
      header: true,
      dynamicTyping: true,
    });
  }
}
