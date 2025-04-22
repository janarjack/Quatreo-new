import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFilterScreenComponent } from './tl-filter-screen.component';

describe('TlFilterScreenComponent', () => {
  let component: TlFilterScreenComponent;
  let fixture: ComponentFixture<TlFilterScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlFilterScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TlFilterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
