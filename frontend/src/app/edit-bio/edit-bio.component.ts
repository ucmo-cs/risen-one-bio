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

@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.css'],

})


export class EditBioComponent implements OnInit {
  form!: FormGroup;
  previousData: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  techStackList: string[] = [];
  isUploaded1: boolean = false;
  isUploaded2: boolean = false;
  isUploaded3: boolean = false;
  fileChosen3 = document.getElementById('file-chosen3')!;

  mainImageUrl: SafeUrl | null = null;
  optionalImage1Url: SafeUrl | null = null;
  optionalImage2Url: SafeUrl | null = null;

  mainImageFile: File | null = null;
  optionalImage1File: File | null = null;
  optionalImage2File: File | null = null;

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tech: new FormControl('', Validators.required),
      mainImage: new FormControl('', Validators.required),
      caption1: new FormControl('', Validators.required),
      optionalImage1: new FormControl('', Validators.required),
      caption2: new FormControl('', Validators.required),
      optionalImage2: new FormControl('', Validators.required),
      caption3: new FormControl('', Validators.required)
    });

    const userId = '160faac0-8289-11ee-9dcc-6507b4955383';

    this.apiService.getBio(userId).subscribe((bioData) => {
      
      for (var i = 0; i < bioData.techStack.length; i++){

        console.log('techStackList [', i ,']::: ', bioData.techStack[i]);
        this.form.patchValue({ tech: bioData.techStack[i] });
        this.addListItem();
      }

      console.log('techStackList should be updated');

      this.form.patchValue({
        fullName: bioData.fullName,
        jobTitle: bioData.jobTitle,
        description: bioData.description,
        caption1: bioData.caption1,
        caption2: bioData.caption2,
        caption3: bioData.caption3
      });

      if (bioData.mainImage){
        this.mainImageUrl = this.sanitizeImage(bioData.mainImage);
        document.getElementById('file-chosen1')!.textContent = "Main Image";
        this.isUploaded1 = true;
      }

      if (bioData.optionalImage1){
        this.optionalImage1Url = this.sanitizeImage(bioData.optionalImage1);
        document.getElementById('file-chosen2')!.textContent = "Optional Image 1";
        this.isUploaded2 = true;
      }

      if (bioData.optionalImage2){
        this.optionalImage2Url = this.sanitizeImage(bioData.optionalImage2);
        document.getElementById('file-chosen3')!.textContent = "Optional Image 2";
        this.isUploaded3 = true;
      }

    },
    (error) => {
      console.error('Error fetching bio data:', error);
    });

    


  }
 
  onFileSelectedImage(event: Event) {
   
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {

      const reader = new FileReader();
      
      if(target.id === "upload-img-btn1"){
        document.getElementById('file-chosen1')!.textContent = target.files[0].name
        this.isUploaded1 = true;
        this.mainImageFile = target.files[0];
        this.readAndSetMainImageUrl(this.mainImageFile);
      }
      else if(target.id === "upload-img-btn2"){
        document.getElementById('file-chosen2')!.textContent = target.files[0].name
        this.isUploaded2 = true;
        this.optionalImage1File = target.files[0];
        this.readAndSetOptImage1Url(this.optionalImage1File);
      }
      else if (target.id === "upload-img-btn3"){
        document.getElementById('file-chosen3')!.textContent = target.files[0].name
        this.isUploaded3 = true;
        this.optionalImage2File = target.files[0];
        this.readAndSetOptImage2Url(this.optionalImage2File);
      }
        console.log(target.files[0].name);
        console.log(target.id);
        
        //this.fileChosen3!.textContext
    }
    
  }
  addListItem() {
    const {tech} = this.form.controls;
    this.techStackList.push(tech.value);
    //reset the input field for next entry
    tech.setValue('');
  }

 

  removeListItem(i: number){
    console.log("remove item list");
    console.log(i);
    const {tech} = this.form.controls;
    this.techStackList.splice(i, 1);
    tech.setValue('');

  }

  sanitizeImage(base64Image: string): SafeUrl {
    // Use DomSanitizer to sanitize the image URL
    return this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${base64Image}`);
}


//=====================================================//
//             Delete Image Data Functions             //
//=====================================================//

  deleteMainImage(): void {
    this.mainImageUrl = null;
    this.mainImageFile = null;
    this.isUploaded1 = false;
    document.getElementById('file-chosen1')!.textContent = "Browse";
    this.form.get('mainImage')?.setValue(null);
    
  }

  deleteOpt1Image(): void {
    this.optionalImage1Url = null;
    this.optionalImage1File = null;
    this.isUploaded2 = false;
    document.getElementById('file-chosen2')!.textContent = "Browse";
    this.form.get('optionalImage1')?.setValue(null);
  }

  deleteOpt2Image(): void {
    this.optionalImage2Url = null;
    this.optionalImage2File = null;
    this.isUploaded3 = false;
    document.getElementById('file-chosen3')!.textContent = "Browse";
    this.form.get('optionalImage2')?.setValue(null);
  }


//=====================================================//
//               Read and Set Image URLs               //
//=====================================================//

  private readAndSetMainImageUrl(file: File): void{
    const reader = new FileReader();

    reader.onload = () => {
      this.mainImageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  private readAndSetOptImage1Url(file: File): void{
    const reader = new FileReader();

    reader.onload = () => {
      this.mainImageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  private readAndSetOptImage2Url(file: File): void{
    const reader = new FileReader();

    reader.onload = () => {
      this.mainImageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  
}
