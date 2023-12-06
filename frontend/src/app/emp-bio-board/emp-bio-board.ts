import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailModalComponent } from './emp-bio-model/emp-bio-model.component';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.scss'],
})
export class JobBoardComponent implements OnInit {
  hasLoaded = false;
  jobTitle = '';
  location = '';

  jobs: any[] = [];

  resultsShown = false;
  noResults = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    public dialog: MatDialog
  ) {}

  search(jobTitle: string, fullName: string) {
    const httpOptions = {
      params: {
        jobTitle: jobTitle,
        fullName: fullName,
      },
    };
    this.api.getBios().subscribe((res: any) => {
      console.log(res);
      this.jobs = res.filter((job: any) => {
        return (
          job.fullName.toLowerCase().includes(fullName.toLowerCase()) &&
          job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
        );
      });
      this.jobs.length === 0
        ? (this.noResults = true)
        : (this.noResults = false);
      this.resultsShown = true;
      this.hasLoaded = true;
    });
  }

  back() {
    this.resultsShown = false;
  }

  ngOnInit() {}

  openModal(job: any) {
    console.log('MODAL OPENED ', job);
    const dialogRef = this.dialog.open(JobDetailModalComponent, {
      width: '80vw',
      data: {
        title: 'Job Details',
        body: job,
      },
    });
  }
}
