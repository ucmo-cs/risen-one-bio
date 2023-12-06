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
import { GetTokenComponent } from './get-token/get-token.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { DataService } from './shared/shared.service'
import { EmpBioBoardComponent } from './emp-bio-board/emp-bio-board.component';
import { EmpBioModelComponent } from './emp-bio-board/emp-bio-model/emp-bio-model.component';
import { SignoutComponent } from './signout/signout.component';

const routes:Routes = [
  {path:'home', component:EmpBioBoardComponent},
  {path:'bio', component:BioComponent},
  {path:'edit-bio', component:EditBioComponent},
  {path: 'get-token', component:GetTokenComponent},
  {path: 'signout', component:SignoutComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    EditBioComponent,
    BioComponent,
    EmpBioBoardComponent,
    EmpBioModelComponent,
    GetTokenComponent,
    TestEmployeeComponent,
    SignoutComponent
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
