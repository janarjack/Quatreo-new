export class TeamMemberModel {

    id: any;
    clientName: string;
    clientOrder: number;
    quatreoOrder: number;
    receivedDate: Date ;
    product: string;
    type: string;
    ecd: Date;
    nextActionDate: Date;
    priority: string;
    state: string;
    county: string;
    clear() {
        this.id = null;
        this.clientName = '';
        this.clientOrder = null;
        this.quatreoOrder = null;
        this.receivedDate = new Date('');
        this.product = '';
        this.type = '';
        this.ecd = new Date('');
        this.nextActionDate = new Date('');
        this.priority = '';
        this.state = '';
        this.county = '';
    }
  }

