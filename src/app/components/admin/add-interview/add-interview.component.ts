import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {
shouldSendMail:boolean=false;
candidates:any[]=[];
employees:any[]=[];
candidateId?:string;
empId?:string;
isValidTime:boolean=true;
interviewTypes:any;
todayDate=formatDate(new Date(), 'yyyy-MM-dd','en_us');
  constructor(private candidateService:CandidateService,private employeeService:EmployeeService
    ,private interviewService:InterviewService,private adminService:AdminService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.reloadCandidateData();
    this.reloadEmployeeData();
    this.reloadInterviewTypeData();
  }
  scheduleInterview(interview:any){
    interview.status='Live';
    interview.updatedBy=localStorage.getItem('adminEmail') as any as string;
    
    this.interviewService.addInterview(interview.candidateId,interview.empId,interview).subscribe(data=>{
      this.showSuccess(data.message);
      this.shouldSendMail=true;
   
    },error=> this.showError(error.error.message)
    );
   
  }
  setCandidateMail(canid:any){
    this.candidateId=canid;
  }

  setEmployeeMail(empId:any){
    this.empId=empId;
  }

  sendMail(interview:any){
   
    this.adminService.sendScheduledInterviewMail(this.candidateId,this.empId,interview).subscribe(data=>{
      this.showSuccess(data.message);
    },error=> this.showError(error.error.message));
  }

validateTime(time:any){
    const minTime:any="10:00";
    const maxTime:any="20:00";
    this.isValidTime=time>=minTime && time <=maxTime;
}

reloadEmployeeData(){
  this.employeeService.getAllEmployee().subscribe(data=>{
    this.employees=data.data;
  },error=>this.showError(error.error.message)
  );
}
reloadCandidateData(){
  this.candidateService.getAllCandidate().subscribe(data=>{
    this.candidates=data.data;
  },error=>this.showError(error.error.message)
  );
}

reloadInterviewTypeData(){
  this.interviewService.getAllInterviewType().subscribe(data=>{
    this.interviewTypes=data.data;
  });
}
showSuccess(message:string){
  this.toastr.success(message);
}

showError(message:string){
  this.toastr.error(message);
}
}
