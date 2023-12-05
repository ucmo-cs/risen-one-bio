import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar'; 

import { FlexLayoutModule } from '@angular/flex-Layout';
import { AppComponent } from './app.component';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { BioComponent } from './bio/bio.component';
import { TestEmployeeComponent } from './test-employee/test-employee.component';
import { GetTokenComponent } from './get-token/get-token.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptor/auth.interceptor';


const routes:Routes = [
  {path:'bio', component:BioComponent},
  {path:'edit-bio', component:EditBioComponent},
  {path: 'get-token', component:GetTokenComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    EditBioComponent,
    BioComponent,
    GetTokenComponent,
    TestEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
