export class OverTimeModel {
    id: any;
    userName: string;
    dastartTime: Date;
    endTime: Date;
    logComments: string;



    clear() {
        this.id = null;
        this.userName = '';
        this.dastartTime = new Date('');
        this.endTime = new Date('');
        this.logComments = '';
    }
  }
