import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-Layout';
import { AppComponent } from './app.component';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { BioComponent } from './bio/bio.component';


const routes:Routes = [
  {path:'bio', component:BioComponent},
  {path:'edit-bio', component:EditBioComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    EditBioComponent,
    BioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgMultiSelectDropDownModule,
    FlexLayoutModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
