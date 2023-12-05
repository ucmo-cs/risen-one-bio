import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.css'],

})


export class EditBioComponent implements OnInit {
  form!: FormGroup;

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
  ngOnInit() {
    this.form = new FormGroup({
      tech: new FormControl('', Validators.required)
    }

    );
  

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



  
}
