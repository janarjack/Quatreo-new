import { Component, OnInit, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-page-title',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {

  @Input() breadcrumbItems: Array<{}>;
  @Input() title: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  routeto(path) {

    this.router.navigate([path]);
  }
}
