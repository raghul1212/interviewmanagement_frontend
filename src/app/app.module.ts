import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ViewCandidateComponent } from './components/admin/view-candidate/view-candidate.component';
import { ManageEmployeeComponent } from './components/admin/manage-employee/manage-employee.component';
import { ManageInterviewComponent } from './components/admin/manage-interview/manage-interview.component';
import { ManageResultComponent } from './components/admin/manage-result/manage-result.component';
import { AddCandidateComponent } from './components/candidate/add-candidate/add-candidate.component';

import { CandidateComponent } from './components/candidate/candidate/candidate.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { AddInterviewComponent } from './components/admin/add-interview/add-interview.component';
import { UpdateEmployeeComponent } from './components/admin/update-employee/update-employee.component';
import { ViewCurrentApplicationComponent } from './components/candidate/view-current-application/view-current-application.component';
import { ViewCandidateEmployeeComponent } from './components/admin/view-candidate-employee/view-candidate-employee.component';
import { UpdateInterviewComponent } from './components/admin/update-interview/update-interview.component';
import { EmployeeManageInterviewComponent } from './components/employee/employee-manage-interview/employee-manage-interview.component';
import { AddResultComponent } from './components/employee/add-result/add-result.component';
import { ViewCandidateByIdComponent } from './components/candidate/view-candidate-by-id/view-candidate-by-id.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewCandidateEmployeeInterviewComponent } from './components/admin/view-candidate-employee-interview/view-candidate-employee-interview.component';
import { JwPaginationModule } from 'jw-angular-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ViewCandidateComponent,
    ManageEmployeeComponent,
    ManageInterviewComponent,
    ManageResultComponent,
    AddCandidateComponent,
    AddEmployeeComponent,
    CandidateComponent,
    EmployeeComponent,
    AddInterviewComponent,
    UpdateEmployeeComponent,
    ViewCurrentApplicationComponent,
    ViewCandidateEmployeeComponent,
    UpdateInterviewComponent,
    EmployeeManageInterviewComponent,
    AddResultComponent,
    ViewCandidateByIdComponent,
    ViewCandidateEmployeeInterviewComponent,
   
   
  
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    JwPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
