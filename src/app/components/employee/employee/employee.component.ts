import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  empEmail: string = localStorage.getItem('empEmail') || '';
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.empEmail == '') {
      this.showInfo('Log in to continue..');
      this.router.navigate(['login']);
    }
  }

  logout() {
    localStorage.removeItem('empEmail');
    this.router.navigate(['login']);
    this.showSuccess('Logged out successfully!');
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showInfo(message: string) {
    this.toastr.info(message);
  }
}
