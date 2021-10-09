import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/dto/employee/employee';
import {
  EmployeeService,
} from 'src/app/services/employee/employee.service';
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
    if (
      credential.username == 'admin@gmail.com' &&
      credential.password == 'admin1'
    ) {
      this.showSuccess();
      localStorage.setItem('adminEmail', credential.username);
      this.router.navigate(['admin']);
    } else if (credential.password == 'emp123') {
      const employee = new Employee();
      employee.emailId = credential.username;
      this.employeeService.getEmployeeByEmailId(employee).subscribe((data) => {
        if (data.data == null) {
          this.showInfo('Please Login using a valid Email Address');
          this.router.navigate(['login']);
        } else {
          this.showSuccess();
          localStorage.setItem('empEmail', credential.username);
          this.router.navigate(['employee']);
        }
      });
    } else if (credential.password == 'can123') {
      this.showSuccess();
      localStorage.setItem('canEmail', credential.username);
      this.router.navigate(['candidate']);
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this.toastr.success('Logged in successfully!');
  }
  showError() {
    this.toastr.error('Login failed, try again!');
  }
  showInfo(message: string) {
    this.toastr.info(message);
  }
}
