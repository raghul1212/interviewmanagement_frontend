import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate, CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-view-current-application',
  templateUrl: './view-current-application.component.html',
  styleUrls: ['./view-current-application.component.css']
})
export class ViewCurrentApplicationComponent implements OnInit {
  emailId:string=localStorage.getItem('canEmail') as any as string;
  candidate:Candidate[]=[];
  constructor(private router:Router,private candidateService:CandidateService) { }

  ngOnInit(): void {
    if(localStorage.getItem('canEmail')==null){
      window.alert('Log in to continue...');
      this.router.navigate(['login']);
    }
   else{
    this.reloadData();
   }
  
  }

  updateCandidate(id:any){
    this.router.navigate(['updateCandidate',id]);
  }

  reloadData(){
   this.candidateService.getCandidateByEmailId(this.emailId).subscribe(data=>{
     if(data==null){
       window.alert("please enter a valid login credentials to proceed..");
       this.router.navigate(['login']);
     }else{
      this.candidate=data.data;
     }
  
   },error=> window.alert(error.error.message));
  }

  

}
