import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empEmail:string=localStorage.getItem('empEmail') as any as string;
  constructor(private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
   if(this.empEmail==null){
    this.showInfo('Log in to continue..');
     this.router.navigate(['login']);
   }
  }

  logout(){
    localStorage.removeItem('empEmail');
    this.router.navigate(['login']);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Logged out successfully!');
  }
  showInfo(message:string) {
    this.toastr.info(message);
  }
}
