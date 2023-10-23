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
  ngOnInit() {
    this.form = new FormGroup({
      tech: new FormControl('', Validators.required)
    }

    );
  }

  addListItem() {
    const {tech} = this.form.controls;
    this.techStackList.push(tech.value);
    //reset the input field for next entry
    tech.setValue('');
  }
  removeListItem(){
    const {tech} = this.form.controls;
    //delete this.techStackList[index];
    tech.setValue('');

  }


}
