export class ManageClientModel {
  id: any;
  clientName: string;
  invoiceMail: string;
  phoneNumber: number;
  activeStatus = false;
  guidelines: any;
  contacts: any;
  productType: any;
  mlsCatergory: any;
  candidates: Array<any> = [{}];
  checkArray: any;
  clear() {
      this.id = null;
      this.clientName = '';
      this.invoiceMail = '';
      this.phoneNumber = null;
      this.activeStatus = true;
      this.guidelines = [];
      this.contacts = '';
      this.productType = '1';
      this.mlsCatergory = '1';
      this.candidates = [];
      this.checkArray = '';
   }
}
