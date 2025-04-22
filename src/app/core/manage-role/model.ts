export class ManageRoleModel {
    id: any;
    type: string;
    date: Date;
    role: number;
    activeStatus = false;



    clear() {
        this.id = null;
        this.type = '';
        this.date = new Date('');
        this.role = null;
        this.activeStatus = true;
    }
  }

