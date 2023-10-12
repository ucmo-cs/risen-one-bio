import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-bio',
  templateUrl: './edit-bio.component.html',
  styleUrls: ['./edit-bio.component.css']
})
export class EditBioComponent implements OnInit {
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'HTML' },
      { item_id: 2, item_text: 'Java' },
      { item_id: 3, item_text: 'JavaScript' },
      { item_id: 4, item_text: 'Angular' },
    ];

    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
    };
    
    // ...
  }
  onItemSelect(item: any) {
    console.log(item);
  }


}
