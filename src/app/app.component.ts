import { Component, ViewChild } from '@angular/core';
import { DataService } from "./providers/sharedService";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageName : any;

  constructor(private data: DataService, private router : Router){
    this.data.currentpageName.subscribe(message => this.pageName = message)
  }

  navigateToAddOee(){
    this.router.navigate(['']);
  }

  navigateToOeeSummary(){
    this.router.navigate(['/OEE-Data-Center']);
  }

  
}
