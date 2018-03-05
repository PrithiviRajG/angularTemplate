export class OEEdata {

    /*constructor(
    ) {  }*/

    constructor(shiftLength, numOfShifts, shortBreaksPerShift, mealBreakPerShift, downTime,idealRate, totalPiecesProducedPerShift,
    rejectedPiecesPerShift){
      this.shiftLength=shiftLength;
      this.numOfShifts=numOfShifts;
      this.shortBreaksPerShift=shortBreaksPerShift;
      this.mealBreakPerShift=mealBreakPerShift;
      this.downTime=downTime;
      this.idealRate=idealRate;
      this.totalPiecesProducedPerShift=totalPiecesProducedPerShift;
      this.rejectedPiecesPerShift=rejectedPiecesPerShift;
    }
    public shiftLength: number;
    public numOfShifts: number;
    public shortBreaksPerShift : number;
    public mealBreakPerShift : number;
    public downTime : number;
    public idealRate : number;
    public totalPiecesProducedPerShift : number;
    public rejectedPiecesPerShift : number;
  }
  
  