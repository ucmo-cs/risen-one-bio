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
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css']
  })

  export class SignoutComponent{
    ngOnInit(){
        localStorage.removeItem('BioIdToken');
    }
  }