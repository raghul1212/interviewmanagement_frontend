import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  interviewTypes:any[]=['Technical Interview Round 1','Technical Interview Round 2','Techincal Interview Round 3','HR Interview Round 1','HR Interview Round 2'];
 
   
    
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private interviewService:InterviewService,
    private employeeService:EmployeeService,private adminService:AdminService,private candidateService:CandidateService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.loadCandidateData();
    this.loadEmployeeData();
    this.loadInterviewData();
   
  }
updateInterview(interview:any){
  if(window.confirm('Are you sure to update this interview?')==true){
    interview.id=this.id;
    interview.status='Rescheduled';
    interview.addedOn=this.interview.addedOn;
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
      window.alert(data);
      this.shouldSendMail=true;
    });
   
  }else{
    console.log('this interview is not updated');
  }
  
}
  sendMail(interview:any){
    this.adminService.sendRescheduledInterviewMail(interview.canId,interview.empId,interview).subscribe(data=>{
      window.alert(data);
    },error=> window.alert(error.error));
    console.log('mail sent');
  }

  loadCandidateData(){
    this.candidateService.getAllCandidate().subscribe(data=>{
      this.candidates=data;
    });
  }

  loadEmployeeData(){
    this.employeeService.getAllEmployee().subscribe(data=>{
      this.employees=data;
    });
  }
loadInterviewData(){
  this.interviewService.getInterviewById(this.id).subscribe(data=>{
    this.interview=data;
    this.candidateId=this.interview.candidate?.id;
    this.employeeId=this.interview.employee?.id;
  },error=>window.alert(error.error));
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
}
