import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatButtonModule, MatCheckboxModule,
  MatOptionModule, MatSelectModule, MatInputModule,
  MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatListModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule, MatCheckboxModule, MatOptionModule,
    MatSelectModule, MatInputModule, BrowserAnimationsModule,
    MatMenuModule, MatIconModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
