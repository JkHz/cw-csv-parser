import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
