import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { OEEdata } from '../transferObjects/oeeData';
import { OEEfactors } from '../transferObjects/oeeFactors';
import { OEEvariable } from '../transferObjects/oeeVariables';

import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { DataService } from "../providers/sharedService";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'Add-OEE-Data',
  templateUrl: './addOeeData.component.html',
  styleUrls: ['./addOeeData.component.css']
})
export class AddOeeDataComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private itemDoc: AngularFirestoreCollection<OEEdata>;
  item: Observable<OEEdata>;
  minDate = new Date();

  title = 'app';
  pageName: String = "Add OEE Data";

  oeeData: OEEdata;
  oeeFactors: OEEfactors;
  oeeVariable: OEEvariable;
  dataArr: any;
  constructor(private data: DataService, private afs: AngularFirestore) {
    this.data.changePageName(this.pageName);
    //this.oeeData = new OEEdata(482, 52, 20, 20, 0, 70, 382, 5);
    this.itemDoc = afs.collection('OEEdata');
    //this.item = this.itemDoc.valueChanges();
    this.oeeData =
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
        plannedProductionTime: 0,
        operatingTime: 0,
        okQty: 0,
        availability: 0,
        performance: 0,
        quality:0,
        oee: 0
      };
    this.oeeFactors = new OEEfactors();
    this.oeeVariable = new OEEvariable();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  oeeDataSubmit() {
    this.oeeData.plannedProductionTime=this.oeeVariable.plannedProdTime = (this.oeeData.shiftLength - (this.oeeData.teaBreak + this.oeeData.lunchBreak)) * this.oeeData.numOfShifts;
    this.oeeData.operatingTime=this.oeeVariable.operatingTime = this.oeeVariable.plannedProdTime - (this.oeeData.machineDownTime * this.oeeData.numOfShifts);
    this.oeeData.okQty = this.oeeVariable.goodPiecesPerShift = this.oeeData.totalProductionQty - this.oeeData.rejectionQty;
    this.calculateOverallFactors();
    this.step++;
  }

  roundTo2Decimal(x) {
    return Number(x.toFixed(2));
  }

  calculateOverallFactors() {
    this.oeeData.availability=this.oeeFactors.availability = this.roundTo2Decimal((this.oeeVariable.operatingTime / this.oeeVariable.plannedProdTime)*100);
    this.oeeData.performance=this.oeeFactors.performance = this.roundTo2Decimal((this.oeeData.totalProductionQty * (this.oeeData.idealRunRate / this.oeeVariable.operatingTime))*100);
    this.oeeData.quality=this.oeeFactors.quality = this.roundTo2Decimal((this.oeeVariable.goodPiecesPerShift / this.oeeData.totalProductionQty)*100);
    this.oeeData.oee=this.oeeFactors.overallOEE = this.roundTo2Decimal((this.oeeFactors.availability/100 * this.oeeFactors.performance/100 * this.oeeFactors.quality/100)*100);
    this.dataArr = {
      data: [this.oeeFactors.availability, this.oeeFactors.performance, this.oeeFactors.quality, this.oeeFactors.overallOEE],
      label: 'Overall Factors'
    };
    /*this.barChartData.forEach((dataset, index) => {
      this.barChartData[index] = Object.assign({}, this.barChartData[index], {
        data: [...this.barChartData[index].data, dataArr[index]]
      });
    });*/
    let newBarChartData = Object.assign({}, this.barChartData[0], this.dataArr);
    this.barChartData = [newBarChartData];
    this.barChartData = this.barChartData.slice();
    console.log(this.barChartData);
    //this.itemDoc.add(this.oeeData)
    console.log(this.oeeData.date);
    console.log(Date.parse(this.oeeData.date));
    let parsedDate=Date.parse(this.oeeData.date);
    this.oeeData.date=new Date(parsedDate).toISOString().slice(0,10);
    this.itemDoc.doc(this.oeeData.machineNumber.toString()+new Date(parsedDate).toISOString().slice(0,10)).set(this.oeeData);
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Availability', 'Performance', 'Quality', 'Overall OEE'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [0, 0, 0, 0], label: 'Overall Factors' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  prevStep() {
    this.step--;
  }

  onSubmit() {
    console.log(this.oeeData);
  }
}