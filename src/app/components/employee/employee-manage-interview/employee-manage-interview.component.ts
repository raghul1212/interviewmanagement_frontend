import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee, EmployeeService } from 'src/app/services/employee/employee.service';
import { Interview, InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-employee-manage-interview',
  templateUrl: './employee-manage-interview.component.html',
  styleUrls: ['./employee-manage-interview.component.css']
})
export class EmployeeManageInterviewComponent implements OnInit {
  employee:Employee={};
  empEmail:string=localStorage.getItem('empEmail') as any as string;
  interviews:Interview[]=[];
  pageOfItems: Array<any>=[];
  today=formatDate(new Date(),'yyyy-MM-dd','en_US');
  currentTime=formatDate(new Date(),'HH:mm:ss','en_US');
  
  constructor(private router:Router,private employeeService:EmployeeService,
    private interviewService:InterviewService, private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.empEmail!=null){
      this.reloadEmployeeData();
      this.reloadInterviewData();
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  addResult(id:any){
    this.router.navigate(['addResult',id]);
  }
  viewCandidate(id:any){
    this.router.navigate(['viewCandidateById',id]);
  }

  reloadInterviewData(){
   const employee=new Employee();
   employee.emailId=this.empEmail;
  this.interviewService.getInterviewByEmployeeEmailId(employee).subscribe(data=>{
  this.interviews=data.data;
 },error=> this.showError(error.error.message));

  }

  reloadEmployeeData(){
    const employee=new Employee();
    employee.emailId=this.empEmail;
    this.employeeService.getEmployeeByEmailId(employee).subscribe(data=>{
      console.log(data);
      if(data.data==null){
        this.showInfo("Please enter a valid login credential to proceed..");
        this.router.navigate(['login']);
      }else{
        this.employee=data.data;
      }
     
    },error=> this.showError(error.error.message));
  }
  showError(message:string){
    this.toastr.error(message);
  }
  showInfo(message:string){
    this.toastr.info(message);
  }
}
