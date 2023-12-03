import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BioService } from 'src/app/services/bio.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})

export class BioComponent implements OnInit{
  bioInfo: any;

  constructor(
    private bioService: BioService,
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.bioInfo = this.getBio(this.id);


    this.bioService.setBioInfo(this.bioInfo);
  }

  id = '';

  getBio(id: string){
    this.apiService.getBio(id).subscribe({
      next: () => {
        
      },
      error: () => {
        console.log('Could not get bio information');
      },
    });
  }
}
