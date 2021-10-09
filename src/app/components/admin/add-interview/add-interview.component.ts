import { formatDate, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { Employee } from 'src/app/dto/employee/employee';
import { Interview } from 'src/app/dto/interview/interview';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css'],
})
export class AddInterviewComponent implements OnInit {
  shouldSendMail: boolean = false;//this is set to true once the admin schedule the interview(purpose: mail sending button will be enabled), otherwise false(purpose: mail sending button remains disabled)
  candidates:Candidate[] = [];//to display the available candidate details
  employees: Employee[] = [];//to display the available employee details
  candidateId?: number;//id of the candidate used to get the details of the candidate for sending the interview details
  empId?: number;//id of the employee used to get the details of the employee for sending the interview details
  isValidTime: boolean = true;//to validate the time between 10 am and 8 pm for the interview
  interviewTypes: [number,string][]=[];//as we did not create an entity for interview types in the backend, it passed as array of interview types of any type
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_us');//used to restrict the user from selecting past days
  
  constructor(
    private candidateService: CandidateService,
    private employeeService: EmployeeService,
    private interviewService: InterviewService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadCandidateData();
    this.reloadEmployeeData();
    this.reloadInterviewTypeData();
  }

  //scheduleInterview is uses candidate Id, employee Id and interview details as input from the form and invoke the addInterview service to add the interview
  scheduleInterview(canId:number,empId:number,interview: Interview) {
    interview.status = 'Live';
    interview.updatedBy = localStorage.getItem('adminEmail')!;//not null assertion
    this.interviewService
      .addInterview(canId,empId, interview)
      .subscribe(
        (data) => {
          this.showSuccess(data.message);
          this.shouldSendMail = true;//shouldSendMail is set to true once interview is scheduled successfully
        },
        (error) => this.showError(error.error.message)
      );
  }
  //setCandidateId is used to set the candidate id which will be useful for sending interview details to the candidate(Reason for having id is that we will be using candidate name and email id)
  setCandidateId(canId: number) {
    this.candidateId = canId;
  }

  //setEmployeeId is used to set the employee id which will be useful for sending interview details to the employee(Reason for having id is that we will be using employee name and email id)
  setEmployeeId(empId: number) {
    this.empId = empId;
  }

  //sendMail is used to send the interview details via mail to both candidate and employee
  sendMail(interview: Interview) {
    this.adminService
      .sendScheduledInterviewMail(this.candidateId, this.empId, interview)
      .subscribe(
        (data) => {
          this.showSuccess(data.message);
        },
        (error) => this.showError(error.error.message)
      );
  }

  //validateTime is used to validate time between 10 am and 8 pm.
  validateTime(time: string) {//getting time as string and comparing time based on string comparing
    const minTime: string ='10:00';
    const maxTime: string = '20:00';
    this.isValidTime = time >= minTime && time <= maxTime;
  }

  //reloadEmployeeData is used to load all available employee data for the interview. It is called once inside ngOnInit method
  reloadEmployeeData() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => {
        this.employees = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //reloadCandidateData is used to load all candidate data for the interview. It is called once inside ngOnInit method
  reloadCandidateData() {
    this.candidateService.getAllCandidate().subscribe(
      (data) => {
        this.candidates = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //reloadInterviewTypeData is used to load available interview types from database
  reloadInterviewTypeData() {
    this.interviewService.getAllInterviewType().subscribe((data) => {
      this.interviewTypes = data.data;
    },error=> this.showError(error.error.message));
  }

  //it is used to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }
//it is used to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
