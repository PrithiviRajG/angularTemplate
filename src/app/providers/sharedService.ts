import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private pageName = new BehaviorSubject<String>("default message");
  currentpageName = this.pageName.asObservable();

  constructor() { }

  changePageName(message: String) {
    this.pageName.next(message)
  }

}