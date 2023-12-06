import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBioModelComponent } from './emp-bio-model.component';

describe('EmpBioModelComponent', () => {
  let component: EmpBioModelComponent;
  let fixture: ComponentFixture<EmpBioModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBioModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBioModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
