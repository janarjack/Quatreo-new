export class WeblinksModel {
    countyId: any;
    webLinkLabel: string;
    webLinkURL: string;
    isActive: boolean;


    clear() {
        this.countyId = null;
        this.webLinkLabel = '';
        this.webLinkURL = '';
        this.isActive = false;
    }
  }
