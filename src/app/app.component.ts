import { Component, ViewChild } from '@angular/core';
import { DataService } from "./providers/sharedService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageName : any;

  constructor(private data: DataService){
    this.data.currentpageName.subscribe(message => this.pageName = message)
  }

  
}
