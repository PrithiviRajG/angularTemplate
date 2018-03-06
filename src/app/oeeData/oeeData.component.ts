import { Component,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'OEE-Data',
    templateUrl: './oeeData.component.html',
    styleUrls: ['./oeeData.component.css']
  })
  export class OeeDataComponent {
    @Output() childToParent = new EventEmitter<String>();
    pageName : String = "OEE Data Summary";
    constructor(){
      this.childToParent.emit(this.pageName);
    }

    
  }