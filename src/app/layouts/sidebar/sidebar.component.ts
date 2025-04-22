import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { MenuConfig } from '../../../app/config/menu';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isCondensed = false;
  permissions = [];
  menu: any;
  menuList: any = [];
  @ViewChild('sideMenu', { static: false }) sideMenu: ElementRef;
  public configModel: MenuConfig = new MenuConfig();
  public onMenuUpdated$: BehaviorSubject<MenuConfig> = new BehaviorSubject(
    this.configModel
  );
  constructor() {
    // console.log(this.configModel, 'c');
  }

  ngOnInit() {
    // console.log(this.menulist.config);
    this.permissions = JSON.parse(sessionStorage.getItem('userPermission'));
    this.menu = this.configModel.config.aside.items;
    this.menuList = this.configModel.config.aside.items;
    let newList = [];
    // if (this.permissions) {
    //   let userPermissions = this.permissions;
    //   this.menuList.forEach(function (val, key) {
    //     userPermissions.forEach(function (v, k) {
    //       console.log(v.moduleName);
    //       if (v.moduleName === val.sidebarname && v.status) {
    //         newList.push(val);
    //       }
    //     });
    //   });
    // this.menu = newList;
    // }
    console.log(this.menu);
  }

  ngAfterViewInit() {
    console.log(this.menu);

    this._activateMenuDropdown();
  }

  ngOnChanges() {
    if ((!this.isCondensed && this.sideMenu) || this.isCondensed) {
      setTimeout(() => {
        this.menu = this.configModel.config.aside.items;
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  /**
   * Activates the menu dropdown
   */
  _activateMenuDropdown() {
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];
        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('active');

      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('in');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('active');
          parent3El.firstChild.classList.add('active');
        }
      }
    }
  }
}
