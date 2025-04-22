import { Component, OnInit } from '@angular/core';
import { GetStatusService } from 'src/app/core/common/helpers/getstatus.service';
import { ManageSkillService } from 'src/app/core/manage-skill/manage-skill.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-manage-skill-list',
  templateUrl: './manage-skill-list.component.html',
  styleUrls: ['./manage-skill-list.component.scss']
})
export class ManageSkillListComponent implements OnInit {
  loading = false;
  breadCrumbItems: Array<{}>;
  skillList: any = [];
  constructor(
    private commonService: GetStatusService,
    private skillService: ManageSkillService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: 'Quatreo', path: '/' },
      { label: 'Manage skill set', path: '/', active: true }
    ];
    this._fetchData();
  }

  // get skill data
  _fetchData() {
    this.loading = true;
    this.skillService.getAllSkillSet().subscribe(
      response => {
        console.log(response);
        const res = 'data';
        if (response[res]) {
          this.skillList = response[res];
        }
        this.loading = false;
      },
      err => {
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this._fetchData.bind(this));
        }
        this.loading = false;
      }
    );
  }
}
