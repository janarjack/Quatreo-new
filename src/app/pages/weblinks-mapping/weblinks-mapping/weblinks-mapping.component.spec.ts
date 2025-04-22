import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblinksMappingComponent } from './weblinks-mapping.component';

describe('WeblinksMappingComponent', () => {
  let component: WeblinksMappingComponent;
  let fixture: ComponentFixture<WeblinksMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeblinksMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblinksMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
