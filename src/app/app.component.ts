import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageName : any;

  childToParent(page){
    console.log("child to parent ");
    this.pageName=page;
  }
}
