import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import {  Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';
import { Employee, EmployeeService } from 'src/app/services/employee/employee.service';
import { Interview, InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-update-interview',
  templateUrl: './update-interview.component.html',
  styleUrls: ['./update-interview.component.css']
})
export class UpdateInterviewComponent implements OnInit {
  id?:any;
  shouldSendMail:boolean=false;
  candidates:Candidate[]=[];
  employees:Employee[]=[];
  interview:Interview={};
  candidateId:any;
  employeeId:any;
  isValidDate:boolean=true;
  isValidTime:boolean=true;
  interviewTypes=[];
    
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private interviewService:InterviewService,
    private employeeService:EmployeeService,private adminService:AdminService,private candidateService:CandidateService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.loadInterviewData();
    this.loadCandidateData();
    this.loadEmployeeData();
    this.loadInterviewTypeData();
  
  }
updateInterview(interview:any){
 
    interview.id=this.id;
    interview.status='Rescheduled';
    interview.addedOn=this.interview.addedOn;
    interview.updatedBy=localStorage.getItem('adminEmail') as any as string;
    for(let emp of this.employees){
      if(emp.id==interview.empId){
        interview.employee=emp;
      }
    }
    for(let can of this.candidates){
      if(can.id==interview.canId){
        interview.candidate=can;
      }
    }
    this.interviewService.updateInterview(interview).subscribe(data=>{
     this.showSuccess(data.message);
      this.shouldSendMail=true;
    },error=> this.showError(error.error.message));
   
  
  
}
  sendMail(interview:any){
    this.adminService.sendRescheduledInterviewMail(interview.canId,interview.empId,interview).subscribe(data=>{
      this.showSuccess(data.message);
    },error=> this.showError(error.error.message));
  }
  loadInterviewTypeData(){
    this.interviewService.getAllInterviewType().subscribe(data=>{
      this.interviewTypes=data.data;
    },error=> this.showError(error.error.message));
  }
  loadCandidateData(){
    this.candidateService.getAllCandidate().subscribe(data=>{
      this.candidates=data.data;
    },error=> this.showError(error.error.message));
  }

  loadEmployeeData(){
    this.employeeService.getAllEmployee().subscribe(data=>{
      this.employees=data.data;
    },error=>  this.showError(error.error.message));
  }
loadInterviewData(){
  this.interviewService.getInterviewById(this.id).subscribe(data=>{
    this.interview=data.data;
    this.candidateId=this.interview.candidate?.id;
    this.employeeId=this.interview.employee?.id;
  },error=>this.showError(error.error.message));
}
validateDate(date:Date){
  const givenDate=formatDate(date,'yyyy-MM-dd','en_US');
  const today=formatDate(new Date(),'yyyy-MM-dd','en_US');
  this.isValidDate=givenDate>=today;
}
validateTime(time:any){
    const minTime:any="10:00";
    const maxTime:any="20:00";
    this.isValidTime=time>=minTime && time <=maxTime;
}

showSuccess(message:string){
  this.toastr.success(message);
}

showError(message:string){
  this.toastr.error(message);
}
}
