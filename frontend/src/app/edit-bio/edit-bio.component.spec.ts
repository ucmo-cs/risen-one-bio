import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBioComponent } from './edit-bio.component';

describe('EditBioComponent', () => {
  let component: EditBioComponent;
  let fixture: ComponentFixture<EditBioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBioComponent]
    });
    fixture = TestBed.createComponent(EditBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
