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