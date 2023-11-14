import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee/employee';
import { Interview } from 'src/app/dto/interview/interview';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { InterviewService } from 'src/app/services/interview/interview.service';

@Component({
  selector: 'app-employee-manage-interview',
  templateUrl: './employee-manage-interview.component.html',
  styleUrls: ['./employee-manage-interview.component.css'],
})
export class EmployeeManageInterviewComponent implements OnInit {
  employee: Employee = {}; //to store employee data, useful while displaying employee details such as name and email
  empEmail: string = localStorage.getItem('empEmail') || '';
  interviews: Interview[] = []; //to store list of interviews of an employee
  pageOfItems: Array<Interview> = []; //used for pagination
  today: any = formatDate(new Date(), 'yyyy-MM-dd', 'en_US'); //Reason for any type: today is compared with interviewScheduledDate of the interview(Date datatype)
  //but if we compare with  new Date(), the result is not acceptable as it compares date and time too. But, as per our requirement, we need to check with date only not time.
  //so formatDate is used and it returns a string. Since, string(formated today date) and Date(interviewScheduledDate) cannot be compared.
  //so we are using any type.
  currentTime: any = formatDate(new Date(), 'HH:mm:ss', 'en_US');
  //to compare current time, we don't have any Object unless new Date(), so we extract time from new Date()
  //and it returns a string but we have to compare with interview scheduledTime which is in Time datatype.
  //so to compare both, we keep currentTime of any type

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private interviewService: InterviewService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.empEmail != '') {
      this.reloadEmployeeData();
      this.reloadInterviewData();
    }
  }

  //used for pagination
  onChangePage(pageOfItems: Array<Interview>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  //redirects to the addResult page with interview id
  addResult(id: any) {
    this.router.navigate(['addResult', id]);
  }

  //redirects to viewCandidateById to view candidate details
  viewCandidate(id: any) {
    this.router.navigate(['viewCandidateById', id]);
  }

  //to load interview details for employee by employee email id
  reloadInterviewData() {
    const employee = new Employee();
    employee.emailId = this.empEmail;
    this.interviewService.getInterviewByEmployeeEmailId(employee).subscribe(
      (data) => {
        this.interviews = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //to load employee data
  reloadEmployeeData() {
    const employee = new Employee();
    employee.emailId = this.empEmail;
    this.employeeService.getEmployeeByEmailId(employee).subscribe(
      (data) => {
        if (data.data != null) {
          this.employee = data.data;
        }
      },
      (error) => this.showError(error.error.message)
    );
  }

  //to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
  //to display info toastr message
  showInfo(message: string) {
    this.toastr.info(message);
  }
}
