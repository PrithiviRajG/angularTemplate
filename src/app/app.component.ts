import { Component } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  user : User;
  constructor(){
    this.user  =new User();
    this.user.gender="None";
  }

  onSubmit(){
    console.log(this.user);
  }
}
