export class ManageUserModel {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    noOfOrderProcessable: number;
    employeeId: number;
    defaultRoleId: number;
    clientList: [];
    roleList: [];
    skillList: [];
    active = false;


    clear() {
        this.id = null;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = null;
        this.noOfOrderProcessable = null;
        this.employeeId = null;
        this.defaultRoleId = null;
        this.roleList = [];
        this.skillList = [];
        this.clientList = [];
        this.active = true;
    }
  }
