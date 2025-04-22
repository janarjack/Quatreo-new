export class ActivityLogModel {
    id: any;
    userName: string;
    category: any;
    dastartTime: Date;
    endTime: Date;
    log: string;



    clear() {
        this.id = null;
        this.userName = '';
        this.category = '';
        this.dastartTime = new Date('');
        this.endTime = new Date('');
        this.log = '';
    }
  }

