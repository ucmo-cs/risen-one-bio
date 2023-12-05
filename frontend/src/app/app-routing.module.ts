import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { TestEmployeeComponent } from './test-employee/test-employee.component';
import { BioComponent } from './bio/bio.component';
import { GetTokenComponent } from './get-token/get-token.component';

const routes: Routes = [
  { path: '', redirectTo: 'bio', pathMatch: 'full' },
  { path: 'bio', component: BioComponent },
  { path: 'edit-bio', component: EditBioComponent },
  { path: 'test-employee', component: TestEmployeeComponent },
  { path: 'get-token', component: GetTokenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
