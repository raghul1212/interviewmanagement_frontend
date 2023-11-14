import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminEmail: string = localStorage.getItem('adminEmail') || ''; //to maintain localstorage session for the admin
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    //this.adminEmail == '' if localstorage of adminEmail is null, so we rdirect to login page
    if (this.adminEmail == '') {
      this.showInfo('Login to continue');
      this.router.navigate(['login']);
    }
  }
  //once user click logout button, redirect to login page
  logout() {
    localStorage.removeItem('adminEmail');
    this.showSuccess('Logged out successfully!');
    this.router.navigate(['login']);
  }
  //it is used to display success toastr message
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  //it is used to display info toastr message
  showInfo(message: string) {
    this.toastr.info(message);
  }
}
