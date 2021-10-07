import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Employee,
  EmployeeService,
} from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = {};
  id?: any;
  isvalidId = new Array(2).fill(true);
  designations: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.reloadEmployeeData();
    this.reloadDesignationData();
  }

  updateEmployee(employee: Employee) {
    employee.id = this.id;
    employee.addedOn = this.employee.addedOn;
    employee.status = this.employee.status;
    employee.updatedBy = localStorage.getItem('adminEmail') as any as string;
    this.employeeService.updateEmployee(employee).subscribe(
      (data) => {
        this.showSuccess(data.message);
        this.router.navigate(['manageEmployee']);
      },
      (error) => this.showError(error.error.message)
    );
  }
  reloadEmployeeData() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  reloadDesignationData() {
    this.employeeService.getAllDesignation().subscribe(
      (data) => {
        this.designations = data.data;
      },
      (error) => this.showError(error.error.message)
    );
  }

  emailIdValidation(emailId: any) {
    if (emailId != null) {
      const employee = new Employee();
      employee.emailId = emailId;
      this.employeeService.getEmployeeByEmailId(employee).subscribe((data) => {
        this.isvalidId[0] =
          data.data == null ? true : data.data.id == this.employee.id;
      });
    } else {
      this.isvalidId[0] = true;
    }
  }

  phoneNumberValidation(phoneNumber: any) {
    if (phoneNumber != null) {
      const employee = new Employee();
      employee.phoneNumber = phoneNumber;
      this.employeeService.getEmployeeByPhone(employee).subscribe((data) => {
        this.isvalidId[1] =
          data.data == null ? true : data.data.id == this.employee.id;
      });
    } else {
      this.isvalidId[1] = true;
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
