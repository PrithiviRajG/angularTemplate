import { Component,Output,EventEmitter } from '@angular/core';
import { DataService } from "../providers/sharedService";

@Component({
    selector: 'OEE-Data',
    templateUrl: './oeeData.component.html',
    styleUrls: ['./oeeData.component.css']
  })
  export class OeeDataComponent {
    @Output() childToParent = new EventEmitter<String>();
    pageName : String = "OEE Data Summary";
    constructor(private data: DataService){
      this.data.changePageName(this.pageName);
    }

    
  }