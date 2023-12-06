import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from 'src/app/services/api.service';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent {

  constructor(
    private domSanitizer: DomSanitizer,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private apiService: ApiService,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {}

  techStackList: string[] = [];
  isUser: boolean = false;
  mainImageUrl: SafeUrl | null = null;
  optionalImage1Url: SafeUrl | null = null;
  optionalImage2Url: SafeUrl | null = null;

  signedIn: boolean = false;

  userId: string | null = null;


  ngOnInit() {

    //check if user is logged in
    if(localStorage.getItem('BioIdToken')){
      this.signedIn = true;
    }
    
    this.dataService.currentUserId.subscribe((userId) => (this.userId = userId))
    if (this.userId) {
      this.apiService.getBio(this.userId).subscribe((bioData) => {

        console.log(bioData);
      
        for (var i = 0; i < bioData.techStack.length; i++){

          console.log('techStackList [', i ,']::: ', bioData.techStack[i]);
          const tech: string = bioData.techStack[i];
          this.addListItem(tech);
        }

        console.log('techStackList should be updated');

        if (bioData.mainImage){
          this.mainImageUrl = this.sanitizeImage(bioData.mainImage);
        }

        if (bioData.optionalImage1){
          this.optionalImage1Url = this.sanitizeImage(bioData.optionalImage1);
        }

        if (bioData.optionalImage2){
          this.optionalImage2Url = this.sanitizeImage(bioData.optionalImage2);
        }

        //check if user is the owner of this biopage
        if(bioData.isAccount){
          this.isUser = true;
        }

        document.getElementById('fullName')!.textContent = bioData.fullName;
        document.getElementById('jobTitle')!.textContent = bioData.jobTitle;
        document.getElementById('description')!.textContent = bioData.description;

        document.getElementById('caption1')!.textContent = bioData.caption1;
        document.getElementById('caption2')!.textContent = bioData.caption2;
        document.getElementById('caption3')!.textContent = bioData.caption3;

      },
      (error) => {
        console.error('Error fetching bio data:', error);
      });

    } else {
      console.log("Failed to get userId from dataService");
    }

    


  }

  sanitizeImage(base64Image: string): SafeUrl {
    // Use DomSanitizer to sanitize the image URL
    return this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${base64Image}`);
  }

  addListItem(tech: string) {
    this.techStackList.push(tech);
  }

  sendEditBio(){
    console.log('Bio Page opened ::: ', this.userId);
    if(this.userId){  
      this.dataService.setUserId(this.userId);
      this.router.navigate(['/edit-bio']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
