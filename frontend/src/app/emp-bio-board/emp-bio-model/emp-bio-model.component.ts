import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-bio-model',
  templateUrl: './emp-bio-model.component.html',
  styleUrls: ['./emp-bio-model.component.scss'],
})
export class EmpBioModelComponent {
  constructor(
    public dialogRef: MatDialogRef<EmpBioModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
