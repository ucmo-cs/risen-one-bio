import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBioBoardComponent } from './emp-bio-board.component';

describe('EmpBioBoardComponent', () => {
  let component: EmpBioBoardComponent;
  let fixture: ComponentFixture<EmpBioBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBioBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBioBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
