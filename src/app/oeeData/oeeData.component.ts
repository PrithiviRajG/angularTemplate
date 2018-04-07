import { Component, Output, EventEmitter,ViewChild } from '@angular/core';
import { DataService } from "../providers/sharedService";
import { MatTableDataSource, MatSort } from '@angular/material';
import { OEEdata } from "../transferObjects/oeeData";

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'OEE-Data',
  templateUrl: './oeeData.component.html',
  styleUrls: ['./oeeData.component.css']
})
export class OeeDataComponent {

  pageName: String = "OEE Data Summary";
  displayedColumns = ['date', 'machineNumber', 'numOfShifts', 'shiftLength', 'teaBreak', 'lunchBreak', 'machineDownTime',
    'idealRunRate', 'totalProductionQty', 'rejectionQty', 'plannedProductionTime', 'operatingTime', 'okQty', 'availability',
    'performance', 'quality', 'oee'];

  private itemDoc: AngularFirestoreCollection<OEEdata>;
  oeeData: Observable<OEEdata[]>;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  dataSource= new MatTableDataSource();
  constructor(private data: DataService, private afs: AngularFirestore) {
    this.data.changePageName(this.pageName);
    this.itemDoc = this.afs.collection('OEEdata');
    this.oeeData = this.itemDoc.valueChanges();
    this.oeeData.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}



const ELEMENT_DATA: OEEdata[] = [
  {
    date: new Date().toISOString(),
    machineNumber: 100,
    numOfShifts: 52,
    shiftLength: 480,
    teaBreak: 20,
    lunchBreak: 20,
    machineDownTime: 0,
    idealRunRate: 70,
    totalProductionQty: 382,
    rejectionQty: 5,
    plannedProductionTime: 651.00,
    operatingTime: 648.00,
    okQty: 117678,
    availability: 99.54,
    performance: 97.81,
    quality: 99.98,
    oee: 97.34
  }
];
