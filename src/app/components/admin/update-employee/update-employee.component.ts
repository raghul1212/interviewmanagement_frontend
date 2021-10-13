import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = {}; //to store a specific employee details whose details to be updated
  id: number = 0; //to set the employee id for updation
  isvalidId: Array<boolean> = new Array(2).fill(true); //used to store the state of employee email id and phone number for updation, for eg: index 0 is state of email id(true if email id is valid to update) and index 1 is state of phone number
  designations: any; //as we did not create an entity for designation in the backend, it passed as array of designation of any type
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']; //id is taken from path params
    this.reloadEmployeeData();
    this.reloadDesignationData();
  }

  //to update the employee details. note that we are getting method argument(employeeChanged) is coming from html page which is to be updated
  //and other details such as status, id of employee, addedOn should remain same
  updateEmployee(employeeChanged: Employee) {
    employeeChanged.id = this.id;
    employeeChanged.addedOn = this.employee.addedOn;
    employeeChanged.status = this.employee.status;
    employeeChanged.updatedBy = localStorage.getItem('adminEmail')!; //not null assertion is added here
    this.employeeService.updateEmployee(employeeChanged).subscribe(
      (data) => {
        this.showSuccess(data.message);
        this.router.navigate(['manageEmployee']);
      },
      (error) => this.showError(error.error.message)
    );
  }

  //loads employee data
  reloadEmployeeData() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //loads available designation data
  reloadDesignationData() {
    this.employeeService.getAllDesignation().subscribe(
      (data) => {
        this.designations = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //used to validate email once user starts typing in html page
  emailIdValidation(emailId: string) {
    if (emailId != null) {
      const employee = new Employee(); //as getEmployeeByEmailId only supports email in the form of Employee object
      employee.emailId = emailId;
      this.employeeService.getEmployeeByEmailId(employee).subscribe(
        (data) => {
          this.isvalidId[0] =
            data.data == null ? true : data.data.id == this.employee.id;
          //data.data is null if the email to be updated does not already exist in the database, so it is possible to update the email
          //if not null then check the updated email is same as previous email id of the same employee, if yes then also possible to update the email
        },
        (error) => {
          if (error.status) {
            this.isvalidId[0] = true; //if 404 error occurs, email id is valid
          }
        }
      );
    } else {
      this.isvalidId[0] = true; //if email is not filled
    }
  }

  //used to validate phone number for the employee updation
  phoneNumberValidation(phoneNumber: string) {
    if (phoneNumber != null) {
      const employee = new Employee(); //as getEmployeeByPhone only supports phone number in the form of Employee object
      employee.phoneNumber = phoneNumber;
      this.employeeService.getEmployeeByPhone(employee).subscribe(
        (data) => {
          this.isvalidId[1] =
            data.data == null ? true : data.data.id == this.employee.id;
          //data.data is null if the phone number to be updated does not already exist in the database, so it is possible to update the phone number
          //if not null then check the updated phone number is same as previous phone number of the same employee, if yes then also possible to update the phone number
        },
        (error) => {
          if (error.status) {
            this.isvalidId[1] = true; //if 404 error occurs, email id is valid
          }
        }
      );
    } else {
      this.isvalidId[1] = true; //if phone number is not filled
    }
  }

  //checks isValidId array and if any one of the value is false, then overAllValidation is false
  isOverAllValidation() {
    return !this.isvalidId.includes(false);
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
