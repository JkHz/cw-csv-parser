import { Component, Output } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private papa: Papa) { }

  headers: string[] = [];
  tableData: Array<{}> = [];

  csvInputChange(fileInputEvent: any) {
    this.papa.parse(fileInputEvent.target.files[0], {
      complete: ({ data }: any, file: any) => {
        this.headers = Object.keys(data[0]);
        this.tableData = data;
      },
      download: true,
      skipEmptyLines: true,
      header: true,
      dynamicTyping: true,
    });
  }
}
