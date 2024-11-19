import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdminComponent } from './clinic-admin.component';

describe('ClinicAdminComponent', () => {
  let component: ClinicAdminComponent;
  let fixture: ComponentFixture<ClinicAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicAdminComponent]
    });
    fixture = TestBed.createComponent(ClinicAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
