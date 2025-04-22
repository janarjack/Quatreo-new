import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ManageUserService } from 'src/app/core/manage-user/manage-user.service';
import { ToastrService } from 'ngx-toastr';
import { ManageRoleService } from 'src/app/core/manage-role/manage-role.service';
import { ManageClientService } from 'src/app/core/manage-client/manage-client.service';
import { ManageSkillService } from 'src/app/core/manage-skill/manage-skill.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
// import { createSecureServer } from 'http2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() public userdata;
  @Input() public action;
  loading = false;
  userObj;
  userForm: FormGroup;
  lenderForm: FormArray;
  hasFormErrors = false;
  submitted = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  selectRole: any[];
  selectClient: string[];
  selectSkill: any[];
  defaultRoleList;
  selectedRole;
  selectedClient;
  selectedSkill;
  defaultRoleID;
  isloading = false;
  statusdata = [
    {
      statusid: 1,
      statusValue: true,
      statusData: 'Active'
    },
    {
      statusid: 0,
      statusValue: false,
      statusData: 'In-Active'
    }
  ];
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: ManageUserService,
    private roleService: ManageRoleService,
    private clientService: ManageClientService,
    private skillService: ManageSkillService,
    private authenticationService: AuthenticationService
  ) {}

  // mask phone number to US format
  public mask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  ngOnInit() {
    // dropdwon list items
    this.getRoleList();
    this.getClientList();
    this.getSkillList();
    this.createForm();
  }

  // initialize user form
  createForm() {
    if (this.action === 'Edit') {
      this.selectedSkill = this.userdata.userSkillArray;
      this.selectedSkill.map(ele => {
        ele.names = ele.categoryName + '(' + ele.product.productName + ')';
      });
      this.selectedClient = this.userdata.userClientArray;
      this.selectedRole = this.userdata.userRoleArray;
      this.defaultRoleID = this.userdata.defaultRole;
      this.defaultRoleList = this.userdata.defaultRole;
    }
    this.userForm = this.fb.group({
      id: [this.action === 'Add' ? null : this.userdata.user.id],
      firstName: [
        this.action === 'Add' ? '' : this.userdata.user.firstName,
        Validators.required
      ],
      lastName: [
        this.action === 'Add' ? '' : this.userdata.user.lastName,
        Validators.required
      ],
      email: [
        this.action === 'Add' ? '' : this.userdata.user.email,
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      employeeId: [
        this.action === 'Add' ? '' : this.userdata.user.employeeId,
        Validators.required
      ],
      phone: [
        this.action === 'Add'
          ? ''
          : this.userdata.user.phone
              .replace(/[^\d]+/g, '')
              .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
        [
          Validators.required
          // Validators.minLength(10)
        ]
      ],
      noOfOrders: [
        this.action === 'Add' ? '' : this.userdata.user.noOfOrderProcessable,
        [Validators.required]
      ],
      role: [
        this.action === 'Add' ? '' : this.selectedRole,
        Validators.required
      ],
      skill: [
        this.action === 'Add' ? '' : this.selectedSkill,
        [Validators.required]
      ],
      client: [
        this.action === 'Add' ? '' : this.selectedClient,
        [Validators.required]
      ],
      defaultRole: ['', [Validators.required]],
      isActive: [this.action === 'Add' ? true : this.userdata.user.active]
    });
  }

  // get validations for client form
  get form() {
    return this.userForm.controls;
  }

  // get Role list
  getRoleList() {
    this.loading = true;
    this.roleService.getAllRoleList().subscribe(
      response => {
        // console.log("getALLROLE", response);
        this.loading = false;
        const res = 'data';
        if (response[res]) {
          this.selectRole = response[res].filter(ele => {
            return ele.roleName !== 'Admin' && ele.roleName !== 'Client';
          });

          console.log('this.selectRole', this.selectRole);
        }
      },
      err => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getRoleList.bind(this));
        }
      }
    );
  }

  // get Client list
  getClientList() {
    this.loading = true;
    this.clientService.getAllClientsList().subscribe(
      response => {
        this.loading = false;
        // console.log("getALLROLE", response);
        const res = 'data';
        if (response[res]) {
          this.selectClient = response[res];
        }
      },
      err => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getClientList.bind(this));
        }
      }
    );
  }

  // get skill list
  getSkillList() {
    this.loading = true;
    this.skillService.getAllSkillSet().subscribe(
      response => {
        this.loading = false;
        console.log('getALLROLE', response);
        const res = 'data';
        if (response[res]) {
          this.selectSkill = response[res];
          this.selectSkill.map(ele => {
            ele.names = ele.categoryName + '(' + ele.product.productName + ')';
          });
        }
      },
      err => {
        this.loading = false;
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.getSkillList.bind(this));
        }
      }
    );
  }

  // get Default Role
  getDefaultRole() {
    this.defaultRoleID = '';
    if (this.selectedRole) {
      this.defaultRoleList = this.selectedRole;
      console.log(this.defaultRoleList);
    }
  }

  // unmask phone number
  getUnmaskedphone(valueStr) {
    return valueStr.replace(/\D+/g, '');
  }

  // submit userform data
  saveData() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.createUser();
  }

  createUser() {
    let data;
    const clientlistid = [];
    this.selectedClient.map(element => {
      clientlistid.push(element.id);
    });
    const skilllistid = [];
    this.selectedSkill.map(element => {
      skilllistid.push(element.id);
    });
    const rolelistid = [];
    this.selectedRole.map(element => {
      rolelistid.push(element.id);
    });
    data = {
      id: this.userForm.value.id,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phone: this.getUnmaskedphone(this.userForm.value.phone),
      email: this.userForm.value.email,
      employeeId: this.userForm.value.employeeId,
      isActive: this.userForm.value.isActive,
      noOfOrderProcessable: this.userForm.value.noOfOrders,
      clientList: clientlistid,
      skillList: skilllistid,
      roleList: rolelistid,
      defaultRoleId: this.defaultRoleID.id
    };
    if (this.action === 'Add') {
      delete data.id;
    }
    console.log('datas in data', data);
    this.isloading = true;
    this.userService.saveOrEditUser(data).subscribe(
      response => {
        console.log(response, 'data');
        const val = 'status';
        this.isloading = false;
        if (response[val] === 'OK') {
          this.passEntry.emit('ok');
          this.activeModal.close();
          this.action === 'Add'
            ? this.toastr.success('Record added successfully')
            : this.toastr.success('Record edited successfully');
        }
      },
      err => {
        console.log(err, 'data');
        this.isloading = false;
        // const msg = err['message'];
        if (err.status === 401 && err.error.error === 'invalid_token') {
          this.authenticationService.recallApi(this.createUser.bind(this));
        }
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }
    );
  }
}
