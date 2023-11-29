import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.css'],

})


export class EditBioComponent implements OnInit {
  bioform: any;
  hasLoaded = false;

  techStackList: string[] = [];
  isUploaded1: boolean = false;
  isUploaded2: boolean = false;
  isUploaded3: boolean = false;
  fileChosen3 = document.getElementById('file-chosen3')!;

//   const input: HTMLInputElement | null = document.getElementById("myInput");
// if (input) {
//   input.addEventListener("keypress", function(event: KeyboardEvent) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       const myBtn: HTMLElement | null = document.getElementById("myBtn");
//       if (myBtn) {
//         myBtn.click();
//       }
//     }
//   });
// }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit() {
    this.bioform = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tech: ['', [Validators.required]],
      mainImage: ['', [Validators.required]],
      caption1: ['', [Validators.required]],
      optionalImage1: ['', [Validators.required]],
      caption2: ['', [Validators.required]],
      optionalImage2: ['', [Validators.required]],
      caption3: ['', [Validators.required]],
    });
  
    console.log(this.bioform);
    this.hasLoaded = true;
  }
 
  onFileSelectedImage(event: Event) {
    // const imageElement = document.getElementById("iconImage");
    // if (imageElement != null){
    //   // imageElement.setAttribute("src", "../../assets/DeleteImage.png");
    //   imageElement.setAttribute("ngIf", "true")
    // }
   
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      
      if(target.id === "upload-img-btn1"){
        document.getElementById('file-chosen1')!.textContent = target.files[0].name
        this.isUploaded1 = true;
      }
      else if(target.id === "upload-img-btn2"){
        document.getElementById('file-chosen2')!.textContent = target.files[0].name
        this.isUploaded2 = true;
      }
      else if (target.id === "upload-img-btn3"){
        document.getElementById('file-chosen3')!.textContent = target.files[0].name
        this.isUploaded3 = true;
      }
        console.log(target.files[0].name);
        console.log(target.id);
        
        //this.fileChosen3!.textContext
    }
    
  }
  addListItem() {
    const {tech} = this.bioform.controls;
    this.techStackList.push(tech.value);
    //reset the input field for next entry
    tech.setValue('');
  }

 

  removeListItem(i: number){
    console.log("remove item list");
    console.log(i);
    const {tech} = this.bioform.controls;
    this.techStackList.splice(i, 1);
    tech.setValue('');

  }

  submit(){

    const data = {
      fullName: this.bioform.get('fullName').value,
      jobTitle: this.bioform.get('jobTitle').value,
      description: this.bioform.get('description').value,
      techStack: this.bioform.get('tech').value,
      mainImage: this.bioform.get('mainImage').value,
      caption1: this.bioform.get('caption1').value,
      optionalImage1: this.bioform.get('optionalImage1').value,
      caption2: this.bioform.get('caption2').value,
      optionalImage2: this.bioform.get('optionalImage2').value,
      caption3: this.bioform.get('caption3').value,
    }
    this.putBio(data);
  }

  putBio(bioData: any){
    this.apiService.editBio(bioData).subscribe({
      next: () => {
        window.location.reload();
        this.router.navigate(['/bio']);
      },
      error: () => {
        console.log('ERROR');
      },
    });
  }

  
}
