import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }
  regexEmployee:string="^emp[a-zA-Z0-9!@#$%^&*()?]{3,}$";
  regexCandidate:string="^can[a-zA-Z0-9!@#$%^&*()?]{3,}$";
  ngOnInit(): void {
  }

  onLogin(credential:any){
    if(credential.username=='admin@gmail.com' && credential.password=='admin1'){
      localStorage.setItem('adminEmail',credential.username);
      window.alert("Welcome admin!");
      this.router.navigate(['admin']);
    } else if(credential.password.match(this.regexEmployee)){
      window.alert("Welcome employee!");
      localStorage.setItem('empEmail',credential.username);
      this.router.navigate(['employee']);
    }else if(credential.password.match(this.regexCandidate)){
      window.alert("Welcome candidate!");
      localStorage.setItem('canEmail',credential.username);
      this.router.navigate(['candidate']);
    }
    else{
      window.alert("invalid login credentials!");
    }

}
}
