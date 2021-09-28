import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empEmail:string=localStorage.getItem('empEmail') as any as string;
  constructor(private router:Router) { }

  ngOnInit(): void {
   if(this.empEmail==null){
     window.alert('Log in to continue...');
     this.router.navigate(['login']);
   }
  }

  logout(){
    localStorage.removeItem('empEmail');
    this.router.navigate(['login']);
  }

}
