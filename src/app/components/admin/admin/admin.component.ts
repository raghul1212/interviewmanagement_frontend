import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminEmail: string = localStorage.getItem('adminEmail') as any as string;
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.adminEmail == null) {
      this.showInfo('Login to continue');
      this.router.navigate(['login']);
    }
  }

  logout() {
    localStorage.removeItem('adminEmail');
    this.showSuccess();
    this.router.navigate(['login']);
  }
  showSuccess() {
    this.toastr.success('Logged out successfully!');
  }
  showInfo(message: string) {
    this.toastr.info(message);
  }
}
