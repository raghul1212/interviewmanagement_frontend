import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminEmail:string=localStorage.getItem('adminEmail') as any as string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(this.adminEmail==null){
      window.alert('Login to continue..');
      this.router.navigate(['login']);
    }
  }

  logout(){
    localStorage.removeItem('adminEmail');
    this.router.navigate(['login']);
  }

}
