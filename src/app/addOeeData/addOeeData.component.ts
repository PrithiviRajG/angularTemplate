import { Component, ViewChild,Output, EventEmitter } from '@angular/core';
import {OEEdata} from '../transferObjects/oeeData';
import {OEEfactors} from '../transferObjects/oeeFactors';
import {OEEvariable} from '../transferObjects/oeeVariables';

import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
  selector: 'Add-OEE-Data',
  templateUrl: './addOeeData.component.html',
  styleUrls: ['./addOeeData.component.css']
})
export class AddOeeDataComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @Output() childToParent = new EventEmitter<String>();
  title = 'app';
  pageName : String = "Add OEE Data";

  oeeData: OEEdata;
  oeeFactors: OEEfactors;
  oeeVariable: OEEvariable;
  dataArr: any;
  constructor() {
    this.childToParent.emit(this.pageName);
    this.oeeData = new OEEdata(482, 52, 20, 20, 0, 70, 382, 5);
    this.oeeFactors = new OEEfactors();
    this.oeeVariable = new OEEvariable();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  oeeDataSubmit() {
    this.oeeVariable.plannedProdTime = (this.oeeData.shiftLength - (this.oeeData.shortBreaksPerShift + this.oeeData.mealBreakPerShift)) * this.oeeData.numOfShifts;
    this.oeeVariable.operatingTime = this.oeeVariable.plannedProdTime - (this.oeeData.downTime * this.oeeData.numOfShifts);
    this.oeeVariable.goodPiecesPerShift = this.oeeData.totalPiecesProducedPerShift - this.oeeData.rejectedPiecesPerShift;
    this.calculateOverallFactors();
    this.step++;
  }

  calculateOverallFactors() {
    this.oeeFactors.availability = this.oeeVariable.operatingTime / this.oeeVariable.plannedProdTime;
    this.oeeFactors.performance = this.oeeData.totalPiecesProducedPerShift * (this.oeeData.idealRate / this.oeeVariable.operatingTime);
    this.oeeFactors.quality = this.oeeVariable.goodPiecesPerShift / this.oeeData.totalPiecesProducedPerShift;
    this.oeeFactors.overallOEE = this.oeeFactors.availability * this.oeeFactors.performance * this.oeeFactors.quality;
    this.dataArr = {
      data: [this.oeeFactors.availability * 100, this.oeeFactors.performance * 100, this.oeeFactors.quality * 100, this.oeeFactors.overallOEE * 100],
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