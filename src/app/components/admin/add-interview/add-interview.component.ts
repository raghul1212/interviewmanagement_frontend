import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Interview, InterviewService } from 'src/app/services/interview/interview.service';

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
isValidDate:boolean=true;
isValidTime:boolean=true;
interviewTypes:any[]=['Technical Interview Round 1','Technical Interview Round 2','Techincal Interview Round 3','HR Interview Round 1','HR Interview Round 2'];
  constructor(private candidateService:CandidateService,private employeeService:EmployeeService,private interviewService:InterviewService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.candidateService.getAllCandidate().subscribe(data=>{
      this.candidates=data;
    },error=>window.alert(error.error)
    );
    this.employeeService.getAllEmployee().subscribe(data=>{
      this.employees=data;
    },error=>window.alert(error.error)
    );
  }
  scheduleInterview(interview:any){
    interview.status='Live';
    if (confirm("Do you want to schedule this interview?") == true) {
    this.interviewService.addInterview(interview.candidateId,interview.empId,interview).subscribe(data=>{
      window.alert(data);
    this.shouldSendMail=true;
   
    },error=> window.alert(error.error)
    );
    
    } else {
    this.shouldSendMail=false;
    }
   
  }
  setCandidateMail(canid:any){
    this.candidateId=canid;
  }

  setEmployeeMail(empId:any){
    this.empId=empId;
  }

  sendMail(interview:any){
   
    this.adminService.sendScheduledInterviewMail(this.candidateId,this.empId,interview).subscribe(data=>{
      window.alert(data);
      console.log('mail sent');
    },error=> window.alert(error.error));
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
