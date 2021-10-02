import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private toastr:ToastrService) { }
  ngOnInit(): void {
  }

  onLogin(credential:any){
    if(credential.username=='admin@gmail.com' && credential.password=='admin1'){
      this.showSuccess();
      localStorage.setItem('adminEmail',credential.username);
      this.router.navigate(['admin']);
    } else if(credential.password == 'emp123'){
      this.showSuccess();
      localStorage.setItem('empEmail',credential.username);
      this.router.navigate(['employee']);
    }else if(credential.password == 'can123'){
      this.showSuccess();
      localStorage.setItem('canEmail',credential.username);
      this.router.navigate(['candidate']);
    }
    else{
      this.showError();
    }

  }

  showSuccess() {
    this.toastr.success('Logged in successfully!');
  }
  showError(){
    this.toastr.error('Login failed, try again!');
  }

}
