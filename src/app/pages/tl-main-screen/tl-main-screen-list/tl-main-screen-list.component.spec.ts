import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlMainScreenListComponent } from './tl-main-screen-list.component';

describe('TlMainScreenListComponent', () => {
  let component: TlMainScreenListComponent;
  let fixture: ComponentFixture<TlMainScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlMainScreenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlMainScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
