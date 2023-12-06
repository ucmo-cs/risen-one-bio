import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { TestEmployeeComponent } from './test-employee/test-employee.component';
import { BioComponent } from './bio/bio.component';
import { GetTokenComponent } from './get-token/get-token.component';
import { EmpBioBoardComponent } from './emp-bio-board/emp-bio-board.component';
import { SignoutComponent } from './signout/signout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: EmpBioBoardComponent },
  { path: 'bio', component: BioComponent },
  { path: 'edit-bio', component: EditBioComponent },
  { path: 'test-employee', component: TestEmployeeComponent },
  { path: 'get-token', component: GetTokenComponent },
  { path: 'signout', component: SignoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
