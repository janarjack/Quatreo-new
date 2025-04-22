import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAuditScreenComponent } from './quality-audit-screen.component';

describe('QualityAuditScreenComponent', () => {
    let component: QualityAuditScreenComponent;
    let fixture: ComponentFixture<QualityAuditScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualityAuditScreenComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualityAuditScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
