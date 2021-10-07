import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Employee,
  EmployeeService,
} from 'src/app/services/employee/employee.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  isvalidId = new Array(4).fill(true);
  designations: any;
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadDesignationData();
  }
  addEmployee(employee: Employee) {
    employee.updatedBy = localStorage.getItem('adminEmail') as any as string;
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
  reloadDesignationData() {
    this.employeeService.getAllDesignation().subscribe((data) => {
      this.designations = data.data;
    });
  }

  emailIdValidation(emailId: any) {
    if (emailId != null) {
      const employee = new Employee();
      employee.emailId = emailId;
      this.employeeService.getEmployeeByEmailId(employee).subscribe((data) => {
        this.isvalidId[2] = data.data == null ? true : false;
      });
    } else {
      this.isvalidId[2] = true;
    }
  }

  phoneNumberValidation(phoneNumber: any) {
    if (phoneNumber != null) {
      const employee = new Employee();
      employee.phoneNumber = phoneNumber;
      this.employeeService.getEmployeeByPhone(employee).subscribe((data) => {
        this.isvalidId[3] = data.data == null ? true : false;
      });
    } else {
      this.isvalidId[3] = true;
    }
  }

  isOverAllValidation() {
    return !this.isvalidId.includes(false);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }
}
