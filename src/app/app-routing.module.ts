import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { AddInterviewComponent } from './components/admin/add-interview/add-interview.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ManageEmployeeComponent } from './components/admin/manage-employee/manage-employee.component';
import { ManageInterviewComponent } from './components/admin/manage-interview/manage-interview.component';
import { ManageResultComponent } from './components/admin/manage-result/manage-result.component';
import { UpdateEmployeeComponent } from './components/admin/update-employee/update-employee.component';
import { UpdateInterviewComponent } from './components/admin/update-interview/update-interview.component';
import { ViewCandidateEmployeeInterviewComponent } from './components/admin/view-candidate-employee-interview/view-candidate-employee-interview.component';
import { ViewCandidateEmployeeComponent } from './components/admin/view-candidate-employee/view-candidate-employee.component';
import { ViewCandidateComponent } from './components/admin/view-candidate/view-candidate.component';
import { AddCandidateComponent } from './components/candidate/add-candidate/add-candidate.component';
import { CandidateComponent } from './components/candidate/candidate/candidate.component';
import { ViewCandidateByIdComponent } from './components/candidate/view-candidate-by-id/view-candidate-by-id.component';
import { ViewCurrentApplicationComponent } from './components/candidate/view-current-application/view-current-application.component';

import { AddResultComponent } from './components/employee/add-result/add-result.component';
import { EmployeeManageInterviewComponent } from './components/employee/employee-manage-interview/employee-manage-interview.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'candidate',component:CandidateComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'addCandidate',component:AddCandidateComponent},
  {path:'viewCandidate',component:ViewCandidateComponent},
  {path:'viewCandidateById/:id',component:ViewCandidateByIdComponent},
  {path:'viewCurrentApplication',component:ViewCurrentApplicationComponent},
  {path:'updateEmployee/:id',component:UpdateEmployeeComponent},
  {path:'addEmployee',component:AddEmployeeComponent},
  {path:'manageEmployee',component:ManageEmployeeComponent},
  {path:'employeeManageInterview',component:EmployeeManageInterviewComponent},
  {path:'addInterview',component:AddInterviewComponent},
  {path:'updateInterview/:id',component:UpdateInterviewComponent},
  {path:'manageInterview',component:ManageInterviewComponent},
  {path:'viewCandidateEmployee/:id',component:ViewCandidateEmployeeComponent},
  {path:'viewCandidateEmployeeInterview/:id',component:ViewCandidateEmployeeInterviewComponent},
  {path:'addResult/:id',component:AddResultComponent},
  {path:'manageResult',component:ManageResultComponent},
  {path:'**',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  //the use of forRoot allows us to access our providers from any point in the application that is not lazy loaded
  exports: [RouterModule]
})
export class AppRoutingModule { }
