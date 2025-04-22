import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeblinksComponent } from './add-weblinks.component';

describe('AddWeblinksComponent', () => {
  let component: AddWeblinksComponent;
  let fixture: ComponentFixture<AddWeblinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeblinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeblinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
