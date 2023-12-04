import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-Layout';
import { AppComponent } from './app.component';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { BioComponent } from './bio/bio.component';
import { TestEmployeeComponent } from './test-employee/test-employee.component';


const routes:Routes = [
  {path:'bio', component:BioComponent},
  {path:'edit-bio', component:EditBioComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    EditBioComponent,
    BioComponent,
    TestEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
