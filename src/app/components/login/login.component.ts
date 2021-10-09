import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {}

  //for testing purpose we have default password for candidate, admin and employee and username as email id
  onLogin(credential: any) {
    //if username==admin@gmail.com and password==admin1 then admin(used for testing purpose)
    if (
      credential.username == 'admin@gmail.com' &&
      credential.password == 'admin1'
    ) {
      this.showSuccess('Logged in successfully!');
      localStorage.setItem('adminEmail', credential.username);
      this.router.navigate(['admin']);
    }
    //if username==employee email address and password==emp123 then employee(used for testing purpose)
    //and check whether employee already exists.
    else if (credential.password == 'emp123') {
      const employee = new Employee();
      employee.emailId = credential.username;
      this.employeeService.getEmployeeByEmailId(employee).subscribe(
        (data) => {
          //if getEmployeeByEmailId returns a non-null data then employee email id is valid
          if (data.data != null) {
            this.showSuccess('Logged in successfully!');
            localStorage.setItem('empEmail', credential.username);
            this.router.navigate(['employee']);
          }
        },
        (error) => {
          this.showError('Login Failed');
        }
      );
    }
    //if username==candidate email address and password==can123 then employee(used for testing purpose)
    //here, we don't check with database, as a candidate may be new to apply for a job
    else if (credential.password == 'can123') {
      this.showSuccess('Logged in successfully!');
      localStorage.setItem('canEmail', credential.username);
      this.router.navigate(['candidate']);
    } else {
      this.showError('Login failed, try again!');
    }
  }

  //to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
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
