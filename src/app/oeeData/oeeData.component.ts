import { Component,Output,EventEmitter } from '@angular/core';
import { DataService } from "../providers/sharedService";
import {MatTableDataSource} from '@angular/material';
@Component({
    selector: 'OEE-Data',
    templateUrl: './oeeData.component.html',
    styleUrls: ['./oeeData.component.css']
  })
  export class OeeDataComponent {
    
    pageName : String = "OEE Data Summary";
    displayedColumns = ['date', 'machineNumber', 'numOfShifts', 'shiftLength','teaBreak','lunchBreak','machineDownTime',
  'idealRunRate','totalProductionQty','rejectionQty','plannedProductionTime','operatingTime','okQty','availability',
  'performance','quality','oee'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    constructor(private data: DataService){
      this.data.changePageName(this.pageName);
      
    } 
      
  }

  export interface OEEdata {
    date: Date;
    machineNumber: number;
    numOfShifts: number;
    shiftLength: number;
    teaBreak: number;
    lunchBreak: number;
    machineDownTime : number;
    idealRunRate : number;
    totalProductionQty : number;
    rejectionQty : number;
    plannedProductionTime : number;
    operatingTime : number;
    okQty : number;
    availability : number;
    performance : number;
    quality : number;
    oee : number;

  }
  
  const ELEMENT_DATA: OEEdata[] = [
    { date: new Date('2019,1,1'),
      machineNumber: 100,
      numOfShifts: 3,
      shiftLength: 744,
      teaBreak: 46.50,
      lunchBreak: 46.50,
      machineDownTime : 3.00,
      idealRunRate : 185.7,
      totalProductionQty : 117698,
      rejectionQty : 20,
      plannedProductionTime : 651.00,
      operatingTime : 648.00,
      okQty : 117678,
      availability : 99.54,
      performance : 97.81,
      quality : 99.98,
      oee : 97.34
  }
  ];
  