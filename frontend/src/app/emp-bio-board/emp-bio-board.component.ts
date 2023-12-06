import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../shared/shared.service';
import { Router } from '@angular/router';

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
  signedIn: boolean = false;

  resultsShown = false;
  noResults = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
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

    if(localStorage.getItem('BioIdToken')){
      this.signedIn = true;
    }

    this.search();
  }

  openModal(bio: any) {
    console.log('Bio Page opened ::: ', bio);
    this.dataService.setUserId(bio.id);
    this.router.navigate(['/bio']);
  }
}
