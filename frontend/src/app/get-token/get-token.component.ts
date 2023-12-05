import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-get-token',
    templateUrl: './get-token.component.html',
    styleUrls: ['./get-token.component.css'],

  })

  export class GetTokenComponent implements OnInit{

    constructor(private ApiService: ApiService, private route: ActivatedRoute){}

    ngOnInit(): void {
        
        var code: any;
        this.route.queryParams.subscribe(params => { code = params['code'] });

        if (code) {
            console.log('Value of the "code" parameter: ', code);

            this.ApiService.getToken(code).subscribe(
                (data) => {
                    const token = data.headers.get('Authorization');
                    localStorage.setItem('BioIdToken', token);
                    console.log('token', token);
                },
                (error) => {
                    console.log('Error:', error);
                }
            );
        } else {
            console.log('The "code" parameter is not present in the URL.');
        }

    }

  }