import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  isvalidId: boolean[] = new Array(2).fill(true); //it contains validity state of email id and phone number respectively. For eg: If index 0 is false then state of emailId is invalid
  designations: [number, string][] = []; //as we did not create an entity for designation in the backend, it passed as array of designation of any type
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadDesignationData();
  }
  //addEmployee takes employee object from form-input and pass to the backend via employeeService
  addEmployee(employee: Employee) {
    employee.updatedBy = localStorage.getItem('adminEmail')!; //here, ! acts as not null assertion operator, because it is sure that candidate cannot apply for a role without login, so surely we get an email id
    this.employeeService.addEmployee(employee).subscribe(
      (data) => {
        this.showSuccess(data.message);
        this.router.navigate(['manageEmployee']);
      },
      (error) => {
        this.showError(error.error.message);
      }
    );
  }
  //reloadDesignationData is used to load the available designations from database, it called once inside ngOninit.
  reloadDesignationData() {
    this.employeeService.getAllDesignation().subscribe(
      (data) => {
        this.designations = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  //emailIdValidation is used to validate email id, it calls the getEmployeeByEmailId method, if the method returns a not-null value which means there is already a data entry exists with the given email id.
  //if a null is returned then no data entry for the given email id, so given email id is valid.
  emailIdValidation(emailId: string) {
    if (emailId != null) {
      const employee = new Employee(); //as getEmployeeByEmailId accepts only employee object, so we make an employee object with given Email Id
      employee.emailId = emailId;
      this.employeeService.getEmployeeByEmailId(employee).subscribe(
        (data) => {
          this.isvalidId[0] = data.data == null ? true : false;
        },
        (error) => {
          if (error.status) {
            this.isvalidId[0] = true; //if 404 error occurs, email id is valid
          }
        }
      );
    } else {
      this.isvalidId[0] = true; //as this method called onkeyup from html, there is a possibility of having null value(if the field is not filled)
    }
  }

  //phoneNumberValidation is used to validate phone number, it calls the getEmployeeByPhone method, if the method returns a not-null value which means there is already a data entry exists with the given phone number.
  //if a null is returned then no data entry for the given phone numbe, so given phone numbe is valid.
  phoneNumberValidation(phoneNumber: string) {
    if (phoneNumber != null) {
      const employee = new Employee(); //as getEmployeeByPhone accepts only employee object, so we make an employee object with given phone number
      employee.phoneNumber = phoneNumber;
      this.employeeService.getEmployeeByPhone(employee).subscribe(
        (data) => {
          this.isvalidId[1] = data.data == null ? true : false;
        },
        (error) => {
          if (error.status == 404) {
            this.isvalidId[1] = true;
          }
        }
      );
    } else {
      this.isvalidId[1] = true; //as this method called onkeyup from html, there is a possibility of having null value(if the field is not filled)
    }
  }

  //overall validation(email id,phone number) is set to false if any one of the value in the isValidId array is false
  isOverAllValidation() {
    return !this.isvalidId.includes(false);
  }

  //used to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  //used to display error toastr message
  showError(message: string) {
    this.toastr.error(message);
  }
}
