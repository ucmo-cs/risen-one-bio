import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EmpBioModelComponent } from './emp-bio-model/emp-bio-model.component';

@Component({
  selector: 'app-emp-bio-board',
  templateUrl: './emp-bio-board.component.html',
  styleUrls: ['./emp-bio-board.component.scss'],
})
export class EmpBioBoardComponent implements OnInit {
  hasLoaded = false;
  jobTitle = '';
  fullName = '';

  bios: any[] = [];

  resultsShown = false;
  noResults = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    public dialog: MatDialog
  ) {}

  search() {
    this.api.getBios().subscribe((res: any) => {
      console.log(res);
      this.bios = res.filter((bio: any) => { return bio });
      this.bios.length === 0
        ? (this.noResults = true)
        : (this.noResults = false);
      this.resultsShown = true;
      this.hasLoaded = true;
    });
  }

  back() {
    this.resultsShown = false;
  }

  ngOnInit() {
    this.search();
  }

  openModal(bio: any) {
    console.log('MODEL OPENED ', bio);
    const dialogRef = this.dialog.open(EmpBioModelComponent, {
      width: '80vw',
      data: {
        title: bio.fullName,
        body: bio.jobTitle,
      },
    });
  }
}
