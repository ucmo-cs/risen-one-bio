import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBioComponent } from './edit-bio/edit-bio.component';
import { TestEmployeeComponent } from './test-employee/test-employee.component';
const routes: Routes = [
  {path: 'edit-bio', component: EditBioComponent},
  {path: 'test-employee', component: TestEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
