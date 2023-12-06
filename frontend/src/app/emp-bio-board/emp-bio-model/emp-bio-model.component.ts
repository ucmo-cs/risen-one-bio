import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-detail-modal',
  templateUrl: './job-detail-modal.component.html',
  styleUrls: ['./job-detail-modal.component.scss'],
})
export class JobDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<JobDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
