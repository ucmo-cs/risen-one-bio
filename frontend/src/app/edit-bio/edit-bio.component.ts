import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms'


@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.css']
})


export class EditBioComponent implements OnInit {
  form!: FormGroup;

  techStackList: string[] = [];

    
  fileChosen3 = document.getElementById('file-chosen3')!;
  ngOnInit() {
    this.form = new FormGroup({
      tech: new FormControl('', Validators.required)
    }

    );
  

  }
 
  onFileSelectedImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if(target.id === "upload-img-btn1"){
        document.getElementById('file-chosen1')!.textContent = target.files[0].name
      }
      else if(target.id === "upload-img-btn2"){
        document.getElementById('file-chosen2')!.textContent = target.files[0].name
      }
      else if (target.id === "upload-img-btn3"){
        document.getElementById('file-chosen3')!.textContent = target.files[0].name
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
