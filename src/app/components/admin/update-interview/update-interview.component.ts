import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/dto/candidate/candidate';
import { Employee } from 'src/app/dto/employee/employee';
import { Interview } from 'src/app/dto/interview/interview';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-update-interview',
  templateUrl: './update-interview.component.html',
  styleUrls: ['./update-interview.component.css'],
})
export class UpdateInterviewComponent implements OnInit {
  id: number = 0; //to store id of the interview
  shouldSendMail: boolean = false; //is set to once after user reschedules the interview
  candidates: Candidate[] = []; //to store available candidate details for the interview updation
  employees: Employee[] = []; //to store available candidate details for the interview updation
  interview: Interview = {}; //to store interview details for the interview updation
  candidateId: number = 0; //id of candidate whose interview is to be updated
  employeeId: number = 0; //id of employee whose interview is to be updated
  isValidTime: boolean = true; //to set true if time between 10 am and 8 pm
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_us'); //used to restrict the user from selecting past days
  interviewTypes: any; //as we did not create an entity for intevriew types, it is passed as any type from backend

  constructor(
    private activatedRoute: ActivatedRoute,
    private interviewService: InterviewService,
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private candidateService: CandidateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadInterviewData();
    this.loadCandidateData();
    this.loadEmployeeData();
    this.loadInterviewTypeData();
  }

  //to update the interview details, we are only updating part of data, so ensure that other data remains same
  updateInterview(interview: Interview, canId: number, empId: number) {
    interview.id = this.id;
    interview.status = 'Rescheduled'; //changing interview status to Rescheduled
    interview.addedOn = this.interview.addedOn;
    interview.updatedBy = localStorage.getItem('adminEmail')!; //not null assertion is added here
    //this for loop is used to get the employee details whose employee id is selected in the html page
    for (let emp of this.employees) {
      if (emp.id == empId) {
        //not null assertion is added here
        interview.employee = emp;
        break;
      }
    }
    //this for loop is used to get the candidate details whose candidate id is selected in the html page
    for (let can of this.candidates) {
      if (can.id == canId) {
        //not null assertion is added here
        interview.candidate = can;
        break;
      }
    }
    this.interviewService.updateInterview(interview).subscribe(
      (data) => {
        this.showSuccess(data.message);
        this.shouldSendMail = true;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //used to send updated/rescheduled interview details to candidate and employee
  sendMail(interview: Interview) {
    this.adminService
      .sendRescheduledInterviewMail(
        interview.candidate!.id!,
        interview.employee!.id!,
        interview
      ) //not null assertion is added here
      .subscribe(
        (data) => {
          this.showSuccess(data.message);
        },
        (error) => this.showError(error.error.message)
      );
  }
  //loads available interview types
  loadInterviewTypeData() {
    this.interviewService.getAllInterviewType().subscribe(
      (data) => {
        this.interviewTypes = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //loads all available candidate data for the interview updation
  loadCandidateData() {
    this.candidateService.getAllCandidate().subscribe(
      (data) => {
        this.candidates = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //loads all available employee data for the interview updation
  loadEmployeeData() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => {
        this.employees = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }
  //loads all  interview data to be updated
  loadInterviewData() {
    this.interviewService.getInterviewById(this.id).subscribe(
      (data) => {
        this.interview = data.data;
        this.candidateId = this.interview.candidate!.id || 0; //not null assertion is added and if candidate is not defined then replace candidate id with 0
        this.employeeId = this.interview.employee!.id || 0; //not null assertion is added and if employee is not defined then replace employee id with 0
      },
      (error) => this.showError(error.error.message)
    );
  }

  //to validate time between 10 am and 8 pm, comparing time based on string comparison
  validateTime(time: string) {
    const minTime: string = '10:00';
    const maxTime: string = '20:00';
    this.isValidTime = time >= minTime && time <= maxTime;
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
